import type { AITask } from "../../pages/Dashboard";

interface AITaskHistoryProps {
  tasks: AITask[];
}

function AITaskHistory({ tasks }: AITaskHistoryProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-900">
          AI Task History
        </h2>

        <p className="text-sm text-gray-500">
          Previous tasks processed by DevPilot AI
        </p>
      </div>

      <div className="space-y-4">
        {tasks.map((task, index) => (
          <div
            key={`${task.title}-${index}`}
            className="flex items-center justify-between rounded-lg border border-gray-100 p-3"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                ✓
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900">
                  {task.title}
                </p>

                <p className="text-xs text-gray-400">
                  {task.time}
                </p>
              </div>
            </div>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              {task.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AITaskHistory;