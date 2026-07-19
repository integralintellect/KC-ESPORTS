package com.kcesports.config;

import com.kcesports.entity.Admin;
import com.kcesports.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminInitializer {

    @Value("${admin.username:admin}")
    private String adminUsername;

    @Value("${admin.password:}")
    private String adminPassword;

    @Bean
    CommandLineRunner createAdmin(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (adminPassword == null || adminPassword.isBlank()) {
                System.out.println("Skipping admin creation because ADMIN_PASSWORD is not set.");
                return;
            }

            if(adminRepository.findByUsername(adminUsername).isEmpty()) {
                Admin admin = Admin.builder()
                        .username(adminUsername)
                        .password(
                                passwordEncoder.encode(adminPassword)
                        )
                        .build();

                adminRepository.save(admin);

                System.out.println("Admin has been created");
            }
        };
    }
}
