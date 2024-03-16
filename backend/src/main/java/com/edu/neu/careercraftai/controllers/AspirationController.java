package com.edu.neu.careercraftai.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.edu.neu.careercraftai.entity.AspirationEntity;
import com.edu.neu.careercraftai.interfaces.AspirationService;

@RestController()
@RequestMapping("/aspiration")
public class AspirationController {

    @Autowired
    AspirationService aspirationService;

    @GetMapping("/getAspirations")
    public ResponseEntity<List<AspirationEntity>> getAspirations(){
        List<AspirationEntity> aspirations = aspirationService.getAspirations();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(aspirations);
    }

}
