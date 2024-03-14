package com.edu.neu.careercraftai.interfaces;

import com.edu.neu.careercraftai.entity.UserEntity;
import com.edu.neu.careercraftai.models.UserDetails;

public interface UserService {
    public UserEntity updateUser(Integer userId, UserDetails userDetails);
    public UserEntity getUser(Integer userId);
    public String deleteUser(Integer userId);
}
