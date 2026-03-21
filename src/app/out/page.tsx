"use client";

import { useEffect } from 'react';

export default function OutPage() {
  useEffect(() => {
    // Obfuscate the URL so static bots scraping the source code don't flag the domain
    const pt1 = "https://only";
    const pt2 = "fans.com";
    const pt3 = "/zannafrost/c20";
    
    // Redirect almost immediately
    setTimeout(() => {
      window.location.href = pt1 + pt2 + pt3;
    }, 300);
  }, []);

  return (
    <div className="min-h-[100dvh] bg-black flex items-center justify-center overflow-hidden overscroll-none">
      <div className="flex flex-col items-center justify-center gap-4">
        {/* Loading Spinner */}
        <div className="w-8 h-8 md:w-10 md:h-10 border-4 border-[#9d8174]/30 border-t-[#ec4899] rounded-full animate-spin shadow-[0_0_15px_rgba(236,72,153,0.5)]" />
        <p className="text-white/60 text-xs md:text-sm tracking-[0.2em] font-medium uppercase animate-pulse">
          Loading Secure Link...
        </p>
      </div>
    </div>
  );
}
