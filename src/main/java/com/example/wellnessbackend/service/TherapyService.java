package com.example.wellnessbackend.service;

import com.example.wellnessbackend.dto.TherapyDto;
import com.example.wellnessbackend.entity.Therapy;
import com.example.wellnessbackend.repository.TherapyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TherapyService {

    private final TherapyRepository therapyRepository;

    public Therapy createTherapy(TherapyDto dto) {
        Therapy therapy = Therapy.builder()
                .practitionerId(dto.getPractitionerId())
                .name(dto.getName())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .duration(dto.getDuration())
                .category(dto.getCategory())
                .imageUrl(dto.getImageUrl())
                .build();
        return therapyRepository.save(therapy);
    }

    public List<Therapy> getTherapiesByPractitioner(Long practitionerId) {
        return therapyRepository.findByPractitionerId(practitionerId);
    }
}
