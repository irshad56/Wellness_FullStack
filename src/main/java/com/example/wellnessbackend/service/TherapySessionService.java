package com.example.wellnessbackend.service;

import com.example.wellnessbackend.dto.TherapySessionDto;
import com.example.wellnessbackend.entity.TherapySession;
import com.example.wellnessbackend.repository.TherapySessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TherapySessionService {

    private final TherapySessionRepository sessionRepository;

    // ------------------- Book a new therapy session -------------------
    public TherapySession bookSession(TherapySessionDto dto) {

        // 1️⃣ Reject non-hour aligned bookings (15:30, 10:15 etc.)
        if (dto.getDateTime().getMinute() != 0) {
            throw new RuntimeException("Invalid slot. Please select a valid time slot.");
        }

        // 2️⃣ Ensure slot exists in availability (not outside working hours or already booked)
        List<LocalDateTime> availableSlots = getAvailableSlots(
                dto.getPractitionerId(),
                dto.getDateTime().toLocalDate().toString()
        );

        if (!availableSlots.contains(dto.getDateTime())) {
            throw new RuntimeException("Selected slot is no longer available");
        }

        // 3️⃣ Final safety check at DB level (race condition protection)
        if (sessionRepository.existsByTherapyIdAndPractitionerIdAndDateTime(
                dto.getTherapyId(),
                dto.getPractitionerId(),
                dto.getDateTime())) {
            throw new RuntimeException("This slot is already booked");
        }

        // 4️⃣ Create & save session
        TherapySession session = TherapySession.builder()
                .therapyId(dto.getTherapyId())
                .practitionerId(dto.getPractitionerId())
                .userId(dto.getUserId())
                .dateTime(dto.getDateTime())
                .status("booked")
                .notes(dto.getNotes())
                .build();

        return sessionRepository.save(session);
    }


    // ------------------- Get all sessions for a user -------------------
    public List<TherapySession> getSessionsByUser(Long userId) {
        return sessionRepository.findByUserId(userId);
    }

    // ------------------- Get all sessions for a practitioner -------------------
    public List<TherapySession> getSessionsByPractitioner(Long practitionerId) {
        return sessionRepository.findByPractitionerId(practitionerId);
    }

    // ------------------- Update session status or notes -------------------
    public TherapySession updateSession(Long sessionId, TherapySessionDto dto) {
        TherapySession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found with id: " + sessionId));

        if (dto.getStatus() != null) session.setStatus(dto.getStatus());
        if (dto.getNotes() != null) session.setNotes(dto.getNotes());

        return sessionRepository.save(session);
    }

    // ------------------- Cancel a session -------------------
    public TherapySession cancelSession(Long sessionId) {
        TherapySession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found with id: " + sessionId));

        // Prevent cancelling if already completed
        if ("completed".equalsIgnoreCase(session.getStatus())) {
            throw new RuntimeException("Session already completed and cannot be cancelled");
        }

        // Update status to cancelled instead of deleting
        session.setStatus("cancelled");
        return sessionRepository.save(session);
    }

    // ------------------- Get available slots for a practitioner -------------------
    public List<LocalDateTime> getAvailableSlots(Long practitionerId, String dateStr) {
        LocalDate date;
        if (dateStr != null) {
            date = LocalDate.parse(dateStr);
        } else {
            date = LocalDate.now(); // default today
        }

        // Assuming working hours: 9 AM to 5 PM, 1-hour slots
        List<LocalDateTime> allSlots = new ArrayList<>();
        for (int hour = 9; hour < 17; hour++) {
            allSlots.add(LocalDateTime.of(date, LocalTime.of(hour, 0)));
        }

        // Fetch booked sessions
        List<TherapySession> sessions = sessionRepository.findByPractitionerId(practitionerId);

        // Remove booked slots
        sessions.stream()
                .filter(s -> s.getDateTime().toLocalDate().equals(date))
                .forEach(s -> allSlots.remove(s.getDateTime()));

        return allSlots;
    }

    // ------------------- Check if slot is booked -------------------
    public boolean isSlotBooked(Long therapyId, Long practitionerId, LocalDateTime dateTime) {
        return sessionRepository.existsByTherapyIdAndPractitionerIdAndDateTime(
                therapyId, practitionerId, dateTime
        );
    }
}
