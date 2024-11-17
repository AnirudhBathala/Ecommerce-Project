package org.self.ecommerce.Repositories;

import org.antlr.v4.runtime.atn.SemanticContext;
import org.self.ecommerce.Models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p from Product p" +
            " Where (p.category.name =:category OR :category='')" +
    "AND ( (:minPrice is NULL and :maxPrice is NULL) or p.discountedPrice between :minPrice and :maxPrice)" +
            "AND (:minDiscount is null or p.discountedPrice>=:minDiscount)"+
    "order by "+
    "CASE when :sort = 'price_low' then p.discountedPrice END ASC,"+
    "CASE When :sort = 'price_high' then p.discountedPrice END DESC")
    public List<Product> filterProducts(@Param("category") String category,
                                        @Param("minPrice") int minPrice,
                                        @Param("maxPrice") int maxPrice,
                                        @Param("minDiscount") int minDiscount , @Param("sort") String sort);

    Product findProductById(Long id);
}
