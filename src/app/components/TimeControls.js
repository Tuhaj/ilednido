export const TimerControls = ({ onEdit, onAdd, onDelete }) => (
    <div className="flex flex-wrap justify-center gap-1 mt-1 sm:gap-2 sm:mt-2">
      <button 
        onClick={onEdit}
        className="px-2 py-1 sm:px-3 sm:py-1.5 bg-green-700 text-white text-sm rounded hover:bg-green-800 transition-colors"
      >
        Edit
      </button>
      <button 
        onClick={onAdd}
        className="px-2 py-1 sm:px-3 sm:py-1.5 bg-purple-700 text-white text-sm rounded hover:bg-purple-800 transition-colors"
      >
        Add
      </button>
      <button 
        onClick={onDelete}
        className="px-2 py-1 sm:px-3 sm:py-1.5 bg-red-700 text-white text-sm rounded hover:bg-red-800 transition-colors"
      >
        Delete
      </button>
    </div>
  );