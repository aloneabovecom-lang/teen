const items = [
  '⚡ React', '🐍 Python', '🎨 Figma', '🛠 Node.js',
  '🐳 Docker', '📱 Flutter', '🦀 Rust', '☁️ Cloud',
  '🤖 AI/ML', '🎮 Unity', '🔐 Security', '📊 Data',
  '⚡ React', '🐍 Python', '🎨 Figma', '🛠 Node.js',
  '🐳 Docker', '📱 Flutter', '🦀 Rust', '☁️ Cloud',
  '🤖 AI/ML', '🎮 Unity', '🔐 Security', '📊 Data',
];

export default function MarqueeTicker() {
  return (
    <div className="relative border-y border-[#1a1a1a] bg-[#0a0a0a] py-4 overflow-hidden">
      {/* Fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #080808, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #080808, transparent)' }} />

      <div className="flex whitespace-nowrap marquee-track">
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-6 text-sm text-[#555] font-mono border-r border-[#1a1a1a] hover:text-[#7eff6a] transition-colors cursor-default"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
