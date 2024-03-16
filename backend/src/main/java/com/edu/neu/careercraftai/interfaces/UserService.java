package com.edu.neu.careercraftai.interfaces;

import java.util.List;

import com.edu.neu.careercraftai.entity.UserEntity;
import com.edu.neu.careercraftai.models.UserDetails;

public interface UserService {
    public UserEntity createUser(UserDetails userDetails);
    public UserEntity updateUser(Integer userId, UserDetails userDetails);
    public UserEntity getUser(Integer userId);
    public String deleteUser(Integer userId);
    public boolean isUserPresent(String email);
    public UserEntity getUserByEmail(String email);
    public List<UserEntity> getAllUsers();
}
