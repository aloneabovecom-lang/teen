import React, { useState, useRef, useEffect } from 'react';
import { TrophyIcon, XPIcon } from './Icons';

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

const grades = [
  { level: 0, name: 'Recruit', xp: '0–99', color: '#666', rights: 'Читать чат, откликаться на Квесты, быть Помощником', icon: '🧑‍💻' },
  { level: 1, name: 'Builder', xp: '100–249', color: '#7eff6a', rights: 'Публиковать Билды на Витрине. Стать Автором проекта', icon: '🔨' },
  { level: 2, name: 'Crafter', xp: '250–499', color: '#60a5fa', rights: 'Запрашивать внеочередное Код-ревью у участников', icon: '⚒️' },
  { level: 3, name: 'Archon', xp: '500–999', color: '#f5c842', rights: 'Входит в Редколлегию, одобряет и отклоняет статьи', icon: '📜' },
  { level: 4, name: 'Sentinel', xp: '1000+', color: '#f472b6', rights: 'Совет Стражей. Права модерации и верификации квестов', icon: '🛡️' },
];

const quests = [
  { name: 'Тень', where: 'Проекты', action: 'Стажировка-помощь + фидбек', xp: 25, who: 'Автор проекта' },
  { name: 'Баго-охотник', where: 'Проекты', action: 'Оформленный баг-репорт', xp: 40, who: 'Автор проекта' },
  { name: 'Архитектор', where: 'Проекты', action: 'Принятый пул-реквест/дизайн', xp: 100, who: 'Автор проекта' },
  { name: 'Летописец', where: 'Редакция', action: 'Статья/туториал > 2000 знаков', xp: 80, who: 'Редколлегия' },
  { name: 'Ментор', where: 'Чат', action: 'Обучение новичка', xp: 120, who: 'Ученик + Страж' },
  { name: 'Синтезатор', where: 'Чат', action: 'Успешная медиация спора', xp: 90, who: 'Спорщики + Страж' },
  { name: 'Запуск Билда', where: 'Билды', action: 'Публикация карточки с Квестами', xp: 50, who: 'Модератор Билдов' },
  { name: 'Фейл-лог', where: 'Редакция', action: 'Разбор провала + исходники', xp: 160, who: 'Редколлегия' },
];

export default function XPSection() {
  const [activeGrade, setActiveGrade] = useState(1);
  const { ref, inView } = useInView();

  return (
    <section id="xp" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(245,200,66,0.04) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#f5c842]/20 bg-[#f5c842]/5 mb-6">
            <XPIcon size={14} />
            <span className="text-[#f5c842] text-xs font-mono tracking-wider">XP-ЭКОНОМИКА</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold text-white font-grotesk mb-4 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Репутация — твоя валюта
          </h2>
          <p className={`text-[#666] text-lg max-w-2xl mx-auto font-grotesk transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            XP — несгораемый показатель вашего вклада в сообщество. Заработай его через реальные квесты и открой новые права.
          </p>
        </div>

        {/* Grades selector */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {grades.map((g) => (
            <button
              key={g.level}
              onClick={() => setActiveGrade(g.level)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 font-grotesk ${
                activeGrade === g.level
                  ? 'text-[#080808] font-bold'
                  : 'border border-[#1e1e1e] text-[#555] hover:text-white hover:border-[#333]'
              }`}
              style={activeGrade === g.level ? { backgroundColor: g.color } : {}}
            >
              <span>{g.icon}</span>
              {g.name}
            </button>
          ))}
        </div>

        {/* Grade detail */}
        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {/* Grade card */}
          <div className="card-gradient rounded-2xl p-8 flex flex-col items-center text-center relative overflow-hidden animate-glow-pulse">
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(circle at center, ${grades[activeGrade].color}08 0%, transparent 70%)` }}
            />
            <div className="text-5xl mb-4">{grades[activeGrade].icon}</div>
            <div className="text-xs font-mono tracking-widest mb-1" style={{ color: grades[activeGrade].color }}>
              LEVEL {grades[activeGrade].level}
            </div>
            <div className="text-3xl font-bold text-white mb-2 font-grotesk">{grades[activeGrade].name}</div>
            <div className="px-3 py-1.5 rounded-lg mb-4 text-sm font-mono"
              style={{ backgroundColor: grades[activeGrade].color + '15', color: grades[activeGrade].color }}>
              {grades[activeGrade].xp} XP
            </div>
            <p className="text-[#666] text-sm leading-relaxed font-grotesk">{grades[activeGrade].rights}</p>

            {/* XP bar */}
            <div className="w-full mt-6">
              <div className="w-full h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${(activeGrade / 4) * 100}%`,
                    backgroundColor: grades[activeGrade].color,
                    boxShadow: `0 0 12px ${grades[activeGrade].color}60`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Grade progression */}
          <div className="lg:col-span-2 card-gradient rounded-2xl p-6">
            <div className="text-xs font-mono text-[#555] tracking-wider mb-6">ПУТЬ ПРОКАЧКИ</div>
            <div className="space-y-3">
              {grades.map((g, i) => (
                <button
                  key={g.level}
                  onClick={() => setActiveGrade(i)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
                    activeGrade === i
                      ? 'border-current bg-current/5'
                      : 'border-[#1a1a1a] hover:border-[#2a2a2a]'
                  }`}
                  style={activeGrade === i ? { borderColor: g.color + '40', color: g.color } as React.CSSProperties : {}}
                >
                  <span className="text-2xl w-8">{g.icon}</span>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-sm font-semibold font-grotesk ${activeGrade === i ? '' : 'text-white'}`}>{g.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                        style={{ borderColor: g.color + '30', color: g.color, backgroundColor: g.color + '10' }}>
                        {g.xp} XP
                      </span>
                    </div>
                    <p className="text-[#555] text-xs font-grotesk leading-tight">{g.rights}</p>
                  </div>
                  {activeGrade === i && (
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: g.color }} />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quest Matrix */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <TrophyIcon size={16} />
            <span className="text-[#555] text-xs font-mono tracking-wider uppercase">Матрица квестов</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quests.map((q, i) => (
              <div
                key={q.name}
                className="card-gradient rounded-xl p-5 hover-lift relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity"
                  style={{ background: 'radial-gradient(circle, rgba(126,255,106,0.08) 0%, transparent 70%)' }}
                />

                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-[#444] uppercase tracking-wider">{q.where}</span>
                  <span className="text-[#f5c842] text-sm font-bold font-mono">+{q.xp} XP</span>
                </div>

                <div className="text-white font-semibold text-sm mb-2 font-grotesk">{q.name}</div>
                <div className="text-[#555] text-xs mb-3 font-grotesk leading-relaxed">{q.action}</div>

                <div className="pt-3 border-t border-[#1a1a1a]">
                  <span className="text-[10px] font-mono text-[#444]">Верифицирует: </span>
                  <span className="text-[10px] font-mono text-[#666]">{q.who}</span>
                </div>

                {/* XP badge */}
                <div
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ fontSize: '24px' }}
                >
                  {i === 7 ? '⭐' : i === 4 ? '🎓' : i === 6 ? '🚀' : '⚡'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
