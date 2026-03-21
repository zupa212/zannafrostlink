"use client";

import React, { useState, useEffect } from 'react';

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hrs: 5,
    mins: 29,
    secs: 54
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hrs, mins, secs } = prev;
        if (secs > 0) {
          secs--;
        } else if (mins > 0) {
          secs = 59;
          mins--;
        } else if (hrs > 0) {
          secs = 59;
          mins = 59;
          hrs--;
        }
        return { hrs, mins, secs };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="flex items-center justify-center w-full mt-2 mb-10">
      <div className="bg-[#2c2225]/80 backdrop-blur-3xl border-[0.5px] border-white/15 rounded-full px-5 py-3 flex items-center justify-center gap-5 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
        
        {/* SALE ENDS Indicator */}
        <div className="flex items-center gap-2 px-3 py-1 bg-red-500/20 rounded-full border-[0.5px] border-red-500/30">
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
          <span className="text-white/90 text-[9px] md:text-[10px] font-black uppercase tracking-widest">
            Sale Ends
          </span>
        </div>

        {/* Timer Numbers */}
        <div className="flex items-start gap-2.5">
          <div className="flex flex-col items-center justify-center">
            <span className="text-white font-bold text-[15px] md:text-base tracking-widest leading-none drop-shadow-md">
              {formatNumber(timeLeft.hrs)}
            </span>
            <span className="text-white/40 text-[7px] md:text-[8px] uppercase font-black tracking-widest mt-1">Hrs</span>
          </div>
          
          <span className="text-white/30 text-[10px] font-bold mt-0.5">:</span>
          
          <div className="flex flex-col items-center justify-center">
            <span className="text-white font-bold text-[15px] md:text-base tracking-widest leading-none drop-shadow-md">
              {formatNumber(timeLeft.mins)}
            </span>
            <span className="text-white/40 text-[7px] md:text-[8px] uppercase font-black tracking-widest mt-1">Min</span>
          </div>
          
          <span className="text-white/30 text-[10px] font-bold mt-0.5">:</span>
          
          <div className="flex flex-col items-center justify-center">
            <span className="text-white font-black text-[15px] md:text-base tracking-widest leading-none text-rose-300 drop-shadow-[0_0_12px_rgba(244,63,94,0.6)]">
              {formatNumber(timeLeft.secs)}
            </span>
            <span className="text-white/40 text-[7px] md:text-[8px] uppercase font-black tracking-widest mt-1">Sec</span>
          </div>
        </div>

      </div>
    </div>
  );
};
