package com.edu.neu.careercraftai;

import com.amazonaws.services.s3.AmazonS3;
import com.edu.neu.careercraftai.models.ResponseModel;
import com.edu.neu.careercraftai.services.FileUploaderServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class FileUploaderServiceImplTest {

    @Mock
    private AmazonS3 s3Client;

    @InjectMocks
    private FileUploaderServiceImpl fileUploaderService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void uploadFile_Success() throws IOException {
        // Arrange
        MultipartFile multipartFile = new MockMultipartFile("file", "test.txt", "text/plain", "Test data".getBytes());

        // Act
        ResponseModel response = fileUploaderService.uploadFile(multipartFile);

        // Assert
        assertEquals(HttpStatus.OK, response.getResponseStatus());
        assertEquals("Resume uploaded successfully.", response.getResponseMessage());
    }

    @Test
    void uploadFile_ExceptionThrown_ReturnsErrorResponse() throws IOException {
        // Arrange
        MultipartFile multipartFile = mock(MultipartFile.class);
        when(multipartFile.getBytes()).thenThrow(IOException.class);

        // Act
        ResponseModel response = fileUploaderService.uploadFile(multipartFile);

        // Assert
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getResponseStatus());
        assertEquals("Resume could not be uploaded.", response.getResponseMessage());
    }

    @Test
    void deleteFile_Success() {
        // Arrange
        String fileName = "test.txt";

        // Act
        ResponseModel response = fileUploaderService.deleteFile(fileName);

        // Assert
        assertEquals(HttpStatus.OK, response.getResponseStatus());
        assertEquals("Resume deleted successfully.", response.getResponseMessage());
    }
}