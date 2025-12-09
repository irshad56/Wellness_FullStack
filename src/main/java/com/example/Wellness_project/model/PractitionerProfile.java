package com.example.Wellness_project.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

@Entity
@Table(name = "practitioner_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PractitionerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // link to user
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String specialization;

    @Column(name = "experience_years")
    private Integer experienceYears;

    @Column(name = "license_number")
    private String licenseNumber;

    @Column(name = "certification_url", length = 1000)
    private String certificationUrl;

    @Column(columnDefinition = "TEXT")
    private String bio;

    private Boolean isVerified = false;

    // PENDING, APPROVED, REJECTED
    @Column(length = 32)
    private String status = "PENDING";

    // average rating (0..5)
    private Double rating = 0.0;

    @CreationTimestamp
    @Column(updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    private Instant updatedAt;
}
