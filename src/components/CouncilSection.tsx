import { useRef, useEffect, useState } from 'react';
import { ShieldIcon } from './Icons';

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

const roles = [
  {
    emoji: '🧑‍💻',
    name: 'Recruit',
    xp: '0 XP',
    color: '#666',
    abilities: ['Читать чат', 'Откликаться на квесты'],
  },
  {
    emoji: '🔨',
    name: 'Builder',
    xp: '100 XP',
    color: '#7eff6a',
    abilities: ['Публиковать Билды', 'Быть Автором'],
  },
  {
    emoji: '⚒️',
    name: 'Crafter',
    xp: '250 XP',
    color: '#60a5fa',
    abilities: ['Запрашивать код-ревью', 'Все права Builder'],
  },
  {
    emoji: '📜',
    name: 'Archon',
    xp: '500 XP',
    color: '#f5c842',
    abilities: ['Редколлегия', 'Одобрять статьи'],
  },
  {
    emoji: '🛡️',
    name: 'Sentinel',
    xp: '1000 XP',
    color: '#f472b6',
    abilities: ['Совет Стражей', 'Модерация и верификация'],
  },
];

export default function CouncilSection() {
  const { ref, inView } = useInView();

  return (
    <section className="relative py-24 overflow-hidden border-y border-[#111]">
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #080808 0%, #0a0a0a 50%, #080808 100%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14" ref={ref}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#f472b6]/20 bg-[#f472b6]/5 mb-6">
            <ShieldIcon size={14} />
            <span className="text-[#f472b6] text-xs font-mono tracking-wider">СОВЕТ СТРАЖЕЙ</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold text-white font-grotesk mb-4 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Путь от Recruit<br />до <span className="text-[#f472b6]">Sentinel</span>
          </h2>
          <p className={`text-[#555] text-base font-grotesk max-w-xl mx-auto transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Каждый начинает как Recruit. Участвуй в квестах, набирай XP и расти внутри хаба по своим правилам.
          </p>
        </div>

        {/* Role progression */}
        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-12 left-0 right-0 h-px hidden lg:block"
            style={{ background: 'linear-gradient(to right, transparent, #1a1a1a 10%, #7eff6a30 50%, #f472b620 90%, transparent)' }}
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {roles.map((r, i) => (
              <div
                key={r.name}
                className={`flex flex-col items-center text-center transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Avatar */}
                <div
                  className="w-24 h-24 rounded-3xl flex items-center justify-center text-4xl mb-4 relative border hover-lift cursor-default"
                  style={{ backgroundColor: r.color + '10', borderColor: r.color + '25' }}
                >
                  {r.emoji}
                  {/* Glow */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity"
                    style={{ boxShadow: `0 0 30px ${r.color}30` }}
                  />
                </div>

                {/* XP badge */}
                <div className="px-2.5 py-1 rounded-full border text-[10px] font-mono mb-2"
                  style={{ borderColor: r.color + '30', color: r.color, backgroundColor: r.color + '10' }}>
                  {r.xp}
                </div>

                <div className="text-white font-bold text-sm font-grotesk mb-2">{r.name}</div>

                <div className="space-y-1">
                  {r.abilities.map((a) => (
                    <div key={a} className="text-[#444] text-xs font-grotesk">{a}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Council highlight */}
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          <div className="card-gradient rounded-2xl p-6 border border-[#f472b6]/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(244,114,182,0.08) 0%, transparent 70%)' }}
            />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#f472b6]/10 border border-[#f472b6]/20 flex items-center justify-center">
                <ShieldIcon size={18} />
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#f472b6] tracking-wider">СОВЕТ СТРАЖЕЙ</div>
                <div className="text-white font-bold font-grotesk">Служба порядка из равных</div>
              </div>
            </div>
            <p className="text-[#666] text-sm leading-relaxed font-grotesk">
              Стражи — это участники с 1000+ XP, доказавшие технический опыт и социальную зрелость.
              Они берут на себя ответственность за атмосферу хаба.
            </p>
          </div>

          <div className="card-gradient rounded-2xl p-6 border border-[#7eff6a]/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(126,255,106,0.06) 0%, transparent 70%)' }}
            />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#7eff6a]/10 border border-[#7eff6a]/20 flex items-center justify-center text-lg">
                📜
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#7eff6a] tracking-wider">РЕДКОЛЛЕГИЯ</div>
                <div className="text-white font-bold font-grotesk">Archon+ управляет контентом</div>
              </div>
            </div>
            <p className="text-[#666] text-sm leading-relaxed font-grotesk">
              Участники с Грейдом 3 (Archon) входят в Редколлегию и получают право одобрять или
              отклонять статьи в «Редакции».
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
