package org.self.ecommerce.Controllers;


import org.self.ecommerce.Exceptions.ProductException;
import org.self.ecommerce.Exceptions.UserException;
import org.self.ecommerce.Models.Review;
import org.self.ecommerce.Models.User;
import org.self.ecommerce.Request.ReviewRequest;
import org.self.ecommerce.Services.ReviewService;
import org.self.ecommerce.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/review")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private UserService userService;

    @GetMapping("/{productId}")
    public ResponseEntity<List<Review>> getProductReviews(@PathVariable Long productId) throws ProductException {
        List<Review> reviews = reviewService.getAllReviewsOfProduct(productId);

        return new ResponseEntity<>(reviews,HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Review> addProductReview(@RequestHeader("Authorization") String jwt, @RequestBody ReviewRequest request) throws UserException, ProductException {
        User user = userService.findUserByJwt(jwt);
        Review res = reviewService.createReview(request,user);
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }
}
