// ========================================
// TECLA MASTER - Aplicação Principal
// A melhor plataforma de ensino de teclado do Brasil
// ========================================

import { AppProvider } from './contexts/AppContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/home/Hero';
import ModuleCarousel from './components/home/ModuleCarousel';
import FeaturesSection from './components/home/FeaturesSection';
import PianoDemo from './components/home/PianoDemo';
import PricingSection from './components/home/PricingSection';
import TestimonialsSection from './components/home/TestimonialsSection';
import CTASection from './components/home/CTASection';
import ChordDictionary from './components/chords/ChordDictionary';
import FAQSection from './components/home/FAQSection';
import { modules, modulesByCategory } from './data/modules';

function HomePage() {
  // Módulos para os carrosséis
  const continueWatching = modules.slice(0, 4).map(m => ({ ...m, isLocked: false }));
  const gospelModules = modulesByCategory.gospel;
  const harmonyModules = modulesByCategory.harmonia;
  const newModules = modules.slice(0, 6);

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Continue Assistindo (se usuário logado) */}
      <section id="cursos">
        <ModuleCarousel
          title="🔥 Módulos em Destaque"
          subtitle="Comece sua jornada com os módulos mais populares"
          modules={continueWatching}
        />
      </section>

      {/* Módulos de Gospel */}
      <ModuleCarousel
        title="⛪ Gospel & Worship"
        subtitle="Tudo para você tocar na igreja com excelência"
        modules={gospelModules.length > 0 ? gospelModules : modules.slice(0, 4)}
      />

      {/* Demonstração do Teclado */}
      <PianoDemo />

      {/* Módulos de Harmonia */}
      <ModuleCarousel
        title="🎼 Harmonia & Teoria"
        subtitle="Entenda a música de forma profunda"
        modules={harmonyModules.length > 0 ? harmonyModules : modules.slice(2, 6)}
      />

      {/* Dicionário de Acordes */}
      <ChordDictionary />

      {/* Features/Recursos */}
      <FeaturesSection />

      {/* Todos os Módulos */}
      <ModuleCarousel
        title="📚 Todos os Módulos"
        subtitle="Explore todo o conteúdo disponível"
        modules={newModules}
      />

      {/* Depoimentos */}
      <TestimonialsSection />

      {/* Planos e Preços */}
      <PricingSection />

      {/* FAQ */}
      <FAQSection />

      {/* CTA Final */}
      <CTASection />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#0a0a0f]">
        {/* Header Fixo */}
        <Header />

        {/* Conteúdo Principal */}
        <main>
          <HomePage />
        </main>

        {/* Footer */}
        <Footer />

        {/* Loading Overlay (para transições futuras) */}
        {/* <LoadingOverlay /> */}

        {/* Toast Notifications (para futuras implementações) */}
        {/* <ToastContainer /> */}
      </div>
    </AppProvider>
  );
}
