package com.kcesports.service;

import com.kcesports.dto.LoginRequest;
import com.kcesports.dto.LoginResponse;
import com.kcesports.entity.Admin;
import com.kcesports.repository.AdminRepository;
import com.kcesports.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(AdminRepository adminRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public LoginResponse login(LoginRequest request) {
        Admin admin = adminRepository
                .findByUsername(request.getUsername())
                .orElseThrow(() ->
                        new RuntimeException("Invalid username or password"));

        boolean passwordMatches = passwordEncoder.matches(request.getPassword(), admin.getPassword());

        if(!passwordMatches) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtService.generateToken(admin.getUsername());

        return new LoginResponse(token);
    }
}
