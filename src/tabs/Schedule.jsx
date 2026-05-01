import React, { useState } from 'react';
import { useCourse } from '../context/CourseContext';
import {
  Bus, Car, Footprints, Utensils, Sunrise, Home,
  Clock, Ruler, Wallet, AlertTriangle, Info,
} from 'lucide-react';

const TYPE_ICON = {
  transport: Bus,
  hiking:    Footprints,
  meal:      Utensils,
  event:     Sunrise,
  stay:      Home,
};
const TYPE_COLOR = {
  transport: { bg: 'bg-blue-500/15',   text: 'text-blue-400',   border: 'border-blue-500/20'   },
  hiking:    { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  meal:      { bg: 'bg-red-500/15',     text: 'text-red-400',     border: 'border-red-500/20'    },
  event:     { bg: 'bg-amber-500/15',   text: 'text-amber-400',   border: 'border-amber-500/20'  },
  stay:      { bg: 'bg-violet-500/15',  text: 'text-violet-400',  border: 'border-violet-500/20' },
};
const DIFF_COLOR = {
  '매우 높음': 'diff-very-high',
  '높음':     'diff-high',
  '보통':     'diff-medium',
};

export default function Schedule() {
  const { courseData } = useCourse();
  const [activeDay, setActiveDay] = useState(1);
  if (!courseData) return null;

  const dayData = courseData.days.find(d => d.day === activeDay);

  return (
    <div className="space-y-5 pb-2">

      {/* ── Day selector tabs ── */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-1 px-1 pb-1">
        {courseData.days.map((day) => {
          const active = activeDay === day.day;
          return (
            <button
              key={day.day}
              onClick={() => setActiveDay(day.day)}
              className={[
                'flex-shrink-0 rounded-xl px-4 py-2 text-[11px] font-black border transition-all duration-200',
                active
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                  : 'glass text-white/40 border-transparent hover:text-white/60 hover:border-white/10',
              ].join(' ')}
            >
              {day.day}일차
            </button>
          );
        })}
      </div>

      {/* Day title */}
      {dayData && (
        <p className="text-[10px] font-black text-white/30 uppercase tracking-widest px-0.5">
          {dayData.title}
        </p>
      )}

      {/* ── Timeline ── */}
      <div className="relative space-y-0">
        {/* Vertical spine */}
        <div className="absolute left-[18px] top-5 bottom-5 w-px bg-white/5 pointer-events-none" />

        {dayData?.sections.map((section, idx) => {
          const isTaxi = section.transport === '택시';
          const Icon   = isTaxi ? Car : (TYPE_ICON[section.type] || Info);
          const colors = TYPE_COLOR[isTaxi ? 'transport' : section.type] || TYPE_COLOR.transport;

          return (
            <div key={section.id} className="relative flex gap-4 pb-4 last:pb-0 group">
              {/* Icon bubble */}
              <div className={[
                'relative z-10 shrink-0 w-9 h-9 rounded-xl flex items-center justify-center',
                'border transition-all duration-200',
                colors.bg, colors.text, colors.border,
                'group-hover:scale-105',
              ].join(' ')}>
                <Icon size={16} strokeWidth={2} />
              </div>

              {/* Card */}
              <div className="flex-1 glass-dark rounded-xl px-4 py-3 space-y-2
                              group-hover:bg-white/[0.03] transition-colors duration-200">
                {/* Title row */}
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-bold text-white leading-snug">{section.title}</h4>
                  {section.time && (
                    <span className="shrink-0 text-[9px] font-bold text-white/25 bg-white/4
                                     px-2 py-1 rounded-lg border border-white/5 whitespace-nowrap">
                      {section.time}
                    </span>
                  )}
                </div>

                {/* Difficulty badge */}
                {section.difficulty && (
                  <span className={`badge ${DIFF_COLOR[section.difficulty] || 'diff-medium'}`}>
                    <AlertTriangle size={8} />
                    {section.difficulty}
                  </span>
                )}

                {/* Meta chips */}
                <div className="flex flex-wrap gap-2">
                  {section.duration && (
                    <span className="flex items-center gap-1 text-[9px] font-bold text-white/30">
                      <Clock size={9} /> {section.duration}
                    </span>
                  )}
                  {section.distance && (
                    <span className="flex items-center gap-1 text-[9px] font-bold text-white/30">
                      <Ruler size={9} /> {section.distance} km
                    </span>
                  )}
                  {section.cost && (
                    <span className="flex items-center gap-1 text-[9px] font-black text-amber-400/80">
                      <Wallet size={9} /> {section.cost.toLocaleString()}원
                    </span>
                  )}
                </div>

                {/* Note */}
                {section.note && (
                  <p className="text-[10px] text-white/25 italic leading-relaxed">
                    {section.note}
                  </p>
                )}

                {/* Checkpoints */}
                {section.checkpoints && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {section.checkpoints.map(cp => (
                      <span key={cp}
                        className="text-[8px] font-bold bg-white/4 text-white/35
                                   px-2 py-0.5 rounded-full border border-white/6">
                        {cp}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
