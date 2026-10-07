import type { AIAnalysisResult } from "./ai";
export interface AgentStep {
  name: string;
  description: string;
  status: "Completed" | "Running" | "Pending";
  time: string;
}

export interface AgentRun {
  id: string;
  task: string;
  status: "Completed" | "Running" | "Failed";
  duration: string;
  time: string;
  startTime?: number;
  analysis?: AIAnalysisResult;
  steps: AgentStep[];
}