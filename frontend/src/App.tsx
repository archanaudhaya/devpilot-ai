import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import AITask from "./pages/AITask";
import AgentRunsPage from "./pages/AgentRuns";
import { AgentRunProvider } from "./context/AgentRunContext";
import AgentRunDetails from "./pages/AgentRunDetails";



function Repositories() {
  return <h1>Repositories</h1>;
}





function CodeReview() {
  return <h1>Code Review</h1>;
}

function PullRequests() {
  return <h1>Pull Requests</h1>;
}

function Settings() {
  return <h1>Settings</h1>;
}

function App() {
  return (
  <AgentRunProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/repositories" element={<Repositories />} />
          <Route path="/ai-task" element={<AITask />} />
          <Route path="/agent-runs" element={<AgentRunsPage />} />
          <Route path="/agent-runs/:id" element={<AgentRunDetails />} />
          <Route path="/code-review" element={<CodeReview />} />
          <Route path="/pull-requests" element={<PullRequests />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AgentRunProvider>
  );
}

export default App;