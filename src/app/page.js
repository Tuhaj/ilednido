// This component must be client-side only to handle localStorage and timers
'use client';
import { useState, useEffect } from "react";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState('');
  const [timers, setTimers] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('timers');
      return saved ? JSON.parse(saved) : [
        { name: "Leon's birthday", date: '2025-05-07T00:00:00' },
        { name: "Aleksander's birthday", date: '2025-06-27T00:00:00' },
        { name: "First school day", date: '2025-09-02T00:00:00' }
      ];
    }
    return [
      { name: "Leon's birthday", date: '2025-05-07T00:00:00' },
      { name: "Aleksander's birthday", date: '2025-06-27T00:00:00' },
      { name: "First school day", date: '2025-09-02T00:00:00' }
    ];
  });
  const [currentTimerIndex, setCurrentTimerIndex] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('currentTimerIndex');
      return saved ? parseInt(saved) : 0;
    }
    return 0;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('timers', JSON.stringify(timers));
      localStorage.setItem('currentTimerIndex', currentTimerIndex.toString());
    }
  }, [timers, currentTimerIndex]);

  useEffect(() => {
    if (!timers.length) return;
    
    const targetDate = new Date(timers[currentTimerIndex].date);
    
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;
      
      if (difference < 0) {
        clearInterval(timer);
        setTimeLeft('Countdown finished!');
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      const milliseconds = difference % 1000;

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s ${milliseconds.toString().padStart(3, '0')}ms`);
    }, 1);

    return () => clearInterval(timer);
  }, [timers, currentTimerIndex]);

  const toggleTimer = () => {
    setCurrentTimerIndex((prev) => (prev + 1) % timers.length);
  };

  const editTimer = () => {
    const newName = prompt('Enter new name:', timers[currentTimerIndex].name);
    const newDate = prompt('Enter new date (YYYY-MM-DD):', timers[currentTimerIndex].date.split('T')[0]);
    
    if (newName && newDate) {
      setTimers(prev => {
        const newTimers = [...prev];
        newTimers[currentTimerIndex] = { name: newName, date: `${newDate}T00:00:00` };
        return newTimers;
      });
    }
  };

  const addNewTimer = () => {
    const newName = prompt('Enter new timer name:');
    const newDate = prompt('Enter date (YYYY-MM-DD):');
    
    if (newName && newDate) {
      setTimers(prev => [...prev, { name: newName, date: `${newDate}T00:00:00` }]);
      setCurrentTimerIndex(timers.length);
    }
  };

  const deleteTimer = () => {
    if (window.confirm('Are you sure you want to delete this timer?')) {
      setTimers(prev => {
        const newTimers = prev.filter((_, index) => index !== currentTimerIndex);
        return newTimers;
      });
      setCurrentTimerIndex(prev => Math.min(prev, Math.max(0, timers.length - 2)));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-2 p-4 sm:pt-4 pt-0">
      {timers.length > 0 ? (
        <>
          <div 
            className="flex flex-col items-center cursor-pointer hover:text-blue-500 transition-colors"
            onClick={toggleTimer}
          >
            <p className="text-sm">({currentTimerIndex + 1}/{timers.length})</p>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-semibold">
                {timers[currentTimerIndex].name}
              </h1>
            </div>
            <div className="text-3xl sm:text-4xl font-bold font-mono mt-1">{timeLeft}</div>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            <button 
              onClick={editTimer}
              className="px-3 py-1.5 bg-green-700 text-white text-sm rounded hover:bg-green-800 transition-colors"
            >
              Edit
            </button>
            <button 
              onClick={addNewTimer}
              className="px-3 py-1.5 bg-purple-700 text-white text-sm rounded hover:bg-purple-800 transition-colors"
            >
              Add
            </button>
            <button 
              onClick={deleteTimer}
              className="px-3 py-1.5 bg-red-700 text-white text-sm rounded hover:bg-red-800 transition-colors"
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <div>No timers available</div>
      )}
      <footer className="fixed bottom-0 w-full p-4 text-center text-sm">
        <a href="https://piotrzientara.pl" className="hover:text-gray-700 transition-colors">
          © Piotr Zientara
        </a>
      </footer>
    </div>
  );
}
