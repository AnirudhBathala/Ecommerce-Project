package org.self.ecommerce.Request;

import lombok.Data;
import org.springframework.data.jpa.repository.Query;

@Data
public class AddItemCartRequest {
    private Long productId;
    private String size;
    private int quantity;
//    private int price;


}
