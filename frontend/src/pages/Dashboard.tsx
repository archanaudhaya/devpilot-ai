import { useState } from "react";
import AgentActivity from "../components/dashboard/AgentActivity";
import RepositoryCard from "../components/dashboard/RepositoryCard";
import AITaskPanel from "../components/dashboard/AITaskPanel";
import AITaskHistory from "../components/dashboard/AITaskHistory";

export interface AITask {
  title: string;
  status: string;
  time: string;
}

function Dashboard() {
  const [tasks, setTasks] = useState<AITask[]>([
    {
      title: "Analyze authentication module",
      status: "Completed",
      time: "2 min ago",
    },
    {
      title: "Find security vulnerabilities",
      status: "Completed",
      time: "15 min ago",
    },
    {
      title: "Optimize database queries",
      status: "Completed",
      time: "32 min ago",
    },
  ]);

  const addTask = (taskTitle: string) => {
    const newTask: AITask = {
      title: taskTitle,
      status: "Completed",
      time: "Just now",
    };

    setTasks((previousTasks) => [newTask, ...previousTasks]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          DevPilot Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your repositories, AI tasks, agent runs, and code reviews.
        </p>
      </div>

      {/* Repository */}
      <RepositoryCard />

      {/* Main content */}
      <div className="grid gap-6 lg:grid-cols-2">
        <AgentActivity />

        <AITaskPanel onTaskCompleted={addTask} />
      </div>

      {/* AI Task History */}
      <AITaskHistory tasks={tasks} />
    </div>
  );
}

export default Dashboard;