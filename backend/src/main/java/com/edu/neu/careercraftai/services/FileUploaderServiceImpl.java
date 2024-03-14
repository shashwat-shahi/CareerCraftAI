package com.edu.neu.careercraftai.services;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import com.edu.neu.careercraftai.interfaces.FileUploaderService;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class FileUploaderServiceImpl implements FileUploaderService{

    @Value("${application.bucket.name}")
    String bucket;

    @Autowired
    AmazonS3 s3Client;

    @Override
    public String uploadFile(MultipartFile file) throws IOException {

        String fileName = System.currentTimeMillis()+"_"+file.getOriginalFilename();
        File convertedFile = convertMultipartFileToFile(file);
        s3Client.putObject(bucket, fileName, convertedFile);
        // URL fileUrl = s3Client.getUrl(bucket, fileName);
        convertedFile.delete();
        return fileName;
    }

    public byte[] downloadFile(String fileName){
        S3Object fileObject = s3Client.getObject(bucket, fileName);
        S3ObjectInputStream fileContent = fileObject.getObjectContent();
        try {
            byte[] content = IOUtils.toByteArray(fileContent);
            return content;
        } catch (Exception e) {
            log.error("There was an issue converting file to byte array", e);
        }
        return null;
    }

    public String deleteFile(String fileName){
        s3Client.deleteObject(bucket, fileName);
        return "File deleted successfully";
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
