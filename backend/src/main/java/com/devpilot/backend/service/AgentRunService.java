package com.devpilot.backend.service;

import com.devpilot.backend.model.AgentRun;
import com.devpilot.backend.repository.AgentRunRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgentRunService {

    private final AgentRunRepository agentRunRepository;

    public AgentRunService(AgentRunRepository agentRunRepository) {
        this.agentRunRepository = agentRunRepository;
    }

    public AgentRun createAgentRun(AgentRun agentRun) {
        return agentRunRepository.save(agentRun);
    }

    public List<AgentRun> getAllAgentRuns() {
        return agentRunRepository.findAll();
    }

    public AgentRun getAgentRunById(Long id) {
        return agentRunRepository.findById(id).orElse(null);
    }
}