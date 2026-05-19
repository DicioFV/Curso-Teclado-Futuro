// ========================================
// TECLA MASTER - Seção de Recursos/Features
// ========================================

import { useState } from 'react';

const features = [
  {
    icon: '🎹',
    title: 'Teclado Virtual Interativo',
    description: 'Pratique diretamente no navegador com nosso teclado virtual com sons HD. Suporte a MIDI e teclado do computador.',
    color: 'from-purple-600 to-purple-400',
    image: 'keyboard'
  },
  {
    icon: '👂',
    title: 'Treino de Ouvido Musical',
    description: 'Desenvolva seu ouvido com exercícios de intervalos, acordes, escalas e progressões harmônicas.',
    color: 'from-cyan-600 to-cyan-400',
    image: 'ear'
  },
  {
    icon: '📖',
    title: 'Dicionário de Acordes',
    description: 'Biblioteca completa com todos os acordes, inversões, voicings e aplicações práticas em cada tonalidade.',
    color: 'from-pink-600 to-pink-400',
    image: 'chords'
  },
  {
    icon: '🎼',
    title: 'Partituras Interativas',
    description: 'Visualize partituras que acompanham o áudio. Transponha para qualquer tom instantaneamente.',
    color: 'from-amber-600 to-amber-400',
    image: 'sheets'
  },
  {
    icon: '⏱️',
    title: 'Metrônomo Profissional',
    description: 'Metrônomo integrado com ajuste de BPM, subdivisões, tap tempo e aumento progressivo.',
    color: 'from-green-600 to-green-400',
    image: 'metronome'
  },
  {
    icon: '🏆',
    title: 'Gamificação Completa',
    description: 'Ganhe XP, badges, certificados e suba no ranking. Mantenha sua streak de estudos diários.',
    color: 'from-orange-600 to-orange-400',
    image: 'gamification'
  },
  {
    icon: '📱',
    title: 'PWA - Funciona Offline',
    description: 'Instale como app no celular. Acesse aulas e exercícios mesmo sem internet.',
    color: 'from-blue-600 to-blue-400',
    image: 'pwa'
  },
  {
    icon: '📹',
    title: '+500 Aulas em Vídeo HD',
    description: 'Vídeos profissionais com múltiplos ângulos de câmera e qualidade cinematográfica.',
    color: 'from-red-600 to-red-400',
    image: 'videos'
  }
];

export default function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="recursos" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 
                         text-sm font-medium mb-4">
            Recursos Exclusivos
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Tudo que você precisa para
            <span className="text-gradient block mt-2">dominar o teclado</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Uma plataforma completa com ferramentas interativas, conteúdo premium 
            e tecnologia de ponta para acelerar seu aprendizado.
          </p>
        </div>

        {/* Grid de Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative p-6 rounded-2xl transition-all duration-500
                        ${hoveredIndex === index 
                          ? 'bg-gradient-to-br from-white/10 to-white/5 scale-105 z-10' 
                          : 'bg-white/5 hover:bg-white/10'}
                        border border-white/5 hover:border-white/10`}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Glow effect on hover */}
              {hoveredIndex === index && (
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-10 
                               rounded-2xl blur-xl -z-10`} />
              )}

              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} 
                            flex items-center justify-center text-2xl mb-4
                            shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gradient transition-colors">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-400 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover arrow */}
              <div className={`absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 
                            transition-all duration-300 transform translate-x-2 group-hover:translate-x-0`}>
                <span className="text-purple-400">→</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
            <button className="btn-primary px-8 py-4 text-lg">
              Explorar Todos os Recursos
            </button>
            <span className="text-gray-500">ou</span>
            <button className="text-purple-400 hover:text-purple-300 font-medium flex items-center gap-2 transition-colors">
              Ver demonstração em vídeo
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
