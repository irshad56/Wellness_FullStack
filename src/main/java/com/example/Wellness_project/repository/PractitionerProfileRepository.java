package com.example.Wellness_project.repository;

import com.example.Wellness_project.model.PractitionerProfile;
import com.example.Wellness_project.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PractitionerProfileRepository extends JpaRepository<PractitionerProfile, Long> {
    Optional<PractitionerProfile> findByUser(User user);
    List<PractitionerProfile> findByStatus(String status);
}
