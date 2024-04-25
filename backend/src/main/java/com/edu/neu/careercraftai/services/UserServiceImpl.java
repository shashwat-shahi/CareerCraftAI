package com.edu.neu.careercraftai.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.amazonaws.Response;
import com.edu.neu.careercraftai.entity.AspirationEntity;
import com.edu.neu.careercraftai.entity.UserEntity;
import com.edu.neu.careercraftai.interfaces.UserService;
import com.edu.neu.careercraftai.models.ResponseModel;
import com.edu.neu.careercraftai.models.UserDetails;
import com.edu.neu.careercraftai.repositories.AspirationRepository;
import com.edu.neu.careercraftai.repositories.UserRepository;
import com.google.gson.Gson;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    UserRepository userRepository;

    @Autowired
    AspirationRepository aspirationRepository;

    @Autowired
    Gson gson;

    @Override
	public ResponseModel createUser(UserDetails userDetails) {

        try {
            UserEntity user = new UserEntity();
            user.setEmailId(userDetails.getEmailId());
            user.setFirstName(userDetails.getFirstName());
            user.setLastName(userDetails.getLastName());
            UserEntity newUser = userRepository.save(user);

            ResponseModel response = new ResponseModel();
            response.setResponseStatus(HttpStatus.OK);
            response.setResponseBody(newUser);
            response.setResponseMessage("New user created successfullfy.");
            return response;

        } catch (Exception e) {
            ResponseModel response = new ResponseModel();
            response.setResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            response.setResponseMessage("New user could not be created.");
            response.setExceptionMessage(e.getMessage());
            return response;
        }

		
	}

    @Override
    public ResponseModel updateUser(Integer userId, UserDetails userDetails) {

        try {
            UserEntity user = userRepository.findById(userId).get();
            user.setFirstName(userDetails.getFirstName());
            user.setLastName(userDetails.getLastName());
            user.setResumeLink(userDetails.getResumeLink());
            AspirationEntity aspiration = aspirationRepository.findById(userDetails.getAspiration()).get();
            user.setAspiration(aspiration);
            UserEntity updatedUser = userRepository.save(user);

            ResponseModel response = new ResponseModel();
            response.setResponseStatus(HttpStatus.OK);
            response.setResponseBody(updatedUser);
            response.setResponseMessage("User updated successfullfy.");
            return response;

        } catch (Exception e) {
            ResponseModel response = new ResponseModel();
            response.setResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            response.setResponseMessage("User could not be updated.");
            response.setExceptionMessage(e.getMessage());
            return response;
        }

        
    }

    @Override
    public ResponseModel getUser(Integer userId) {

        try {
            Optional<UserEntity> user = userRepository.findById(userId);

            if(user.isPresent()){
                ResponseModel response = new ResponseModel();
                response.setResponseStatus(HttpStatus.OK);
                response.setResponseBody(gson.toJson(user.get()));
                response.setResponseMessage("User fetched successfullfy.");
                return response;
            }

            ResponseModel response = new ResponseModel();
            response.setResponseStatus(HttpStatus.NOT_FOUND);
            response.setResponseBody(null);
            response.setResponseMessage("User does not exist");
            return response;

        } catch (Exception e) {
            ResponseModel response = new ResponseModel();
            response.setResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            response.setResponseMessage("User could not be fetched.");
            response.setExceptionMessage(e.getMessage());
            return response;
        }
    }

    @Override
    public ResponseModel deleteUser(Integer userId) {

        try {
            userRepository.deleteById(userId);
            ResponseModel response = new ResponseModel();
            response.setResponseStatus(HttpStatus.OK);
            response.setResponseMessage("User deleted successfullfy.");
            return response;

        } catch (Exception e) {
            ResponseModel response = new ResponseModel();
            response.setResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            response.setResponseMessage("User could not be deleted.");
            response.setExceptionMessage(e.getMessage());
            return response;
        }
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
            return null;     
    }

	@Override
	public ResponseModel getAllUsers() {

        try {
            List<UserEntity> users = userRepository.findAll();

            ResponseModel response = new ResponseModel();
            response.setResponseStatus(HttpStatus.OK);
            response.setResponseBody(users);
            response.setResponseMessage("Users fetched successfully.");
            return response;
        } catch (Exception e) {
            ResponseModel response = new ResponseModel();
            response.setResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            response.setResponseMessage("Users could not be fetched.");
            response.setExceptionMessage(e.getMessage());
            return response;
        }
	}
    
}
