package com.example.wellnessbackend.controller;

import com.example.wellnessbackend.dto.TherapyDto;
import com.example.wellnessbackend.entity.Therapy;
import com.example.wellnessbackend.service.TherapyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/therapies")
@RequiredArgsConstructor
public class TherapyController {

    private final TherapyService therapyService;

    @PostMapping
    public ResponseEntity<Therapy> createTherapy(@RequestBody TherapyDto dto) {
        return ResponseEntity.ok(therapyService.createTherapy(dto));
    }

    @GetMapping("/practitioner/{id}")
    public ResponseEntity<List<Therapy>> getByPractitioner(@PathVariable Long id) {
        return ResponseEntity.ok(therapyService.getTherapiesByPractitioner(id));
    }
}
