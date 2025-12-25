package com.example.wellnessbackend.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RecommendationResponseDto {
    private Long id;
    private String symptom;
    private String suggestedTherapy;
    private String sourceAPI;
    private LocalDateTime timestamp;
}
