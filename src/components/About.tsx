import { useEffect, useRef, useState } from 'react';
import { CheckIcon, CodeIcon, UsersIcon, ZapIcon, ShieldIcon } from './Icons';

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

const principles = [
  {
    icon: <ZapIcon size={18} />,
    title: 'Нет деньгам',
    desc: 'Работаем за XP и соавторство. Репутация — главная валюта хаба.',
    color: '#f5c842',
  },
  {
    icon: <ShieldIcon size={18} />,
    title: 'Нет взрослой цензуре',
    desc: 'Управляет Совет Стражей — участники, доказавшие свою адекватность.',
    color: '#7eff6a',
  },
  {
    icon: <CodeIcon size={18} />,
    title: 'Право на ошибку',
    desc: 'Провал — это контент. Фейл-лог = +160 XP и бесценный опыт для всех.',
    color: '#60a5fa',
  },
  {
    icon: <UsersIcon size={18} />,
    title: 'Только 14–17 лет',
    desc: 'Среда без корпоративного официоза, токсичности и профессиональных понтов.',
    color: '#f472b6',
  },
];

export default function About() {
  const { ref, inView } = useInView();

  return (
    <section id="about" className="relative py-28 overflow-hidden">
      {/* BG accent */}
      <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at right top, rgba(126,255,106,0.04) 0%, transparent 60%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-5 h-5 text-[#7eff6a]">
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 6v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="text-[#555] text-xs font-mono tracking-[0.2em] uppercase">О проекте</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left */}
          <div ref={ref}>
            <h2 className={`text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-grotesk transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Хаб, где твой код{' '}
              <span className="text-gradient-green">важнее</span>{' '}
              резюме
            </h2>
            <p className={`text-[#666] text-lg leading-relaxed mb-8 font-grotesk transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Мы создали пространство «песочницы», где подростки 14–17 лет могут строить реальные
              цифровые продукты без страха осуждения, финансовых обязательств и токсичности взрослых
              профессиональных комьюнити.
            </p>
            <p className={`text-[#555] text-base leading-relaxed mb-10 font-grotesk transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              TeenBuild — не курсы и не буткемп. Это живое сообщество со своей экономикой, правилами
              и культурой, построенной самими участниками.
            </p>

            {/* Checkmarks */}
            <div className={`flex flex-col gap-3 transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {[
                'Реальные проекты от идеи до альфа-версии',
                'XP-экономика вместо денег',
                'Фейл-лог — уважаемый формат публикации',
                'Совет Стражей из таких же участников',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border border-[#7eff6a]/40 bg-[#7eff6a]/10 flex items-center justify-center flex-shrink-0">
                    <CheckIcon size={10} />
                  </div>
                  <span className="text-[#888] text-sm font-grotesk">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Principle Cards */}
          <div className="grid grid-cols-2 gap-4">
            {principles.map((p, i) => (
              <div
                key={p.title}
                className={`card-gradient rounded-2xl p-5 hover-lift cursor-default transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 100 + 200}ms` }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: p.color + '15', color: p.color, border: `1px solid ${p.color}25` }}
                >
                  {p.icon}
                </div>
                <h3 className="text-white font-semibold text-sm mb-2 font-grotesk">{p.title}</h3>
                <p className="text-[#555] text-xs leading-relaxed font-grotesk">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
