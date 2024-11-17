package org.self.ecommerce.Request;

public class CategoryException extends Exception {
    public CategoryException(String categoryNotFound) {
        super(categoryNotFound);
    }
}
