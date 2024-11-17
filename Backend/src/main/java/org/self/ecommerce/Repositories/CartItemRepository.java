package org.self.ecommerce.Repositories;

import org.self.ecommerce.Models.Cart;
import org.self.ecommerce.Models.CartItem;
import org.self.ecommerce.Models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem,Long> {
    Set<CartItem> findByCartId(Long cartId);

    @Query("SELECT ci from CartItem ci WHERE ci.cart=:cart AND ci.product=:product AND ci.size=:size AND ci.userId=:userId")
    public CartItem isCartItemExist(@Param("cart") Cart cart, @Param("product") Product product, @Param("size") String size,
                                    @Param("userId") Long userId);
}
