import type { AgentRun } from "../types/agent";

const API_URL = "http://localhost:8080/api/agent-runs";

export async function getAgentRuns(): Promise<AgentRun[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch agent runs");
  }

  return response.json();
}

export async function createAgentRun(
  task: string,
  status: string,
  duration: string,
  time: string,
  analysisSummary: string,
  analysisIssues: string[],
  analysisRecommendations: string[],
  executionSteps: string[]
): Promise<AgentRun> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      task,
      status,
      duration,
      time,
      analysisSummary,
      analysisIssues: JSON.stringify(analysisIssues),
      analysisRecommendations: JSON.stringify(analysisRecommendations),
      executionSteps: JSON.stringify(executionSteps),
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create agent run");
  }

  return response.json();
}
export async function getAgentRunById(
  id: string
): Promise<AgentRun> {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch agent run");
  }

  const data = await response.json();

  return {
    id: String(data.id),
    task: data.task,
    status: data.status,
    duration: data.duration,
    time: data.time,
    analysis: data.analysisSummary
      ? {
          summary: data.analysisSummary,
          issues: data.analysisIssues
            ? JSON.parse(data.analysisIssues)
            : [],
          recommendations: data.analysisRecommendations
            ? JSON.parse(data.analysisRecommendations)
            : [],
        }
      : undefined,
    steps: data.executionSteps
      ? JSON.parse(data.executionSteps).map((step: string) => ({
          name: step,
          description: step,
          status: "Completed" as const,
          time: data.time,
        }))
      : [],
  };
}