import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Repositories", path: "/repositories" },
    { name: "AI Task", path: "/ai-task" },
    { name: "Agent Runs", path: "/agent-runs" },
    { name: "Code Review", path: "/code-review" },
    { name: "Pull Requests", path: "/pull-requests" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white p-5">
      <h1 className="text-2xl font-bold mb-8">
        🚀 DevPilot AI
      </h1>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;