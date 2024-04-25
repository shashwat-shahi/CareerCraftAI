package com.edu.neu.careercraftai.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.edu.neu.careercraftai.interfaces.JobPortalService;
import com.edu.neu.careercraftai.models.ResponseModel;

@RestController
public class JobController {

    @Autowired
    JobPortalService jobPortalService;

    @GetMapping("/getJobsFromKeywords/{keyword}")
    public ResponseEntity<ResponseModel> getJobs(@PathVariable(name = "keyword") String keyword){
        ResponseModel response = jobPortalService.getJobsFromKeyword(keyword);
        return ResponseEntity.ok().body(response);
    }
}
