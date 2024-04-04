package com.edu.neu.careercraftai.services;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.edu.neu.careercraftai.interfaces.CoursePortalService;
import com.edu.neu.careercraftai.models.CourseOverview;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import jakarta.annotation.PostConstruct;

@Service
public class CoursePortalServiceImpl implements CoursePortalService{

    @Value("${udemy.api.client.id}")
    String udemyApiClientId;

    @Value("${udemy.api.client.secret}")
    String udemyApiClientSecret;

    @Value("${udemy.base.url}")
    String udemyBaseUrl;

    @Value("${udemy.courses.url}")
    String udemyCoursesUrl;

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    Gson gson;

    static String encodedAuthString;

    @Override
    public List<CourseOverview> getCoursesFromKeyword(String keyword) {
        String url = udemyBaseUrl + udemyCoursesUrl + keyword;
        
        // Create headers
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Basic ".concat(encodedAuthString));
        
        // Create request entity with headers
        HttpEntity<String> entity = new HttpEntity<>(headers);
        
        // Send the request
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        
        // Process the response
        List<CourseOverview> courses = new ArrayList<CourseOverview>();
        String responseJson = response.getBody();
        JsonObject jsonObject = gson.fromJson(responseJson, JsonObject.class);
        JsonArray resultsArray = jsonObject.get("results").getAsJsonArray();
        for (JsonElement jsonElement : resultsArray) {
            JsonObject courseObject = jsonElement.getAsJsonObject();
            CourseOverview courseOverview = new CourseOverview();
            courseOverview.setId(courseObject.get("id").getAsLong());
            courseOverview.setTitle(courseObject.get("title").getAsString());
            courseOverview.setUrl("https://www.udemy.com" + courseObject.get("url").getAsString());
            courseOverview.setHeadline(courseObject.get("headline").getAsString()); 
            courseOverview.setImageUrl(courseObject.get("image_240x135").getAsString());
            courses.add(courseOverview);
        }

        return courses;
    }

    @PostConstruct
    private void createAuthToken(){
        String authString = udemyApiClientId + ":" + udemyApiClientSecret;
        encodedAuthString = Base64.getEncoder().encodeToString(authString.getBytes());
    }

}
