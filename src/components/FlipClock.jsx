import React, { useEffect, useRef } from 'react';

const FlipClock = () => {
  const clockRef = useRef(null);

  useEffect(() => {
    // Load FlipClock CSS from CDN
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/flipclock/0.7.8/flipclock.min.css';
    document.head.appendChild(link);

    // Load FlipClock JS from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/flipclock/0.7.8/flipclock.min.js';
    script.async = true;
    
    script.onload = () => {
      if (window.FlipClock && clockRef.current) {
        const currentDate = new Date();
        const targetDate = new Date('2025-11-30T12:00:00'); // Your wedding date
        const diff = (targetDate - currentDate) / 1000;

        let clock;

        if (diff <= 0) {
          clock = new window.FlipClock(clockRef.current, 0, {
            clockFace: 'DailyCounter',
            countdown: true,
            autostart: false
          });
        } else {
          clock = new window.FlipClock(clockRef.current, diff, {
            clockFace: 'DailyCounter',
            countdown: true,
            callbacks: {
              stop: function() {
                console.log('Timer has ended!');
              }
            }
          });

          const checktime = () => {
            const t = clock.getTime();
            if (t <= 0) {
              clock.setTime(0);
            }
            setTimeout(checktime, 1000);
          };
          setTimeout(checktime, 1000);
        }
      }
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return <div ref={clockRef} className="flip-clock mx-auto scale-75 md:scale-100"></div>;
};

export default FlipClock;