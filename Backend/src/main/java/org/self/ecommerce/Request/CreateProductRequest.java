package org.self.ecommerce.Request;

import lombok.Data;
import org.self.ecommerce.Models.Size;

import java.util.HashSet;
import java.util.Set;

@Data
public class CreateProductRequest {

    private String title;
    private String description;
    private int price;
    private int discountedPrice;
    private int discountPercentage;
    private int quantity;
    private String brand;
    private String color;
    private Set<Size>  size = new HashSet<>();
    private String imageURL;
    private Long categoryId;
    public String topLevelCategory;
    public String secondLevelCategory;
    public String thirdLevelCategory;


}
