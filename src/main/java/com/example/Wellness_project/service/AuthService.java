package com.example.Wellness_project.service;

import com.example.Wellness_project.config.JwtUtil;
import com.example.Wellness_project.dto.*;
import com.example.Wellness_project.model.User;
import com.example.Wellness_project.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // constructor injection (good practice)
    public AuthService(UserRepository userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    // --------------------- REGISTER ---------------------
    @Transactional
    public AuthResponse register(RegisterRequest req) {

        if (userRepo.existsByEmail(req.getEmail())) {
            throw new IllegalArgumentException("Email already in use");
        }

        User u = User.builder()
                .name(req.getName())
                .email(req.getEmail())
                .password(passwordEncoder.encode(req.getPassword()))
                .role(com.example.Wellness_project.model.Role.USER)
                .build();

        userRepo.save(u);

        return new AuthResponse("User registered", u.getId(), u.getName(), u.getEmail());
    }

    // --------------------- LOGIN (JWT) ---------------------
    public Map<String, Object> login(LoginRequest req) {

        User user = userRepo.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email"));

        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // Generate tokens
        String accessToken = jwtUtil.generateAccessToken(user.getEmail());
        String refreshToken = jwtUtil.generateRefreshToken(user.getEmail());

        // Response map
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login successful");
        response.put("accessToken", accessToken);
        response.put("refreshToken", refreshToken);

        // User details
        Map<String, Object> userData = new HashMap<>();
        userData.put("id", user.getId());
        userData.put("name", user.getName());
        userData.put("email", user.getEmail());
        userData.put("role", user.getRole());

        response.put("user", userData);

        return response;
    }

    // --------------------- REFRESH TOKEN ---------------------
    public Map<String, String> refreshToken(String refreshToken) {

        if (!jwtUtil.validateToken(refreshToken)) {
            throw new RuntimeException("Invalid refresh token");
        }

        String email = jwtUtil.extractEmail(refreshToken);
        String newAccessToken = jwtUtil.generateAccessToken(email);

        Map<String, String> tokens = new HashMap<>();
        tokens.put("accessToken", newAccessToken);

        return tokens;
    }
}
