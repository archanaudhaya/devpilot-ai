import { createContext, useContext,useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { AgentRun } from "../types/agent";
import { getAgentRuns } from "../services/agentRunApi";

interface AgentRunContextType {
  agentRuns: AgentRun[];
  addAgentRun: (task: string) => void;
  startAgentRun: (task: string) => string;
  completeAgentRun: (id: string, analysis?: AgentRun["analysis"]) => void;
  updateAgentStep: (id: string, stepIndex: number) => void;
}

const AgentRunContext = createContext<AgentRunContextType | undefined>(
  undefined
);

const initialRuns: AgentRun[] = [
  {
    id: "001",
    task: "Analyze authentication module",
    startTime: Date.now(),
    status: "Completed",
    duration: "12s",
    time: "2 min ago",
    steps: [
      {
        name: "Task received",
        description: "DevPilot received the requested coding task.",
        status: "Completed",
        time: "10:32:01 AM",
      },
      {
        name: "Repository analyzed",
        description: "Project structure and relevant files were analyzed.",
        status: "Completed",
        time: "10:32:04 AM",
      },
      {
        name: "AI reasoning completed",
        description: "DevPilot processed the task and generated recommendations.",
        status: "Completed",
        time: "10:32:09 AM",
      },
      {
        name: "Recommendations generated",
        description: "The AI analysis was successfully completed.",
        status: "Completed",
        time: "10:32:13 AM",
      },
    ],
  },
  {
    id: "002",
    task: "Find security vulnerabilities",
    startTime: Date.now(),
    status: "Completed",
    duration: "18s",
    time: "15 min ago",
    steps: [
      {
        name: "Task received",
        description: "DevPilot received the requested coding task.",
        status: "Completed",
        time: "10:20:01 AM",
      },
      {
        name: "Repository analyzed",
        description: "Project structure and relevant files were analyzed.",
        status: "Completed",
        time: "10:20:05 AM",
      },
      {
        name: "AI reasoning completed",
        description: "DevPilot processed the task and identified potential issues.",
        status: "Completed",
        time: "10:20:12 AM",
      },
      {
        name: "Recommendations generated",
        description: "Security recommendations were successfully generated.",
        status: "Completed",
        time: "10:20:19 AM",
      },
    ],
  },
  {
    id: "003",
    task: "Optimize database queries",
    startTime: Date.now(),
    status: "Completed",
    duration: "24s",
    time: "32 min ago",
    steps: [
      {
        name: "Task received",
        description: "DevPilot received the optimization request.",
        status: "Completed",
        time: "10:03:01 AM",
      },
      {
        name: "Repository analyzed",
        description: "Database-related files and queries were analyzed.",
        status: "Completed",
        time: "10:03:06 AM",
      },
      {
        name: "AI reasoning completed",
        description: "DevPilot identified possible query optimizations.",
        status: "Completed",
        time: "10:03:16 AM",
      },
      {
        name: "Recommendations generated",
        description: "Database optimization recommendations were generated.",
        status: "Completed",
        time: "10:03:25 AM",
      },
    ],
  },
];

export function AgentRunProvider({ children }: { children: ReactNode }) {
  const [agentRuns, setAgentRuns] = useState<AgentRun[]>(initialRuns);
  useEffect(() => {
    getAgentRuns()
      .then((runs) => {
        setAgentRuns(runs);
      })
      .catch((error) => {
        console.error("Failed to load agent runs:", error);
      });
  }, []);

  const startAgentRun = (task: string): string => {
    const newId = String(agentRuns.length + 1).padStart(3, "0");

    const newRun: AgentRun = {
      id: newId,
      task,
      status: "Running",
      duration: "0s",
      time: "Just now",
      startTime: Date.now(),
      steps: [
        {
          name: "Task received",
          description: "DevPilot received the requested coding task.",
          status: "Completed",
          time: "Just now",
        },
        {
          name: "Repository analyzed",
          description:
            "Project structure and relevant files are being analyzed.",
          status: "Running",
          time: "Just now",
        },
        {
          name: "AI reasoning completed",
          description:
            "DevPilot is processing the task and generating recommendations.",
          status: "Pending",
          time: "Pending",
        },
        {
          name: "Recommendations generated",
          description:
            "Final AI recommendations will be generated after analysis.",
          status: "Pending",
          time: "Pending",
        },
      ],
    };

    setAgentRuns((previousRuns) => [newRun, ...previousRuns]);

    return newId;
  };

  const completeAgentRun = (
    id: string,
    analysis?: AgentRun["analysis"]
  ) => {
    setAgentRuns((previousRuns) =>
      previousRuns.map((run) =>
        run.id === id
          ? {
              ...run,
              status: "Completed",
              analysis,
              duration: run.startTime
                ? `${((Date.now() - run.startTime) / 1000).toFixed(1)}s`
                : "0s",
              steps: run.steps.map((step) => ({
                ...step,
                status: "Completed" as const,
                time: step.time === "Pending" ? "Just now" : step.time,
              })),
            }
          : run
      )
    );
  };

  const updateAgentStep = (id: string, stepIndex: number) => {
    setAgentRuns((previousRuns) =>
      previousRuns.map((run) => {
        if (run.id !== id) {
          return run;
        }

        return {
          ...run,
          steps: run.steps.map((step, index) => {
            if (index < stepIndex) {
              return {
                ...step,
                status: "Completed" as const,
              };
            }

            if (index === stepIndex) {
              return {
                ...step,
                status: "Running" as const,
                time: "Just now",
              };
            }

            return {
              ...step,
              status: "Pending" as const,
            };
          }),
        };
      })
    );
  };

  const addAgentRun = (task: string) => {
    const newRun: AgentRun = {
      id: String(agentRuns.length + 1).padStart(3, "0"),
      task,
      status: "Completed",
      duration: "2s",
      time: "Just now",
      steps: [
        {
          name: "Task received",
          description: "DevPilot received the requested coding task.",
          status: "Completed",
          time: "Just now",
        },
        {
          name: "Repository analyzed",
          description: "Project structure and relevant files were analyzed.",
          status: "Completed",
          time: "Just now",
        },
        {
          name: "AI reasoning completed",
          description:
            "DevPilot processed the task and generated recommendations.",
          status: "Completed",
          time: "Just now",
        },
        {
          name: "Recommendations generated",
          description: "The AI analysis was successfully completed.",
          status: "Completed",
          time: "Just now",
        },
      ],
    };

    setAgentRuns((previousRuns) => [newRun, ...previousRuns]);
  };

  return (
    <AgentRunContext.Provider
      value={{
        agentRuns,
        addAgentRun,
        startAgentRun,
        completeAgentRun,
        updateAgentStep,
      }}
    >
      {children}
    </AgentRunContext.Provider>
  );
}

export function useAgentRuns() {
  const context = useContext(AgentRunContext);

  if (!context) {
    throw new Error(
      "useAgentRuns must be used inside AgentRunProvider"
    );
  }

  return context;
}