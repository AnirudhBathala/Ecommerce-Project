package org.self.ecommerce.Models;


import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import lombok.Data;

@Data
@Embeddable
public class PaymentInformation {

    @Column(name = "card_name")
    private String cardNumber;
    private String expiryDate;
    private String cvv;

    @Column(name = "cardholder_name")
    private String cardholderName;

}
