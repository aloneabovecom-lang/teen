import { ArrowRightIcon } from './Icons';

interface CTAProps {
  onNavigate: (p: 'home' | 'docs') => void;
}

export default function CTASection({ onNavigate }: CTAProps) {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* BG Effects */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(126,255,106,0.08) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#7eff6a]/20 bg-[#7eff6a]/5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7eff6a] animate-pulse" />
          <span className="text-[#7eff6a] text-xs font-mono tracking-wider">ПРИСОЕДИНЯЙСЯ К ХАБУ</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold text-white font-grotesk leading-tight mb-6">
          Открой новый{' '}
          <span className="text-gradient-green">Билд</span>
          <br />прямо сейчас
        </h2>

        <p className="text-[#666] text-lg font-grotesk max-w-2xl mx-auto mb-12 leading-relaxed">
          Не нужен идеальный проект. Нужна идея и желание строить.
          Ошибки принимаются. Фейлы приветствуются. Рост гарантирован.
        </p>

        {/* Action buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <button className="group flex items-center gap-3 px-8 py-4 bg-[#7eff6a] text-[#080808] rounded-xl font-bold text-base hover:bg-[#a0ff8a] transition-all duration-200 hover:shadow-[0_0_50px_rgba(126,255,106,0.3)] font-grotesk">
            Вступить в TeenBuild
            <span className="group-hover:translate-x-1 transition-transform duration-200">
              <ArrowRightIcon size={18} />
            </span>
          </button>
          <button
            onClick={() => onNavigate('docs')}
            className="flex items-center gap-3 px-8 py-4 border border-[#2a2a2a] text-white rounded-xl font-medium text-base hover:border-[#7eff6a]/30 hover:bg-[#7eff6a]/5 transition-all duration-200 font-grotesk"
          >
            Читать Устав
          </button>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '⚡', label: 'XP-экономика', sub: 'Репутация вместо денег' },
            { icon: '🛡️', label: 'Самоуправление', sub: 'Совет из участников' },
            { icon: '📋', label: 'Фейл-логи', sub: 'Провал = +160 XP' },
            { icon: '🚀', label: 'Реальные проекты', sub: 'От идеи до запуска' },
          ].map((f) => (
            <div key={f.label} className="card-gradient rounded-2xl p-5 text-center hover-lift">
              <div className="text-3xl mb-2">{f.icon}</div>
              <div className="text-white text-sm font-semibold font-grotesk mb-1">{f.label}</div>
              <div className="text-[#555] text-xs font-grotesk">{f.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
