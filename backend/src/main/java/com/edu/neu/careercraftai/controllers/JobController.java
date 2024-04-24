package com.edu.neu.careercraftai.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edu.neu.careercraftai.interfaces.JobPortalService;
import com.edu.neu.careercraftai.models.JobDetails;

@RestController
public class JobController {

    @Autowired
    JobPortalService jobPortalService;

    @GetMapping("/getJobsFromKeywords/{keyword}")
    public List<JobDetails> getJobs(@PathVariable(name = "keyword") String keyword){
        return jobPortalService.getJobsFromKeyword(keyword);
    }
}
