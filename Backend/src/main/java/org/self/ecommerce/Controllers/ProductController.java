package org.self.ecommerce.Controllers;

import org.self.ecommerce.Exceptions.ProductException;
import org.self.ecommerce.Models.Product;
import org.self.ecommerce.Services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/all")
    public ResponseEntity<Page<Product>> findByCategory( @RequestParam String category ,
     @RequestParam List<String> color,@RequestParam List<String> size ,@RequestParam int minPrice,
     @RequestParam int maxPrice,@RequestParam int minDiscount , @RequestParam String sort,
     @RequestParam String stock , @RequestParam int pageNumber, @RequestParam int pageSize) throws ProductException
    {

    Page<Product> res = productService.getAllProducts(category,color,size,minPrice,maxPrice,minDiscount,sort,stock,pageNumber,
            pageSize);
        System.out.println("Complete Products");


        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
    }


    @GetMapping("/id/{productId}")
    public ResponseEntity<Product> findById(@PathVariable Long productId) throws ProductException{
        Product product = productService.findProductById(productId);
        return new ResponseEntity<>(product, HttpStatus.ACCEPTED);
    }

//    @GetMapping("/products/search")
//    public ResponseEntity<List<Product>> searchProduct(@RequestParam String q){
//        List<Product> products = productService.searchProduct(q);
//
//        return new ResponseEntity<>(products, HttpStatus.ACCEPTED);
//    }


}
