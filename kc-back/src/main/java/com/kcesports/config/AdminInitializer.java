package com.kcesports.config;

import com.kcesports.entity.Admin;
import com.kcesports.repository.AdminRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminInitializer {

    @Bean
    CommandLineRunner createAdmin(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            String username = "admin";

            if(adminRepository.findByUsername(username).isEmpty()) {
                Admin admin = Admin.builder()
                        .username(username)
                        .password(
                                passwordEncoder.encode("kcadmin@123")
                        )
                        .build();

                adminRepository.save(admin);

                System.out.println("Admin has been created");
            }
        };
    }
}
