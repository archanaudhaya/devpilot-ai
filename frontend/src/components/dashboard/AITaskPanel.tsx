import { useState } from "react";
import { useAgentRuns } from "../../context/AgentRunContext";
import type { AIAnalysisResult } from "../../types/ai";
import { createAgentRun } from "../../services/agentRunApi";

interface AITaskPanelProps {
  onTaskCompleted: (taskTitle: string) => void;
}

function AITaskPanel({ onTaskCompleted }: AITaskPanelProps) {
  const {
    startAgentRun,
    completeAgentRun,
    updateAgentStep,
  } = useAgentRuns();

  const [task, setTask] = useState("");
  const [result, setResult] = useState<AIAnalysisResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunTask = () => {
    if (!task.trim()) {
      return;
    }

    setIsRunning(true);
    setResult(null);

    const currentTask = task.trim();

    const runId = startAgentRun(currentTask);
    

    setTimeout(() => {
      updateAgentStep(runId, 2);
    }, 4000);

    setTimeout(() => {
      updateAgentStep(runId, 3);
    }, 5500);

    setTimeout(() => {
      setIsRunning(false);

      const taskLower = currentTask.toLowerCase();

      let analysisResult: AIAnalysisResult;

      if (
        taskLower.includes("authentication") ||
        taskLower.includes("login") ||
        taskLower.includes("password") ||
        taskLower.includes("security")
      ) {
        analysisResult = {
          summary:
            "DevPilot analyzed the authentication and security requirements of your task.",
          issues: [
            "Authentication logic may require stronger validation.",
            "Sensitive operations should include proper authorization checks.",
          ],
          recommendations: [
            "Implement strong password validation.",
            "Add secure authentication and authorization checks.",
            "Add tests for failed login and unauthorized access scenarios.",
          ],
        };
      } else if (
        taskLower.includes("database") ||
        taskLower.includes("query") ||
        taskLower.includes("sql")
      ) {
        analysisResult = {
          summary:
            "DevPilot analyzed the database-related requirements and identified possible optimization areas.",
          issues: [
            "Database queries may contain unnecessary operations.",
            "Frequently accessed data may require better indexing.",
          ],
          recommendations: [
            "Review and optimize frequently executed queries.",
            "Add indexes for commonly filtered or joined columns.",
            "Monitor query execution time and database performance.",
          ],
       };
     } else if (
       taskLower.includes("frontend") ||
       taskLower.includes("ui") ||
       taskLower.includes("react")
     ) {
       analysisResult = {
         summary:
           "DevPilot analyzed the frontend task and identified areas for improving usability and maintainability.",
         issues: [
           "Component structure and reusable UI patterns should be reviewed.",
           "Responsive behavior and user experience may need improvement.",
         ],
         recommendations: [
           "Create reusable React components.",
           "Improve responsive layouts and accessibility.",
           "Add validation and user-friendly error states.",
         ],
        };
      } else {
        analysisResult = {
          summary:
            "DevPilot analyzed your coding task and identified general areas that may need improvement.",
          issues: [
            "Code structure and maintainability should be reviewed.",
            "Error handling and validation may require improvement.",
          ],
          recommendations: [
            "Improve code organization and readability.",
            "Add appropriate validation and error handling.",
            "Create tests for critical functionality.",
          ],
        };
     }

setResult(analysisResult);

      onTaskCompleted(currentTask);

      completeAgentRun(runId,analysisResult);
      createAgentRun(
        currentTask,
        "Completed",
        "8s",
        "Just now",
        analysisResult.summary,
        analysisResult.issues,
        analysisResult.recommendations,
        [
          "Task received",
          "Repository analyzed",
          "AI reasoning completed",
          "Recommendations generated",
      ]
      )
        .then(() => {
        console.log("Agent Run saved to backend successfully");
        })
        .catch((error) => {
        console.error("Failed to save Agent Run:", error);
        });

      setTask("");
    }, 8000);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Ask DevPilot AI
        </h2>

        <p className="text-sm text-gray-500">
          Describe a coding task and let the AI agent help you.
        </p>
      </div>

      <textarea
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Example: Analyze my authentication module and suggest improvements..."
        className="h-32 w-full resize-none rounded-lg border border-gray-200 p-3 text-sm outline-none transition focus:border-gray-400"
        disabled={isRunning}
      />

      <div className="mt-3 flex justify-end">
        <button
          onClick={handleRunTask}
          disabled={isRunning || !task.trim()}
          className="rounded-lg bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isRunning ? "Analyzing..." : "Run AI Task"}
        </button>
      </div>

      {isRunning && (
        <div className="mt-4 rounded-lg bg-gray-50 p-4">
          <p className="text-sm font-medium text-gray-900">
            🤖 DevPilot AI is analyzing your task...
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Scanning repository and preparing recommendations.
          </p>
        </div>
      )}

      {result && !isRunning && (
        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>

            <h3 className="text-base font-semibold text-gray-900">
              AI Analysis Completed
            </h3>
          </div>

          <div className="mt-5">
            <h4 className="text-sm font-semibold text-gray-900">
              Summary
            </h4>

            <p className="mt-1 text-sm leading-6 text-gray-600">
              {result.summary}
            </p>
          </div>

          <div className="mt-5">
            <h4 className="text-sm font-semibold text-gray-900">
              Issues Identified
            </h4>

            <ul className="mt-2 space-y-2">
              {result.issues.map((issue, index) => (
                <li
                  key={index}
                  className="flex gap-2 text-sm text-gray-600"
                >
                  <span className="text-gray-400">•</span>
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5">
            <h4 className="text-sm font-semibold text-gray-900">
              Recommendations
            </h4>

            <ul className="mt-2 space-y-2">
              {result.recommendations.map((recommendation, index) => (
                <li
                  key={index}
                  className="flex gap-2 text-sm text-gray-600"
                >
                  <span className="text-green-600">✓</span>
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default AITaskPanel;