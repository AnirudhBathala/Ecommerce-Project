package org.self.ecommerce.Services;


import lombok.Data;
import org.self.ecommerce.Exceptions.ProductException;
import org.self.ecommerce.Models.Product;
import org.self.ecommerce.Models.Review;
import org.self.ecommerce.Models.User;
import org.self.ecommerce.Repositories.ProductRepository;
import org.self.ecommerce.Repositories.ReviewRepository;
import org.self.ecommerce.Repositories.UserRepository;
import org.self.ecommerce.Request.ReviewRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Data
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private ProductService productService;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Review createReview(ReviewRequest req, User user) throws ProductException {
        Product product = productService.findProductById(req.getProductId());

        Review review = new Review();
        review.setUser(user);
        review.setProduct(product);
        review.setReview(req.getReview());
        review.setCreatedAt(LocalDateTime.now());


        return  reviewRepository.save(review);

    }

    @Override
    public List<Review> getAllReviewsOfProduct(Long productId) throws ProductException {
        return reviewRepository.getAllReviewsOfProduct(productId);
    }
}
