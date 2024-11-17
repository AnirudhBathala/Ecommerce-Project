package org.self.ecommerce.Controllers;


import org.self.ecommerce.Exceptions.ProductException;
import org.self.ecommerce.Exceptions.UserException;
import org.self.ecommerce.Models.Rating;
import org.self.ecommerce.Models.User;
import org.self.ecommerce.Request.RatingRequest;
import org.self.ecommerce.Services.RatingService;
import org.self.ecommerce.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rating")
public class RatingController {


    @Autowired
    private RatingService ratingService;

    @Autowired
    private UserService userService;

    @PostMapping("/rate")
    public ResponseEntity<String> rateProduct(@RequestHeader("Authorization")
    String jwt , @RequestBody RatingRequest req) throws UserException, ProductException {
        User user = userService.findUserByJwt(jwt);
        String res = ratingService.createRating(req,user);
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<List<Rating>> getProductRating(@PathVariable("productId") Long id) {

        List<Rating> ratings = ratingService.getProductRating(id);
        return new ResponseEntity<>(ratings, HttpStatus.OK);
    }
}
