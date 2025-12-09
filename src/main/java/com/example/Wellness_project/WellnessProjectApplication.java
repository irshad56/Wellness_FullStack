package com.example.Wellness_project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.Wellness_project.model.Role;
import com.example.Wellness_project.model.User;
import com.example.Wellness_project.repository.UserRepository;

@SpringBootApplication
public class WellnessProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(WellnessProjectApplication.class, args);
    }

    // Auto-create admin on startup
    @Bean
    public ApplicationRunner createAdmin(UserRepository userRepo, PasswordEncoder encoder) {
        return args -> {
            String email = "admin@example.com";

            if (userRepo.findByEmail(email).isEmpty()) {
                User admin = User.builder()
                        .name("Super Admin")
                        .email(email)
                        .password(encoder.encode("admin123")) // admin password
                        .role(Role.ADMIN)
                        .build();

                userRepo.save(admin);
                System.out.println("✔ ADMIN CREATED: " + email + " / admin123");
            } else {
                System.out.println("✔ ADMIN ALREADY EXISTS");
            }
        };
    }
}
