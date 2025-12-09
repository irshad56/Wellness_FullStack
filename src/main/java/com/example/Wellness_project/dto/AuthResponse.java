package com.example.Wellness_project.dto;

import lombok.*;
@Data @AllArgsConstructor @NoArgsConstructor
public class AuthResponse {
    private String message;
    private Long userId;
    private String name;
    private String email;
}