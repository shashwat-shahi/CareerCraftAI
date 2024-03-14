package com.edu.neu.careercraftai.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.edu.neu.careercraftai.entity.AspirationEntity;

@Repository
public interface AspirationRepository extends JpaRepository<AspirationEntity, Integer>{

}
