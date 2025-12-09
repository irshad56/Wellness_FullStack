package com.example.Wellness_project.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Data
public class PractitionerApplyRequest {
    @NotBlank
    private String specialization;

    @NotNull
    private Integer experienceYears;

    private String licenseNumber;

    private String certificationUrl;

    private String bio;
}
