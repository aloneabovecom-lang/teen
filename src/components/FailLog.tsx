import React, { useRef, useEffect, useState } from 'react';
import { AlertTriangleIcon, ForkIcon } from './Icons';

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const examples = [
  {
    project: 'SchoolMap',
    stack: 'React + FastAPI',
    reason: 'Потеря тиммейта',
    desc: 'Хотели сделать интерактивную карту школ города. Бэкенд-разработчик пропал после 2-й недели.',
    xp: 160,
    forked: true,
    forkBy: '@dev_hero',
    color: '#f472b6',
  },
  {
    project: 'CryptoDash',
    stack: 'Vue.js + Python',
    reason: 'Ошибка архитектуры',
    desc: 'Недооценили сложность real-time данных. API-лимиты убили проект на стадии альфы.',
    xp: 160,
    forked: false,
    forkBy: null,
    color: '#f5c842',
  },
  {
    project: 'PeerStudy',
    stack: 'Next.js + Supabase',
    reason: 'Выгорание',
    desc: 'Учеба + проект не совместились. Честный фейл-лог с полными исходниками на GitHub.',
    xp: 160,
    forked: true,
    forkBy: '@night_coder',
    color: '#60a5fa',
  },
];

export default function FailLog() {
  const { ref, inView } = useInView();

  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(244,114,182,0.04) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 items-end mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangleIcon size={16} />
              <span className="text-[#555] text-xs font-mono tracking-[0.2em] uppercase">Протокол Фейл-лог</span>
            </div>

            <h2 className={`text-4xl md:text-5xl font-bold text-white font-grotesk mb-4 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Провал —<br />
              <span className="text-gradient-green">это не клеймо</span>
            </h2>

            <p className={`text-[#666] text-lg leading-relaxed font-grotesk transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              В TeenBuild провал — это контент и урок для всех. Честный разбор провала ценится больше,
              чем молчание о неудаче.
            </p>
          </div>

          {/* Stats box */}
          <div className={`card-gradient rounded-2xl p-6 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="grid grid-cols-3 gap-6 text-center">
              {[
                { val: '+160', label: 'XP за Фейл-лог', color: '#f5c842' },
                { val: '100%', label: 'Репутация сохраняется', color: '#7eff6a' },
                { val: '∞', label: 'Право на новый Билд', color: '#60a5fa' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-bold font-grotesk mb-1" style={{ color: s.color }}>{s.val}</div>
                  <div className="text-[#555] text-xs font-grotesk">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* What to include */}
        <div className="card-gradient rounded-2xl p-6 mb-10 border border-[#1e1e1e]">
          <div className="text-xs font-mono text-[#555] tracking-wider mb-5">СОДЕРЖАНИЕ ФЕЙЛ-ЛОГА</div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { num: '1', label: 'Название и стек', desc: 'Что и на чём пытались строить' },
              { num: '2', label: 'Изначальные цели', desc: 'Что хотели сделать в итоге' },
              { num: '3', label: 'Точка остановки', desc: 'Когда и почему проект заморозился' },
              { num: '4', label: 'Ссылка на репо', desc: 'Открытые исходники для наследников' },
            ].map((item) => (
              <div key={item.num} className="flex gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#f472b6]/10 border border-[#f472b6]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#f472b6] text-xs font-mono font-bold">{item.num}</span>
                </div>
                <div>
                  <div className="text-white text-sm font-semibold mb-1 font-grotesk">{item.label}</div>
                  <div className="text-[#555] text-xs font-grotesk">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Example fail logs */}
        <div className="grid md:grid-cols-3 gap-5">
          {examples.map((ex, i) => (
            <div
              key={ex.project}
              className={`card-gradient rounded-2xl p-6 hover-lift relative overflow-hidden border border-[#1e1e1e] hover:border-current transition-all duration-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 100 + 300}ms`, '--tw-border-color': ex.color + '30' } as React.CSSProperties}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                style={{ backgroundColor: ex.color }} />

              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-white font-bold text-base font-grotesk">{ex.project}</div>
                  <div className="text-[#444] text-xs font-mono mt-0.5">{ex.stack}</div>
                </div>
                <div className="px-2 py-1 rounded-lg text-[10px] font-mono"
                  style={{ backgroundColor: ex.color + '15', color: ex.color }}>
                  {ex.reason}
                </div>
              </div>

              <p className="text-[#666] text-sm leading-relaxed mb-5 font-grotesk">{ex.desc}</p>

              <div className="flex items-center justify-between pt-4 border-t border-[#1a1a1a]">
                <div className="flex items-center gap-2">
                  <span className="text-[#f5c842] text-sm font-bold font-mono">+{ex.xp} XP</span>
                  <span className="text-[#444] text-xs font-grotesk">начислено</span>
                </div>

                {ex.forked && (
                  <div className="flex items-center gap-1.5 text-[#7eff6a]">
                    <ForkIcon size={12} />
                    <span className="text-[10px] font-mono">{ex.forkBy}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
