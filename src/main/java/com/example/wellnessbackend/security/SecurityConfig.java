package com.example.wellnessbackend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth

                        // ======================
                        // TEMP DEBUG FIX (IMPORTANT)
                        // ======================
                        .requestMatchers("/error").permitAll()

                        // ======================
                        // PUBLIC AUTH ENDPOINTS
                        // ======================
                        .requestMatchers(
                                "/api/auth/login",
                                "/api/auth/register",
                                "/api/auth/refresh-token"
                        ).permitAll()

                        // ======================
                        // PUBLIC PRACTITIONER & PRODUCT VIEW
                        // ======================
                        .requestMatchers(HttpMethod.GET,
                                "/api/practitioners/**",
                                "/api/products",
                                "/api/products/**"
                        ).permitAll()

                        // ======================
                        // PRODUCT MANAGEMENT
                        // ======================
                        .requestMatchers(HttpMethod.POST,
                                "/api/products"
                        ).hasAnyRole("ADMIN", "PRACTITIONER")

                        .requestMatchers(HttpMethod.PUT,
                                "/api/products/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(HttpMethod.DELETE,
                                "/api/products/**"
                        ).hasRole("ADMIN")

                        // ======================
                        // RECOMMENDATION ENDPOINTS
                        // ======================
                        .requestMatchers(HttpMethod.POST,
                                "/api/recommendations"
                        ).hasRole("PATIENT")

                        .requestMatchers(HttpMethod.GET,
                                "/api/recommendations/user/**"
                        ).hasAnyRole("PATIENT", "ADMIN")

                        // ======================
                        // NOTIFICATIONS (Milestone 3)
                        // ======================
                        .requestMatchers(HttpMethod.POST,
                                "/api/notifications"
                        ).hasRole("PATIENT")

                        .requestMatchers(HttpMethod.GET,
                                "/api/notifications/**"
                        ).hasAnyRole("PATIENT", "ADMIN")

                        // ======================
                        // ADMIN
                        // ======================
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")

                        // ======================
                        // EVERYTHING ELSE
                        // ======================
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
