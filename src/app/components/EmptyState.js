export const EmptyState = ({ onAdd }) => (
    <div className="flex flex-col items-center gap-2">
      <div>No timers available</div>
      <button 
        onClick={onAdd}
        className="px-2 py-1 sm:px-3 sm:py-1.5 bg-purple-700 text-white text-sm rounded hover:bg-purple-800 transition-colors"
      >
        Add Timer
      </button>
    </div>
  );