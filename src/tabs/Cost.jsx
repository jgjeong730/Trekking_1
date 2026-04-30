import React from 'react';
import { useCourse } from '../context/CourseContext';
import { CreditCard, TrendingUp, PieChart, Info } from 'lucide-react';

export default function Cost() {
  const { courseData } = useCourse();

  if (!courseData) return null;

  const totalCost = courseData.summary.cost;
  
  const dailyCosts = courseData.days.map(day => {
    const subtotal = day.sections.reduce((acc, s) => acc + (s.cost || 0), 0);
    return { day: day.day, subtotal, items: day.sections.filter(s => s.cost) };
  });

  return (
    <div className="space-y-6">
      {/* Total Card */}
      <section className="glass rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <CreditCard size={120} />
        </div>
        <p className="text-white/40 text-xs uppercase tracking-widest font-black mb-2">총 예상 지출액</p>
        <div className="text-4xl font-black text-white flex items-baseline gap-1">
          {totalCost.toLocaleString()}
          <span className="text-lg font-normal text-white/40">원</span>
        </div>
        <div className="mt-4 flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full text-[10px] text-white/60">
          <Info size={12} className="text-primary" />
          <span>성인 1인 기준 / 변동 가능성 있음</span>
        </div>
      </section>

      {/* Daily Breakdown */}
      <div className="space-y-4">
        {dailyCosts.map((dayCost) => (
          <div key={dayCost.day} className="space-y-3">
            <div className="flex justify-between items-end px-2">
              <h3 className="text-sm font-bold">DAY {dayCost.day}</h3>
              <p className="text-xs font-black text-primary">소계: {dayCost.subtotal.toLocaleString()}원</p>
            </div>
            
            <div className="glass-dark rounded-2xl overflow-hidden">
              {dayCost.items.length > 0 ? (
                <table className="w-full text-left text-xs">
                  <tbody>
                    {dayCost.items.map((item, idx) => (
                      <tr key={idx} className="border-b border-white/5 last:border-0">
                        <td className="p-4 text-white/60">{item.title}</td>
                        <td className="p-4 text-right font-bold text-white/80">{item.cost.toLocaleString()}원</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-4 text-center text-white/20 text-[10px]">
                  지출 항목 없음
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Tip Card */}
      <section className="glass-dark border-primary/20 rounded-2xl p-4 flex gap-4 items-start">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
          <TrendingUp size={20} />
        </div>
        <div>
          <h4 className="text-sm font-bold mb-1">비용 절약 팁</h4>
          <p className="text-[11px] text-white/40 leading-relaxed">
            대피소 예약은 조기에 완료하고, 취사 도구와 비상 식량을 충분히 챙기면 현지 지출을 줄일 수 있습니다.
          </p>
        </div>
      </section>
    </div>
  );
}
