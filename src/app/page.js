"use client";

import { useState, useEffect } from 'react';
import { TimerDisplay } from '@/app/components/TimeDisplay';
import { TimerControls } from '@/app/components/TimeControls';
import { EmptyState } from '@/app/components/EmptyState';
import { Footer } from '@/app/components/Footer';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState('Loading...');
  const [timers, setTimers] = useState([
    { name: "Koniec kadencji prezydenta Karola Nawrockiego", date: '2030-08-06T00:00:00' }
  ]);
  const [currentTimerIndex, setCurrentTimerIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage after mount
  useEffect(() => {
    const savedTimers = localStorage.getItem('timers');
    const savedIndex = localStorage.getItem('currentTimerIndex');
    
    if (savedTimers) {
      setTimers(JSON.parse(savedTimers));
    }
    if (savedIndex) {
      setCurrentTimerIndex(parseInt(savedIndex));
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('timers', JSON.stringify(timers));
      localStorage.setItem('currentTimerIndex', currentTimerIndex.toString());
    }
  }, [timers, currentTimerIndex, isLoaded]);

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
    <div className="min-h-screen flex flex-col items-center justify-center gap-1 p-2 sm:gap-2 sm:p-4">
      {timers.length > 0 ? (
        <>
          <TimerDisplay 
            timer={timers[currentTimerIndex]}
            timeLeft={timeLeft}
            totalTimers={timers.length}
            currentIndex={currentTimerIndex}
            onClick={toggleTimer}
          />
          <TimerControls 
            onEdit={editTimer}
            onAdd={addNewTimer}
            onDelete={deleteTimer}
          />
        </>
      ) : (
        <EmptyState onAdd={addNewTimer} />
      )}
      <Footer />
    </div>
  );
}
