package org.self.ecommerce.Response;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class PaymentLinkResponse {
    private String paymentLinkId ;
    private String paymentLinkUrl ;

    public PaymentLinkResponse(String paymentLinkId, String paymentLinkUrl) {
        this.paymentLinkId = paymentLinkId;
        this.paymentLinkUrl = paymentLinkUrl;
    }
}
