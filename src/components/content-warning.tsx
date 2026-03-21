"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, EyeOff } from 'lucide-react';

interface ContentWarningProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContentWarning: React.FC<ContentWarningProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
        >
          {/* Backdrop Blur & Darkening */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

          {/* Top Bar Controls */}
          <div className="absolute top-0 inset-x-0 p-6 flex justify-between items-start">
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"
            >
              <X size={28} />
            </button>

            {/* Hint Tooltip (Top Right) */}
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <div className="bg-white text-black text-[11px] font-bold px-4 py-2 rounded-xl shadow-2xl flex flex-col items-center leading-tight">
                <span className="whitespace-nowrap">Click •••</span>
                <span className="whitespace-nowrap text-center">to open in</span>
                <span className="whitespace-nowrap">external</span>
                <span className="whitespace-nowrap">browser</span>
                {/* Tooltip triangle */}
                <div className="absolute -top-1.5 right-4 w-3 h-3 bg-white rotate-45" />
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative z-10 w-full max-w-lg px-8 flex flex-col items-center text-center"
          >
            <div className="mb-8 text-white/40">
              <EyeOff size={64} strokeWidth={1.5} />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
              18+ Content Warning
            </h2>
            
            <p className="text-neutral-400 text-sm md:text-base mb-12 max-w-xs mx-auto leading-relaxed">
              This link may contain graphic or adult content.
            </p>

            <div className="space-y-6 w-full max-w-xs text-left">
              <p className="text-white font-bold text-lg text-center mb-6">
                To visit this link
              </p>
              
              <ol className="space-y-4 text-neutral-300">
                <li className="flex gap-4 items-start">
                  <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5">
                    1
                  </span>
                  <p className="text-sm">Tap the three dots on the top right.</p>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5">
                    2
                  </span>
                  <p className="text-sm">Select "Open in external browser"</p>
                </li>
              </ol>
            </div>
          </motion.div>

          {/* Bottom gradient hint */}
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
