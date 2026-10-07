import { Link } from "react-router-dom";

function QuickActions() {
  const actions = [
    {
      title: "Connect Repository",
      description: "Connect a GitHub repository to DevPilot AI",
      path: "/repositories",
      icon: "🔗",
    },
    {
      title: "Create AI Task",
      description: "Ask DevPilot AI to analyze or modify code",
      path: "/ai-task",
      icon: "🤖",
    },
    {
      title: "Start Code Review",
      description: "Review your code using the AI reviewer",
      path: "/code-review",
      icon: "🔍",
    },
    {
      title: "View Pull Requests",
      description: "Review and manage AI-generated pull requests",
      path: "/pull-requests",
      icon: "🔀",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {actions.map((action) => (
        <Link
          key={action.path}
          to={action.path}
          className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div className="text-2xl">
            {action.icon}
          </div>

          <h3 className="mt-4 font-semibold text-gray-900">
            {action.title}
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            {action.description}
          </p>

          <span className="mt-4 inline-block text-sm font-medium text-blue-600">
            Open →
          </span>
        </Link>
      ))}
    </div>
  );
}

export default QuickActions;