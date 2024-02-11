package com.edu.neu.careercraftai.service;

import com.edu.neu.careercraftai.component.DBHealthIndicator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.Status;

@Service
public class HealthCheckService {
    @Autowired
    private DBHealthIndicator dbHealthIndicator;

    public boolean dbConnectionCheck() {
        Health health = dbHealthIndicator.getHealth(true);
        Status status = health.getStatus();
        return status.equals(Status.UP);
    }
}
