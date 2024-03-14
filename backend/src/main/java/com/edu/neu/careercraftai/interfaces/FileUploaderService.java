package com.edu.neu.careercraftai.interfaces;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface FileUploaderService {
    public String uploadFile(MultipartFile file) throws IOException;
    public byte[] downloadFile(String fileName);
    public String deleteFile(String fileName);
}
