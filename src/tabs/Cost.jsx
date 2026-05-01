import React, { useState } from 'react';
import { useCourse } from '../context/CourseContext';
import {
  CreditCard, Bus, Car, PersonStanding,
  Utensils, Tent, Star, Info, ChevronDown, ChevronUp,
} from 'lucide-react';

const TYPE_ICON = {
  transport: Bus,
  meal:      Utensils,
  stay:      Tent,
  hiking:    PersonStanding,
  event:     Star,
};
const TYPE_COLOR = {
  transport: 'text-blue-400',
  meal:      'text-red-400',
  stay:      'text-violet-400',
  hiking:    'text-emerald-400',
  event:     'text-amber-400',
};

export default function Cost() {
  const { courseData } = useCourse();
  const [expandedDay, setExpandedDay] = useState(null);

  if (!courseData) return null;

  const totalCost = courseData.summary.cost;
  const dailyCosts = courseData.days.map(day => ({
    day:      day.day,
    title:    day.title,
    subtotal: day.sections.reduce((a, s) => a + (s.cost || 0), 0),
    items:    day.sections.filter(s => s.cost),
  }));

  // Category totals
  const catTotals = courseData.days
    .flatMap(d => d.sections.filter(s => s.cost))
    .reduce((acc, s) => {
      acc[s.type] = (acc[s.type] || 0) + s.cost;
      return acc;
    }, {});

  return (
    <div className="space-y-6 pb-2">

      {/* ── Hero total ── */}
      <div className="card relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-[0.04] pointer-events-none">
          <CreditCard size={100} />
        </div>
        <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-3">
          총 예상 지출 · 성인 1인
        </p>
        <div className="flex items-baseline gap-1.5">
          <span className="text-4xl font-black text-white tracking-tight">
            {(totalCost / 10000).toFixed(1)}
          </span>
          <span className="text-lg font-bold text-white/30">만원</span>
          <span className="ml-2 text-sm font-medium text-white/20">
            ({totalCost.toLocaleString()}원)
          </span>
        </div>
        <div className="mt-4 flex items-center gap-1.5 text-[10px] text-white/35 font-medium">
          <Info size={11} className="text-primary" />
          변동 가능성 있음 · 현금·카드 혼용 권장
        </div>
      </div>

      {/* ── Category mini bars ── */}
      <div className="card space-y-3">
        <h3 className="text-[9px] font-black text-white/30 uppercase tracking-widest">지출 유형별</h3>
        {Object.entries(catTotals).map(([type, amount]) => {
          const Icon  = TYPE_ICON[type] || CreditCard;
          const color = TYPE_COLOR[type] || 'text-white/40';
          const pct   = Math.round((amount / totalCost) * 100);
          return (
            <div key={type} className="flex items-center gap-3">
              <Icon size={13} className={`shrink-0 ${color}`} />
              <div className="flex-1 space-y-1">
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-white/50">
                    {{ transport:'교통', meal:'식사', stay:'숙박', hiking:'등산', event:'기타' }[type] || type}
                  </span>
                  <span className="text-white/70">{amount.toLocaleString()}원</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, background: 'currentColor' }}
                  />
                </div>
              </div>
              <span className="text-[9px] font-black text-white/25 w-7 text-right">{pct}%</span>
            </div>
          );
        })}
      </div>

      {/* ── Daily breakdown (accordion) ── */}
      <div className="space-y-2">
        <h3 className="text-[9px] font-black text-white/30 uppercase tracking-widest px-0.5">일별 지출</h3>
        {dailyCosts.map((dc) => {
          const open = expandedDay === dc.day;
          return (
            <div key={dc.day} className="card overflow-hidden p-0">
              <button
                onClick={() => setExpandedDay(open ? null : dc.day)}
                className="w-full flex items-center gap-3 px-5 py-4 text-left
                           hover:bg-white/[0.02] transition-colors duration-200"
              >
                <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20
                                flex items-center justify-center text-[9px] font-black text-primary shrink-0">
                  D{dc.day}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white leading-snug">{dc.title}</p>
                  <p className="text-[10px] text-white/30 mt-0.5 font-medium">
                    {dc.items.length}개 항목
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-primary">
                    {dc.subtotal.toLocaleString()}원
                  </span>
                  {open
                    ? <ChevronUp size={14} className="text-white/25" />
                    : <ChevronDown size={14} className="text-white/25" />}
                </div>
              </button>

              {open && dc.items.length > 0 && (
                <div className="border-t border-white/5 divide-y divide-white/5">
                  {dc.items.map((item, idx) => {
                    const Icon  = TYPE_ICON[item.type] || CreditCard;
                    const color = TYPE_COLOR[item.type] || 'text-white/30';
                    return (
                      <div key={idx} className="flex items-center gap-3 px-5 py-3">
                        <Icon size={13} className={`shrink-0 ${color}`} />
                        <span className="flex-1 text-xs text-white/60 font-medium">{item.title}</span>
                        <span className="text-xs font-black text-white/70">
                          {item.cost.toLocaleString()}원
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
