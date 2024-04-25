package com.edu.neu.careercraftai.services;

import java.util.ArrayList;
import java.util.List;

import com.edu.neu.careercraftai.interfaces.JobPortalService;
import com.edu.neu.careercraftai.models.JobDetails;
import com.edu.neu.careercraftai.models.ResponseModel;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class JobPortalServiceImpl implements JobPortalService {

    @Value("${rapid.base.url}")
    String rapidBaseUrl;

    @Value("${rapid.jobs.url}")
    String rapidJobsUrl;

    @Value("${rapid.x.rapidapi.key}")
    String xRapidApiKey;

    @Value("${rapid.x.rapidapi.host}")
    String xRapidApiHost;

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    Gson gson;

    @Override
    public ResponseModel getJobsFromKeyword(String keyword) {

        try {
            String url = rapidBaseUrl + rapidJobsUrl + keyword;

            HttpHeaders headers = new HttpHeaders();
            headers.set("X-RapidAPI-Key", xRapidApiKey);
            headers.set("X-RapidAPI-Host", xRapidApiHost);

            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<String> apiResponse = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            List<JobDetails> jobDetailsList = new ArrayList<>();
            String responseJson = apiResponse.getBody();
            JsonObject jsonObject = gson.fromJson(responseJson, JsonObject.class);
            JsonArray resultsArray = jsonObject.get("data").getAsJsonArray();
            for(JsonElement jsonElement: resultsArray) {
                JsonObject jobObject = jsonElement.getAsJsonObject();
                JobDetails jobDetails = new JobDetails();
                jobDetails.setId(jobObject.get("id").getAsLong());
                jobDetails.setCompanyName(jobObject.getAsJsonObject("company").get("name").getAsString());
                jobDetails.setPosition(jobObject.get("title").getAsString());
                jobDetails.setApplyLink(jobObject.get("url").getAsString());
                jobDetails.setLocation(jobObject.get("location").getAsString());
                String logoLink = jobObject.getAsJsonObject("company").get("logo") != null ? jobObject.getAsJsonObject("company").get("logo").getAsString() : "No Image";
                // jobDetails.setLogo(jobObject.getAsJsonObject("company").get("logo").getAsString());
                jobDetails.setLogo(logoLink);
                jobDetailsList.add(jobDetails);
            }

            ResponseModel response = new ResponseModel();
            response.setResponseStatus(HttpStatus.OK);
            response.setResponseBody(jobDetailsList);
            response.setResponseMessage("Jobs fetched successfully.");
            return response;

        } catch (Exception e) {
            ResponseModel response = new ResponseModel();
            response.setResponseStatus(HttpStatus.OK);
            response.setResponseMessage("Jobs could not be fetched.");
            response.setExceptionMessage(e.getMessage());
            return response;
        }
    }

}
