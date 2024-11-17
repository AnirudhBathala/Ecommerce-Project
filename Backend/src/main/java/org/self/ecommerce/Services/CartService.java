package org.self.ecommerce.Services;


import org.self.ecommerce.Exceptions.CartItemException;
import org.self.ecommerce.Exceptions.ProductException;
import org.self.ecommerce.Exceptions.UserException;
import org.self.ecommerce.Models.Cart;
import org.self.ecommerce.Models.User;
import org.self.ecommerce.Request.AddItemCartRequest;

public interface CartService {
    public Cart createCart(User user);
    public String addCartItem(Long userId, AddItemCartRequest req) throws ProductException, CartItemException, UserException;

    public Cart findUserCart(Long userId) throws UserException;
}
