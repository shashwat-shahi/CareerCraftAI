package com.edu.neu.careercraftai.interfaces;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.edu.neu.careercraftai.models.ResponseModel;

public interface FileUploaderService {
    public ResponseModel uploadFile(MultipartFile file) throws IOException;
    public ResponseModel downloadFile(String fileName);
    public ResponseModel deleteFile(String fileName);
}
