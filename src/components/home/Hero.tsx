// ========================================
// TECLA MASTER - Seção Hero Premium
// ========================================

import { useState, useEffect } from 'react';

// Estatísticas animadas
const stats = [
  { value: 10000, suffix: '+', label: 'Alunos Ativos' },
  { value: 500, suffix: '+', label: 'Aulas em Vídeo' },
  { value: 50, suffix: '', label: 'Módulos Completos' },
  { value: 98, suffix: '%', label: 'Satisfação' }
];

// Componente de contador animado
function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {count.toLocaleString('pt-BR')}{suffix}
    </span>
  );
}

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background com gradientes e efeitos */}
      <div className="absolute inset-0">
        {/* Gradiente principal */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-[#0a0a0f] to-cyan-900/20" />
        
        {/* Círculos decorativos */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-600/20 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[100px]" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Partículas flutuantes */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-500/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Coluna de Texto */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 
                          border border-purple-500/20 text-purple-400 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              Nova Masterclass de Gospel Disponível
            </div>

            {/* Título */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="text-white">Aprenda </span>
              <span className="text-gradient">Teclado</span>
              <br />
              <span className="text-white">do </span>
              <span className="text-gradient-gold">Zero ao Pro</span>
            </h1>

            {/* Descrição */}
            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-xl">
              A plataforma mais completa de ensino de teclado do Brasil. 
              Domine <span className="text-white font-medium">Gospel</span>, 
              <span className="text-white font-medium"> Worship</span>, 
              <span className="text-white font-medium"> Jazz</span> e muito mais 
              com aulas em vídeo HD, exercícios interativos e certificados.
            </p>

            {/* Botões CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary text-lg px-8 py-4 flex items-center justify-center gap-3">
                <span>🎹</span>
                Começar Agora — Grátis
              </button>
              <button className="btn-secondary text-lg px-8 py-4 flex items-center justify-center gap-3">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Ver Demonstração
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 pt-4">
              {/* Avatares */}
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-[#0a0a0f] bg-gradient-to-br from-purple-600 to-cyan-500
                             flex items-center justify-center text-xs font-bold"
                  >
                    {['A', 'M', 'J', 'P', 'L'][i - 1]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                  <span className="text-white font-semibold ml-1">4.9</span>
                </div>
                <p className="text-sm text-gray-500">+10.000 alunos satisfeitos</p>
              </div>
            </div>
          </div>

          {/* Coluna Visual - Teclado Ilustrativo */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Card Principal */}
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-3xl blur-2xl opacity-30" />
              
              {/* Card content */}
              <div className="relative glass rounded-3xl p-6 sm:p-8">
                {/* Mini player de vídeo */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-black mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-cyan-900/50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm 
                                     flex items-center justify-center hover:bg-white/30 
                                     transition-all duration-300 hover:scale-110 group">
                      <svg className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </button>
                  </div>
                  {/* Progress bar fake */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                    <div className="h-full w-1/3 bg-gradient-to-r from-purple-500 to-cyan-500" />
                  </div>
                </div>

                {/* Teclado visual simplificado */}
                <div className="flex justify-center gap-px mb-6">
                  {['Dó', 'Ré', 'Mi', 'Fá', 'Sol', 'Lá', 'Si'].map((note, i) => (
                    <div key={note} className="relative">
                      <div 
                        className={`w-10 sm:w-12 h-24 sm:h-32 rounded-b-lg bg-gradient-to-b 
                                  ${i === 0 ? 'from-purple-400 to-purple-600' : 'from-gray-100 to-gray-300'}
                                  shadow-lg flex items-end justify-center pb-2 transition-all duration-200
                                  hover:-translate-y-1 hover:shadow-xl cursor-pointer`}
                      >
                        <span className={`text-xs font-medium ${i === 0 ? 'text-white' : 'text-gray-600'}`}>
                          {note}
                        </span>
                      </div>
                      {/* Teclas pretas */}
                      {[0, 1, 3, 4, 5].includes(i) && (
                        <div className="absolute -right-3 top-0 w-6 h-16 sm:h-20 bg-gradient-to-b 
                                      from-gray-800 to-black rounded-b-md shadow-xl z-10
                                      hover:-translate-y-1 transition-transform cursor-pointer" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Info cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">🎯</span>
                      <span className="text-sm text-gray-400">Próxima Aula</span>
                    </div>
                    <p className="text-white font-medium text-sm">Acordes de Sétima</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">🔥</span>
                      <span className="text-sm text-gray-400">Streak</span>
                    </div>
                    <p className="text-white font-medium text-sm">7 dias seguidos!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-500 to-yellow-400 
                          text-black font-bold text-sm px-4 py-2 rounded-full shadow-lg
                          animate-bounce">
              🏆 Nº 1 em Gospel
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 delay-500 
                       ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm sm:text-base text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/40 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
