package org.self.ecommerce.Request;

import lombok.Data;
import org.self.ecommerce.Models.Category;

@Data
public class CreateCategoryReq {

    private String name;
    private String parentCategory;
}
