package com.edu.neu.careercraftai.interfaces;

import java.util.List;

import com.edu.neu.careercraftai.entity.UserEntity;
import com.edu.neu.careercraftai.models.ResponseModel;
import com.edu.neu.careercraftai.models.UserDetails;

public interface UserService {
    public ResponseModel createUser(UserDetails userDetails);
    public ResponseModel updateUser(Integer userId, UserDetails userDetails);
    public ResponseModel getUser(Integer userId);
    public ResponseModel deleteUser(Integer userId);
    public boolean isUserPresent(String email);
    public UserEntity getUserByEmail(String email);
    public ResponseModel getAllUsers();
    public ResponseModel updateUserSkills(Integer userId, List<String> skillset);
    public ResponseModel updateUserSkillGaps(Integer userId, String skillGapJson);
}
