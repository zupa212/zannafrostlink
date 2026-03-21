"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Instagram, 
  Facebook,
  CheckCircle2, 
  ArrowUpRight,
  MapPin,
  Link as LinkIcon,
  Sparkles,
  Lock
} from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
import { useLocation } from '@/hooks/use-location';
import { ContentWarning } from '@/components/content-warning';
import { CountdownTimer } from '@/components/countdown-timer';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMounted(true);

    const handleContext = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && e.key === 'U') ||
        (e.metaKey && e.altKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.metaKey && e.key === 'U')
      ) {
        e.preventDefault();
      }
    };
    const handleDrag = (e: DragEvent) => e.preventDefault();
    const handleSelect = (e: Event) => e.preventDefault();

    document.addEventListener('contextmenu', handleContext);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDrag);
    document.addEventListener('selectstart', handleSelect);

    return () => {
      document.removeEventListener('contextmenu', handleContext);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDrag);
      document.removeEventListener('selectstart', handleSelect);
    };
  }, []);

  const handleExclusiveClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
    const isSocialApp = ua.indexOf("Instagram") > -1 || ua.indexOf("FBAN") > -1 || ua.indexOf("FBAV") > -1;
    
    if (isSocialApp) {
      e.preventDefault();
      setShowWarning(true);
    }
  };

  if (!isMounted) {
    return <div className="min-h-screen bg-[#1a0b2e]" />;
  }

  return (
    <main className="relative min-h-screen text-white overflow-x-hidden select-none selection:bg-pink-300 selection:text-black font-sans bg-black">
      {/* Background Video Layer */}
      <div className="fixed inset-[-100px] z-0 pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/zanna_bg.mov" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30" />
      </div>


      {/* Content Warning Overlay */}
      <ContentWarning 
        isOpen={showWarning} 
        onClose={() => setShowWarning(false)} 
      />

      {/* Content Wrapper */}
      <div className="relative z-10 container mx-auto px-6 py-12 flex flex-col items-center max-w-lg">
        
        {/* Top Location Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel px-5 py-2.5 rounded-full flex items-center gap-2.5 mb-8 transition-all hover:bg-white/10"
        >
          <MapPin size={14} className="text-[#34d399]" />
          <span className="text-xs font-semibold text-white/90 tracking-widest uppercase">
            {location.city ? `${location.city}, ${location.country}` : "Sofia, BG"}
          </span>
        </motion.div>

        {/* Profile Section */}
        <div className="relative mb-6">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-[130px] h-[130px] md:w-36 md:h-36 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          >
            <div className="relative w-full h-full rounded-full overflow-hidden border border-white/5 bg-neutral-800">
              <Image 
                src="/zanna_1.jpg" 
                alt="Zanna Frost" 
                fill 
                className="object-cover"
                priority
              />
            </div>
            {/* Online Indicator - Hyper realistic iOS Badge */}
            <div className="absolute bottom-[6px] right-[6px] w-[22px] h-[22px] bg-[#34c759] border-[3.5px] border-black/80 rounded-full shadow-sm z-20" />
          </motion.div>
        </div>

        {/* Name & Identity */}
        <div className="text-center space-y-3 mb-12 w-full">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight">Zanna Frost</h1>
            <div className="bg-[#007aff] rounded-full p-0.5 shadow-[0_0_10px_rgba(0,122,255,0.4)]">
              <CheckCircle2 size={16} className="text-white fill-current" />
            </div>
          </div>
          <p className="text-base md:text-lg font-light tracking-wide leading-relaxed max-w-xs mx-auto text-white/80">
            Γιατί να διαλέξεις ενώ μπορείς να τα εχεις και τα δυο; 🍒🍑
          </p>
        </div>

        {/* Social Row */}
        <div className="flex justify-center gap-6 md:gap-8 mb-14">
          {[
            { 
              Icon: Instagram, 
              href: "https://www.instagram.com/zannafrost/" 
            },
            { 
              Icon: Facebook, 
              href: "https://www.facebook.com/zannafrost" 
            },
            { 
              Icon: (props: any) => (
                <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              ), 
              href: "https://www.tiktok.com/@zannafrost?lang=el-GR" 
            }
          ].map(({ Icon, href }, idx) => (
            <motion.a
              key={idx}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, translateY: -5 }}
              className="text-white/80 hover:text-white transition-all transform"
            >
              <Icon size={28} className="drop-shadow-md" />
            </motion.a>
          ))}
        </div>

        {/* My Secret Card (Exclusive) */}
        <motion.a 
          href="/out"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleExclusiveClick}
          whileHover={{ scale: 1.04 }}
          animate={{ 
            boxShadow: ["0 8px 32px rgba(157,129,116,0.3)", "0 8px 40px rgba(157,129,116,0.8)", "0 8px 32px rgba(157,129,116,0.3)"],
            borderColor: ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.6)", "rgba(255,255,255,0.2)"]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-full bg-[#9d8174]/90 backdrop-blur-3xl rounded-[32px] p-2.5 flex items-center mb-6 cursor-pointer relative group border-[1px]"
        >
          <div className="w-[52px] h-[52px] md:w-16 md:h-16 bg-white/20 backdrop-blur-2xl rounded-full flex items-center justify-center m-2 shrink-0 border-[0.5px] border-white/30 group-hover:bg-white/30 transition-colors">
            <LinkIcon size={20} className="text-white drop-shadow-md" />
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-white font-black text-xl md:text-2xl tracking-wide uppercase drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">My Secret</h3>
            <p className="text-white/80 font-bold text-[12px] md:text-sm tracking-widest uppercase mt-0.5">-50% OFF TODAY</p>
          </div>
          <div className="mr-3 md:mr-4 bg-white/20 backdrop-blur-xl px-3 flex items-center justify-center h-8 rounded-full gap-1.5 border-[0.5px] border-white/40 shadow-sm animate-pulse">
            <Sparkles size={11} className="text-[#ffe4e6]" />
            <span className="text-[9px] font-black text-white uppercase tracking-widest">Exclusive</span>
          </div>
        </motion.a>

        {/* Your Gift Card (Locked Banner) */}
        <motion.a 
          href="/out"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleExclusiveClick}
          whileHover={{ scale: 1.03 }}
          className="w-full block relative aspect-[21/9] bg-black rounded-[32px] overflow-hidden border-[1px] border-white/15 shadow-[0_8px_40px_rgba(0,0,0,0.6)] mb-12 cursor-pointer group"
        >
          <Image 
            src="/zanna_2.jpg" 
            alt="Your Gift" 
            fill 
            className="object-cover opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-700 blur-[2px]" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-[0.5px] border-white/30 mb-3 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              <Lock size={20} className="text-white drop-shadow-md" />
            </div>
            <h3 className="text-3xl md:text-4xl font-black tracking-tight uppercase text-white drop-shadow-lg">
              YOUR GIFT
            </h3>
            <span className="text-white/70 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mt-2 bg-black/40 px-3 py-1 rounded-full">
              Tap to Unlock
            </span>
          </div>
        </motion.a>

        {/* Countdown Section */}
        <div className="w-full text-center space-y-4 mb-20">
          <CountdownTimer />
        </div>

        {/* Flawless Footer */}
        <footer className="mt-auto pt-16 pb-8 text-white/40 text-[10px] sm:text-[11px] font-light tracking-[0.3em] uppercase text-center space-y-6 w-full blur-[0.3px] hover:blur-none transition-all duration-500">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 opacity-70 hover:opacity-100 transition-opacity">
            <Link href="/admin" className="hover:text-white transition-colors duration-300 tracking-widest">Admin Access</Link>
            <span className="hidden sm:inline text-white/20">•</span>
            <a href="#" className="hover:text-white transition-colors duration-300 tracking-widest">Terms of Service</a>
            <span className="hidden sm:inline text-white/20">•</span>
            <a href="#" className="hover:text-white transition-colors duration-300 tracking-widest">Privacy Policy</a>
          </div>
          <p className="opacity-50 font-extralight tracking-[0.4em]">© 2026 ZANNA FROST. <br className="sm:hidden" />ALL RIGHTS RESERVED.</p>
        </footer>

      </div>
    </main>
  );
}
