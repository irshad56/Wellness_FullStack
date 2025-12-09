package com.example.wellnessbackend.controller;

import com.example.wellnessbackend.dto.PractitionerCreateDto;
import com.example.wellnessbackend.dto.PractitionerResponseDto;
import com.example.wellnessbackend.dto.PractitionerUpdateDto;
import com.example.wellnessbackend.entity.Role;
import com.example.wellnessbackend.entity.User;
import com.example.wellnessbackend.repository.UserRepository;
import com.example.wellnessbackend.service.PractitionerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/practitioners")
@RequiredArgsConstructor
public class PractitionerController {

    private final PractitionerService service;
    private final UserRepository userRepository; // for fetching verified practitioners

    @PostMapping("/{userId}")
    public ResponseEntity<PractitionerResponseDto> create(
            @PathVariable Long userId,
            @RequestBody PractitionerCreateDto request) {
        return ResponseEntity.ok(service.createPractitioner(userId, request));
    }

    @GetMapping
    public ResponseEntity<List<PractitionerResponseDto>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PractitionerResponseDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    // ⭐ Existing endpoint: get practitioner by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<PractitionerResponseDto> getByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getByUserId(userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PractitionerResponseDto> update(
            @PathVariable Long id,
            @RequestBody PractitionerUpdateDto request
    ) {
        return ResponseEntity.ok(service.updatePractitioner(id, request));
    }

    // ⭐ NEW: Get all verified practitioners (for users)
    // NEW: Get all verified practitioners (for users)
    @GetMapping("/verified")
    public ResponseEntity<List<PractitionerResponseDto>> getVerifiedPractitioners() {
        List<User> users = userRepository.findByRoleAndVerified(Role.PRACTITIONER, true);

        List<PractitionerResponseDto> response = users.stream()
                .map(user -> {
                    // Assuming service can fetch Practitioner details by user ID
                    var practitioner = service.getByUserId(user.getId());
                    return PractitionerResponseDto.builder()
                            .id(practitioner.getId())
                            .userId(user.getId())
                            .specialization(practitioner.getSpecialization())
                            .verified(practitioner.getVerified())
                            .rating(practitioner.getRating())
                            .bio(practitioner.getBio())
                            .build();
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

}