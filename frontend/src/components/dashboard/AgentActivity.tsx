function AgentActivity() {
  const activities = [
    {
      title: "Repository analyzed",
      description: "DevPilot scanned the project structure",
      time: "2 min ago",
    },
    {
      title: "Code review completed",
      description: "12 files reviewed successfully",
      time: "15 min ago",
    },
    {
      title: "AI task completed",
      description: "Generated authentication module",
      time: "32 min ago",
    },
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Agent Activity
          </h2>
          <p className="text-sm text-gray-500">
            Latest actions performed by DevPilot AI
          </p>
        </div>

        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
          Live
        </span>
      </div>

      <div className="space-y-5">
        {activities.map((activity, index) => (
          <div key={index} className="flex gap-3">
            <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
              ✓
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {activity.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {activity.description}
                  </p>
                </div>

                <span className="whitespace-nowrap text-xs text-gray-400">
                  {activity.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AgentActivity;