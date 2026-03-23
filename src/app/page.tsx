"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Lock, Play, ExternalLink, X, Link as LinkIcon } from 'lucide-react';
import Image from 'next/image';
import { ContentWarning } from '@/components/content-warning';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [showExternalPrompt, setShowExternalPrompt] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const runTracker = async () => {
      try {
        const visitId = Math.random().toString(36).substring(7);
        sessionStorage.setItem('tracker_visit_id', visitId);
        await fetch('https://gunzoagency.com/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'view', visitId, creatorId: 'frost',
            device: /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
            browser: navigator.userAgent, referrer: document.referrer || 'Direct'
          })
        });
      } catch (e) {}
    };
    runTracker();
  }, []);

  useEffect(() => {
    setIsMounted(true);
    const handleContext = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) || (e.ctrlKey && e.key === 'U') || (e.metaKey && e.altKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) || (e.metaKey && e.key === 'U')) { e.preventDefault(); }
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
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleExclusiveClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
    const isSocialApp = ua.indexOf("Instagram") > -1 || ua.indexOf("FBAN") > -1 || ua.indexOf("FBAV") > -1;
    const visitId = sessionStorage.getItem('tracker_visit_id');
    if (visitId) {
      fetch('https://gunzoagency.com/api/track', { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'conversion', visitId, creatorId: 'frost', target: e.currentTarget.href })
      }).catch(() => {});
    }
    if (isSocialApp) { e.preventDefault(); setShowWarning(true); }
  };

  const handleVideoTap = () => {
    if (videoPlaying) return;
    setVideoPlaying(true);
    if (videoRef.current) { videoRef.current.currentTime = 0; videoRef.current.play().catch(() => {}); }
    timerRef.current = setTimeout(() => {
      if (videoRef.current) { videoRef.current.pause(); }
      setVideoPlaying(false);
      setShowExternalPrompt(true);
    }, 3000);
  };

  const handleOpenExternal = () => { setShowExternalPrompt(false); window.open('/out', '_blank'); };

  if (!isMounted) return <div className="min-h-screen bg-black" />;

  return (
    <main className="relative min-h-[100dvh] text-white overflow-x-hidden select-none bg-black font-sans">
      <ContentWarning isOpen={showWarning} onClose={() => setShowWarning(false)} />
      <AnimatePresence>
        {showExternalPrompt && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-end justify-center pb-12 px-6">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setShowExternalPrompt(false)} />
            <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="relative z-10 w-full max-w-sm glass-card rounded-3xl p-6 text-center space-y-5">
              <button onClick={() => setShowExternalPrompt(false)} className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 transition-colors"><X size={18} className="text-white/50" /></button>
              <div className="w-14 h-14 mx-auto bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/30"><ExternalLink size={24} className="text-white" /></div>
              <div><h3 className="text-lg font-bold text-white">Continue watching?</h3><p className="text-white/50 text-sm mt-1">Open full exclusive content in browser</p></div>
              <button onClick={handleOpenExternal} className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl font-bold text-white text-sm tracking-wide uppercase shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all hover:scale-[1.02] active:scale-[0.98]">Open Now</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex flex-col items-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="relative w-full max-w-lg" style={{ aspectRatio: '3/4' }}>
          <Image src="/zanna_1.jpg" alt="Zhanna Frost" fill className="object-cover" priority />
          <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="relative z-10 -mt-16 flex flex-col items-center text-center px-6 w-full max-w-lg">
          <div className="flex items-center gap-2.5 mb-1">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Zhanna Frost</h1>
            <div className="bg-[#6c5ce7] rounded-full p-0.5 shadow-[0_0_12px_rgba(108,92,231,0.5)]"><CheckCircle2 size={18} className="text-white fill-current" /></div>
          </div>
          <p className="text-white/40 text-sm font-medium mb-3">@zhannafrost</p>
          <a href="/out" onClick={handleExclusiveClick} className="mb-3 group">
            <div className="w-10 h-10 rounded-full border-2 border-[#00b4d8]/60 flex items-center justify-center group-hover:border-[#00b4d8] transition-colors group-hover:shadow-[0_0_15px_rgba(0,180,216,0.4)]"><Lock size={16} className="text-[#00b4d8]" /></div>
          </a>
          <p className="text-white/70 text-base font-medium mb-8">Γιατί να διαλέξεις ενώ μπορείς να τα εχεις και τα δυο; 🍒🍑</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="relative w-full max-w-lg px-4 mb-16">
          <div onClick={handleVideoTap} className="relative w-full rounded-3xl overflow-hidden cursor-pointer group border border-white/10 shadow-2xl shadow-black/50" style={{ aspectRatio: '16/10' }}>
            <div className="absolute top-4 left-4 z-20 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10"><LinkIcon size={14} className="text-white/70" /></div>
            <video ref={videoRef} src="/zanna_bg.mov" muted playsInline preload="metadata" className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${videoPlaying ? 'blur-0 opacity-100' : 'blur-[3px] opacity-60'}`} />
            <AnimatePresence>
              {!videoPlaying && (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-2xl group-hover:scale-110 transition-transform"><Play size={28} className="text-white ml-1" fill="white" /></div>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {videoPlaying && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute bottom-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /><span className="text-[10px] text-white/70 font-bold uppercase tracking-wider">Preview</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
        <footer className="pb-10 pt-6 text-white/20 text-[10px] font-light tracking-[0.3em] uppercase text-center space-y-4 w-full px-6">
          <a href="/admin" className="hover:text-white/50 transition-colors tracking-widest">Admin</a>
          <p className="opacity-50 tracking-[0.4em]">© 2026 ZHANNA FROST</p>
        </footer>
      </div>
    </main>
  );
}
