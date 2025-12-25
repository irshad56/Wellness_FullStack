package com.example.wellnessbackend.dto;

import lombok.Data;

@Data
public class RecommendationDto {
    private Long userId;     // ID of the user requesting recommendation
    private String symptom;  // Symptom reported
}
