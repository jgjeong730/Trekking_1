import React from 'react';
import { Home, Calendar, CheckCircle2, Package, Wallet } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const tabs = [
  { id: 'overview', label: '개요', icon: Home },
  { id: 'schedule', label: '일정', icon: Calendar },
  { id: 'checklist', label: '체크', icon: CheckCircle2 },
  { id: 'equipment', label: '장비', icon: Package },
  { id: 'cost', label: '비용', icon: Wallet },
];

export default function BottomNav({ activeTab, setActiveTab }) {
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[calc(448px-2rem)] glass rounded-2xl px-2 py-3 z-50">
      <ul className="flex justify-around items-end">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <li key={tab.id} className="relative">
              <button
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex flex-col items-center gap-1 transition-all duration-300",
                  isActive ? "text-primary scale-110" : "text-foreground/40 hover:text-foreground/60"
                )}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium">{tab.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full" />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
