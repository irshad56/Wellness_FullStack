package com.example.Wellness_project.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PractitionerResponse {
    private Long id;
    private Long userId;
    private String userName;
    private String specialization;
    private Integer experienceYears;
    private String licenseNumber;
    private String certificationUrl;
    private String bio;
    private Boolean isVerified;
    private String status;
    private Double rating;
}
