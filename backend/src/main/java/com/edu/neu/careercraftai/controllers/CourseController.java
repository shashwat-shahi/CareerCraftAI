package com.edu.neu.careercraftai.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edu.neu.careercraftai.interfaces.CoursePortalService;

@RestController
@RequestMapping("/course")
public class CourseController {

    @Autowired
    CoursePortalService coursePortalService;

    @GetMapping("/getCoursesFromKeyword/{keyword}")
    public void getCourses(String keyword){
        coursePortalService.getCoursesFromKeyword(keyword);
    }
}
