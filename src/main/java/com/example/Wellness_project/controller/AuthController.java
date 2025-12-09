package com.example.Wellness_project.controller;

import com.example.Wellness_project.dto.AuthResponse;
import com.example.Wellness_project.dto.LoginRequest;
import com.example.Wellness_project.dto.RegisterRequest;
import com.example.Wellness_project.service.AuthService;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // ---------------- REGISTER ----------------
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest req) {
        try {
            AuthResponse res = authService.register(req);
            return ResponseEntity.ok(res);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    // ---------------- LOGIN ----------------
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest req) {
        try {
            Map<String, Object> res = authService.login(req); // updated
            return ResponseEntity.ok(res);
        } catch (Exception ex) {
            return ResponseEntity.status(401).body(ex.getMessage());
        }
    }

    // ---------------- REFRESH TOKEN ----------------
    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody Map<String, String> body) {
        String refreshToken = body.get("refreshToken");
        Map<String, String> newToken = authService.refreshToken(refreshToken);
        return ResponseEntity.ok(newToken);
    }
}
