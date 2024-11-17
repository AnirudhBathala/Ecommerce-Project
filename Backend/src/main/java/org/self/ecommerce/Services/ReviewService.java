package org.self.ecommerce.Services;

import org.self.ecommerce.Exceptions.ProductException;
import org.self.ecommerce.Models.Review;
import org.self.ecommerce.Models.User;
import org.self.ecommerce.Request.ReviewRequest;

import java.util.List;

public interface ReviewService {
    public Review createReview(ReviewRequest req , User user) throws ProductException;
    public List<Review> getAllReviewsOfProduct(Long productId) throws ProductException;
}
