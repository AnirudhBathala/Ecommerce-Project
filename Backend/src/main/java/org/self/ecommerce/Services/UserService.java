package org.self.ecommerce.Services;


import jdk.jshell.spi.ExecutionControl;
import org.self.ecommerce.Exceptions.UserException;
import org.self.ecommerce.Models.User;



public interface UserService {

    public User findUserById (Long id) throws UserException;
    public User findUserByJwt(String jwt) throws UserException;
    public boolean findIfUserIsAdmin(String jwt) throws UserException;

}
