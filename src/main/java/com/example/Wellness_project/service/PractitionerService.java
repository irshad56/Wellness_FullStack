package com.example.Wellness_project.service;

import com.example.Wellness_project.dto.PractitionerApplyRequest;
import com.example.Wellness_project.dto.PractitionerResponse;
import com.example.Wellness_project.model.PractitionerProfile;
import com.example.Wellness_project.model.User;
import com.example.Wellness_project.repository.PractitionerProfileRepository;
import com.example.Wellness_project.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PractitionerService {

    private final PractitionerProfileRepository profileRepository;
    private final UserRepository userRepository;

    public PractitionerService(PractitionerProfileRepository profileRepository,
                               UserRepository userRepository) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public PractitionerResponse apply(Long userId, PractitionerApplyRequest req) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // if profile exists, update it instead of creating duplicate
        Optional<PractitionerProfile> maybe = profileRepository.findByUser(user);
        PractitionerProfile profile = maybe.orElseGet(() -> {
            PractitionerProfile p = new PractitionerProfile();
            p.setUser(user);
            return p;
        });

        profile.setSpecialization(req.getSpecialization());
        profile.setExperienceYears(req.getExperienceYears());
        profile.setLicenseNumber(req.getLicenseNumber());
        profile.setCertificationUrl(req.getCertificationUrl());
        profile.setBio(req.getBio());
        profile.setIsVerified(false);
        profile.setStatus("PENDING");

        PractitionerProfile saved = profileRepository.save(profile);
        return toDto(saved);
    }

    public PractitionerResponse getByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        PractitionerProfile profile = profileRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Practitioner profile not found"));

        return toDto(profile);
    }

    public List<PractitionerResponse> listPending() {
        return profileRepository.findByStatus("PENDING")
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public PractitionerResponse setVerificationStatus(Long profileId, boolean approved, String adminNote) {
        PractitionerProfile profile = profileRepository.findById(profileId)
                .orElseThrow(() -> new RuntimeException("Practitioner profile not found"));

        profile.setIsVerified(approved);
        profile.setStatus(approved ? "APPROVED" : "REJECTED");

        PractitionerProfile saved = profileRepository.save(profile);
        return toDto(saved);
    }

    private PractitionerResponse toDto(PractitionerProfile p) {
        return PractitionerResponse.builder()
                .id(p.getId())
                .userId(p.getUser().getId())
                .userName(p.getUser().getName())
                .specialization(p.getSpecialization())
                .experienceYears(p.getExperienceYears())
                .licenseNumber(p.getLicenseNumber())
                .certificationUrl(p.getCertificationUrl())
                .bio(p.getBio())
                .isVerified(p.getIsVerified())
                .status(p.getStatus())
                .rating(p.getRating())
                .build();
    }
}
