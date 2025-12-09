package com.example.Wellness_project.controller;

import com.example.Wellness_project.dto.PractitionerApplyRequest;
import com.example.Wellness_project.dto.PractitionerResponse;
import com.example.Wellness_project.model.User;
import com.example.Wellness_project.repository.UserRepository;
import com.example.Wellness_project.service.PractitionerService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/practitioner")
public class PractitionerController {

    private final PractitionerService practitionerService;
    private final UserRepository userRepository;

    public PractitionerController(PractitionerService practitionerService,
                                  UserRepository userRepository) {
        this.practitionerService = practitionerService;
        this.userRepository = userRepository;
    }

    // Practitioner applies / creates profile
    @PostMapping("/apply")
    public ResponseEntity<?> apply(@Valid @RequestBody PractitionerApplyRequest req,
                                   Authentication authentication) {

        String email = authentication.getName(); // jwt subject -> email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        PractitionerResponse res = practitionerService.apply(user.getId(), req);
        return ResponseEntity.ok(res);
    }

    // Get my practitioner profile
    @GetMapping("/me")
    public ResponseEntity<?> myProfile(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        PractitionerResponse res = practitionerService.getByUserId(user.getId());
        return ResponseEntity.ok(res);
    }
}
