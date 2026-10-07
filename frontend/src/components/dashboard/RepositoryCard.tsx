function RepositoryCard() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">Connected Repository</p>

          <h2 className="mt-1 text-lg font-semibold text-gray-900">
            DevPilot-AI
          </h2>
        </div>

        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
          Connected
        </span>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-gray-500">Files</p>
          <p className="mt-1 text-lg font-semibold text-gray-900">128</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Branches</p>
          <p className="mt-1 text-lg font-semibold text-gray-900">6</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Commits</p>
          <p className="mt-1 text-lg font-semibold text-gray-900">342</p>
        </div>
      </div>
    </div>
  );
}

export default RepositoryCard;