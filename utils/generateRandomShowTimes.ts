// utils/generateRandomShowTimes.ts
export const generateRandomShowTimes = () => {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const times = ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "10:00 PM"];
    
    // Randomly select days and times for showtimes
    const showTimes = [];
    for (let i = 0; i < 3; i++) { // Create 3 random showtimes
      const day = daysOfWeek[Math.floor(Math.random() * daysOfWeek.length)];
      const time = times[Math.floor(Math.random() * times.length)];
      showTimes.push({ day, time: [time] });
    }
    return showTimes;
  };
  