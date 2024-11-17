package org.self.ecommerce.Services;

import org.self.ecommerce.Exceptions.CartItemException;
import org.self.ecommerce.Exceptions.UserException;
import org.self.ecommerce.Models.Cart;
import org.self.ecommerce.Models.CartItem;
import org.self.ecommerce.Models.Product;
import org.self.ecommerce.Models.User;
import org.self.ecommerce.Repositories.CartItemRepository;
import org.self.ecommerce.Repositories.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartItemServiceImpl implements CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CartRepository cartRepository;

    @Override
    public CartItem createCartItem(CartItem cartItem) {
        cartItem.setQuantity(cartItem.getQuantity());
        cartItem.setPrice(cartItem.getProduct().getPrice()*cartItem.getQuantity());
        cartItem.setDiscountedPrice(cartItem.getProduct().getDiscountedPrice()*cartItem.getQuantity());

        return cartItemRepository.save(cartItem);
    }

    @Override
    public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws CartItemException, UserException {

        CartItem item = findCartItemById(id);


        User user = userService.findUserById(item.getUserId());
        if(user.getId().equals(id)) {
            item.setQuantity(cartItem.getQuantity());
            item.setPrice(item.getQuantity()* item.getProduct().getPrice());
            item.setDiscountedPrice(item.getProduct().getDiscountedPrice()*item.getQuantity());
        }

        return cartItemRepository.save(item);
    }

    @Override
    public CartItem isCartItemExist(Cart cart, Product product, String size, Long userId) throws CartItemException, UserException {
        CartItem cartItem = cartItemRepository.isCartItemExist(cart,product,size,userId);
        return cartItem;
    }

    @Override
    public void removeCartItem(Long userId, Long cartItemId) throws CartItemException, UserException {
        CartItem cartItem = findCartItemById(cartItemId);
        User user = userService.findUserById(cartItem.getUserId());

        User reqUser = userService.findUserById(userId);

        if(user.getId().equals(reqUser.getId())) {
            cartItemRepository.deleteById(cartItemId);
        }
        else {
            throw new UserException("The user doesn't have permission to delete this cart item");
        }
    }

    @Override
    public CartItem findCartItemById(Long cartItemId) throws CartItemException {
        Optional<CartItem> cartItem = cartItemRepository.findById(cartItemId);
        if(cartItem.isPresent()) {
            return cartItem.get();
        }
        throw  new CartItemException("The cart item with " +cartItemId +" doesn't exist");
    }
}
