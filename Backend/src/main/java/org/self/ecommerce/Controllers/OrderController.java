package org.self.ecommerce.Controllers;


import org.self.ecommerce.Exceptions.OrderException;
import org.self.ecommerce.Exceptions.UserException;
import org.self.ecommerce.Models.Address;
import org.self.ecommerce.Models.Order;
import org.self.ecommerce.Models.User;
import org.self.ecommerce.Services.OrderService;
import org.self.ecommerce.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private  OrderService orderService;

    @Autowired
    private UserService userService;


    @PostMapping("/create")
    public ResponseEntity<Order> createOrder(@RequestBody Address shippingAddress , @RequestHeader("Authorization") String jwt) throws UserException, OrderException {
        User user = userService.findUserByJwt(jwt);

        Order order = orderService.createOrder(user,shippingAddress);
        return new ResponseEntity<>(order,HttpStatus.CREATED);
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<Order> updateOrder(@RequestBody Order order) {
//        Order order1 = orderService.
//        return order;
//    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable("id") Long id , @RequestHeader("Authorization") String jwt) throws UserException, OrderException {
        User user = userService.findUserByJwt(jwt);
        Order order = orderService.findOrderById(id);
        return new ResponseEntity<>(order,HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Order>> getAllOrders(@RequestHeader("Authorization") String jwt ) throws UserException, OrderException {
        User user = userService.findUserByJwt(jwt);
        List<Order> orders = orderService.userOrderHistory(user.getId());
        return new ResponseEntity<>(orders,HttpStatus.OK);
    }
}

