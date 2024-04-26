package com.edu.neu.careercraftai.services;

import java.util.ArrayList;
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
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    public UserRepository userRepository;

    @Autowired
    public AspirationRepository aspirationRepository;

    @Autowired
    public Gson gson;

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

    @Override
    public ResponseModel updateUserSkills(Integer userId, List<String> skillset) {
        try {
            Optional<UserEntity> optionalUser = userRepository.findById(userId);
            if(!optionalUser.isPresent()){
                ResponseModel response = new ResponseModel();
                response.setResponseMessage("User doesn't exist");
                response.setResponseStatus(HttpStatus.NOT_FOUND);
                return response;
            }
            UserEntity user = optionalUser.get();
            user.setSkillset(skillset);
            userRepository.save(user);
            ResponseModel response = new ResponseModel();
            response.setResponseMessage("User skillset updated successfully.");
            response.setResponseStatus(HttpStatus.OK);
            response.setResponseBody(user);
            return response;
            
        } catch (Exception e) {
            ResponseModel response = new ResponseModel();
            response.setResponseMessage("User skillset could not be updated.");
            response.setResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            response.setExceptionMessage(e.getMessage());
            return response;
        }
        
    }

    @Override
    public ResponseModel updateUserSkillGaps(Integer userId, String skillGapJson) {
        try {
            Optional<UserEntity> optionalUser = userRepository.findById(userId);
            if(!optionalUser.isPresent()){
                ResponseModel response = new ResponseModel();
                response.setResponseMessage("User doesn't exist");
                response.setResponseStatus(HttpStatus.NOT_FOUND);
                return response;
            }
            UserEntity user = optionalUser.get();
            skillGapJson = "{'fundamentals': ['Programming Languages', 'Scripting Languages', 'Version Control Systems', 'Cloud Computing', 'Containerization', 'Container Orchestration', 'Data Pipelines', 'Data Housing', 'Pipeline Craft', 'Continuous Integration/Continuous Deployment (CI/CD)', 'Cloud ML', 'Engineering Models', 'Database', 'Looping', 'Monitoring', 'Pioneer'], 'intermediate': ['Database', 'Looping', 'Pioneer', 'Machination', 'Ecosystem', 'Security', 'Fulmination'], 'advanced': ['Machine Learning', 'Data Versioning', 'AutoML', 'Explainability', 'Drift Detection', 'Hyperparameter Optimization', 'A/B Testing', 'Model Serving', 'Feature Store', 'Data Governance']}";
            String s = skillGapJson.replaceAll("\'", "\"");
            System.out.println(skillGapJson);
            JsonObject skillGapJsonObject = gson.fromJson(s, JsonObject.class);
            JsonArray fundamentalGapsJson = skillGapJsonObject.get("fundamentals").getAsJsonArray();
            JsonArray intermediateGapsJson = skillGapJsonObject.get("intermediate").getAsJsonArray();
            JsonArray advancedGapsJson = skillGapJsonObject.get("advanced").getAsJsonArray();
            List<String> fundamentalGaps = new ArrayList<String>();
            for (JsonElement gapJson : fundamentalGapsJson) {
                fundamentalGaps.add(gapJson.getAsString());
            }
            List<String> intermediateGaps = new ArrayList<String>();
            for (JsonElement gapJson : intermediateGapsJson) {
                intermediateGaps.add(gapJson.getAsString());
            }
            List<String> advancedGaps = new ArrayList<String>();
            for (JsonElement gapJson : advancedGapsJson) {
                advancedGaps.add(gapJson.getAsString());
            }
            user.setFundamentalsGap(fundamentalGaps);
            user.setIntermediateGap(intermediateGaps);
            user.setAdvancedGap(advancedGaps);
            userRepository.save(user);
            ResponseModel response = new ResponseModel();
            response.setResponseMessage("User skillset updated successfully.");
            response.setResponseStatus(HttpStatus.OK);
            response.setResponseBody(user);
            return response;
            
        } catch (Exception e) {
            ResponseModel response = new ResponseModel();
            response.setResponseMessage("User skillset could not be updated.");
            response.setResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            response.setExceptionMessage(e.getMessage());
            return response;
        }
    }
    
}
