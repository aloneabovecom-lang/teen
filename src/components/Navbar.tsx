import { useState, useEffect } from 'react';
import { LogoIcon, MenuIcon, CloseIcon } from './Icons';

interface NavbarProps {
  activePage: 'home' | 'docs';
  onNavigate: (page: 'home' | 'docs') => void;
}

export default function Navbar({ activePage, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'О нас', href: '#about' },
    { label: 'Как устроено', href: '#how' },
    { label: 'Пространства', href: '#spaces' },
    { label: 'XP / Грейды', href: '#xp' },
    { label: 'Документация', page: 'docs' as const },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#080808]/90 backdrop-blur-xl border-b border-[#1e1e1e]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 group"
          >
            <LogoIcon />
            <div className="flex flex-col leading-none">
              <span className="text-white font-bold text-base tracking-wider font-grotesk">
                Teen<span className="text-[#7eff6a]">Build</span>
              </span>
              <span className="text-[#555] text-[10px] font-mono tracking-[0.2em]">IT-ХАБ v1.0</span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.page ? (
                <button
                  key={link.label}
                  onClick={() => onNavigate(link.page!)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 font-grotesk ${
                    activePage === 'docs'
                      ? 'text-[#7eff6a] bg-[#7eff6a]/10'
                      : 'text-[#888] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => { if (activePage !== 'home') onNavigate('home'); }}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-[#888] hover:text-white hover:bg-white/5 transition-all duration-200 font-grotesk"
                >
                  {link.label}
                </a>
              )
            )}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button className="px-5 py-2 text-sm font-medium text-[#7eff6a] border border-[#7eff6a]/30 rounded-lg hover:bg-[#7eff6a]/10 hover:border-[#7eff6a]/60 transition-all duration-200 font-grotesk">
              Войти
            </button>
            <button className="px-5 py-2 text-sm font-bold text-[#080808] bg-[#7eff6a] rounded-lg hover:bg-[#a0ff8a] transition-all duration-200 font-grotesk flex items-center gap-2">
              Вступить
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="#080808" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-[#888] hover:text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#080808]/98 backdrop-blur-xl border-b border-[#1e1e1e] px-6 py-4">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) =>
              link.page ? (
                <button
                  key={link.label}
                  onClick={() => { onNavigate(link.page!); setMobileOpen(false); }}
                  className="text-left px-4 py-3 rounded-lg text-sm text-[#7eff6a] bg-[#7eff6a]/10 font-grotesk"
                >
                  {link.label}
                </button>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm text-[#888] hover:text-white hover:bg-white/5 transition-all font-grotesk"
                >
                  {link.label}
                </a>
              )
            )}
            <div className="flex gap-3 mt-4 pt-4 border-t border-[#1e1e1e]">
              <button className="flex-1 px-4 py-2.5 text-sm font-medium text-[#7eff6a] border border-[#7eff6a]/30 rounded-lg font-grotesk">
                Войти
              </button>
              <button className="flex-1 px-4 py-2.5 text-sm font-bold text-[#080808] bg-[#7eff6a] rounded-lg font-grotesk">
                Вступить
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
