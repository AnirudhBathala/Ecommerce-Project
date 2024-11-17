package org.self.ecommerce.Services;

import org.self.ecommerce.Exceptions.CartItemException;
import org.self.ecommerce.Exceptions.ProductException;
import org.self.ecommerce.Exceptions.UserException;
import org.self.ecommerce.Models.Cart;
import org.self.ecommerce.Models.CartItem;
import org.self.ecommerce.Models.Product;
import org.self.ecommerce.Models.User;
import org.self.ecommerce.Repositories.CartItemRepository;
import org.self.ecommerce.Repositories.CartRepository;
import org.self.ecommerce.Repositories.UserRepository;
import org.self.ecommerce.Request.AddItemCartRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CartItemRepository cartItemRepository;

    @Override
    public Cart createCart(User user) {
        User foundUser = userRepository.findByEmail(user.getEmail());
        Cart cart = new Cart();
        cart.setUser(foundUser);
        return cartRepository.save(cart);
    }

    @Override
    public String addCartItem(Long userId, AddItemCartRequest req) throws ProductException, CartItemException, UserException {
        Cart cart = cartRepository.findByUserId(userId);
        Product product = productService.findProductById(req.getProductId());
        CartItem isPresent = cartItemService.isCartItemExist(cart,product, req.getSize(), userId);

        if(isPresent == null) {
            CartItem cartItem = new CartItem();
            cartItem.setProduct(product);
            cartItem.setCart(cart);
            if(req.getQuantity() == 0){
                cartItem.setQuantity(1);
            }
            else{
                cartItem.setQuantity(req.getQuantity());
            }
            cartItem.setUserId(userId);
            cartItem.setSize(req.getSize());
            System.out.println("Quantity: " + req.getQuantity());
            int price = req.getQuantity()*product.getDiscountedPrice();
            System.out.println(price);
            cartItem.setPrice(price);


            CartItem createdCartItem = cartItemService.createCartItem(cartItem);

            cart.getCartItems().add(createdCartItem);
            cartRepository.save(cart);

        }
        return "CartItem created";
    }


    @Override
    public Cart findUserCart(Long userId) throws UserException {

        Cart cart = cartRepository.findByUserId(userId);

        if (cart == null) {
            Cart createdCart = new Cart();
            User user = userService.findUserById(userId);
            createdCart.setUser(user);
            return cartRepository.save(createdCart);
        }

        double totalPrice = (double) 0;
        int totalDiscountPrice = 0;
        int discountPrice = 0;
        int totalItems = 0;

        for (CartItem cartItem : cart.getCartItems()) {
            System.out.println(cartItem.getPrice());
            totalPrice += cartItem.getPrice();
            totalDiscountPrice += cartItem.getDiscountedPrice();
            discountPrice += (cartItem.getPrice()-cartItem.getDiscountedPrice());
            totalItems += cartItem.getQuantity();
        }
        cart.setTotalPrice(totalPrice);
        cart.setTotalItems(totalItems);
        cart.setTotalDiscountedPrice(totalDiscountPrice);
        cart.setDiscount(discountPrice);
//        cart.setTotalDiscountedPrice(totalDiscountPrice);

        return cartRepository.save(cart);
    }
}
