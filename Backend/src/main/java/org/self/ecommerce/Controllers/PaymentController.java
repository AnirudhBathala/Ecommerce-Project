package org.self.ecommerce.Controllers;

import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.self.ecommerce.Enums.OrderStatus;
import org.self.ecommerce.Enums.PaymentStatus;
import org.self.ecommerce.Exceptions.OrderException;
import org.self.ecommerce.Models.Order;
import org.self.ecommerce.Repositories.OrderRepository;
import org.self.ecommerce.Response.ApiResponse;
import org.self.ecommerce.Response.PaymentLinkResponse;
import org.self.ecommerce.Services.OrderService;
import org.self.ecommerce.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;


@RestController
@RequestMapping("/api")
public class PaymentController {

    @Value("${razorpay.api.key}")
    private String apiKey;

    @Value("${razorpay.api.secret}")
    private String apiSecret;

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private OrderRepository orderRepository;

    @PostMapping("/payments/{orderId}")
    public ResponseEntity<PaymentLinkResponse> createPayment(@PathVariable Long orderId) throws OrderException, RazorpayException {

        Order order = orderService.findOrderById(orderId);
        try {
            // Instantiate a Razorpay client with your key ID and secret
            RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);

            // Create a JSON object with the payment link request parameters
            JSONObject paymentLinkRequest = new JSONObject();
            paymentLinkRequest.put("amount", order.getTotalDiscountedPrice() * 100);
            paymentLinkRequest.put("currency", "INR");

            JSONObject customer = new JSONObject();
            customer.put("name", order.getUser().getFirstName() + " " + order.getUser().getLastName());
            customer.put("contact", order.getUser().getPhoneNumber());
            customer.put("email", order.getUser().getEmail());
            paymentLinkRequest.put("customer", customer);

            // Create a JSON object with the notification settings
            JSONObject notify = new JSONObject();
            notify.put("sms", true);
            notify.put("email", true);
            paymentLinkRequest.put("notify", notify);

            // Set the reminder settings
            paymentLinkRequest.put("reminder_enable", true);

            // Set the callback URL and method
            paymentLinkRequest.put("callback_url", "http://localhost:3000/payment-success?order_id=" + orderId);
            paymentLinkRequest.put("callback_method", "get");

            // Create the payment link using the paymentLink.create() method
            PaymentLink payment = razorpay.paymentLink.create(paymentLinkRequest);

            String paymentLinkId = payment.get("id");
            String paymentLinkUrl = payment.get("short_url");

            PaymentLinkResponse res = new PaymentLinkResponse(paymentLinkUrl, paymentLinkId);

            PaymentLink fetchedPayment = razorpay.paymentLink.fetch(paymentLinkId);

            order.setOrderId(fetchedPayment.get("order_id"));
            orderRepository.save(order);

            // Print the payment link ID and URL
            System.out.println("Payment link ID: " + paymentLinkId);
            System.out.println("Payment link URL: " + paymentLinkUrl);
            System.out.println("Order Id : " + fetchedPayment.get("order_id") + fetchedPayment);

            return new ResponseEntity<>(res, HttpStatus.ACCEPTED);

        } catch (RazorpayException e) {

            System.out.println("Error creating payment link: " + e.getMessage());
            throw new RazorpayException(e.getMessage());
        }
    }


    @GetMapping("/payments")
    public ResponseEntity<ApiResponse> redirect(@RequestParam(name = "payment_id") String paymentId, @RequestParam("order_id") Long orderId) throws RazorpayException, OrderException {
        RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);
        Order order = orderService.findOrderById(orderId);

        try {


            Payment payment = razorpay.payments.fetch(paymentId);
            System.out.println("payment details --- " + payment + payment.get("status"));

            if (payment.get("status").equals("captured")) {
                System.out.println("payment details --- " + payment + payment.get("status"));

                order.getPaymentDetails().setPaymentId(paymentId);
                order.getPaymentDetails().setPaymentStatus(String.valueOf(PaymentStatus.COMPLETED));
                order.setOrderStatus(String.valueOf(OrderStatus.PLACED));
//			order.setOrderItems(order.getOrderItems());
                System.out.println(order.getPaymentDetails().getPaymentStatus() + "payment status ");
                orderRepository.save(order);
            }
            ApiResponse res = new ApiResponse("your order get placed", true);
            return new ResponseEntity<ApiResponse>(res, HttpStatus.OK);

        } catch (Exception e) {
            System.out.println("errrr payment -------- ");
            new RedirectView("https://shopwithzosh.vercel.app/payment/failed");
            throw new RazorpayException(e.getMessage());
        }
    }
}
