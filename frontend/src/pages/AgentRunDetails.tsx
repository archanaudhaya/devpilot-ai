import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAgentRuns } from "../context/AgentRunContext";
import { getAgentRunById } from "../services/agentRunApi";
import type { AgentRun } from "../types/agent";



function AgentRunDetails() {
  const { id } = useParams();
  const { agentRuns } = useAgentRuns();
  const [backendRun, setBackendRun] = useState<AgentRun | null>(null);
  useEffect(() => {
     if (!id) return;

     getAgentRunById(id)
       .then((data) => {
         setBackendRun(data);
       })
       .catch((error) => {
         console.error("Failed to fetch agent run:", error);
       });
  }, [id]);


  const run = backendRun || agentRuns.find((agentRun) => agentRun.id === id);

  

  if (!run) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">
          Agent Run Not Found
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          The requested agent run could not be found.
        </p>

        <Link
          to="/agent-runs"
          className="mt-4 inline-block rounded-lg bg-black px-4 py-2 text-sm font-medium text-white"
        >
          Back to Agent Runs
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          to="/agent-runs"
          className="text-sm text-gray-500 hover:text-gray-900"
        >
          ← Back to Agent Runs
        </Link>

        <h1 className="mt-3 text-2xl font-bold text-gray-900">
          Agent Run #{run.id}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Detailed execution information for this DevPilot AI run.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">Task</p>

            <h2 className="mt-1 text-lg font-semibold text-gray-900">
              {run.task}
            </h2>
          </div>

          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            {run.status}
          </span>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-xs text-gray-500">Duration</p>
            <p className="mt-1 text-sm font-semibold text-gray-900">
              {run.duration}
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-xs text-gray-500">Started</p>
            <p className="mt-1 text-sm font-semibold text-gray-900">
              {run.time}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Execution Steps
        </h2>

        {run.analysis && (
          <div className="mt-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-green-600">✓</span>

              <h2 className="text-lg font-semibold text-gray-900">
                AI Analysis
              </h2>
            </div>

            <div className="mt-5">
              <h3 className="text-sm font-semibold text-gray-900">
                Summary
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-600">
                {run.analysis.summary}
              </p>
            </div>

            <div className="mt-5">
              <h3 className="text-sm font-semibold text-gray-900">
                Issues Identified
              </h3>

              <ul className="mt-2 space-y-2">
                {run.analysis.issues.map((issue, index) => (
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
              <h3 className="text-sm font-semibold text-gray-900">
                Recommendations
              </h3>

              <ul className="mt-2 space-y-2">
                {run.analysis.recommendations.map(
                  (recommendation, index) => (
                    <li
                      key={index}
                      className="flex gap-2 text-sm text-gray-600"
                    >
                      <span className="text-green-600">✓</span>
                      <span>{recommendation}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        )}

        <div className="mt-5 space-y-5">
          {(run.steps || []).map((step, index) => (
            <div key={`${step.name}-${index}`} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    step.status === "Completed"
                      ? "bg-green-100 text-green-600"
                      : step.status === "Running"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {step.status === "Completed"
                    ? "✓"
                    : step.status === "Running"
                    ? "●"
                    : "○"}
                </div>

                {index < run.steps.length - 1 && (
                  <div className="mt-2 h-full w-px bg-gray-200" />
                )}
              </div>

              <div className="pb-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-900">
                    {step.name}
                  </p>

                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      step.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : step.status === "Running"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {step.status}
                  </span>
                </div>

                <p className="mt-1 text-xs text-gray-500">
                  {step.description}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {step.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-green-200 bg-green-50 p-6">
        <h2 className="text-lg font-semibold text-green-800">
          Result
        </h2>

        <p className="mt-2 text-sm text-green-700">
          AI analysis completed successfully. DevPilot analyzed your request
          and prepared recommendations.
        </p>
      </div>
    </div>
  );
}

export default AgentRunDetails;