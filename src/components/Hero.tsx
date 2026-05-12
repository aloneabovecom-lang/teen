import { useState, useEffect } from 'react';
import { ArrowRightIcon, ZapIcon } from './Icons';

const TERMINAL_LINES = [
  '$ git clone teenbuild/hub --no-rules',
  '> Connecting to sandbox environment...',
  '> Loading XP system... [████████] 100%',
  '> Welcome, Builder. Start your quest.',
];

export default function Hero({ onNavigate }: { onNavigate: (p: 'home' | 'docs') => void }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState('');

  useEffect(() => {
    if (lineIndex >= TERMINAL_LINES.length) return;
    const line = TERMINAL_LINES[lineIndex];
    if (charIndex < line.length) {
      const t = setTimeout(() => {
        setCurrentLine(line.slice(0, charIndex + 1));
        setCharIndex(c => c + 1);
      }, 35);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDisplayedLines(prev => [...prev, line]);
        setCurrentLine('');
        setCharIndex(0);
        setLineIndex(i => i + 1);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [lineIndex, charIndex]);

  const tags = ['React', 'Python', 'Figma', 'Node.js', 'DevOps', 'Mobile', 'AI/ML', 'Design'];

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(126,255,106,0.06) 0%, transparent 70%)' }}
      />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(126,255,106,0.04) 0%, transparent 70%)' }}
      />

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#7eff6a]/30 animate-pulse-slow"
          style={{
            left: `${10 + (i * 8)}%`,
            top: `${15 + (i % 5) * 15}%`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${3 + i * 0.3}s`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#7eff6a]/20 bg-[#7eff6a]/5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7eff6a] animate-pulse" />
              <span className="text-[#7eff6a] text-xs font-mono tracking-wider">НЕЗАВИСИМЫЙ IT-ХАБ ДЛЯ 14–17 ЛЕТ</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 font-grotesk">
              Строй{' '}
              <span className="relative">
                <span className="text-gradient-green glow-text">реальное</span>
                <svg className="absolute -bottom-2 left-0 w-full" height="4" viewBox="0 0 200 4" preserveAspectRatio="none">
                  <path d="M0 2 Q50 0 100 2 Q150 4 200 2" stroke="#7eff6a" strokeWidth="2" fill="none" opacity="0.5"/>
                </svg>
              </span>
              <br />без корпоративного<br />
              <span className="text-[#555]">официоза</span>
            </h1>

            <p className="text-[#888] text-lg leading-relaxed mb-8 max-w-lg font-grotesk">
              TeenBuild — это хаб, где подростки создают цифровые продукты, зарабатывают XP за вклад и учатся на реальных ошибках. Без денег. Без цензуры взрослых.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <button
                onClick={() => onNavigate('docs')}
                className="group flex items-center gap-3 px-7 py-3.5 bg-[#7eff6a] text-[#080808] rounded-xl font-bold text-sm hover:bg-[#a0ff8a] transition-all duration-200 hover:shadow-[0_0_30px_rgba(126,255,106,0.3)] font-grotesk"
              >
                Читать Устав
                <span className="group-hover:translate-x-1 transition-transform duration-200">
                  <ArrowRightIcon />
                </span>
              </button>
              <button className="group flex items-center gap-3 px-7 py-3.5 border border-[#2a2a2a] text-white rounded-xl font-medium text-sm hover:border-[#7eff6a]/40 hover:bg-[#7eff6a]/5 transition-all duration-200 font-grotesk">
                <ZapIcon size={16} />
                Вступить в хаб
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8">
              {[
                { val: '14–17', label: 'Лет участникам' },
                { val: 'XP', label: 'Система репутации' },
                { val: '∞', label: 'Право на ошибку' },
              ].map((stat) => (
                <div key={stat.val} className="flex flex-col">
                  <span className="text-2xl font-bold text-white font-grotesk">{stat.val}</span>
                  <span className="text-[10px] text-[#555] font-mono tracking-wider uppercase">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column — Terminal */}
          <div className="relative">
            {/* Glow behind terminal */}
            <div className="absolute inset-0 -m-4 rounded-3xl"
              style={{ background: 'radial-gradient(ellipse, rgba(126,255,106,0.08) 0%, transparent 70%)' }}
            />

            <div className="relative rounded-2xl overflow-hidden border border-[#1e1e1e] bg-[#0c0c0c] shadow-2xl animate-float">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1e1e1e] bg-[#111111]">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 text-[#444] text-xs font-mono">teenbuild ~ terminal</span>
              </div>

              {/* Terminal Body */}
              <div className="p-6 font-mono text-sm min-h-[200px]">
                {displayedLines.map((line, i) => (
                  <div key={i} className={`mb-2 ${i === 0 ? 'text-[#7eff6a]' : 'text-[#666]'}`}>
                    {line}
                  </div>
                ))}
                {lineIndex < TERMINAL_LINES.length && (
                  <div className={`${lineIndex === 0 ? 'text-[#7eff6a]' : 'text-[#666]'}`}>
                    {currentLine}
                    <span className="animate-blink text-[#7eff6a]">█</span>
                  </div>
                )}
              </div>

              {/* XP Card inside terminal */}
              <div className="mx-4 mb-4 p-4 rounded-xl border border-[#1e1e1e] bg-[#111111]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#555] text-xs font-mono">YOUR PROFILE</span>
                  <span className="text-[#7eff6a] text-xs font-mono">RECRUIT • 0 XP</span>
                </div>
                <div className="w-full h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <div className="h-full w-0 bg-gradient-to-r from-[#7eff6a] to-[#4ade80] rounded-full transition-all duration-1000"
                    style={{ width: '0%' }} />
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-[10px] text-[#444] font-mono">0 XP</span>
                  <span className="text-[10px] text-[#444] font-mono">100 XP → Builder</span>
                </div>
              </div>
            </div>

            {/* Floating tags */}
            <div className="absolute -right-4 top-12 flex flex-col gap-2">
              {tags.slice(0, 4).map((tag, i) => (
                <div
                  key={tag}
                  className="px-3 py-1.5 rounded-lg border border-[#1e1e1e] bg-[#0c0c0c]/80 text-[#555] text-xs font-mono hover:border-[#7eff6a]/30 hover:text-[#7eff6a] transition-all cursor-default"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  #{tag}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-20">
          <div className="flex flex-col items-center gap-2 animate-pulse-slow">
            <span className="text-[#444] text-xs font-mono tracking-wider">SCROLL</span>
            <div className="w-px h-12 bg-gradient-to-b from-[#444] to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
