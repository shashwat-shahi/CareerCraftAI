package com.edu.neu.careercraftai.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.edu.neu.careercraftai.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer>{
    public Optional<UserEntity> findByEmailId(String emailId);
}
