package com.devpilot.backend.repository;

import com.devpilot.backend.model.AgentRun;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AgentRunRepository extends JpaRepository<AgentRun, Long> {
}