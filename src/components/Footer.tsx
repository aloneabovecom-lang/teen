import { LogoIcon } from './Icons';

export default function Footer({ onNavigate }: { onNavigate: (p: 'home' | 'docs') => void }) {
  return (
    <footer className="relative border-t border-[#1a1a1a] pt-16 pb-8 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <LogoIcon />
              <div className="flex flex-col leading-none">
                <span className="text-white font-bold text-base font-grotesk">
                  Teen<span className="text-[#7eff6a]">Build</span>
                </span>
                <span className="text-[#444] text-[10px] font-mono tracking-[0.2em]">IT-ХАБ v1.0</span>
              </div>
            </div>
            <p className="text-[#555] text-sm leading-relaxed font-grotesk mb-5">
              Независимый IT-хаб, созданный подростком для подростков (14–17 лет).
            </p>
            <div className="flex gap-3">
              {['TG', 'GH', 'DC'].map((s) => (
                <button
                  key={s}
                  className="w-9 h-9 rounded-xl border border-[#1e1e1e] text-[#555] text-xs font-mono hover:border-[#7eff6a]/40 hover:text-[#7eff6a] transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: 'Хаб',
              links: ['О проекте', 'Пространства', 'XP и Грейды', 'Совет Стражей'],
            },
            {
              title: 'Участникам',
              links: ['Как начать', 'Открытые квесты', 'Публикации', 'Фейл-логи'],
            },
            {
              title: 'Документы',
              links: ['Устав Хаба', 'Миссия', 'Правила', 'Система наказаний'],
            },
          ].map((col) => (
            <div key={col.title}>
              <div className="text-[#555] text-xs font-mono tracking-widest uppercase mb-5">{col.title}</div>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => col.title === 'Документы' ? onNavigate('docs') : undefined}
                      className="text-[#666] text-sm font-grotesk hover:text-white transition-colors text-left"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-[#1a1a1a]">
          <div className="text-[#444] text-xs font-mono">
            © 2025 TeenBuild. Построено подростком для подростков.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7eff6a] animate-pulse" />
            <span className="text-[#444] text-xs font-mono">Хаб активен</span>
          </div>
          <div className="text-[#333] text-xs font-mono">
            Сделано с ❤️ на React + Vite
          </div>
        </div>
      </div>
    </footer>
  );
}
