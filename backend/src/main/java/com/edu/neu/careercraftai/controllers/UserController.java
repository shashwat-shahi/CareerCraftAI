package com.edu.neu.careercraftai.controllers;

import java.io.IOException;
import java.util.Collections;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.edu.neu.careercraftai.entity.UserEntity;
import com.edu.neu.careercraftai.interfaces.FileUploaderService;
import com.edu.neu.careercraftai.interfaces.UserService;
import com.edu.neu.careercraftai.models.UserDetails;

import io.swagger.v3.oas.annotations.media.Schema;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    FileUploaderService fileUploaderService;

    @GetMapping("/login")
    public void loginUser(@AuthenticationPrincipal OAuth2User principal) {
        System.out.println(principal.getName());
    }
    
    @GetMapping("/ping")
    public String ping(){
        return "Pinged successfully.";
    }

    //update user
    @PostMapping(value = "/updateUser/{userId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> updateUser(@PathVariable(name = "userId")String userId, 
                                                UserDetails userDetails, 
                                                @RequestPart(name = "resumeFile") @Schema(type = "string", format = "binary") MultipartFile resumeFile) throws IOException{
        String resumeLink = fileUploaderService.uploadFile(resumeFile);
        userDetails.setResumeLink(resumeLink);
        UserEntity updatedUser = userService.updateUser(Integer.valueOf(userId), userDetails);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("User updated successfully.");
    }


    //get user
    @GetMapping("/getUser/{userId}")
    public ResponseEntity<UserEntity> getUserById(@PathVariable(name = "userId")String userId){
        UserEntity user = userService.getUser(Integer.valueOf(userId));
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(user);
    }


    //delete user
    @PostMapping("/deleteUser/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable(name = "userId")String userId){
        userService.deleteUser(Integer.valueOf(userId));
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("User deleted successfully.");
    }

    // get resume file
    @GetMapping("/getResume")
    public ResponseEntity<ByteArrayResource> downloadResume(@RequestParam(name = "fileName") String fileName){
        byte[] fileContent = fileUploaderService.downloadFile(fileName);
        return ResponseEntity
                .status(HttpStatus.OK)
                .contentLength(fileContent.length)
                .header("Content-type", "application/octet-stream")
                .header("Content-disposition", "attachment; filename=\""+fileName+"\"")
                .body(new ByteArrayResource(fileContent));
    }

}
