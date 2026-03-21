"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, 
  LayoutDashboard, 
  Settings, 
  Users, 
  BarChart3, 
  LogOut,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel w-full max-w-md p-8 rounded-4xl border-white/10"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-pink-500/10 rounded-full flex items-center justify-center mb-4 border border-pink-500/20">
              <ShieldCheck className="text-pink-400" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Admin Portal</h1>
            <p className="text-neutral-500 text-sm mt-1">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
              <input 
                type="password"
                placeholder="Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all"
              />
            </div>
            
            {error && (
              <p className="text-red-400 text-xs px-2">{error}</p>
            )}

            <button 
              type="submit"
              className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-neutral-200 transition-colors shadow-lg"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center px-4">
            <Link href="/" className="text-neutral-500 text-xs hover:text-white transition-colors">
              ← Return to Landing Page
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-black/50 p-6 flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center">
            <ShieldCheck className="text-pink-400" size={18} />
          </div>
          <span className="font-bold tracking-tight">Zanna Frost Admin</span>
        </div>

        <nav className="flex flex-col gap-2">
          <button className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl text-white">
            <LayoutDashboard size={18} />
            <span className="text-sm font-medium">Dashboard</span>
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-neutral-400 hover:bg-white/5 rounded-xl transition-colors">
            <Users size={18} />
            <span className="text-sm font-medium">Subscribers</span>
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-neutral-400 hover:bg-white/5 rounded-xl transition-colors">
            <BarChart3 size={18} />
            <span className="text-sm font-medium">Analytics</span>
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-neutral-400 hover:bg-white/5 rounded-xl transition-colors">
            <Settings size={18} />
            <span className="text-sm font-medium">Settings</span>
          </button>
        </nav>

        <div className="mt-auto">
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-3 px-4 py-3 w-full text-red-400/80 hover:bg-red-500/10 rounded-xl transition-colors"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
            <p className="text-neutral-500 mt-1">Real-time stats for your profile</p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-xl text-pink-400 text-xs font-bold">
              PRO ACCOUNT
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: "Total Views", value: "12,842", trend: "+14.2%" },
            { label: "Link Clicks", value: "3,105", trend: "+8.7%" },
            { label: "Conversion", value: "24.1%", trend: "+2.1%" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-6 rounded-3xl border-white/5"
            >
              <p className="text-neutral-400 text-sm mb-2">{stat.label}</p>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <span className="text-xs font-bold text-green-400">{stat.trend}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Recent Activity</h3>
            <button className="text-pink-300 text-sm hover:underline">View all</button>
          </div>
          
          <div className="glass-panel rounded-3xl border-white/5 overflow-hidden">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 border-b border-white/5 hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center text-xs text-neutral-500">
                    user_{item}
                  </div>
                  <div>
                    <p className="text-sm font-medium">New click on "Exclusive Content"</p>
                    <p className="text-[10px] text-neutral-500">2 minutes ago</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-neutral-700" />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
