package com.edu.neu.careercraftai.interfaces;

import java.util.List;

import com.edu.neu.careercraftai.models.CourseOverview;
import com.google.gson.JsonObject;

public interface CoursePortalService {
    public List<CourseOverview> getCoursesFromKeyword(String keyword);
}
