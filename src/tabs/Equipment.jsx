import React, { useState } from 'react';
import { useCourse } from '../context/CourseContext';
import { Check, Filter, Package, AlertTriangle, ShieldCheck, Heart } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Equipment() {
  const { courseData, equipmentChecks, toggleEquipment } = useCourse();
  const [filterUnchecked, setFilterUnchecked] = useState(false);

  if (!courseData) return null;

  const totalItems = courseData.equipment.reduce((acc, cat) => acc + cat.items.length, 0);
  const checkedItems = Object.values(equipmentChecks).filter(v => v).length;
  const progressPercent = (checkedItems / totalItems) * 100;

  return (
    <div className="space-y-6">
      {/* Stats & Controls */}
      <section className="glass rounded-3xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">장비 체크리스트</h2>
            <p className="text-xs text-white/40">준비 완료: {checkedItems} / {totalItems}</p>
          </div>
          <button 
            onClick={() => setFilterUnchecked(!filterUnchecked)}
            className={cn(
              "p-2 rounded-xl border transition-all",
              filterUnchecked ? "bg-primary/20 border-primary text-primary" : "border-white/10 text-white/40"
            )}
          >
            <Filter size={18} />
          </button>
        </div>

        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </section>

      {/* Categories */}
      <div className="space-y-8">
        {courseData.equipment.map((category) => {
          const visibleItems = filterUnchecked 
            ? category.items.filter(item => !equipmentChecks[item.name])
            : category.items;

          if (visibleItems.length === 0) return null;

          return (
            <div key={category.category} className="space-y-3">
              <h3 className="text-sm font-black text-primary/80 uppercase tracking-widest px-2">
                {category.category}
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {visibleItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => toggleEquipment(item.name)}
                    className={cn(
                      "flex items-center gap-4 glass-dark rounded-2xl p-4 text-left transition-all",
                      equipmentChecks[item.name] ? "opacity-40 grayscale-[0.5]" : "hover:bg-white/5"
                    )}
                  >
                    <div className={cn(
                      "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                      equipmentChecks[item.name] 
                        ? "bg-primary border-primary text-white" 
                        : "border-white/10 text-transparent"
                    )}>
                      <Check size={14} strokeWidth={4} />
                    </div>
                    <div className="flex-1 flex justify-between items-center">
                      <span className={cn("text-sm font-medium", equipmentChecks[item.name] && "line-through")}>
                        {item.name}
                      </span>
                      <Badge type={item.priority} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Badge({ type }) {
  const styles = {
    '필수': 'bg-red-500/10 text-red-500 border-red-500/20',
    '권장': 'bg-primary/10 text-primary border-primary/20',
    '선택': 'bg-white/5 text-white/40 border-white/10',
  };

  const icons = {
    '필수': AlertTriangle,
    '권장': ShieldCheck,
    '선택': Heart,
  };

  const Icon = icons[type] || Package;

  return (
    <span className={cn(
      "text-[9px] font-black px-2 py-1 rounded-lg border flex items-center gap-1",
      styles[type]
    )}>
      <Icon size={10} />
      {type}
    </span>
  );
}
