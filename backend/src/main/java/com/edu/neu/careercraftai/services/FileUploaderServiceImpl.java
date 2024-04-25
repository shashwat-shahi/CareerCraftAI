package com.edu.neu.careercraftai.services;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import com.edu.neu.careercraftai.interfaces.FileUploaderService;
import com.edu.neu.careercraftai.models.ResponseModel;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class FileUploaderServiceImpl implements FileUploaderService{

    @Value("${application.bucket.name}")
    String bucket;

    @Autowired
    AmazonS3 s3Client;

    @Override
    public ResponseModel uploadFile(MultipartFile file){

        try {
            String fileName = System.currentTimeMillis()+"_"+file.getOriginalFilename();
            File convertedFile = convertMultipartFileToFile(file);
            s3Client.putObject(bucket, fileName, convertedFile);
            // URL fileUrl = s3Client.getUrl(bucket, fileName);
            convertedFile.delete();
            ResponseModel response = new ResponseModel();
            response.setResponseBody(fileName);
            response.setResponseMessage("Resume uploaded successfully.");
            response.setResponseStatus(HttpStatus.OK);
            return response;
        } catch (Exception e) {
            ResponseModel response = new ResponseModel();
            response.setResponseMessage("Resume could not be uploaded.");
            response.setResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            response.setExceptionMessage(e.getMessage());
            return response;
        }
    }

    public ResponseModel downloadFile(String fileName){
        
        try {
            S3Object fileObject = s3Client.getObject(bucket, fileName);
            S3ObjectInputStream fileContent = fileObject.getObjectContent();
            byte[] content = IOUtils.toByteArray(fileContent);
            ResponseModel response = new ResponseModel();
            response.setResponseBody(content);
            response.setResponseMessage("Resume fetched successfully.");
            response.setResponseStatus(HttpStatus.OK);
            return response;
        } catch (Exception e) {
            ResponseModel response = new ResponseModel();
            response.setResponseMessage("Resume could not be fetched.");
            response.setResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            response.setExceptionMessage(e.getMessage());
            return response;
        }

    }

    public ResponseModel deleteFile(String fileName){
        try {
            s3Client.deleteObject(bucket, fileName);
            ResponseModel response = new ResponseModel();
            response.setResponseMessage("Resume deleted successfully.");
            response.setResponseStatus(HttpStatus.OK);
            return response;
        } catch (Exception e) {
            ResponseModel response = new ResponseModel();
            response.setResponseMessage("Resume could not be deleted.");
            response.setResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            response.setExceptionMessage(e.getMessage());
            return response;
        }
        
    }


    private File convertMultipartFileToFile(MultipartFile file){
        File convertedFile = new File(file.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convertedFile)){
            fos.write(file.getBytes());
        } catch (Exception e) {
            log.error("Error converting multipart file to file.",e);
        }
        return convertedFile;
    }

    

}
