package com.devpilot.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "agent_runs")
public class AgentRun {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String task;

    @Column(nullable = false)
    private String status;

    private String duration;

    private String time;

    @Column(columnDefinition = "TEXT")
    private String analysisSummary;

    @Column(columnDefinition = "TEXT")
    private String analysisIssues;

    @Column(columnDefinition = "TEXT")
    private String analysisRecommendations;

    @Column(columnDefinition = "TEXT")
    private String executionSteps;

    public AgentRun() {
    }

    public AgentRun(
            String task,
            String status,
            String duration,
            String time,
            String analysisSummary,
            String analysisIssues,
            String analysisRecommendations,
            String executionSteps
    ) {
        this.task = task;
        this.status = status;
        this.duration = duration;
        this.time = time;
        this.analysisSummary = analysisSummary;
        this.analysisIssues = analysisIssues;
        this.analysisRecommendations = analysisRecommendations;
        this.executionSteps = executionSteps;
    }

    public Long getId() {
        return id;
    }

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getAnalysisSummary() {
        return analysisSummary;
    }

    public void setAnalysisSummary(String analysisSummary) {
        this.analysisSummary = analysisSummary;
    }

    public String getAnalysisIssues() {
        return analysisIssues;
    }

    public void setAnalysisIssues(String analysisIssues) {
        this.analysisIssues = analysisIssues;
    }

    public String getAnalysisRecommendations() {
        return analysisRecommendations;
    }

    public void setAnalysisRecommendations(String analysisRecommendations) {
        this.analysisRecommendations = analysisRecommendations;
    }

    public String getExecutionSteps() {
        return executionSteps;
    }

    public void setExecutionSteps(String executionSteps) {
        this.executionSteps = executionSteps;
    }
}