package com.example.wellnessbackend.service;

import com.example.wellnessbackend.dto.RecommendationDto;
import com.example.wellnessbackend.dto.RecommendationResponseDto;
import com.example.wellnessbackend.entity.Recommendation;
import com.example.wellnessbackend.repository.RecommendationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecommendationService {

    private final RecommendationRepository recommendationRepository;

    // Generate recommendation and save in DB
    public RecommendationResponseDto generateRecommendation(RecommendationDto dto) {

        // Here you can integrate AI engine / external API
        // For now, we just generate a dummy recommendation based on symptom
        String suggestedTherapy = "General Wellness Therapy"; // placeholder
        String sourceAPI = "AI-Engine-v1";

        Recommendation recommendation = Recommendation.builder()
                .userId(dto.getUserId())
                .symptom(dto.getSymptom())
                .suggestedTherapy(suggestedTherapy)
                .sourceAPI(sourceAPI)
                .timestamp(LocalDateTime.now())
                .build();

        Recommendation saved = recommendationRepository.save(recommendation);

        return mapToResponseDto(saved);
    }

    // Fetch all recommendations of a user
    public List<RecommendationResponseDto> getRecommendationsByUser(Long userId) {
        List<Recommendation> list = recommendationRepository.findByUserId(userId);
        return list.stream().map(this::mapToResponseDto).collect(Collectors.toList());
    }

    private RecommendationResponseDto mapToResponseDto(Recommendation recommendation) {
        RecommendationResponseDto dto = new RecommendationResponseDto();
        dto.setId(recommendation.getId());
        dto.setSymptom(recommendation.getSymptom());
        dto.setSuggestedTherapy(recommendation.getSuggestedTherapy());
        dto.setSourceAPI(recommendation.getSourceAPI());
        dto.setTimestamp(recommendation.getTimestamp());
        return dto;
    }
}
