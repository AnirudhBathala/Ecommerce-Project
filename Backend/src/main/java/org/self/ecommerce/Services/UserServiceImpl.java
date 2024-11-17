package org.self.ecommerce.Services;


import org.self.ecommerce.Exceptions.UserException;
import org.self.ecommerce.Models.User;
import org.self.ecommerce.Repositories.UserRepository;
import org.self.ecommerce.configuration.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private  UserRepository userRepository;
    @Autowired
    private JwtProvider jwtProvider;

    @Override
    public User findUserById(Long id) throws UserException {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return user.get();
        }
        throw new UserException("User not found with id: " + id);
    }

    @Override
    public User findUserByJwt(String jwt) throws UserException {

        String email = jwtProvider.getEmailFromtoken(jwt);

        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UserException("User not found with email: " + email);
        }
        return user;
    }

    @Override
    public boolean findIfUserIsAdmin(String jwt) throws UserException {
        String email = jwtProvider.getEmailFromtoken(jwt);

        User user = userRepository.findByEmail(email);
        return Objects.equals(user.getRole(), "Admin");
    }
}
