package org.self.ecommerce.Request;

import lombok.Data;
import org.self.ecommerce.Models.Product;

@Data
public class RatingRequest {

    private double rating;
    private Long productId;
}
