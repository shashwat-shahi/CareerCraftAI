package com.edu.neu.careercraftai.models;


import org.springframework.http.HttpStatus;

import lombok.Data;

@Data
public class ResponseModel {
    HttpStatus responseStatus;
    Object responseBody;
    String responseMessage;
    String exceptionMessage;
}
