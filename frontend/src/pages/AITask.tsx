import AITaskPanel from "../components/dashboard/AITaskPanel";
import { Link } from "react-router-dom";
import { useAgentRuns } from "../context/AgentRunContext";

function AITask() {
  const { agentRuns } = useAgentRuns();

  const latestRun = agentRuns[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Task</h1>
        <p className="mt-1 text-sm text-gray-500">
          Give DevPilot a coding task and let the AI agent analyze it.
        </p>
      </div>

      <AITaskPanel onTaskCompleted={() => {}} />

      {latestRun && (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500">
                Latest Agent Run
              </p>

              <h2 className="mt-1 text-lg font-semibold text-gray-900">
                #{latestRun.id} {latestRun.task}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Duration: {latestRun.duration} • {latestRun.time}
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                latestRun.status === "Running"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {latestRun.status}
            </span>
          </div>

          <div className="mt-4">
            <Link
              to={`/agent-runs/${latestRun.id}`}
              className="text-sm font-medium text-gray-900 hover:underline"
            >
              View Execution Details →
            </Link>
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-xs text-gray-500">Task Type</p>
          <p className="mt-1 text-sm font-semibold text-gray-900">
            AI Code Analysis
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-xs text-gray-500">Execution</p>
          <p className="mt-1 text-sm font-semibold text-gray-900">
            Agent-based
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-xs text-gray-500">Repository Analysis</p>
          <p className="mt-1 text-sm font-semibold text-green-600">
            Enabled
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-xs text-gray-500">Estimated Execution</p>
          <p className="mt-1 text-sm font-semibold text-gray-900">
            ~8 seconds
          </p>
        </div>
      </div>
    </div>
  );
}

export default AITask;