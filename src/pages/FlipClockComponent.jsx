import React, { useEffect, useRef } from 'react';

const FlipClockComponent = () => {
  const clockRef = useRef(null);

  useEffect(() => {
    // Grab the current date
    let currentDate = new Date();

    // Target future date/24 hour time/Timezone
    let targetDate = moment.tz("2024-02-14 12:00", "Asia/Kolkata");

    // Calculate the difference in seconds between the future and current date
    let diff = targetDate / 1000 - currentDate.getTime() / 1000;

    let clock;

    if (diff <= 0) {
      // If remaining countdown is 0
      clock = new FlipClock(clockRef.current, 0, {
        clockFace: "DailyCounter",
        countdown: true,
        autostart: false
      });
      console.log("Date has already passed!");
    } else {
      // Run countdown timer
      clock = new FlipClock(clockRef.current, diff, {
        clockFace: "DailyCounter",
        countdown: true,
        callbacks: {
          stop: function() {
            console.log("Timer has ended!");
          }
        }
      });

      // Check when timer reaches 0, then stop at 0
      const checktime = () => {
        let t = clock.getTime();
        if (t <= 0) {
          clock.setTime(0);
        }
        setTimeout(checktime, 1000);
      };

      setTimeout(checktime, 1000);
    }

    // Cleanup function to stop the clock when the component unmounts
    return () => {
      if (clock) {
        clock.stop();
      }
    };
  }, []);

  return <div ref={clockRef} className="clock"></div>;
};

export default FlipClockComponent;