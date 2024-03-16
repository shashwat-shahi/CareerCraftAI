package com.edu.neu.careercraftai.services;

import java.util.List;
import java.util.Optional;

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
	public UserEntity createUser(UserDetails userDetails) {
		UserEntity user = new UserEntity();
        user.setEmailId(userDetails.getEmailId());
        user.setFirstName(userDetails.getFirstName());
        user.setLastName(userDetails.getLastName());
        return userRepository.save(user);
	}

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

	@Override
	public boolean isUserPresent(String email) {
		Optional<UserEntity> user = userRepository.findByEmailId(email);
        return user.isPresent();
	}

    @Override
    public UserEntity getUserByEmail(String email) {
        Optional<UserEntity> user = userRepository.findByEmailId(email);
        if(user.isPresent()){
            return user.get();
        }
        else{
            return null;
        }
    }

	@Override
	public List<UserEntity> getAllUsers() {
		return userRepository.findAll();
	}
    
}
