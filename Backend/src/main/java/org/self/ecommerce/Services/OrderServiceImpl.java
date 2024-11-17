package org.self.ecommerce.Services;

import org.self.ecommerce.Exceptions.OrderException;
import org.self.ecommerce.Exceptions.UserException;
import org.self.ecommerce.Models.*;
import org.self.ecommerce.Repositories.AddressRepository;
import org.self.ecommerce.Repositories.OrderItemRepository;
import org.self.ecommerce.Repositories.OrderRepository;
import org.self.ecommerce.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {


    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartService cartService;
    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private OrderRepository orderRepository;


    @Override
    public Order createOrder(User user, Address shippingAddress) throws OrderException, UserException {
        shippingAddress.setUser(user);
        Address address = addressRepository.save(shippingAddress);
        user.getAddress().add(address);
        userRepository.save(user);

        Cart cart = cartService.findUserCart(user.getId());

        List<OrderItem> orderItems = new ArrayList<>();

        for(CartItem cartItem : cart.getCartItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getPrice());
            orderItem.setSize(cartItem.getSize());
            orderItem.setUserId(cartItem.getUserId());
            orderItem.setDiscountedPrice(cartItem.getDiscountedPrice());

            OrderItem createdOrderItem = orderItemRepository.save(orderItem);

            orderItems.add(createdOrderItem);

        }

        Order order = new Order();
        order.setUser(user);
        order.setOrderItems(orderItems);
        order.setOrderStatus("PENDING");
        order.setOrderDate(LocalDateTime.now());
        order.setDeliveryAddress(shippingAddress);
        order.setTotalPrice(cart.getTotalPrice());
        order.setDiscount(cart.getDiscount());
        order.setTotalDiscountedPrice(cart.getTotalDiscountedPrice());
        order.setTotalItems(cart.getTotalItems());
        order.setCreateDate(LocalDateTime.now());

        Order savedOrder =  orderRepository.save(order);

        for(OrderItem orderItem : orderItems) {
            orderItem.setOrder(savedOrder);
            orderItemRepository.save(orderItem);
        }
        return savedOrder;

    }

    @Override
    public Order findOrderById(Long Id) throws OrderException {
        Optional<Order> order = orderRepository.findById(Id);
        if(order.isPresent()) {
            return order.get();
        }
        throw  new OrderException("Order not found");
    }

    @Override
    public List<Order> userOrderHistory(Long Id) throws OrderException {
        List<Order> orders = orderRepository.getUserOrders(Id);
        return orders;

    }

    @Override
    public Order shippedOrder(Long orderId) throws OrderException {
        Order order = findOrderById(orderId);
        order.setOrderStatus("SHIPPED");
        return orderRepository.save(order);
    }

    @Override
    public Order cancelledOrder(Long orderId) throws OrderException {
        Order order = findOrderById(orderId);
        order.setOrderStatus("CANCELLED");
        return orderRepository.save(order);
    }

    @Override
    public Order delivereddOrder(Long orderId) throws OrderException {
        Order order = findOrderById(orderId);
        order.setOrderStatus("DELIVERED");
        return orderRepository.save(order);
    }

    @Override
    public void deleteOrder(Long orderId) throws OrderException {
        Order order = findOrderById(orderId);
        orderRepository.delete(order);
    }

    @Override
    public Order placedOrder(Long orderId) throws OrderException {
        Order order = findOrderById(orderId);
        order.setOrderStatus("PLACED");
        order.getPaymentDetails().setPaymentStatus("COMPLETED");
        return order;

    }

    @Override
    public Order confirmedOrder(Long OrderId) throws OrderException {
        Order order = findOrderById(OrderId);
        order.setOrderStatus("CONFIRMED");
        return orderRepository.save(order);
    }

    @Override
    public List<Order> getAllOrders() throws OrderException {
        return orderRepository.findAll();
    }
}
