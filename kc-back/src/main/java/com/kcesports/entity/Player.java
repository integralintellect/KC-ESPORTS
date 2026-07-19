package com.kcesports.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "players")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String ign;

    private String role;

    @Column(nullable = false, unique = true)
    private String uid;

    private String imageUrl;

    private String instagram;

    @Column(name = "display_over")
    private Integer displayOrder;

    private String imagePublicId;
}
