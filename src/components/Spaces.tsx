import { useState, useRef, useEffect } from 'react';
import { TerminalIcon, BuildIcon, LogIcon, ArrowRightIcon } from './Icons';

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

const spaces = [
  {
    id: 'terminal',
    icon: <TerminalIcon size={22} />,
    label: 'THE TERMINAL',
    name: '«Общий чат»',
    color: '#7eff6a',
    desc: 'Технические холивары, нетворкинг, оперативная помощь и обмен опытом.',
    allowed: [
      'Обсуждение кода, архитектуры, фреймворков',
      'Туториалы и полезные ссылки',
      'Помощь по техническим проблемам',
      'Поиск соавторов для проектов',
    ],
    forbidden: [
      'Токсичность и оскорбления',
      'Политика и идеологическая агитация',
      'Спам, скам, реферальные ссылки',
      'Личные данные и контент 18+',
    ],
  },
  {
    id: 'builds',
    icon: <BuildIcon size={22} />,
    label: 'THE BUILDS',
    name: '«Билды»',
    color: '#60a5fa',
    desc: 'Витрина проектов. Галерея где публикуются карточки проектов для поиска помощников.',
    allowed: [
      'Пет-проекты от идеи до альфа-версии',
      'Поиск соавторов (кодеры, дизайнеры)',
      'Запрос ревью архитектуры',
      'Форк заброшенного проекта',
    ],
    forbidden: [
      '«Голые идеи» без участия автора',
      'Предложения денег / оплаты',
      'Флуд и обсуждения в этом канале',
      'Публикации без обязательного формата',
    ],
  },
  {
    id: 'log',
    icon: <LogIcon size={22} />,
    label: 'THE LOG',
    name: '«Редакция»',
    color: '#f472b6',
    desc: 'Качественный контент: туториалы, технические статьи и легендарные Фейл-логи.',
    allowed: [
      'Экспертные статьи >2000 знаков',
      'Технические разборы и кейсы',
      'Фейл-логи с исходниками',
      'Обзоры инструментов и лайфхаки',
    ],
    forbidden: [
      'Статьи без структуры и тегов',
      'Прямая реклама продуктов',
      'Контент <2000 знаков',
      'Публикации без контактов автора',
    ],
  },
];

export default function Spaces() {
  const [active, setActive] = useState(0);
  const { ref, inView } = useInView();

  const sp = spaces[active];

  return (
    <section id="spaces" className="relative py-28 overflow-hidden">
      <div className="absolute left-0 top-1/2 w-1/3 h-full -translate-y-1/2 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at left, rgba(126,255,106,0.03) 0%, transparent 60%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-16 flex-wrap gap-6" ref={ref}>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-5 text-[#7eff6a]">
                <svg viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="11" y="2" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="2" y="11" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="11" y="11" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/></svg>
              </div>
              <span className="text-[#555] text-xs font-mono tracking-[0.2em] uppercase">Пространства</span>
            </div>
            <h2 className={`text-4xl md:text-5xl font-bold text-white font-grotesk transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Три зоны хаба
            </h2>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 border border-[#1e1e1e] rounded-xl text-sm text-[#888] hover:text-white hover:border-[#333] transition-all font-grotesk">
            Посмотреть устав
            <ArrowRightIcon size={14} />
          </button>
        </div>

        {/* Tab selector */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {spaces.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 font-grotesk ${
                active === i
                  ? 'text-[#080808] font-bold'
                  : 'text-[#555] border border-[#1e1e1e] hover:text-white hover:border-[#333]'
              }`}
              style={active === i ? { backgroundColor: s.color } : {}}
            >
              <span style={active === i ? { color: '#080808' } : { color: s.color }}>{s.icon}</span>
              {s.name}
            </button>
          ))}
        </div>

        {/* Space detail card */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Main info */}
          <div className="lg:col-span-3 card-gradient rounded-2xl p-8 relative overflow-hidden">
            {/* Accent glow */}
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
              style={{ background: `radial-gradient(circle, ${sp.color}12 0%, transparent 70%)` }}
            />

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: sp.color + '15', color: sp.color, border: `1px solid ${sp.color}25` }}>
                {sp.icon}
              </div>
              <div>
                <div className="text-[10px] font-mono tracking-widest mb-0.5" style={{ color: sp.color }}>{sp.label}</div>
                <div className="text-xl font-bold text-white font-grotesk">{sp.name}</div>
              </div>
            </div>

            <p className="text-[#777] text-base leading-relaxed mb-8 font-grotesk">{sp.desc}</p>

            {/* Decorative code block */}
            <div className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-4 font-mono text-sm">
              <div className="text-[#333] mb-2 text-xs">// Формат публикации (Билды)</div>
              <div className="text-[#555]">{'{'}</div>
              <div className="ml-4"><span className="text-[#7eff6a]">название</span>: <span className="text-[#f5c842]">"MyCoolApp"</span>,</div>
              <div className="ml-4"><span className="text-[#7eff6a]">стек</span>: <span className="text-[#f5c842]">["React", "Go", "Postgres"]</span>,</div>
              <div className="ml-4"><span className="text-[#7eff6a]">квесты</span>: <span className="text-[#f5c842]">["нужен бэк", "дизайн"]</span>,</div>
              <div className="ml-4"><span className="text-[#7eff6a]">контакт</span>: <span className="text-[#f5c842]">"@handle"</span></div>
              <div className="text-[#555]">{'}'}</div>
            </div>
          </div>

          {/* Rules columns */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Allowed */}
            <div className="card-gradient rounded-2xl p-6 flex-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#7eff6a]" />
                <span className="text-[#7eff6a] text-xs font-mono tracking-wider">РАЗРЕШЕНО</span>
              </div>
              <div className="flex flex-col gap-2.5">
                {sp.allowed.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 flex-shrink-0">
                      <circle cx="7" cy="7" r="6.5" stroke="#7eff6a" strokeOpacity="0.3"/>
                      <path d="M4.5 7l2 2 3-3" stroke="#7eff6a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-[#777] text-xs leading-relaxed font-grotesk">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Forbidden */}
            <div className="card-gradient rounded-2xl p-6 flex-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#f87171]" />
                <span className="text-[#f87171] text-xs font-mono tracking-wider">ЗАПРЕЩЕНО</span>
              </div>
              <div className="flex flex-col gap-2.5">
                {sp.forbidden.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 flex-shrink-0">
                      <circle cx="7" cy="7" r="6.5" stroke="#f87171" strokeOpacity="0.3"/>
                      <path d="M4.5 4.5l5 5M9.5 4.5l-5 5" stroke="#f87171" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    <span className="text-[#777] text-xs leading-relaxed font-grotesk">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
