package com.edu.neu.careercraftai.controllers;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.edu.neu.careercraftai.entity.UserEntity;
import com.edu.neu.careercraftai.interfaces.FileUploaderService;
import com.edu.neu.careercraftai.interfaces.UserService;
import com.edu.neu.careercraftai.models.ResponseModel;
import com.edu.neu.careercraftai.models.UserDetails;
import com.google.gson.Gson;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    FileUploaderService fileUploaderService;

    @Value("${redirect.link.users.new}")
    String linkForNewUsers;

    @Value("${redirect.link.users.existing}")
    String linkForExistingUsers;

    @Autowired
    Gson gson;


    @GetMapping("/createUser")
    public ResponseEntity<String> createUser(Authentication authentication, HttpServletResponse response) throws ParseException, IOException {
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();
             if (principal instanceof OAuth2User) {
                OAuth2User oauth2User = (OAuth2User) principal;
                String email = oauth2User.getAttribute("email");
                UserEntity user = userService.getUserByEmail(email);
                if (user == null){
                    String firstName = oauth2User.getAttribute("given_name");
                    String lastName = oauth2User.getAttribute("family_name");

                    UserDetails newUser = new UserDetails();
                    newUser.setEmailId(email);
                    newUser.setFirstName(firstName);
                    newUser.setLastName(lastName);

                    ResponseModel serviceResponse = userService.createUser(newUser);

                    if(serviceResponse.getResponseStatus() == HttpStatus.OK){
                        UserEntity userCreated = gson.fromJson(serviceResponse.getResponseBody().toString(), UserEntity.class);
                        response.sendRedirect(linkForNewUsers+"?userId="+userCreated.getId());
                    }
                    else if(serviceResponse.getResponseStatus() == HttpStatus.INTERNAL_SERVER_ERROR){
                        return ResponseEntity.internalServerError().body(serviceResponse.getResponseMessage());
                    }
                    
                    
                }
                else {
                    response.sendRedirect(linkForExistingUsers+"?userId="+user.getId());
                }
                
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ID token not found.");
    }
    
    @GetMapping("/ping")
    public String ping(){
        return "Ping Success";
    }

    //update user
    @PostMapping(value = "/updateUser/{userId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResponseModel> updateUser(@PathVariable(name = "userId")Integer userId,
                                             @RequestParam(name = "aspiration")Integer aspiration,
                                             @RequestPart(name = "resumeFile") @Schema(type = "string", format = "binary") MultipartFile resumeFile
                                             ) throws IOException{

        ResponseModel getServiceResponse = userService.getUser(userId);
        if (getServiceResponse.getResponseStatus() == HttpStatus.NOT_FOUND){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(getServiceResponse);
        }
        else if (getServiceResponse.getResponseStatus() == HttpStatus.INTERNAL_SERVER_ERROR){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(getServiceResponse);
        }
        UserEntity userEntity = gson.fromJson(getServiceResponse.getResponseBody().toString(), UserEntity.class);                                          
        UserDetails userDetails = new UserDetails();
        userDetails.setLastName(userEntity.getLastName());
        userDetails.setEmailId(userEntity.getEmailId());
        userDetails.setFirstName(userEntity.getFirstName());
        userDetails.setAspiration(aspiration);
        ResponseModel uploadResumeResponse = fileUploaderService.uploadFile(resumeFile);
        if (uploadResumeResponse.getResponseStatus() == HttpStatus.INTERNAL_SERVER_ERROR){
            return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(uploadResumeResponse);
        }
        String resumeLink = uploadResumeResponse.getResponseBody().toString();
        userDetails.setResumeLink(resumeLink);
        ResponseModel updateServiceResponse = userService.updateUser(Integer.valueOf(userId), userDetails);

        if (updateServiceResponse.getResponseStatus() == HttpStatus.INTERNAL_SERVER_ERROR){
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(updateServiceResponse);
        }

        return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(updateServiceResponse);
        
    }

    //update user skillset
    @PostMapping(value = "/updateUserSkillset/{userId}")
    public ResponseEntity<ResponseModel> updateUserSkillset(@PathVariable(name = "userId")Integer userId, @RequestBody List<String> skills){
        ResponseModel serviceResponse = userService.updateUserSkills(userId, skills);
        return ResponseEntity.status(serviceResponse.getResponseStatus().value()).body(serviceResponse);
    }

    //update user skill gaps
    @PostMapping(value = "/updateUserSkillGaps/{userId}")
    public ResponseEntity<ResponseModel> updateUserSkillset(@PathVariable(name = "userId")Integer userId, @RequestBody String skillGapJson){
        ResponseModel serviceResponse = userService.updateUserSkillGaps(userId, skillGapJson);
        return ResponseEntity.status(serviceResponse.getResponseStatus().value()).body(serviceResponse);
    }

    //get user
    @GetMapping("/getUser/{userId}")
    public ResponseEntity<ResponseModel> getUserById(@PathVariable(name = "userId")String userId){
        ResponseModel serviceResponse = userService.getUser(Integer.valueOf(userId));
        if (serviceResponse.getResponseStatus() == HttpStatus.INTERNAL_SERVER_ERROR){
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(serviceResponse);
        }
        else if (serviceResponse.getResponseStatus() == HttpStatus.NOT_FOUND){
            return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(serviceResponse);
        }
        UserEntity userEntity = gson.fromJson(serviceResponse.getResponseBody().toString(), UserEntity.class);
        serviceResponse.setResponseBody(userEntity);
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(serviceResponse);
    }


    //delete user
    @PostMapping("/deleteUser/{userId}")
    public ResponseEntity<ResponseModel> deleteUser(@PathVariable(name = "userId")String userId){
        ResponseModel deleteUserResponse = userService.deleteUser(Integer.valueOf(userId));
        if (deleteUserResponse.getResponseStatus() == HttpStatus.OK){
            return ResponseEntity
                .status(HttpStatus.OK)
                .body(deleteUserResponse);
        }
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(deleteUserResponse);
    }

    // get resume file
    @GetMapping("/getResume")
    public <T> ResponseEntity<T> downloadResume(@RequestParam(name = "fileName") String fileName){
        ResponseModel serviceResponse = fileUploaderService.downloadFile(fileName);
        if (serviceResponse.getResponseStatus() == HttpStatus.OK){
            byte[] fileContent = serviceResponse.getResponseBody().toString().getBytes(StandardCharsets.UTF_8);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    // .contentLength(fileContent.length)
                    .header("Content-type", "application/octet-stream")
                    .header("Content-disposition", "attachment; filename=\""+fileName+"\"")
                    .body((T)new ByteArrayResource(fileContent));
        }
        else{
            return ResponseEntity.internalServerError().body((T)serviceResponse);
        }
    }

    // get all users
    @GetMapping("/getAllUsers")
    public ResponseEntity<ResponseModel> getAllUsers(){
        ResponseModel serviceResponse = userService.getAllUsers();
        if (serviceResponse.getResponseStatus() == HttpStatus.OK){
            return ResponseEntity
                .status(HttpStatus.OK)
                .body(serviceResponse);
        }
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(serviceResponse);
    }

}
