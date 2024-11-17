package org.self.ecommerce.Controllers;


import org.self.ecommerce.Exceptions.PermissionException;
import org.self.ecommerce.Exceptions.ProductException;
import org.self.ecommerce.Exceptions.UserException;
import org.self.ecommerce.Models.Category;
import org.self.ecommerce.Models.Product;
import org.self.ecommerce.Models.User;
import org.self.ecommerce.Repositories.CategoryRepository;
import org.self.ecommerce.Repositories.ProductRepository;
import org.self.ecommerce.Request.CategoryException;
import org.self.ecommerce.Request.CreateCategoryReq;
import org.self.ecommerce.Request.CreateProductRequest;
import org.self.ecommerce.Services.ProductService;
import org.self.ecommerce.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.w3c.dom.html.HTMLTableCaptionElement;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin/products")
public class AdminProductController {

    @Autowired
    private UserService userService;
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryRepository categoryRepository;

    @PostMapping("/create")
    public Product createProduct(@RequestBody CreateProductRequest req , @RequestHeader("Authorization") String jwt) throws UserException, PermissionException, CategoryException, ProductException {

        User user = userService.findUserByJwt(jwt);
        System.out.println(user.getRole());
        if(Objects.equals(user.getRole(), "Admin")){
            return productService.createProduct(req);
        }
        throw new PermissionException("Invalid Permission");

    }

    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.findAllProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);

    }

    @PutMapping("/{id}/update")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id , @RequestBody Product req) throws ProductException {
        Product product = productService.updateProduct(id,req);
        return null;
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) throws ProductException {
        productService.deleteProduct(id);
        return ResponseEntity.ok("Product deleted successfully");
    }

//    @PostMapping("/category/create")
//    public Category addCategory(@RequestBody CreateCategoryReq req, @RequestHeader("Authorization") String jwt) throws UserException, PermissionException {
//        User user = userService.findUserByJwt(jwt);
//
//        if(Objects.equals(user.getRole(), "Admin")){
//            Category category = new Category();
//            category.setName(req.getName());
//            category.setLevel(1);
//
//
//            if(req.getParentCategory() != null){
//                Category parentCategory = categoryRepository.findByName(req.getParentCategory());
//                category.setLevel(parentCategory.getLevel()+1);
//                category.setParent(parentCategory);
//            }
//
//            System.out.println(user.getRole());
//            return categoryRepository.save(category);
//        }
//        throw new PermissionException("You dont have Permission");


//    }

}
