function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          DevPilot AI
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">
          AI Software Engineering Agent
        </span>

        <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
          A
        </div>
      </div>
    </header>
  );
}

export default Navbar;