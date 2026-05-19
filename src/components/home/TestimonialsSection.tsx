// ========================================
// TECLA MASTER - Seção de Depoimentos
// ========================================

import { useState, useEffect } from 'react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  plan: string;
  duration: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Maria Silva',
    role: 'Tecladista da Igreja',
    avatar: 'MS',
    content: 'Comecei do zero absoluto e em 6 meses já estava tocando na igreja! A metodologia é incrível e os módulos de gospel são completos demais. Melhor investimento que fiz.',
    rating: 5,
    plan: 'MASTER',
    duration: '8 meses'
  },
  {
    id: '2',
    name: 'João Pedro',
    role: 'Músico Profissional',
    avatar: 'JP',
    content: 'Já tocava há anos, mas o curso me abriu a mente para a harmonia. Os módulos de rearmonização e jazz transformaram minha forma de tocar. Recomendo muito!',
    rating: 5,
    plan: 'PREMIUM',
    duration: '1 ano'
  },
  {
    id: '3',
    name: 'Ana Santos',
    role: 'Estudante',
    avatar: 'AS',
    content: 'A plataforma é muito bem feita! O teclado virtual me ajudou muito quando não tinha instrumento. Os exercícios de ouvido são viciantes!',
    rating: 5,
    plan: 'PRO',
    duration: '5 meses'
  },
  {
    id: '4',
    name: 'Carlos Eduardo',
    role: 'Worship Leader',
    avatar: 'CE',
    content: 'Os módulos de worship internacional são absurdos! Aprendi técnicas que só via gringos usando. A comunidade também é muito ativa e ajuda demais.',
    rating: 5,
    plan: 'PREMIUM',
    duration: '1 ano e 2 meses'
  },
  {
    id: '5',
    name: 'Fernanda Lima',
    role: 'Professora de Música',
    avatar: 'FL',
    content: 'Uso o TECLA MASTER como material de apoio para meus alunos. A qualidade das aulas é profissional e a didática é perfeita. Parabéns ao time!',
    rating: 5,
    plan: 'MASTER',
    duration: '10 meses'
  },
  {
    id: '6',
    name: 'Roberto Mendes',
    role: 'Aposentado',
    avatar: 'RM',
    content: 'Sempre sonhei em tocar piano e aos 62 anos consegui! As aulas são muito claras, passo a passo, sem pressa. Obrigado por realizar meu sonho.',
    rating: 5,
    plan: 'PRO',
    duration: '7 meses'
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ];

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                      w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-green-500/10 text-green-400 
                         text-sm font-medium mb-4">
            +10.000 Alunos Satisfeitos
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            O que nossos alunos
            <span className="text-gradient block mt-2">estão dizendo</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Histórias reais de transformação musical. Veja como o TECLA MASTER 
            tem mudado a vida de músicos em todo o Brasil.
          </p>
        </div>

        {/* Rating geral */}
        <div className="flex justify-center items-center gap-4 mb-12">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-2xl text-yellow-400">★</span>
            ))}
          </div>
          <div>
            <span className="text-2xl font-bold text-white">4.9</span>
            <span className="text-gray-400">/5</span>
          </div>
          <span className="text-gray-500">•</span>
          <span className="text-gray-400">Baseado em 2.847 avaliações</span>
        </div>

        {/* Testimonials Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {visibleTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className="card-premium p-6 lg:p-8 transition-all duration-500 hover:scale-105"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-300 leading-relaxed mb-6 text-sm lg:text-base">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 
                              flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>

              {/* Meta */}
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
                <span className="px-2 py-1 rounded bg-purple-500/10 text-purple-400 font-medium">
                  {testimonial.plan}
                </span>
                <span>Aluno há {testimonial.duration}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Dots navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 
                        ${index === currentIndex 
                          ? 'w-8 bg-gradient-to-r from-purple-500 to-cyan-500' 
                          : 'bg-white/20 hover:bg-white/40'}`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-6">
            Junte-se a milhares de músicos que estão transformando suas vidas
          </p>
          <button className="btn-primary text-lg px-8 py-4">
            Começar Minha Jornada
          </button>
        </div>

        {/* Trust badges */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-gray-500 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            Pagamento Seguro
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            Acesso Imediato
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            Garantia de 7 Dias
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            Suporte Humanizado
          </div>
        </div>
      </div>
    </section>
  );
}
