package com.edu.neu.careercraftai.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.neu.careercraftai.entity.AspirationEntity;
import com.edu.neu.careercraftai.interfaces.AspirationService;
import com.edu.neu.careercraftai.repositories.AspirationRepository;

@Service
public class AspirationServiceImpl implements AspirationService{

    @Autowired
    AspirationRepository aspirationRepository;

    @Override
    public List<AspirationEntity> getAspirations() {
        return aspirationRepository.findAll();
    } 

}
