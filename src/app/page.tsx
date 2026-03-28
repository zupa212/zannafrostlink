"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Lock, Link as LinkIcon } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);
  if (!isMounted) return <div className="min-h-screen bg-black" />;

  return (
    <main className="relative min-h-[100dvh] text-white overflow-x-hidden bg-black font-sans">
      <div className="flex flex-col items-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="relative w-full max-w-lg" style={{ aspectRatio: '3/4' }}>
          <Image src="/frost3.jpg" alt="Zhanna Frost" fill className="object-cover" priority />
          <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="relative z-10 -mt-16 flex flex-col items-center text-center px-6 w-full max-w-lg">
          <div className="flex items-center gap-2.5 mb-1">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Zhanna Frost</h1>
            <div className="bg-[#6c5ce7] rounded-full p-0.5 shadow-[0_0_12px_rgba(108,92,231,0.5)]"><CheckCircle2 size={18} className="text-white fill-current" /></div>
          </div>
          <p className="text-white/40 text-sm font-medium mb-3">@zhannafrost</p>
          <a href="/out" className="mb-3 group">
            <div className="w-10 h-10 rounded-full border-2 border-[#00b4d8]/60 flex items-center justify-center group-hover:border-[#00b4d8] transition-colors group-hover:shadow-[0_0_15px_rgba(0,180,216,0.4)]"><Lock size={16} className="text-[#00b4d8]" /></div>
          </a>
          <p className="text-white/70 text-base font-medium mb-8">Αφου βαρεθηκες την φασολαδα... ελα να δοκιμασεις το λουκανικο..😜</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="relative w-full max-w-lg px-4 mb-16">
          <a href="/out" className="block relative w-full rounded-3xl overflow-hidden cursor-pointer group border border-white/10 shadow-2xl shadow-black/50" style={{ aspectRatio: '16/10' }}>
            <div className="absolute top-4 left-4 z-20 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10"><LinkIcon size={14} className="text-white/70" /></div>
            <video src="/frost4.MOV" autoPlay loop muted playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover blur-[3px] opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-2xl group-hover:scale-110 transition-transform"><Lock size={24} className="text-white" /></div>
            </div>
          </a>
        </motion.div>
        <footer className="pb-10 pt-6 text-white/20 text-[10px] font-light tracking-[0.3em] uppercase text-center space-y-4 w-full px-6">
          <a href="/admin" className="hover:text-white/50 transition-colors tracking-widest">Admin</a>
          <p className="opacity-50 tracking-[0.4em]">© 2026 ZHANNA FROST</p>
        </footer>
      </div>
    </main>
  );
}
