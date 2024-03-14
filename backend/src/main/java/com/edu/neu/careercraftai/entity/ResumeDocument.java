package com.edu.neu.careercraftai.entity;

import org.springframework.data.annotation.Id;

import lombok.Data;

@Data
public class ResumeDocument {
    
    @Id
    private String id;
    private String resumeFileName;
    private byte[] resumeFileData;

}
