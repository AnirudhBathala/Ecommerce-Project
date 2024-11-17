package org.self.ecommerce.Services;

import org.self.ecommerce.Exceptions.CartItemException;
import org.self.ecommerce.Exceptions.UserException;
import org.self.ecommerce.Models.Cart;
import org.self.ecommerce.Models.CartItem;
import org.self.ecommerce.Models.Product;

public interface CartItemService {
    public CartItem createCartItem(CartItem cartItem);
    public CartItem updateCartItem(Long userId , Long id , CartItem cartItem) throws CartItemException, UserException;
    public CartItem isCartItemExist(Cart cart , Product product , String size , Long userId) throws CartItemException, UserException;
    public void removeCartItem(Long userId , Long cartItemId) throws CartItemException, UserException;
    public CartItem findCartItemById(Long cartItemId) throws CartItemException;
}
