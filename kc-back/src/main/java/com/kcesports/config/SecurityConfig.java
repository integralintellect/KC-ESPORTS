package com.kcesports.config;

import com.kcesports.security.JwtAuthenticationFilter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter
    ) {
        this.jwtAuthenticationFilter =
                jwtAuthenticationFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

                // Disable CSRF because we use JWT
                .csrf(csrf ->
                        csrf.disable()
                )

                // Enable CORS
                .cors(cors -> {
                })

                // Disable default Spring Security login page
                .formLogin(form ->
                        form.disable()
                )

                // Disable HTTP Basic authentication
                .httpBasic(basic ->
                        basic.disable()
                )

                // JWT = stateless authentication
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                .authorizeHttpRequests(auth -> auth

                        // Authentication endpoints
                        .requestMatchers(
                                "/api/auth/**"
                        )
                        .permitAll()

                        // Public players
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/players/**"
                        )
                        .permitAll()

                        // Public gallery
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/gallery/**"
                        )
                        .permitAll()

                        // Public achievements
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/achievements/**"
                        )
                        .permitAll()

                        // Admin player management
                        .requestMatchers(
                                "/api/players/**"
                        )
                        .hasRole("ADMIN")

                        // Admin gallery management
                        .requestMatchers(
                                "/api/gallery/**"
                        )
                        .hasRole("ADMIN")

                        // Admin achievement management
                        .requestMatchers(
                                "/api/achievements/**"
                        )
                        .hasRole("ADMIN")

                        // Admin image uploads
                        .requestMatchers(
                                "/api/upload/**"
                        )
                        .hasRole("ADMIN")

                        // Everything else
                        .anyRequest()
                        .permitAll()
                )

                // JWT filter
                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}