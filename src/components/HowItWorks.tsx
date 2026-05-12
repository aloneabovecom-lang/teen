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

const steps = [
  {
    num: '01',
    title: 'Вступи как Recruit',
    desc: 'Зарегистрируйся в хабе. Начинаешь с нулевым XP и правом читать, откликаться на квесты и быть Помощником.',
    color: '#7eff6a',
    icon: '🧑‍💻',
    detail: 'Без верификации, без анкет. Просто приходи и начинай участвовать.',
  },
  {
    num: '02',
    title: 'Выполняй Квесты',
    desc: 'Помогай с проектами, пиши статьи, ищи баги, менторь новичков. За каждое действие получаешь XP.',
    color: '#60a5fa',
    icon: '⚡',
    detail: 'Квесты верифицируются другими участниками, что делает систему честной.',
  },
  {
    num: '03',
    title: 'Расти до Builder',
    desc: 'Набери 100 XP и получи право публиковать свои Билды — запускай собственные проекты.',
    color: '#f5c842',
    icon: '🔨',
    detail: 'Теперь ты можешь набирать соавторов и давать им квесты.',
  },
  {
    num: '04',
    title: 'Стань Sentinel',
    desc: 'При 1000+ XP ты входишь в Совет Стражей — управляешь хабом наравне с другими участниками.',
    color: '#f472b6',
    icon: '🛡️',
    detail: 'Стражи — не надзиратели, а такие же участники с ответственностью.',
  },
];

export default function HowItWorks() {
  const { ref, inView } = useInView();
  const [openStep, setOpenStep] = useState(0);

  return (
    <section id="how" className="relative py-28 overflow-hidden">
      <div className="absolute right-0 bottom-0 w-1/2 h-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at right bottom, rgba(96,165,250,0.04) 0%, transparent 60%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left - accordion */}
          <div ref={ref}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-5 h-5 text-[#7eff6a]">
                <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5"/><path d="M10 6v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
              <span className="text-[#555] text-xs font-mono tracking-[0.2em] uppercase">Как устроено</span>
            </div>

            <h2 className={`text-4xl md:text-5xl font-bold text-white font-grotesk mb-4 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Как это работает?
            </h2>
            <p className={`text-[#666] text-lg mb-10 font-grotesk transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Четыре шага от новичка до хранителя хаба.
            </p>

            <div className="space-y-3">
              {steps.map((step, i) => (
                <div
                  key={step.num}
                  className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                    openStep === i ? 'border-current' : 'border-[#1e1e1e]'
                  }`}
                  style={openStep === i ? { borderColor: step.color + '40' } : {}}
                >
                  <button
                    className="w-full flex items-center gap-4 p-5 text-left"
                    onClick={() => setOpenStep(openStep === i ? -1 : i)}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 transition-all"
                      style={openStep === i
                        ? { backgroundColor: step.color + '20', border: `1px solid ${step.color}40` }
                        : { backgroundColor: '#111', border: '1px solid #1e1e1e' }
                      }
                    >
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono" style={{ color: openStep === i ? step.color : '#444' }}>{step.num}</span>
                        <span className={`text-sm font-semibold font-grotesk ${openStep === i ? 'text-white' : 'text-[#888]'}`}>{step.title}</span>
                      </div>
                    </div>
                    <svg
                      width="16" height="16" viewBox="0 0 16 16" fill="none"
                      className={`transition-transform duration-300 ${openStep === i ? 'rotate-180' : ''}`}
                      style={{ color: openStep === i ? step.color : '#444' }}
                    >
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                  {openStep === i && (
                    <div className="px-5 pb-5 pl-[60px]">
                      <p className="text-[#666] text-sm leading-relaxed mb-2 font-grotesk">{step.desc}</p>
                      <div className="flex items-start gap-2 mt-3">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5">
                          <circle cx="7" cy="7" r="6" stroke="#7eff6a" strokeOpacity="0.4"/>
                          <path d="M5 7l1.5 1.5L9 5.5" stroke="#7eff6a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-[#555] text-xs font-grotesk">{step.detail}</span>
                      </div>
                      <div className="mt-4">
                        <button className="text-xs font-mono tracking-wider hover:text-white transition-colors"
                          style={{ color: step.color }}>
                          Узнать больше →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right - visual mockup */}
          <div className="relative lg:sticky lg:top-28">
            {/* Profile card mockup */}
            <div className="card-gradient rounded-2xl p-6 mb-4 relative overflow-hidden animate-float">
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(circle at top right, rgba(126,255,106,0.05) 0%, transparent 60%)' }}
              />

              {/* Profile header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7eff6a]/20 to-[#4ade80]/10 border border-[#7eff6a]/20 flex items-center justify-center text-xl">
                  🔨
                </div>
                <div>
                  <div className="text-white font-semibold font-grotesk">@builder_dev</div>
                  <div className="text-[#7eff6a] text-xs font-mono">BUILDER • Level 1</div>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-2xl font-bold text-white font-mono">247</div>
                  <div className="text-[10px] text-[#555] font-mono">XP</div>
                </div>
              </div>

              {/* XP bar */}
              <div className="mb-5">
                <div className="flex justify-between mb-2">
                  <span className="text-[10px] font-mono text-[#555]">ПРОГРЕСС</span>
                  <span className="text-[10px] font-mono text-[#7eff6a]">247 / 250 → Crafter</span>
                </div>
                <div className="w-full h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#7eff6a] to-[#4ade80] rounded-full transition-all duration-1000"
                    style={{ width: '98%', boxShadow: '0 0 12px rgba(126,255,106,0.5)' }} />
                </div>
              </div>

              {/* Recent quests */}
              <div className="space-y-2">
                <div className="text-[10px] font-mono text-[#444] tracking-wider mb-3">ПОСЛЕДНИЕ КВЕСТЫ</div>
                {[
                  { name: 'Архитектор', xp: '+100', color: '#7eff6a', time: '2 ч. назад' },
                  { name: 'Летописец', xp: '+80', color: '#60a5fa', time: 'вчера' },
                  { name: 'Баго-охотник', xp: '+40', color: '#f5c842', time: '3 дня назад' },
                ].map((q) => (
                  <div key={q.name} className="flex items-center justify-between p-3 rounded-xl bg-[#0a0a0a] border border-[#1a1a1a]">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: q.color }} />
                      <span className="text-[#777] text-xs font-grotesk">{q.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-[#444] font-mono">{q.time}</span>
                      <span className="text-xs font-mono font-bold" style={{ color: q.color }}>{q.xp} XP</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fail log badge */}
            <div className="card-gradient rounded-2xl p-5 border border-[#1e1e1e] hover:border-[#f5c842]/30 transition-all duration-300 cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#f5c842]/10 border border-[#f5c842]/20 flex items-center justify-center">
                  <span className="text-lg">📋</span>
                </div>
                <div className="flex-1">
                  <div className="text-white text-sm font-semibold font-grotesk group-hover:text-[#f5c842] transition-colors">Фейл-лог опубликован</div>
                  <div className="text-[#555] text-xs font-grotesk">MyApp v0.3 — заморожен. +160 XP</div>
                </div>
                <div className="text-[#f5c842] text-xs font-mono font-bold">+160</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
