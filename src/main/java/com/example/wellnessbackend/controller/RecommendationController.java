package com.example.wellnessbackend.controller;

import com.example.wellnessbackend.dto.RecommendationDto;
import com.example.wellnessbackend.dto.RecommendationResponseDto;
import com.example.wellnessbackend.service.RecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
@RequiredArgsConstructor
public class RecommendationController {

    private final RecommendationService recommendationService;

    // ------------------- Generate recommendation -------------------
    @PostMapping
    public ResponseEntity<RecommendationResponseDto> generateRecommendation(
            @RequestBody RecommendationDto dto) {
        RecommendationResponseDto response = recommendationService.generateRecommendation(dto);
        return ResponseEntity.ok(response);
    }

    // ------------------- Get recommendations of a user -------------------
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<RecommendationResponseDto>> getRecommendationsByUser(
            @PathVariable Long userId) {
        List<RecommendationResponseDto> list = recommendationService.getRecommendationsByUser(userId);
        return ResponseEntity.ok(list);
    }
}
