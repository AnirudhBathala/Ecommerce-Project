package org.self.ecommerce.Services;

import org.self.ecommerce.Exceptions.OrderException;
import org.self.ecommerce.Exceptions.UserException;
import org.self.ecommerce.Models.Address;
import org.self.ecommerce.Models.Order;
import org.self.ecommerce.Models.User;

import java.util.List;

public interface OrderService {

    public Order createOrder(User user , Address shippingAddress) throws OrderException, UserException;
    public Order findOrderById(Long Id) throws OrderException;
    public List<Order> userOrderHistory(Long Id) throws OrderException;
    public Order shippedOrder(Long orderId) throws OrderException;
    public Order cancelledOrder(Long orderId) throws OrderException;
    public Order delivereddOrder(Long orderId) throws OrderException ;
    public void deleteOrder(Long orderId) throws OrderException;
    public Order placedOrder (Long orderId)  throws OrderException ;
    public Order confirmedOrder (Long OrderId) throws OrderException;
    public List<Order> getAllOrders() throws OrderException;

}
