package com.edu.neu.careercraftai.interfaces;

import java.util.List;

import com.edu.neu.careercraftai.models.CourseOverview;
import com.edu.neu.careercraftai.models.ResponseModel;
import com.google.gson.JsonObject;

public interface CoursePortalService {
    public ResponseModel getCoursesFromKeyword(String keyword);
}
