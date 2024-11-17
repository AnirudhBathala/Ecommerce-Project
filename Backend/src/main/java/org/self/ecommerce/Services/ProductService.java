package org.self.ecommerce.Services;

import org.self.ecommerce.Exceptions.ProductException;
import org.self.ecommerce.Models.Product;
import org.self.ecommerce.Request.CreateProductRequest;

import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {
    public Product createProduct(CreateProductRequest request) throws ProductException;
    public String deleteProduct(Long id) throws ProductException;
    public Product updateProduct(Long productId , Product product) throws ProductException;
    public Product findProductById(Long id) throws ProductException;
    public List<Product> findProductByCategory(String category) throws ProductException;
    public Page<Product> getAllProducts(String category , List<String> colors , List<String> sizes, int minPrice , int maxPrice, int minDiscount , String sort , String stock , int pageNumber,int pagesize) throws ProductException;

    public List<Product> findAllProducts();
}
