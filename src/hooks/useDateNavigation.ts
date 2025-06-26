
import { useState, useEffect } from 'react';

export const useDateNavigation = () => {
  const [currentDate, setCurrentDate] = useState<string>('');
  const [availableDates, setAvailableDates] = useState<string[]>([]);

  // Initialize with today's date
  useEffect(() => {
    const today = new Date();
    const dateString = today.toISOString().split('T')[0];
    setCurrentDate(dateString);
    
    // Generate sample available dates (last 30 days)
    const dates: string[] = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    setAvailableDates(dates);
  }, []);

  const goToPreviousDay = () => {
    const currentIndex = availableDates.indexOf(currentDate);
    if (currentIndex < availableDates.length - 1) {
      setCurrentDate(availableDates[currentIndex + 1]);
    }
  };

  const goToNextDay = () => {
    const currentIndex = availableDates.indexOf(currentDate);
    if (currentIndex > 0) {
      setCurrentDate(availableDates[currentIndex - 1]);
    }
  };

  const hasNext = availableDates.indexOf(currentDate) > 0;
  const hasPrevious = availableDates.indexOf(currentDate) < availableDates.length - 1;

  return {
    currentDate,
    goToPreviousDay,
    goToNextDay,
    hasNext,
    hasPrevious
  };
};
