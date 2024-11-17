package org.self.ecommerce.Services;

import org.self.ecommerce.Exceptions.ProductException;
import org.self.ecommerce.Models.Category;
import org.self.ecommerce.Models.Product;
import org.self.ecommerce.Repositories.CategoryRepository;
import org.self.ecommerce.Repositories.ProductRepository;
import org.self.ecommerce.Request.CreateProductRequest;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static java.util.List.of;

@Service
public class ProductServiceImpl implements ProductService{

    @Autowired
    private  ProductRepository productRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Product createProduct(CreateProductRequest req) throws ProductException {
        Category toplevel = categoryRepository.findByName(req.getTopLevelCategory());

        if(toplevel == null) {
            Category category = new Category();
            category.setName(req.getTopLevelCategory());
            category.setLevel(1);
            toplevel = categoryRepository.save(category);
        }

        Category secondlevel = categoryRepository.findByNameAndParent(req.getSecondLevelCategory() , toplevel.getName());

        if(secondlevel == null) {
            Category slcategory = new Category();
            slcategory.setName(req.getSecondLevelCategory());
            slcategory.setLevel(2);
            slcategory.setParent(toplevel);
            secondlevel = categoryRepository.save(slcategory);
        }

        Category thirdlevel = categoryRepository.findByNameAndParent(req.getThirdLevelCategory(),secondlevel.getName());
        if(thirdlevel == null) {
            Category thcategory = new Category();

            System.out.println(req.getThirdLevelCategory());
            thcategory.setName(req.getThirdLevelCategory());
            thcategory.setLevel(3);
            thcategory.setParent(secondlevel);
            thirdlevel = categoryRepository.save(thcategory);

        }
        Product product = new Product();
        product.setTitle(req.getTitle());
        product.setDescription(req.getDescription());
        product.setPrice(req.getPrice());
        product.setCategory(thirdlevel);
        product.setColor(req.getColor());
        product.setQuantity(req.getQuantity());
        product.setBrand(req.getBrand());
        product.setImageUrl(req.getImageURL());
        product.setDiscountedPrice(req.getDiscountedPrice());
        product.setDiscountPercentage(req.getDiscountPercentage());
        product.setSizes(req.getSize());
        product.setCreatedAt(LocalDateTime.now());

        return productRepository.save(product);
    }

    @Override
    public String deleteProduct(Long id) throws ProductException {
        Product product = findProductById(id);
        product.getSizes().clear();
        productRepository.delete(product);

        return "Product Deleted Successfully";
    }



    @Override
    public Product updateProduct(Long productId, Product req) throws ProductException {
        Product product = findProductById(productId);

        if(req.getQuantity() != 0){
            product.setQuantity(req.getQuantity());
        }
        return productRepository.save(product);
    }

    @Override
    public Product findProductById(Long id) throws ProductException {
        Optional<Product> product = productRepository.findById(id);

        if(product.isPresent()){
            return product.get();
        }
        throw new ProductException("Product Not Found");

    }


    @Override
    public List<Product> findProductByCategory(String category) throws ProductException {
        return of();
    }

    @Override
    public Page<Product> getAllProducts(String category, List<String> colors, List<String> sizes, int minPrice, int maxPrice, int minDiscount, String sort, String stock, int pageNumber, int pagesize) throws ProductException {
        Pageable pageable = PageRequest.of(pageNumber,pagesize);

        List<Product> products = productRepository.filterProducts(category,minPrice,maxPrice,minDiscount,sort);
        if(!colors.isEmpty()){
            products = products.stream().filter(p->colors.stream().anyMatch(c->c.equalsIgnoreCase(p.getColor()))).collect(Collectors.toList());
        }

        if(stock!=null){
            if(stock.equals("in_stock")){
                products = products.stream().filter(p->p.getQuantity()>0).collect(Collectors.toList());
            }
            else if(stock.equals("out_of_stock")){
                products = products.stream().filter(p->p.getQuantity()<1).collect(Collectors.toList());
            }

        }

        int startIndex = (int) pageable.getOffset();
        int endIndex = Math.min(startIndex + pageable.getPageSize(), products.size());
        List<Product> pageContent = products.subList(startIndex, endIndex);

        Page<Product> productPage = new PageImpl<>(pageContent, pageable, products.size());
        return productPage;
    }

    @Override
    public List<Product> findAllProducts() {
        return productRepository.findAll();
    }
}
