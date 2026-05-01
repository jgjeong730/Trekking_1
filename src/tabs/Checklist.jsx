import React from 'react';
import { useCourse } from '../context/CourseContext';
import { Check, Footprints, Navigation, Circle } from 'lucide-react';
import { motion } from 'framer-motion';

const TYPE_DOT = {
  hiking:    'bg-emerald-500',
  transport: 'bg-blue-500',
  meal:      'bg-red-500',
  event:     'bg-amber-400',
  stay:      'bg-violet-500',
};

export default function Checklist() {
  const { courseData, progress, toggleSection } = useCourse();
  if (!courseData) return null;

  const allSections    = courseData.days.flatMap(d => d.sections.map(s => ({ ...s, day: d.day })));
  const completedCount = allSections.filter(s => progress[s.id]).length;
  const totalCount     = allSections.length;
  const pct            = totalCount ? (completedCount / totalCount) * 100 : 0;

  const totalDist     = courseData.summary.distance.total;
  const doneDist      = allSections.filter(s => progress[s.id] && s.distance)
                                   .reduce((a, s) => a + s.distance, 0);

  return (
    <div className="space-y-6 pb-2">

      {/* ── Progress header ── */}
      <div className="card space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-base font-black text-white">트레킹 진행률</h2>
            <p className="text-[10px] text-white/30 mt-0.5 font-medium">
              {completedCount} / {totalCount}개 구간 완료
            </p>
          </div>
          <span className="text-2xl font-black text-primary leading-none">
            {Math.round(pct)}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-emerald-300"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          {[
            { icon: Footprints, label: '이동 거리', value: `${doneDist.toFixed(1)} km`, color: 'text-primary' },
            { icon: Navigation, label: '남은 거리', value: `${(totalDist - doneDist).toFixed(1)} km`, color: 'text-blue-400' },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="flex items-center gap-2.5">
              <div className={`w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center ${color}`}>
                <Icon size={13} />
              </div>
              <div>
                <p className="text-[9px] text-white/30 uppercase tracking-widest font-black">{label}</p>
                <p className={`text-sm font-black ${color}`}>{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Day groups ── */}
      <div className="space-y-6">
        {courseData.days.map((day) => (
          <div key={day.day} className="space-y-2">
            {/* Day label */}
            <div className="flex items-center gap-2 px-0.5">
              <div className="w-5 h-5 rounded-md bg-primary/10 border border-primary/20
                              flex items-center justify-center text-[8px] font-black text-primary">
                D{day.day}
              </div>
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">
                {day.title}
              </span>
              <div className="flex-1 h-px bg-white/5" />
            </div>

            {/* Section rows */}
            <div className="space-y-1.5">
              {day.sections.map((section) => {
                const done = !!progress[section.id];
                return (
                  <button
                    key={section.id}
                    onClick={() => toggleSection(section.id)}
                    className={[
                      'w-full text-left glass-dark rounded-xl px-4 py-3',
                      'flex items-center gap-3 group',
                      'transition-all duration-200',
                      done
                        ? 'opacity-40'
                        : 'hover:bg-white/[0.03] hover:border-white/10',
                    ].join(' ')}
                  >
                    {/* Checkbox */}
                    <div className={[
                      'w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0',
                      'transition-all duration-200',
                      done
                        ? 'bg-primary border-primary text-white'
                        : 'border-white/12 group-hover:border-white/20',
                    ].join(' ')}>
                      {done && <Check size={11} strokeWidth={3.5} />}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 justify-between">
                        <span className={`text-sm font-bold leading-snug ${done ? 'line-through text-white/40' : 'text-white'}`}>
                          {section.title}
                        </span>
                        {section.type === 'event' && (
                          <span className="badge bg-amber-500/10 text-amber-400 border-amber-500/15 shrink-0">
                            인증
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        {/* Type dot */}
                        <span className={`w-1.5 h-1.5 rounded-full ${TYPE_DOT[section.type] || 'bg-white/20'}`} />
                        <span className="text-[10px] text-white/30 font-medium">{section.time}</span>
                        {section.distance && (
                          <span className="text-[10px] text-white/20 font-medium">{section.distance} km</span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
