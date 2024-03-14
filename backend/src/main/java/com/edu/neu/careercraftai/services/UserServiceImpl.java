package com.edu.neu.careercraftai.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.neu.careercraftai.entity.AspirationEntity;
import com.edu.neu.careercraftai.entity.UserEntity;
import com.edu.neu.careercraftai.interfaces.UserService;
import com.edu.neu.careercraftai.models.UserDetails;
import com.edu.neu.careercraftai.repositories.AspirationRepository;
import com.edu.neu.careercraftai.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    UserRepository userRepository;

    @Autowired
    AspirationRepository aspirationRepository;

    @Override
    public UserEntity updateUser(Integer userId, UserDetails userDetails) {
        UserEntity user = userRepository.findById(userId).get();
        user.setFirstName(userDetails.getFirstName());
        user.setLastName(userDetails.getLastName());
        user.setResumeLink(userDetails.getResumeLink());
        AspirationEntity aspiration = aspirationRepository.findById(userDetails.getAspiration()).get();
        user.setAspiration(aspiration);
        UserEntity updatedUser = userRepository.save(user);
        return updatedUser;
    }

    @Override
    public UserEntity getUser(Integer userId) {
        UserEntity user = userRepository.findById(userId).get();
        return user;
    }

    @Override
    public String deleteUser(Integer userId) {
        userRepository.deleteById(userId);
        return "User deleted successfylly";
    }

}
