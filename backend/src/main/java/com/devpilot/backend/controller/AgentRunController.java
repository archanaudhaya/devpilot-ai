package com.devpilot.backend.controller;

import com.devpilot.backend.model.AgentRun;
import com.devpilot.backend.service.AgentRunService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/agent-runs")
@CrossOrigin(origins = "http://localhost:5173")
public class AgentRunController {

    private final AgentRunService agentRunService;

    public AgentRunController(AgentRunService agentRunService) {
        this.agentRunService = agentRunService;
    }

    @PostMapping
    public AgentRun createAgentRun(@RequestBody AgentRun agentRun) {
        return agentRunService.createAgentRun(agentRun);
    }

    @GetMapping
    public List<AgentRun> getAllAgentRuns() {
        return agentRunService.getAllAgentRuns();
    }

    @GetMapping("/{id}")
    public AgentRun getAgentRunById(@PathVariable Long id) {
        return agentRunService.getAgentRunById(id);
    }
}