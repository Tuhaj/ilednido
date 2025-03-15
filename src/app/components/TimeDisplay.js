export const TimerDisplay = ({ timer, timeLeft, totalTimers, currentIndex, onClick }) => (
    <div 
      className="flex flex-col items-center cursor-pointer hover:text-blue-500 transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center gap-1 sm:gap-2">
        <h1 className="text-xl sm:text-3xl font-semibold">
          {timer.name}
        </h1>
      </div>
      <div className="text-2xl sm:text-4xl font-bold font-mono mt-0.5 sm:mt-1">{timeLeft}</div>
      <p className="text-sm">({currentIndex + 1}/{totalTimers})</p>
    </div>
  );
  