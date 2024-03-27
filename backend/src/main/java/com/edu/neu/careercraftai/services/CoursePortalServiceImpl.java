package com.edu.neu.careercraftai.services;

import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.edu.neu.careercraftai.interfaces.CoursePortalService;

import jakarta.annotation.PostConstruct;

@Service
public class CoursePortalServiceImpl implements CoursePortalService{

    @Value("${udemy.api.client.id}")
    String udemyApiClientId;

    @Value("${udemy.api.client.secret}")
    String udemyApiClientSecret;

    @Autowired
    RestTemplate restTemplate;

    static String encodedAuthString;

    @Override
    public void getCoursesFromKeyword(String keyword) {
        String url = "https://udemy.com/api-2.0/courses/?page=1&page_size=10&search=java";
        
        // Create headers
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Basic ".concat(encodedAuthString));
        // Add other headers as needed
        
        // Create request entity with headers
        HttpEntity<String> entity = new HttpEntity<>(headers);
        
        // Send the request
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        
        // Process the response
        System.out.println("Response: " + response.getBody());
    }

    @Override
    public void getCourseDetailsFromCourseId(String courseId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getCourseDetailsFromCourseId'");
    }

    @PostConstruct
    private void createAuthToken(){
        String authString = udemyApiClientId + ":" + udemyApiClientSecret;
        encodedAuthString = Base64.getEncoder().encodeToString(authString.getBytes());
    }

}
