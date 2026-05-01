import React, { useState } from 'react';
import { useCourse } from '../context/CourseContext';
import { Check, SlidersHorizontal, AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react';

const PRIORITY = {
  '필수': { cls: 'bg-red-500/8 text-red-400 border-red-500/15',    Icon: AlertTriangle },
  '권장': { cls: 'bg-primary/8 text-primary border-primary/15',     Icon: ShieldCheck },
  '선택': { cls: 'bg-white/4 text-white/35 border-white/8',         Icon: Sparkles },
};

export default function Equipment() {
  const { courseData, equipmentChecks, toggleEquipment } = useCourse();
  const [filterUnchecked, setFilterUnchecked] = useState(false);

  if (!courseData) return null;

  const totalItems   = courseData.equipment.reduce((acc, c) => acc + c.items.length, 0);
  const checkedItems = Object.values(equipmentChecks).filter(Boolean).length;
  const pct          = totalItems ? Math.round((checkedItems / totalItems) * 100) : 0;

  return (
    <div className="space-y-6 pb-2">

      {/* ── Header card ── */}
      <div className="card space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-black text-white">장비 체크리스트</h2>
            <p className="text-[10px] text-white/30 mt-0.5 font-medium">
              {checkedItems} / {totalItems}개 준비 완료
            </p>
          </div>
          <button
            onClick={() => setFilterUnchecked(v => !v)}
            className={[
              'w-8 h-8 rounded-xl border flex items-center justify-center',
              'transition-all duration-200',
              filterUnchecked
                ? 'bg-primary/10 border-primary/30 text-primary'
                : 'border-white/8 text-white/30 hover:border-white/15 hover:text-white/50',
            ].join(' ')}
          >
            <SlidersHorizontal size={14} />
          </button>
        </div>

        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[9px] font-black">
          <span className="text-white/20">0%</span>
          <span className="text-primary">{pct}%</span>
          <span className="text-white/20">100%</span>
        </div>
      </div>

      {/* ── Categories ── */}
      <div className="space-y-6">
        {courseData.equipment.map((cat) => {
          const items = filterUnchecked
            ? cat.items.filter(i => !equipmentChecks[i.name])
            : cat.items;
          if (items.length === 0) return null;

          return (
            <div key={cat.category} className="space-y-2">
              <div className="flex items-center gap-2 px-0.5">
                <span className="text-[9px] font-black text-primary/70 uppercase tracking-widest">
                  {cat.category}
                </span>
                <div className="flex-1 h-px bg-white/5" />
                <span className="text-[9px] text-white/20 font-bold">
                  {cat.items.filter(i => equipmentChecks[i.name]).length}/{cat.items.length}
                </span>
              </div>

              <div className="space-y-1.5">
                {items.map((item) => {
                  const done = !!equipmentChecks[item.name];
                  const p    = PRIORITY[item.priority] || PRIORITY['선택'];
                  const PIcon = p.Icon;

                  return (
                    <button
                      key={item.name}
                      onClick={() => toggleEquipment(item.name)}
                      className={[
                        'w-full text-left glass-dark rounded-xl px-4 py-3',
                        'flex items-center gap-3 group',
                        'transition-all duration-200',
                        done ? 'opacity-35' : 'hover:bg-white/[0.03] hover:border-white/10',
                      ].join(' ')}
                    >
                      {/* Checkbox */}
                      <div className={[
                        'w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0',
                        'transition-all duration-200',
                        done
                          ? 'bg-primary border-primary'
                          : 'border-white/12 group-hover:border-white/20',
                      ].join(' ')}>
                        {done && <Check size={11} strokeWidth={3.5} className="text-white" />}
                      </div>

                      {/* Name */}
                      <span className={[
                        'flex-1 text-sm font-bold',
                        done ? 'line-through text-white/30' : 'text-white',
                      ].join(' ')}>
                        {item.name}
                      </span>

                      {/* Priority badge */}
                      <span className={`badge ${p.cls} shrink-0`}>
                        <PIcon size={9} />
                        {item.priority}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
