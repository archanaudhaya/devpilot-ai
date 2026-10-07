import { Link } from "react-router-dom";
import { useAgentRuns } from "../context/AgentRunContext";

function AgentRuns() {
  const { agentRuns } = useAgentRuns();

  const completedRuns = agentRuns.filter(
    (run) => run.status === "Completed"
  ).length;

  const runningRuns = agentRuns.filter(
    (run) => run.status === "Running"
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Agent Runs
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Monitor and review DevPilot AI agent executions.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Runs</p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {agentRuns.length}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Completed</p>

          <p className="mt-2 text-3xl font-bold text-green-600">
            {completedRuns}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Running</p>

          <p className="mt-2 text-3xl font-bold text-blue-600">
            {runningRuns}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Agent Runs
          </h2>

          <p className="text-sm text-gray-500">
            Recent AI agent executions in DevPilot.
          </p>
        </div>

        <div className="space-y-3">
          {agentRuns.map((run) => (
            
            <Link
              key={run.id}
              to={`/agent-runs/${run.id}`}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full ${
                    run.status === "Running"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-green-100 text-green-600"
                  }`}
                >
                  {run.status === "Running" ? "●" : "✓"}
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900">
                    #{run.id} {run.task}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Duration: {run.duration} • {run.time}
                  </p>
                </div>
              </div>

              <span 
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  run.status === "Running"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {run.status}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AgentRuns;