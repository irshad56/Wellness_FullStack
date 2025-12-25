package com.example.wellnessbackend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "recommendations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Recommendation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;             // ID of the patient who received the recommendation

    private String symptom;          // Symptom reported by the user

    private String suggestedTherapy; // Suggested therapy type

    private String sourceAPI;        // API / engine that generated the recommendation

    private LocalDateTime timestamp; // When the recommendation was generated
}
