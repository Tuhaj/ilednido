'use client';
import { useState, useEffect } from "react";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState('');
  const [timers, setTimers] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('timers');
      return saved ? JSON.parse(saved) : [
        { name: 'Urodziny Leona', date: '2025-05-07T00:00:00' },
        { name: 'Urodziny Aleksandra', date: '2025-06-27T00:00:00' },
        { name: 'Pierwszy dzień szkoły', date: '2025-09-02T00:00:00' }
      ];
    }
    return [
      { name: 'Urodziny Leona', date: '2025-05-07T00:00:00' },
      { name: 'Urodziny Aleksandra', date: '2025-06-27T00:00:00' },
      { name: 'Pierwszy dzień szkoły', date: '2025-09-02T00:00:00' }
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
    const newName = prompt('Wprowadź nową nazwę:', timers[currentTimerIndex].name);
    const newDate = prompt('Wprowadź nową datę (RRRR-MM-DDThh:mm:ss):', timers[currentTimerIndex].date);
    
    if (newName && newDate) {
      setTimers(prev => {
        const newTimers = [...prev];
        newTimers[currentTimerIndex] = { name: newName, date: newDate };
        return newTimers;
      });
    }
  };

  const addNewTimer = () => {
    const newName = prompt('Wprowadź nazwę nowego timera:');
    const newDate = prompt('Wprowadź datę (RRRR-MM-DDThh:mm:ss):');
    
    if (newName && newDate) {
      setTimers(prev => [...prev, { name: newName, date: newDate }]);
      setCurrentTimerIndex(timers.length);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      {timers.length > 0 ? (
        <>
          <h1 className="text-3xl font-semibold">
            {timers[currentTimerIndex].name} za
          </h1>
          <div className="text-4xl font-bold font-mono">{timeLeft}</div>
          <div className="flex gap-2">
            <button 
              onClick={toggleTimer}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Przełącz Timer
            </button>
            <button 
              onClick={editTimer}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Edytuj Timer
            </button>
            <button 
              onClick={() => {
                const newName = prompt('Wprowadź nazwę nowego timera:');
                const newDate = prompt('Wprowadź datę (RRRR-MM-DD):');
                
                if (newName && newDate) {
                  const fullDate = `${newDate}T00:00:00`;
                  setTimers(prev => [...prev, { name: newName, date: fullDate }]);
                  setCurrentTimerIndex(timers.length);
                }
              }}
              className="mt-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
            >
              Dodaj Timer
            </button>
          </div>
        </>
      ) : (
        <div>No timers available</div>
      )}
    </div>
  );
}
