import { useRef, useEffect, useState } from 'react';

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

function AnimatedNumber({ target, suffix = '', inView }: { target: number; suffix?: string; inView: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setVal(target);
        clearInterval(timer);
      } else {
        setVal(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span>{val}{suffix}</span>;
}

const stats = [
  { label: 'Максимальный XP за квест', value: 160, suffix: '', unit: 'XP', color: '#f5c842', desc: 'Фейл-лог' },
  { label: 'Грейдов прокачки', value: 5, suffix: '', unit: 'уровней', color: '#7eff6a', desc: 'Recruit → Sentinel' },
  { label: 'Официальных пространств', value: 3, suffix: '', unit: 'зоны', color: '#60a5fa', desc: 'Terminal, Builds, Log' },
  { label: 'Лет участникам хаба', value: 14, suffix: '–17', unit: 'лет', color: '#f472b6', desc: 'Возрастной диапазон' },
];

export default function StatsSection() {
  const { ref, inView } = useInView(0.2);

  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 border-y border-[#111]"
        style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #080808 100%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6" ref={ref}>
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`text-center transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-5xl font-bold font-mono mb-1" style={{ color: s.color }}>
                <AnimatedNumber target={s.value} suffix={s.suffix} inView={inView} />
              </div>
              <div className="text-[#555] text-xs font-mono tracking-wider uppercase mb-1">{s.unit}</div>
              <div className="text-[#333] text-xs font-grotesk">{s.desc}</div>
              <div className="mt-3 w-full h-px" style={{ background: `linear-gradient(to right, transparent, ${s.color}30, transparent)` }} />
              <div className="text-[#444] text-xs font-grotesk mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
