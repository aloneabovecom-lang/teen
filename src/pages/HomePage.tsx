import Hero from '../components/Hero';
import MarqueeTicker from '../components/MarqueeTicker';
import StatsSection from '../components/StatsSection';
import About from '../components/About';
import Spaces from '../components/Spaces';
import HowItWorks from '../components/HowItWorks';
import XPSection from '../components/XPSection';
import FailLog from '../components/FailLog';
import CouncilSection from '../components/CouncilSection';
import CTASection from '../components/CTASection';

interface HomePageProps {
  onNavigate: (page: 'home' | 'docs') => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <main>
      <Hero onNavigate={onNavigate} />
      <MarqueeTicker />
      <StatsSection />
      <About />
      <Spaces />
      <HowItWorks />
      <XPSection />
      <CouncilSection />
      <FailLog />
      <CTASection onNavigate={onNavigate} />
    </main>
  );
}
