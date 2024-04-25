package com.edu.neu.careercraftai.interfaces;

import java.util.List;

import com.edu.neu.careercraftai.models.JobDetails;
import com.edu.neu.careercraftai.models.ResponseModel;

public interface JobPortalService {
    ResponseModel getJobsFromKeyword(String keyword);
}
