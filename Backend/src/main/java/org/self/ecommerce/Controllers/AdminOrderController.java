package org.self.ecommerce.Controllers;


import org.self.ecommerce.Exceptions.OrderException;
import org.self.ecommerce.Models.Order;
import org.self.ecommerce.Services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/order")
public class AdminOrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/")
    public ResponseEntity<List<Order>> getAllOrders() throws OrderException {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }


    @PutMapping("/{orderId}/confirmed")
    public ResponseEntity<Order> confirmOrder(@PathVariable Long orderId) throws OrderException {
        Order order = orderService.confirmedOrder(orderId);
        return ResponseEntity.ok(order);
    }

    @PutMapping("/{orderId}/shipped")
    public ResponseEntity<Order> shipOrder(@PathVariable Long orderId) throws OrderException {
        Order order = orderService.shippedOrder(orderId);
        return ResponseEntity.ok(order);
    }

    @PutMapping("/{orderId}/delivered")
    public ResponseEntity<Order> deliverOrder(@PathVariable Long orderId) throws OrderException {
        Order order = orderService.delivereddOrder(orderId);
        return ResponseEntity.ok(order);
    }

    @DeleteMapping("{orderId}/delete")
    public ResponseEntity<String> deleteOrder(@PathVariable Long orderId) throws OrderException {
        orderService.deleteOrder(orderId);
        return ResponseEntity.ok("Order deleted successfully");
    }

}
