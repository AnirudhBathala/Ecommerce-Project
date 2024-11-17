package org.self.ecommerce.Repositories;

import org.self.ecommerce.Models.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("select o from Order o where o.user.id=:userId AND " +
            "(o.orderStatus = 'PLACED' OR o.orderStatus = 'CONFIRMED' OR o.orderStatus = 'SHIPPED' " +
            "OR o.orderStatus = 'DELIVERED' " +
            "OR o.orderStatus = 'PENDING')")
    public List<Order> getUserOrders(@Param("userId") Long userId);
}
