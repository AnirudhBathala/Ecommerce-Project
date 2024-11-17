package org.self.ecommerce.Controllers;


import org.self.ecommerce.Exceptions.CartItemException;
import org.self.ecommerce.Exceptions.ProductException;
import org.self.ecommerce.Exceptions.UserException;
import org.self.ecommerce.Models.Cart;
import org.self.ecommerce.Models.User;
import org.self.ecommerce.Request.AddItemCartRequest;
import org.self.ecommerce.Services.CartItemService;
import org.self.ecommerce.Services.CartService;
import org.self.ecommerce.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    @Autowired
    private CartItemService cartItemService;

    @PostMapping("/create")
    public Cart createCart(@RequestBody User user) {
        return cartService.createCart(user);
    }

    @GetMapping("/")
    public ResponseEntity<Cart> getCart(@RequestHeader("Authorization")  String jwt) throws UserException {
        User user = userService.findUserByJwt(jwt);
        Cart cart = cartService.findUserCart(user.getId());
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/remove/cartItem/{id}")
    public ResponseEntity<String> removeCart(@RequestHeader("Authorization") String jwt , @PathVariable Long id ) throws UserException, CartItemException {
        User user = userService.findUserByJwt(jwt);
        cartItemService.removeCartItem(user.getId(),id);
        return new ResponseEntity<>("Cart Item Deleted Successfully", HttpStatus.OK);
    }

    @PostMapping("/addItem")
    public ResponseEntity<String> addItem(@RequestHeader("Authorization")  String jwt, @RequestBody AddItemCartRequest req) throws UserException, CartItemException, ProductException {
        User user = userService.findUserByJwt(jwt);
        cartService.addCartItem(user.getId(),req);
        return ResponseEntity.ok("Item added to cart successfully");
    }
}
