package org.self.ecommerce.Services;

import org.self.ecommerce.Exceptions.ProductException;
import org.self.ecommerce.Models.Product;
import org.self.ecommerce.Models.Rating;
import org.self.ecommerce.Models.User;
import org.self.ecommerce.Repositories.RatingRepository;
import org.self.ecommerce.Request.RatingRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RatingServiceImpl implements RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private ProductService productService;

    @Override
    public String createRating(RatingRequest req, User user) throws ProductException {
        Product product = productService.findProductById(req.getProductId());
        Rating rating = new Rating();
        rating.setProduct(product);
        rating.setUser(user);
        rating.setRating(req.getRating());
        rating.setCreatedAt(LocalDateTime.now());
        ratingRepository.save(rating);
        return "Successfully rated " + req.getRating() + " for the product";

    }


    @Override
    public List<Rating> getProductRating(Long productId) {
        return ratingRepository.getProductsRating(productId);
    }
}
