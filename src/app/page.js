'use client';
import { useState, useEffect } from "react";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState('');
  const [currentDate, setCurrentDate] = useState('2025-05-07T00:00:00');

  useEffect(() => {
    const targetDate = new Date(currentDate);
    
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
  }, [currentDate]);

  const toggleDate = () => {
    if (currentDate === '2025-05-07T00:00:00') {
      setCurrentDate('2025-06-27T00:00:00');
    } else if (currentDate === '2025-06-27T00:00:00') {
      setCurrentDate('2025-09-02T00:00:00');
    } else {
      setCurrentDate('2025-05-07T00:00:00');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-semibold">
        {currentDate === '2025-05-07T00:00:00' 
          ? 'Urodziny Leona będą za' 
          : currentDate === '2025-06-27T00:00:00'
            ? 'Urodziny Aleksandra będą za'
            : 'Pierwszy dzień szkoły będzie za'}
      </h1>
      <div className="text-4xl font-bold font-mono">{timeLeft}</div>
      <button 
        onClick={toggleDate}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Przełącz Timer
      </button>
    </div>
  );
}
