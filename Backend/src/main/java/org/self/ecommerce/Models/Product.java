package org.self.ecommerce.Models;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private String description;
    private int price;
    private int discountedPrice;
    private int discountPercentage;
    private String imageUrl;
    private int quantity;
    private String brand;
    private String color;

    @ElementCollection
    private Set<Size> sizes = new HashSet<>();

    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL)
    private List<Rating> ratings = new ArrayList<>();

    @OneToMany(mappedBy = "review",cascade = CascadeType.ALL)
    private List<Review> reviews = new ArrayList<>();

    private int numberOfRatings;

    @ManyToOne
    @JoinColumn(name="category_id")
    private Category category;
    private LocalDateTime createdAt;



}