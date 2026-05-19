// ========================================
// TECLA MASTER - Seção Final de CTA
// ========================================

import { useState, useEffect } from 'react';

export default function CTASection() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  // Countdown timer (fake para demonstração)
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background com gradiente intenso */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-[#0a0a0f] to-cyan-900/50" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[200px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Urgência */}
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-red-500/10 
                      border border-red-500/20 text-red-400 text-sm font-medium mb-8 animate-pulse">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          Oferta especial termina em breve!
        </div>

        {/* Countdown */}
        <div className="flex justify-center gap-4 mb-10">
          {[
            { value: timeLeft.hours, label: 'Horas' },
            { value: timeLeft.minutes, label: 'Min' },
            { value: timeLeft.seconds, label: 'Seg' },
          ].map((item, index) => (
            <div key={item.label} className="text-center">
              <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-xl bg-white/5 border border-white/10 
                            flex items-center justify-center mb-2">
                <span className="text-2xl sm:text-3xl font-bold text-white">
                  {String(item.value).padStart(2, '0')}
                </span>
              </div>
              <span className="text-xs text-gray-500">{item.label}</span>
              {index < 2 && (
                <span className="absolute text-2xl text-gray-600 ml-2 hidden sm:inline">:</span>
              )}
            </div>
          ))}
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
          Comece sua jornada musical
          <span className="text-gradient block mt-2">hoje mesmo!</span>
        </h2>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Junte-se a mais de <span className="text-white font-semibold">10.000 alunos</span> que 
          já estão transformando suas vidas através da música. Acesso imediato a todo o conteúdo.
        </p>

        {/* Oferta */}
        <div className="inline-block mb-8">
          <div className="flex items-center justify-center gap-4">
            <span className="text-gray-500 line-through text-xl">R$ 1.997</span>
            <span className="text-5xl sm:text-6xl font-bold text-gradient-gold">R$ 997</span>
          </div>
          <p className="text-gray-400 mt-2">
            ou 12x de R$ 97,00 no cartão
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
          <button className="btn-gold text-xl px-12 py-5 flex items-center justify-center gap-3">
            <span>🚀</span>
            QUERO COMEÇAR AGORA
          </button>
        </div>

        {/* Garantia */}
        <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-green-500/5 
                      border border-green-500/10">
          <span className="text-5xl">🛡️</span>
          <div className="text-left">
            <p className="text-green-400 font-bold text-lg">Garantia Incondicional</p>
            <p className="text-gray-400">
              7 dias para testar. Não gostou? <span className="text-white">100% do dinheiro de volta</span>.
            </p>
          </div>
        </div>

        {/* O que está incluso */}
        <div className="mt-16">
          <p className="text-gray-500 mb-6">Tudo isso está incluso:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {[
              '50+ Módulos Completos',
              '500+ Aulas em Vídeo HD',
              'Dicionário de Acordes',
              'Treino de Ouvido',
              'Partituras Interativas',
              'Certificados',
              'Comunidade VIP',
              'Suporte Premium',
              'Acesso Vitalício',
            ].map((item) => (
              <span 
                key={item}
                className="px-4 py-2 rounded-full bg-white/5 text-gray-300 border border-white/5"
              >
                ✓ {item}
              </span>
            ))}
          </div>
        </div>

        {/* Social proof final */}
        <div className="mt-16 flex flex-col sm:flex-row justify-center items-center gap-8">
          <div className="flex -space-x-3">
            {['A', 'M', 'J', 'P', 'L', 'C', 'F', 'R'].map((letter, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full border-2 border-[#0a0a0f] bg-gradient-to-br 
                         from-purple-600 to-cyan-500 flex items-center justify-center text-xs font-bold"
              >
                {letter}
              </div>
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-[#0a0a0f] bg-purple-900 
                          flex items-center justify-center text-xs text-purple-400">
              +9k
            </div>
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1 mb-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className="text-yellow-400">★</span>
              ))}
              <span className="text-white font-bold ml-2">4.9/5</span>
            </div>
            <p className="text-gray-500 text-sm">Avaliação de +10.000 alunos</p>
          </div>
        </div>
      </div>
    </section>
  );
}
