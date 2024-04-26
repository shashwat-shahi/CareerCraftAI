package com.edu.neu.careercraftai.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "users", schema = "public")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column(name = "first_name")
    String firstName;

    @Column(name = "last_name")
    String lastName;

    @Column(name = "email_id", unique = true)
    String emailId;

    @Column(name = "resume_link")
    String resumeLink;

    @ManyToOne
    @JoinColumn(name = "aspiration_id")
    private AspirationEntity aspiration;

    @Column(name = "fundamentals_gap")
    List<String> fundamentalsGap;

    @Column(name = "intermediate_gap")
    List<String> intermediateGap;

    @Column(name = "advanced_gap")
    List<String> advancedGap;

    @Column(name = "skillset")
    List<String> skillset;
}
