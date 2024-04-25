package com.edu.neu.careercraftai.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edu.neu.careercraftai.interfaces.CoursePortalService;
import com.edu.neu.careercraftai.models.ResponseModel;

@RestController
@RequestMapping("/course")
public class CourseController {

    @Autowired
    CoursePortalService coursePortalService;
    
    @GetMapping("/getCoursesFromKeyword/{keyword}")
    public ResponseEntity<ResponseModel> getCourses(@PathVariable(name = "keyword") String keyword){
        ResponseModel response = coursePortalService.getCoursesFromKeyword(keyword);
        return ResponseEntity.ok().body(response);
    }
    
}
