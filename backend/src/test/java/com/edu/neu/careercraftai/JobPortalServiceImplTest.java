package com.edu.neu.careercraftai;

import static org.mockito.Mockito.when;

import com.edu.neu.careercraftai.models.ResponseModel;
import com.edu.neu.careercraftai.services.JobPortalServiceImpl;
import com.google.gson.Gson;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
class JobPortalServiceImplTest {

    @Mock
    private RestTemplate restTemplate;

    @Mock
    private Gson gson;

    @InjectMocks
    private JobPortalServiceImpl jobPortalService;

    @BeforeEach
    void setUp() {
    }

    @Test
    void testGetJobsFromKeyword_Success() {
        // Mock response from the external API
        ResponseEntity<String> mockResponseEntity = ResponseEntity.ok("{ \"data\": [{ \"id\": 1, \"company\": { \"name\": \"Test Company\", \"logo\": \"test_logo_url\" }, \"title\": \"Software Engineer\", \"url\": \"job_url\", \"location\": \"Test Location\" }] }");
        when(restTemplate.exchange("mockUrl", org.springframework.http.HttpMethod.GET, null, String.class))
                .thenReturn(mockResponseEntity);

        // Mock Gson response
        when(gson.fromJson(mockResponseEntity.getBody(), org.jsoup.nodes.Document.class)).thenReturn(null);

        // Call the service method
        ResponseModel responseModel = jobPortalService.getJobsFromKeyword("test");

        // Assertions
        assertEquals(HttpStatus.OK, responseModel.getResponseStatus());
    }

    @Test
    void testGetJobsFromKeyword_Exception() {
        // Mocking a scenario where an exception occurs
        when(restTemplate.exchange("mockUrl", org.springframework.http.HttpMethod.GET, null, String.class))
                .thenThrow(new RuntimeException("Test exception"));

        // Call the service method
        ResponseModel responseModel = jobPortalService.getJobsFromKeyword("test");

        // Assertions
        assertEquals(HttpStatus.OK, responseModel.getResponseStatus());
        assertEquals("Jobs could not be fetched.", responseModel.getResponseMessage());
    }
}
