package com.edu.neu.careercraftai.controller;

import com.edu.neu.careercraftai.service.HealthCheckService;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {
    private final HealthCheckService healthCheckService;
    @Autowired
    private final HikariDataSource hikariDataSource;

    public HealthCheckController(HealthCheckService healthCheckService, HikariDataSource hikariDataSource) {
        this.healthCheckService = healthCheckService;
        this.hikariDataSource = hikariDataSource;
    }

    @GetMapping("healthz")
    public ResponseEntity<String> getHealthCheck() {
        try {
            if (healthCheckService.dbConnectionCheck()) {
                return ResponseEntity.ok().build();
            }
            return ResponseEntity.status(503).build();
        } catch (Exception exception) {
            return ResponseEntity.status(503).build();
        }
    }
}
