import React, { useState } from 'react';
import { CourseProvider } from './context/CourseContext';
import BottomNav from './components/layout/BottomNav';
import Overview from './tabs/Overview';
import Schedule from './tabs/Schedule';
import Checklist from './tabs/Checklist';
import Equipment from './tabs/Equipment';
import Cost from './tabs/Cost';
import { AnimatePresence, motion } from 'framer-motion';

function AppContent() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderTab = () => {
    switch (activeTab) {
      case 'overview': return <Overview />;
      case 'schedule': return <Schedule />;
      case 'checklist': return <Checklist />;
      case 'equipment': return <Equipment />;
      case 'cost': return <Cost />;
      default: return <Overview />;
    }
  };

  return (
    <div className="min-h-screen pb-24 max-w-md mx-auto px-4 pt-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
          My Trekking Planner
        </h1>
      </header>

      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderTab()}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

function App() {
  return (
    <CourseProvider>
      <AppContent />
    </CourseProvider>
  );
}

export default App;
