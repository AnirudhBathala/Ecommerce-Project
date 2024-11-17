package org.self.ecommerce.Services;


import org.self.ecommerce.Exceptions.ProductException;
import org.self.ecommerce.Models.Product;
import org.self.ecommerce.Models.Rating;
import org.self.ecommerce.Models.User;
import org.self.ecommerce.Request.RatingRequest;


import java.util.List;

public interface RatingService {

    public String  createRating(RatingRequest req , User user) throws ProductException;
    public List<Rating> getProductRating(Long productId) ;
}
