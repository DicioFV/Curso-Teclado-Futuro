// ========================================
// TECLA MASTER - Carrossel de Módulos (Estilo Netflix)
// ========================================

import { useRef, useState } from 'react';
import { Module } from '../../types';
import { categoryNames, categoryColors } from '../../data/modules';

interface ModuleCarouselProps {
  title: string;
  subtitle?: string;
  modules: Module[];
  showCategory?: boolean;
}

// Ícone de cadeado
const LockIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 17a2 2 0 002-2V12a2 2 0 00-4 0v3a2 2 0 002 2zm6-9h-1V6A5 5 0 007 6v2H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V10a2 2 0 00-2-2zM9 6a3 3 0 016 0v2H9V6z" />
  </svg>
);

// Card do Módulo
function ModuleCard({ module, index }: { module: Module; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  const planBadges = {
    free: { label: 'Grátis', class: 'badge-free' },
    pro: { label: 'PRO', class: 'badge-pro' },
    master: { label: 'MASTER', class: 'bg-gradient-to-r from-pink-600 to-rose-400 text-white' },
    premium: { label: 'PREMIUM', class: 'badge-premium' }
  };

  const difficultyLabels = {
    iniciante: { label: 'Iniciante', color: 'text-green-400' },
    intermediario: { label: 'Intermediário', color: 'text-yellow-400' },
    avancado: { label: 'Avançado', color: 'text-red-400' }
  };

  return (
    <div 
      className="carousel-item w-[280px] sm:w-[320px] flex-shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={`card-premium h-full transition-all duration-500 
                      ${isHovered ? 'scale-105 z-10' : 'scale-100'}`}>
        
        {/* Thumbnail */}
        <div className="relative aspect-video rounded-t-2xl overflow-hidden">
          <img 
            src={module.thumbnail}
            alt={module.title}
            className="w-full h-full object-cover transition-transform duration-700"
            style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
          />
          
          {/* Overlay com gradiente */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          
          {/* Badge de Plano */}
          <div className="absolute top-3 left-3">
            <span className={`badge ${planBadges[module.requiredPlan].class}`}>
              {planBadges[module.requiredPlan].label}
            </span>
          </div>

          {/* Duração */}
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs text-white">
            {module.totalDuration}
          </div>

          {/* Lock overlay se bloqueado */}
          {module.isLocked && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2">
                  <LockIcon />
                </div>
                <p className="text-sm text-gray-300">Desbloqueie com {planBadges[module.requiredPlan].label}</p>
              </div>
            </div>
          )}

          {/* Play button on hover */}
          {!module.isLocked && isHovered && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm 
                               flex items-center justify-center hover:bg-white/30 
                               transition-all duration-300 hover:scale-110 animate-scale-in">
                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            </div>
          )}

          {/* Info no bottom da imagem */}
          <div className="absolute bottom-3 left-3 right-3">
            <span className={`text-xs font-medium ${difficultyLabels[module.difficulty].color}`}>
              {difficultyLabels[module.difficulty].label}
            </span>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-5">
          {/* Categoria */}
          <div className="mb-2">
            <span className={`text-xs font-semibold bg-gradient-to-r ${categoryColors[module.category]} 
                            bg-clip-text text-transparent uppercase tracking-wider`}>
              {categoryNames[module.category]}
            </span>
          </div>

          {/* Título */}
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
            {module.title}
          </h3>

          {/* Descrição */}
          <p className="text-sm text-gray-400 line-clamp-2 mb-4">
            {module.description}
          </p>

          {/* Meta info */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">
              📚 {module.totalLessons} aulas
            </span>
            
            {/* Progress (se o usuário tiver progresso) */}
            <div className="flex items-center gap-2">
              <div className="w-20 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                  style={{ width: '0%' }}
                />
              </div>
              <span className="text-gray-500 text-xs">0%</span>
            </div>
          </div>
        </div>

        {/* Hover actions */}
        {isHovered && !module.isLocked && (
          <div className="px-5 pb-5 animate-fade-in">
            <button className="w-full btn-primary py-2.5 text-sm">
              Assistir Agora
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ModuleCarousel({ title, subtitle, modules }: ModuleCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 340; // Largura do card + gap
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(updateScrollButtons, 300);
    }
  };

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-gray-400">{subtitle}</p>
            )}
          </div>

          {/* Botões de navegação */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center
                        transition-all duration-300 ${canScrollLeft 
                          ? 'hover:bg-white/10 hover:border-white/20 text-white' 
                          : 'text-gray-600 cursor-not-allowed'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center
                        transition-all duration-300 ${canScrollRight 
                          ? 'hover:bg-white/10 hover:border-white/20 text-white' 
                          : 'text-gray-600 cursor-not-allowed'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carrossel */}
        <div className="relative -mx-4 px-4">
          <div 
            ref={carouselRef}
            onScroll={updateScrollButtons}
            className="flex gap-5 overflow-x-auto pb-4 hide-scrollbar scroll-smooth"
          >
            {modules.map((module, index) => (
              <ModuleCard key={module.id} module={module} index={index} />
            ))}
          </div>

          {/* Gradientes de fade nas laterais */}
          <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-[#0a0a0f] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-[#0a0a0f] to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
