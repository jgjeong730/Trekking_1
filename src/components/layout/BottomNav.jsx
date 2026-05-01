import React from 'react';
import { Home, Calendar, CheckCircle2, Package, Wallet } from 'lucide-react';

const tabs = [
  { id: 'overview',  label: '개요', icon: Home },
  { id: 'schedule',  label: '일정', icon: Calendar },
  { id: 'checklist', label: '체크', icon: CheckCircle2 },
  { id: 'equipment', label: '장비', icon: Package },
  { id: 'cost',      label: '비용', icon: Wallet },
];

export default function BottomNav({ activeTab, setActiveTab }) {
  return (
    <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50"
      style={{ width: 'min(calc(100vw - 2rem), 428px)' }}>
      <div className="glass rounded-2xl px-3 py-2.5"
        style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)' }}>
        <ul className="flex justify-around items-center">
          {tabs.map(({ id, label, icon: Icon }) => {
            const active = activeTab === id;
            return (
              <li key={id}>
                <button
                  onClick={() => setActiveTab(id)}
                  className="relative flex flex-col items-center gap-1 px-3 py-1 rounded-xl
                             transition-all duration-200 group"
                  style={{ color: active ? '#10b981' : 'rgba(255,255,255,0.35)' }}
                >
                  {/* Active background pill */}
                  {active && (
                    <span className="absolute inset-0 rounded-xl bg-primary/8 border border-primary/15" />
                  )}
                  <Icon
                    size={18}
                    strokeWidth={active ? 2.5 : 1.8}
                    className="relative z-10 transition-transform duration-200 group-hover:scale-110"
                  />
                  <span className="relative z-10 text-[9px] font-black tracking-wider">
                    {label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
