package org.self.ecommerce.Controllers;


import org.self.ecommerce.Exceptions.UserException;
import org.self.ecommerce.Models.User;
import org.self.ecommerce.Repositories.UserRepository;
import org.self.ecommerce.Request.LoginRequest;
import org.self.ecommerce.Response.AuthResponse;
import org.self.ecommerce.Services.CustomerServiceDetails;
import org.self.ecommerce.Services.UserService;
import org.self.ecommerce.configuration.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private CustomerServiceDetails customerServiceDetails;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws UserException {

        String email = user.getEmail();
        String password = user.getPassword();
        String firstName = user.getFirstName();
        String lastName = user.getLastName();

        User isEmailexist = userRepository.findByEmail(email);
        if (isEmailexist != null) {
            throw new UserException("Email already exists");
        }
        User createdUser = new User();
        createdUser.setEmail(email);
        createdUser.setPassword(passwordEncoder.encode(password));
        createdUser.setFirstName(firstName);
        createdUser.setLastName(lastName);
        User savedUser = userRepository.save(createdUser);
        Authentication auth = new UsernamePasswordAuthenticationToken(savedUser.getEmail(), savedUser.getPassword());

        SecurityContextHolder.getContext().setAuthentication(auth);
        String token = jwtProvider.generateToken(auth);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Successfully signed up");

        return ResponseEntity.ok(authResponse);

    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginHandler(@RequestBody LoginRequest loginRequest) throws UserException {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        User finduser = userRepository.findByEmail(email);

        Authentication auth = authenticate(loginRequest.getEmail(), password);

        SecurityContextHolder.getContext().setAuthentication(auth);
        String token = jwtProvider.generateToken(auth);
        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Successfully logged in");
        System.out.println(authResponse);
        return ResponseEntity.ok(authResponse);

    }

    private Authentication authenticate(String email, String password) {

         UserDetails userDetails = customerServiceDetails.loadUserByUsername(email);

         if(userDetails == null) {
             throw new BadCredentialsException("Invalid email or password");
         }

         if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid password");
         }

         return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
