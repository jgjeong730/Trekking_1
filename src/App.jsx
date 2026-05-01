import React, { useState } from 'react';
import { CourseProvider } from './context/CourseContext';
import BottomNav from './components/layout/BottomNav';
import Overview from './tabs/Overview';
import Schedule from './tabs/Schedule';
import Checklist from './tabs/Checklist';
import Equipment from './tabs/Equipment';
import Cost from './tabs/Cost';
import { AnimatePresence, motion } from 'framer-motion';
import { Mountain } from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderTab = () => {
    switch (activeTab) {
      case 'overview':  return <Overview />;
      case 'schedule':  return <Schedule />;
      case 'checklist': return <Checklist />;
      case 'equipment': return <Equipment />;
      case 'cost':      return <Cost />;
      default:          return <Overview />;
    }
  };

  return (
    <div className="min-h-screen pb-28 max-w-md mx-auto">
      {/* Top Header */}
      <header className="sticky top-0 z-40 px-5 pt-6 pb-4"
        style={{ background: 'linear-gradient(to bottom, #0a0a0f 70%, transparent)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Mountain size={16} className="text-primary" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-sm font-black tracking-tight text-white leading-none">
                My Trekking Planner
              </h1>
              <p className="text-[9px] text-white/30 font-medium tracking-widest uppercase mt-0.5">
                지리산 종주
              </p>
            </div>
          </div>
          <div className="h-6 px-2.5 rounded-full border border-primary/20 bg-primary/5
                          flex items-center text-[9px] font-black text-primary tracking-wider">
            3박 4일
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
          >
            {renderTab()}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default function App() {
  return (
    <CourseProvider>
      <AppContent />
    </CourseProvider>
  );
}
