package com.example.Wellness_project.controller;

import com.example.Wellness_project.dto.PractitionerResponse;
import com.example.Wellness_project.model.User;
import com.example.Wellness_project.repository.UserRepository;
import com.example.Wellness_project.service.PractitionerService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/practitioner")
public class AdminPractitionerController {

    private final PractitionerService practitionerService;
    private final UserRepository userRepository;

    public AdminPractitionerController(PractitionerService practitionerService,
                                       UserRepository userRepository) {
        this.practitionerService = practitionerService;
        this.userRepository = userRepository;
    }

    private boolean isAdmin(Authentication auth) {
        if (auth == null) return false;
        return auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN") || a.getAuthority().equals("ADMIN"));
    }

    // list pending applications
    @GetMapping("/pending")
    public ResponseEntity<?> listPending(Authentication authentication) {
        if (!isAdmin(authentication)) return ResponseEntity.status(403).body("Forbidden");
        List<PractitionerResponse> pending = practitionerService.listPending();
        return ResponseEntity.ok(pending);
    }

    // approve/reject
    @PutMapping("/verify/{id}")
    public ResponseEntity<?> verify(@PathVariable("id") Long profileId,
                                    @RequestParam("approve") boolean approve,
                                    Authentication authentication) {
        if (!isAdmin(authentication)) return ResponseEntity.status(403).body("Forbidden");

        PractitionerResponse res = practitionerService.setVerificationStatus(profileId, approve, null);
        return ResponseEntity.ok(res);
    }
}
