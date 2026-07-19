package com.kcesports.config;

import com.kcesports.security.JwtAuthenticationFilter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final CorsConfigurationSource corsConfigurationSource;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter,
            CorsConfigurationSource corsConfigurationSource
    ) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.corsConfigurationSource = corsConfigurationSource;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            throw new UsernameNotFoundException(username);
        };
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
                .cors(cors ->
                        cors.configurationSource(corsConfigurationSource)
                )

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

                // APIs should return status codes, never redirect to login pages
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint((request, response, authException) ->
                                response.sendError(HttpServletResponse.SC_UNAUTHORIZED)
                        )
                        .accessDeniedHandler((request, response, accessDeniedException) ->
                                response.sendError(HttpServletResponse.SC_FORBIDDEN)
                        )
                )

                .authorizeHttpRequests(auth -> auth

                        // CORS preflight
                        .requestMatchers(
                                HttpMethod.OPTIONS,
                                "/**"
                        )
                        .permitAll()

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
