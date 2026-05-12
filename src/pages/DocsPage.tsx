import React, { useState, useEffect, useRef } from 'react';
import { SearchIcon, BookIcon, ChevronRightIcon, ArrowRightIcon } from '../components/Icons';

interface Section {
  id: string;
  label: string;
  title: string;
}

const sections: Section[] = [
  { id: 'ideology', label: 'ЧАСТЬ I', title: 'Идеология и общие положения' },
  { id: 'spaces', label: 'ЧАСТЬ II', title: 'Структура пространств' },
  { id: 'economy', label: 'ЧАСТЬ III', title: 'Экономика (XP и Грейды)' },
  { id: 'council', label: 'ЧАСТЬ IV', title: 'Совет Стражей и администрация' },
  { id: 'faillog', label: 'ЧАСТЬ V', title: 'Протокол «Фейл-лог»' },
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('ideology');
  const [searchQuery, setSearchQuery] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sectionEls = sections.map(s => document.getElementById(s.id));
      let current = sections[0].id;
      sectionEls.forEach((el) => {
        if (el && el.getBoundingClientRect().top <= 140) {
          current = el.id;
        }
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Docs header */}
      <div className="border-b border-[#1a1a1a] bg-[#0a0a0a]/50 backdrop-blur-sm sticky top-16 md:top-20 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-[#555] text-xs font-mono">
            <BookIcon size={14} />
            <span>Устав TeenBuild</span>
            <ChevronRightIcon size={12} />
            <span className="text-[#7eff6a]">{sections.find(s => s.id === activeSection)?.title}</span>
          </div>

          <div className="ml-auto relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444]">
              <SearchIcon size={14} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Поиск по Уставу..."
              className="pl-9 pr-4 py-2 bg-[#111] border border-[#1e1e1e] rounded-lg text-sm text-[#888] placeholder-[#444] focus:outline-none focus:border-[#7eff6a]/40 font-grotesk w-48 md:w-64"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">

          {/* Sidebar */}
          <aside className="lg:col-span-1 lg:sticky lg:top-40 self-start">
            <div className="card-gradient rounded-2xl p-5">
              <div className="text-[#444] text-[10px] font-mono tracking-widest mb-5 uppercase">Содержание</div>
              <nav className="space-y-1">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                      activeSection === s.id
                        ? 'bg-[#7eff6a]/10 border border-[#7eff6a]/20'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <div className={`text-[10px] font-mono mb-0.5 ${activeSection === s.id ? 'text-[#7eff6a]' : 'text-[#444]'}`}>
                      {s.label}
                    </div>
                    <div className={`text-xs font-grotesk leading-tight ${activeSection === s.id ? 'text-white' : 'text-[#666] group-hover:text-white'}`}>
                      {s.title}
                    </div>
                  </button>
                ))}
              </nav>

              {/* Quick info */}
              <div className="mt-6 pt-5 border-t border-[#1a1a1a]">
                <div className="text-[#444] text-[10px] font-mono tracking-widest mb-3 uppercase">Версия Устава</div>
                <div className="text-[#7eff6a] text-sm font-mono font-bold">v1.0.0</div>
                <div className="text-[#444] text-xs font-mono mt-1">2025 · TeenBuild</div>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-3 space-y-16" ref={contentRef}>

            {/* PART I */}
            <section id="ideology">
              <DocPartHeader num="I" title="Идеология и общие положения" />

              <DocSection title="1.1. Миссия">
                <p className="text-[#888] text-base leading-relaxed font-grotesk mb-4">
                  TeenBuild — это независимый IT-хаб, созданный подростком для подростков (14–17 лет).
                  Мы строим реальные цифровые продукты в среде «песочницы», свободной от корпоративного
                  официоза, финансовых обязательств и токсичности взрослых профессиональных сообществ.
                </p>
                <CalloutBox type="info">
                  Мы верим в право на ошибку как главный инструмент обучения.
                </CalloutBox>
              </DocSection>

              <DocSection title="1.2. Ключевые принципы">
                <div className="space-y-4">
                  <PrincipleCard
                    icon="💰"
                    title="Нет деньгам"
                    desc="Мы не нанимаем и не платим. Мы работаем за репутацию (XP) и соавторство."
                    color="#f5c842"
                  />
                  <PrincipleCard
                    icon="🛡️"
                    title="Нет взрослой цензуре"
                    desc="Хаб управляется участниками, доказавшими свою адекватность (Совет Стражей)."
                    color="#7eff6a"
                  />
                  <PrincipleCard
                    icon="⚡"
                    title="Право на ошибку"
                    desc="Проваленный проект — это не позор, а контент для «Фейл-лога» и ценный опыт."
                    color="#60a5fa"
                  />
                </div>
              </DocSection>
            </section>

            {/* PART II */}
            <section id="spaces">
              <DocPartHeader num="II" title="Структура пространств" />
              <p className="text-[#666] text-base font-grotesk mb-8">
                Хаб состоит из трёх официальных пространств, в каждом из которых действуют чёткие правила поведения.
              </p>

              <SpaceDocCard
                num="2.1"
                tag="THE TERMINAL"
                name="«Общий чат»"
                color="#7eff6a"
                purpose="Технические холивары, нетворкинг, оперативная помощь, обмен опытом, флуд-зона для своих."
                allowed={[
                  'Обсуждают код, архитектуру, фреймворки, инструменты',
                  'Делятся туториалами и полезными ссылками',
                  'Запрашивают помощь по техническим проблемам',
                  'Ищут соавторов для проектов',
                  'Обсуждают кейсы и статьи из «Редакции»',
                ]}
                forbidden={[
                  'Токсичность, оскорбления, буллинг, переход на личности',
                  'Политика, религия, идеологическая агитация',
                  'Поиск оплачиваемой работы или сотрудников за деньги',
                  'Спам, скам, реферальные ссылки, криптосигналы',
                  'Слив личных данных (доксинг) и контент 18+',
                ]}
              />

              <SpaceDocCard
                num="2.2"
                tag="THE BUILDS"
                name="«Билды»"
                color="#60a5fa"
                purpose="Витрина проектов. Канал-галерея, где публикуются карточки проектов для поиска помощников."
                formatBlock={{
                  title: 'Обязательный формат публикации',
                  items: ['Название билда', 'Стек: (Python/Django, React, Figma и т.д.)', 'Суть: краткое ясное описание (1–2 предложения)', 'Список Квестов: какие задачи открыты', 'Контакты автора'],
                }}
                allowed={[
                  'Пет-проекты на любой стадии — от идеи до альфа-версии',
                  'Поиск соавторов (кодеров, дизайнеров, тестировщиков, девопсов)',
                  'Запрос на ревью архитектуры или дизайна',
                  'Уведомление о форке/наследовании заброшенного проекта',
                ]}
                forbidden={[
                  '«Голые идеи», где автор хочет только управлять и не участвует',
                  'Предлагать деньги/оплату (нарушает идеологию XP-экономики)',
                  'Флудить и обсуждать проекты в этом канале',
                ]}
              />

              <SpaceDocCard
                num="2.3"
                tag="THE LOG"
                name="«Редакция»"
                color="#f472b6"
                purpose="Качественный контент, созданный участниками: туториалы, технические статьи, «Фейл-логи»."
                formatBlock={{
                  title: 'Требования к статье',
                  items: ['Тег темы (#кейс, #разработка, #инструменты, #лайфхак, #метрики, #разборОшибок)', 'Контакты автора', 'Структурированный текст объёмом от 2000 знаков', 'Отсутствие прямой рекламы', 'Польза для сообщества'],
                }}
                allowed={[
                  'Экспертиза по разработке, дизайну, архитектуре',
                  'Нетривиальные технические решения',
                  'Разборы ошибок и неудачных запусков («Фейл-логи»)',
                ]}
                forbidden={[
                  'Статьи без тега и структуры',
                  'Прямая реклама',
                  'Объём менее 2000 знаков',
                ]}
              />
            </section>

            {/* PART III */}
            <section id="economy">
              <DocPartHeader num="III" title="Экономика (XP и Грейды)" />
              <p className="text-[#666] text-base font-grotesk mb-8">
                Экономика Хаба базируется на одной сущности: <strong className="text-white">XP (Experience Points)</strong> — несгораемом показателе вашей репутации и вклада в сообщество.
              </p>

              <DocSection title="3.1. Матрица начисления XP">
                <div className="overflow-x-auto -mx-4 px-4">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr className="border-b border-[#1a1a1a]">
                        {['Квест', 'Где', 'Действие', 'XP', 'Кто подтверждает'].map((h) => (
                          <th key={h} className="pb-3 text-left text-[10px] font-mono text-[#444] tracking-widest uppercase pr-6">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { quest: 'Тень', where: 'Проекты', action: 'Стажировка + фидбек', xp: 25, who: 'Автор' },
                        { quest: 'Баго-охотник', where: 'Проекты', action: 'Оформленный баг-репорт', xp: 40, who: 'Автор' },
                        { quest: 'Архитектор', where: 'Проекты', action: 'Принятый пул-реквест', xp: 100, who: 'Автор' },
                        { quest: 'Летописец', where: 'Редакция', action: 'Статья >2000 знаков', xp: 80, who: 'Редколлегия' },
                        { quest: 'Ментор', where: 'Чат', action: 'Обучение новичка', xp: 120, who: 'Ученик + Страж' },
                        { quest: 'Синтезатор', where: 'Чат', action: 'Медиация спора', xp: 90, who: 'Спорщики + Страж' },
                        { quest: 'Запуск Билда', where: 'Билды', action: 'Публикация карточки', xp: 50, who: 'Модератор' },
                        { quest: 'Фейл-лог', where: 'Редакция', action: 'Разбор провала + репо', xp: 160, who: 'Редколлегия' },
                      ].map((row, i) => (
                        <tr key={row.quest} className={`border-b border-[#111] ${i % 2 === 0 ? 'bg-[#0a0a0a]/30' : ''} hover:bg-[#7eff6a]/3 transition-colors`}>
                          <td className="py-3 pr-6 text-white text-sm font-semibold font-grotesk">{row.quest}</td>
                          <td className="py-3 pr-6 text-[#555] text-xs font-mono">{row.where}</td>
                          <td className="py-3 pr-6 text-[#777] text-sm font-grotesk">{row.action}</td>
                          <td className="py-3 pr-6">
                            <span className="text-[#f5c842] font-bold font-mono text-sm">+{row.xp}</span>
                          </td>
                          <td className="py-3 text-[#555] text-xs font-grotesk">{row.who}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </DocSection>

              <DocSection title="3.2. Грейды (Уровни доступа)">
                <div className="space-y-3">
                  {[
                    { level: 0, name: 'Recruit', xp: '0–99', color: '#666', icon: '🧑‍💻', rights: 'Читать чат, откликаться на Квесты, быть Помощником.' },
                    { level: 1, name: 'Builder', xp: '100–249', color: '#7eff6a', icon: '🔨', rights: 'Право публиковать свои Билды на Витрине. Становиться Автором.' },
                    { level: 2, name: 'Crafter', xp: '250–499', color: '#60a5fa', icon: '⚒️', rights: 'Право запрашивать внеочередное Код-ревью у участников с высоким Грейдом.' },
                    { level: 3, name: 'Archon', xp: '500–999', color: '#f5c842', icon: '📜', rights: 'Входит в Редколлегию. Право одобрять или отклонять статьи.' },
                    { level: 4, name: 'Sentinel', xp: '1000+', color: '#f472b6', icon: '🛡️', rights: 'Входит в Совет Стражей. Права модерации и верификации квестов.' },
                  ].map((g) => (
                    <div key={g.level} className="flex items-start gap-5 p-5 rounded-xl border border-[#1a1a1a] hover:border-current/30 transition-all group"
                      style={{ '--tw-border-opacity': 0.3 } as React.CSSProperties}>
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 border"
                        style={{ backgroundColor: g.color + '15', borderColor: g.color + '30' }}>
                        {g.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <span className="text-[10px] font-mono" style={{ color: g.color }}>LEVEL {g.level}</span>
                          <span className="text-white font-bold font-grotesk">{g.name}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono border"
                            style={{ borderColor: g.color + '30', color: g.color, backgroundColor: g.color + '10' }}>
                            {g.xp} XP
                          </span>
                        </div>
                        <p className="text-[#666] text-sm font-grotesk">{g.rights}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </DocSection>
            </section>

            {/* PART IV */}
            <section id="council">
              <DocPartHeader num="IV" title="Совет Стражей и администрация" />

              <DocSection title="4.1. Администрация (Основатели Хаба)">
                <p className="text-[#888] text-base font-grotesk mb-4">
                  Создатели и технические владельцы платформы. Высшая инстанция хаба.
                </p>
                <div className="space-y-2">
                  {[
                    'Техническая поддержка инфраструктуры (боты, каналы, стабильность)',
                    'Арбитраж в критических, неразрешимых конфликтах',
                    'Высшая инстанция при банах за особо тяжкие нарушения',
                    'Право вето на решения Совета Стражей (только при противоречии законодательству)',
                  ].map((item) => (
                    <RuleItem key={item} text={item} type="info" />
                  ))}
                </div>
              </DocSection>

              <DocSection title="4.2. Совет Стражей (Sentinels)">
                <CalloutBox type="success">
                  Стражи — не надзиратели, а такие же участники, взявшие на себя ответственность за атмосферу.
                </CalloutBox>
                <div className="mt-4 space-y-2">
                  {[
                    'Модерация Общего чата (удаление спама, токсичных сообщений)',
                    'Верификация социальных квестов (Менторство и Медиация)',
                    'Рассмотрение жалоб от участников и апелляций',
                    'Принятие решений о блокировке при грубых нарушениях',
                    'Поддержание актуальности правил и Устава',
                  ].map((item) => (
                    <RuleItem key={item} text={item} type="info" />
                  ))}
                </div>
              </DocSection>

              <DocSection title="4.3. Система наказаний">
                <div className="space-y-4">
                  <PunishmentCard
                    level={1}
                    name="Предупреждение (Страйк)"
                    color="#f5c842"
                    icon="⚠️"
                    desc="Письменное замечание от Стража в личные сообщения с точным указанием нарушенного пункта."
                  />
                  <PunishmentCard
                    level={2}
                    name="Read-Only на 24 часа"
                    color="#f97316"
                    icon="🔇"
                    desc="Временный запрет на отправку сообщений во всех каналах. Назначается при повторном нарушении."
                  />
                  <PunishmentCard
                    level={3}
                    name="Бан (Снос)"
                    color="#f87171"
                    icon="🚫"
                    desc="Полное и постоянное удаление. За: скам, доксинг, hate speech, угрозы, 3 неоплаченных Страйка."
                  />
                </div>
              </DocSection>
            </section>

            {/* PART V */}
            <section id="faillog">
              <DocPartHeader num="V" title="Протокол «Фейл-лог» (Право на ошибку)" />

              <CalloutBox type="success">
                В TeenBuild провал — это не клеймо, а контент и урок для всех. Если Автор понимает, что проект заморожен и не будет развиваться, он обязан честно его «похоронить», написав статью в Редакцию.
              </CalloutBox>

              <DocSection title="Содержание Фейл-лога">
                <div className="grid md:grid-cols-2 gap-3 mt-4">
                  {[
                    { n: '1', t: 'Название проекта и стек технологий' },
                    { n: '2', t: 'Изначальные цели: что хотели сделать' },
                    { n: '3', t: 'Точка остановки и причина заморозки' },
                    { n: '4', t: 'Ссылка на репозиторий (если исходники открыты)' },
                  ].map((item) => (
                    <div key={item.n} className="flex gap-3 p-4 rounded-xl bg-[#0f0f0f] border border-[#1a1a1a]">
                      <div className="w-7 h-7 rounded-lg bg-[#f472b6]/10 border border-[#f472b6]/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-[#f472b6] text-xs font-mono font-bold">{item.n}</span>
                      </div>
                      <span className="text-[#777] text-sm font-grotesk leading-relaxed">{item.t}</span>
                    </div>
                  ))}
                </div>
              </DocSection>

              <DocSection title="Последствия для Автора">
                <div className="space-y-2">
                  <RuleItem text="Начисляется 160 XP за честность и вклад в обучение сообщества." type="success" />
                  <RuleItem text="Репутация полностью сохраняется. Автор вправе немедленно запускать новый Билд." type="success" />
                </div>
              </DocSection>

              <DocSection title="Последствия для проекта">
                <div className="space-y-2">
                  <RuleItem text="Проект объявляется «осиротевшим»." type="info" />
                  <RuleItem text="Любой участник может подать заявку на Наследование (форк) без разрешения исходного Автора." type="info" />
                  <RuleItem text="Наследник становится новым Автором и получает +50 XP при публикации форка." type="success" />
                </div>
              </DocSection>

              {/* CTA */}
              <div className="mt-10 p-8 rounded-2xl border border-[#7eff6a]/20 bg-[#7eff6a]/5 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at right, rgba(126,255,106,0.07) 0%, transparent 60%)' }}
                />
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div>
                    <h3 className="text-white text-xl font-bold font-grotesk mb-2">Готов вступить в TeenBuild?</h3>
                    <p className="text-[#666] text-sm font-grotesk">Начни свой путь с нулевого XP. Реальные проекты ждут тебя.</p>
                  </div>
                  <button className="flex items-center gap-2 px-6 py-3 bg-[#7eff6a] text-[#080808] rounded-xl font-bold text-sm hover:bg-[#a0ff8a] transition-all font-grotesk flex-shrink-0">
                    Вступить в хаб
                    <ArrowRightIcon size={14} />
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Sub-components ---

function DocPartHeader({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[#1a1a1a]">
      <div className="px-3 py-1.5 rounded-lg bg-[#7eff6a]/10 border border-[#7eff6a]/20">
        <span className="text-[#7eff6a] text-xs font-mono font-bold tracking-widest">ЧАСТЬ {num}</span>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-white font-grotesk">{title}</h2>
    </div>
  );
}

function DocSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h3 className="text-lg font-semibold text-white font-grotesk mb-4 flex items-center gap-2">
        <span className="w-1 h-5 rounded-full bg-[#7eff6a]/60 inline-block" />
        {title}
      </h3>
      {children}
    </div>
  );
}

function CalloutBox({ type, children }: { type: 'info' | 'success' | 'warning'; children: React.ReactNode }) {
  const styles = {
    info: { border: '#60a5fa30', bg: '#60a5fa0a', icon: 'ℹ️', color: '#60a5fa' },
    success: { border: '#7eff6a30', bg: '#7eff6a0a', icon: '✅', color: '#7eff6a' },
    warning: { border: '#f5c84230', bg: '#f5c8420a', icon: '⚠️', color: '#f5c842' },
  }[type];

  return (
    <div className="flex gap-3 p-4 rounded-xl border mb-4" style={{ borderColor: styles.border, backgroundColor: styles.bg }}>
      <span>{styles.icon}</span>
      <p className="text-[#888] text-sm font-grotesk leading-relaxed">{children}</p>
    </div>
  );
}

function PrincipleCard({ icon, title, desc, color }: { icon: string; title: string; desc: string; color: string }) {
  return (
    <div className="flex gap-4 p-5 rounded-xl border border-[#1a1a1a] hover:border-current/30 transition-all group"
      style={{ '--tw-border-opacity': 0.3 } as React.CSSProperties}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
        style={{ backgroundColor: color + '15', border: `1px solid ${color}25` }}>
        {icon}
      </div>
      <div>
        <div className="font-semibold text-white mb-1 font-grotesk">{title}</div>
        <div className="text-[#666] text-sm font-grotesk">{desc}</div>
      </div>
    </div>
  );
}

function RuleItem({ text, type }: { text: string; type: 'info' | 'success' | 'danger' }) {
  const icons = {
    info: { icon: '→', color: '#60a5fa' },
    success: { icon: '✓', color: '#7eff6a' },
    danger: { icon: '✕', color: '#f87171' },
  }[type];

  return (
    <div className="flex items-start gap-3 py-2.5 px-3 rounded-lg hover:bg-white/2 transition-colors">
      <span className="text-sm font-mono mt-0.5 flex-shrink-0" style={{ color: icons.color }}>{icons.icon}</span>
      <span className="text-[#777] text-sm font-grotesk leading-relaxed">{text}</span>
    </div>
  );
}

function PunishmentCard({ level, name, color, icon, desc }: { level: number; name: string; color: string; icon: string; desc: string }) {
  return (
    <div className="flex gap-4 p-5 rounded-xl border transition-all hover:border-current/30"
      style={{ borderColor: color + '20', backgroundColor: color + '05' }}>
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
        style={{ backgroundColor: color + '15', border: `1px solid ${color}30` }}>
        {icon}
      </div>
      <div>
        <div className="flex items-center gap-3 mb-1 flex-wrap">
          <span className="text-[10px] font-mono" style={{ color }}>УРОВЕНЬ {level}</span>
          <span className="text-white font-semibold font-grotesk">{name}</span>
        </div>
        <p className="text-[#666] text-sm font-grotesk">{desc}</p>
      </div>
    </div>
  );
}

function SpaceDocCard({
  num, tag, name, color, purpose, allowed, forbidden, formatBlock
}: {
  num: string;
  tag: string;
  name: string;
  color: string;
  purpose: string;
  allowed: string[];
  forbidden: string[];
  formatBlock?: { title: string; items: string[] };
}) {
  return (
    <div className="mb-8 rounded-2xl border overflow-hidden" style={{ borderColor: color + '25' }}>
      {/* Header */}
      <div className="px-6 py-4 flex items-center gap-3" style={{ backgroundColor: color + '08' }}>
        <div className="text-[10px] font-mono tracking-widest text-[#444]">{num}</div>
        <div className="text-[10px] font-mono tracking-widest" style={{ color }}>{tag}</div>
        <div className="text-white font-bold font-grotesk">{name}</div>
      </div>

      <div className="p-6">
        <p className="text-[#777] text-sm font-grotesk mb-6">{purpose}</p>

        {formatBlock && (
          <div className="mb-6 p-4 rounded-xl bg-[#0a0a0a] border border-[#1a1a1a]">
            <div className="text-[10px] font-mono tracking-widest text-[#444] mb-3 uppercase">{formatBlock.title}</div>
            <div className="space-y-1.5">
              {formatBlock.items.map((item, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-[#333] font-mono text-xs">{i + 1}.</span>
                  <span className="text-[#666] text-xs font-grotesk">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-[#7eff6a]" />
              <span className="text-[10px] font-mono text-[#7eff6a] tracking-widest">РАЗРЕШЕНО</span>
            </div>
            <div className="space-y-2">
              {allowed.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="text-[#7eff6a] text-xs mt-0.5 flex-shrink-0">✓</span>
                  <span className="text-[#666] text-xs font-grotesk">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-[#f87171]" />
              <span className="text-[10px] font-mono text-[#f87171] tracking-widest">ЗАПРЕЩЕНО</span>
            </div>
            <div className="space-y-2">
              {forbidden.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="text-[#f87171] text-xs mt-0.5 flex-shrink-0">✕</span>
                  <span className="text-[#666] text-xs font-grotesk">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
