package com.edu.neu.careercraftai.interfaces;

import java.util.List;

import com.edu.neu.careercraftai.models.JobDetails;

public interface JobPortalService {
    List<JobDetails> getJobsFromKeyword(String keyword);
}
