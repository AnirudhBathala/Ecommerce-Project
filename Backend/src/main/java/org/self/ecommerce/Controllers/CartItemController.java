package org.self.ecommerce.Controllers;


import org.self.ecommerce.Models.Cart;
import org.self.ecommerce.Models.CartItem;
import org.self.ecommerce.Models.Product;
import org.self.ecommerce.Models.User;
import org.self.ecommerce.Request.CartItemRequest;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/cartItem")
public class CartItemController {

    @PatchMapping("/update")
    public Cart updateCartItem(User user , Long productId, CartItemRequest cartItemRequest) {
        return new Cart();
    }
}
