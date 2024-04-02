package com.edu.neu.careercraftai.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edu.neu.careercraftai.interfaces.CoursePortalService;
import com.edu.neu.careercraftai.models.CourseOverview;
import com.google.gson.JsonObject;

@RestController
@RequestMapping("/course")
public class CourseController {

    @Autowired
    CoursePortalService coursePortalService;
    
    @GetMapping("/getCoursesFromKeyword/{keyword}")
    public List<CourseOverview> getCourses(@PathVariable(name = "keyword") String keyword){
        return coursePortalService.getCoursesFromKeyword(keyword);
    }
    
}
