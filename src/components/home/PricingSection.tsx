// ========================================
// TECLA MASTER - Seção de Planos e Preços
// ========================================

import { useState } from 'react';

interface Plan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  notIncluded?: string[];
  isPopular?: boolean;
  badge?: string;
  color: string;
}

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Gratuito',
    description: 'Perfeito para conhecer a plataforma',
    monthlyPrice: 0,
    yearlyPrice: 0,
    color: 'from-gray-600 to-gray-500',
    features: [
      'Acesso a 5 módulos básicos',
      'Teclado virtual interativo',
      'Dicionário de acordes básicos',
      'Metrônomo online',
      'Certificado de conclusão',
    ],
    notIncluded: [
      'Módulos avançados',
      'Treino de ouvido completo',
      'Partituras exclusivas',
      'Suporte prioritário',
    ],
  },
  {
    id: 'pro',
    name: 'PRO',
    description: 'Para quem quer evoluir de verdade',
    monthlyPrice: 47,
    yearlyPrice: 397,
    color: 'from-purple-600 to-purple-400',
    features: [
      'Todos os recursos Gratuitos',
      'Acesso a 25 módulos',
      'Treino de ouvido básico',
      'Partituras em PDF',
      'Playbacks exclusivos',
      'Grupo no Telegram',
      'Certificados de módulo',
    ],
    notIncluded: [
      'Módulos de Jazz/Blues',
      'Masterclasses ao vivo',
      'Mentoria individual',
    ],
  },
  {
    id: 'master',
    name: 'MASTER',
    description: 'O mais escolhido pelos alunos',
    monthlyPrice: 77,
    yearlyPrice: 597,
    color: 'from-pink-600 to-rose-400',
    isPopular: true,
    badge: 'MAIS POPULAR',
    features: [
      'Todos os recursos PRO',
      'Acesso a 40 módulos',
      'Treino de ouvido avançado',
      'Harpa Cristã completa',
      'Módulos de Worship',
      'Masterclasses mensais',
      'Suporte em 24h',
      'Comunidade exclusiva',
    ],
    notIncluded: [
      'Módulos de Jazz avançado',
      'Mentoria individual',
    ],
  },
  {
    id: 'premium',
    name: 'PREMIUM',
    description: 'Acesso vitalício ilimitado',
    monthlyPrice: 127,
    yearlyPrice: 997,
    color: 'from-amber-500 to-yellow-400',
    badge: 'ACESSO TOTAL',
    features: [
      'TODOS os 50+ módulos',
      'Todas as ferramentas',
      'Jazz, Blues, Clássico',
      'Gospel Avançado',
      'Improvisação & Rearmonização',
      'Masterclasses semanais',
      'Mentoria em grupo',
      'Suporte prioritário 4h',
      'Downloads ilimitados',
      'Acesso vitalício',
    ],
  },
];

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(true);

  const calculateSavings = (monthly: number, yearly: number) => {
    if (monthly === 0) return 0;
    const monthlyTotal = monthly * 12;
    return Math.round(((monthlyTotal - yearly) / monthlyTotal) * 100);
  };

  return (
    <section id="planos" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-purple-900/5 to-[#0a0a0f]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-amber-500/10 text-amber-400 
                         text-sm font-medium mb-4">
            Planos & Preços
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Escolha o plano ideal
            <span className="text-gradient-gold block mt-2">para sua jornada</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            Todos os planos incluem 7 dias de garantia. Cancele quando quiser.
          </p>

          {/* Toggle Mensal/Anual */}
          <div className="inline-flex items-center gap-4 p-1.5 bg-white/5 rounded-full">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all
                        ${!isYearly 
                          ? 'bg-white text-black' 
                          : 'text-gray-400 hover:text-white'}`}
            >
              Mensal
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2
                        ${isYearly 
                          ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white' 
                          : 'text-gray-400 hover:text-white'}`}
            >
              Anual
              <span className="px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">
                -50%
              </span>
            </button>
          </div>
        </div>

        {/* Grid de Planos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {plans.map((plan) => {
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            const savings = calculateSavings(plan.monthlyPrice, plan.yearlyPrice);

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl transition-all duration-500 
                          ${plan.isPopular 
                            ? 'bg-gradient-to-b from-white/10 to-white/5 scale-105 z-10 border-purple-500/50' 
                            : 'bg-white/5 hover:bg-white/10'}
                          border border-white/10 hover:border-white/20`}
              >
                {/* Badge Popular */}
                {plan.badge && (
                  <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full
                                 bg-gradient-to-r ${plan.color} text-white text-xs font-bold
                                 shadow-lg`}>
                    {plan.badge}
                  </div>
                )}

                <div className="p-6 lg:p-8">
                  {/* Nome e descrição */}
                  <div className="mb-6">
                    <h3 className={`text-2xl font-bold bg-gradient-to-r ${plan.color} 
                                  bg-clip-text text-transparent mb-2`}>
                      {plan.name}
                    </h3>
                    <p className="text-sm text-gray-400">{plan.description}</p>
                  </div>

                  {/* Preço */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl lg:text-5xl font-bold text-white">
                        {price === 0 ? 'Grátis' : `R$${price}`}
                      </span>
                      {price > 0 && (
                        <span className="text-gray-500">
                          /{isYearly ? 'ano' : 'mês'}
                        </span>
                      )}
                    </div>
                    
                    {isYearly && savings > 0 && (
                      <div className="mt-2">
                        <span className="text-green-400 text-sm font-medium">
                          Economia de {savings}% (R${plan.monthlyPrice * 12 - plan.yearlyPrice}/ano)
                        </span>
                      </div>
                    )}
                    
                    {isYearly && plan.yearlyPrice > 0 && (
                      <p className="text-gray-500 text-sm mt-1">
                        ou R${Math.round(plan.yearlyPrice / 12)}/mês
                      </p>
                    )}
                  </div>

                  {/* Botão CTA */}
                  <button
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300
                              ${plan.isPopular || plan.id === 'premium'
                                ? `bg-gradient-to-r ${plan.color} text-white hover:shadow-lg hover:scale-105`
                                : 'bg-white/10 text-white hover:bg-white/20'}`}
                  >
                    {price === 0 ? 'Começar Grátis' : 'Assinar Agora'}
                  </button>

                  {/* Features */}
                  <div className="mt-8 space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <span className="text-green-400 text-lg flex-shrink-0">✓</span>
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                    
                    {plan.notIncluded?.map((feature) => (
                      <div key={feature} className="flex items-start gap-3 opacity-50">
                        <span className="text-gray-600 text-lg flex-shrink-0">✗</span>
                        <span className="text-sm text-gray-500 line-through">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Garantia */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-green-500/10 border border-green-500/20">
            <span className="text-4xl">🛡️</span>
            <div className="text-left">
              <p className="text-green-400 font-semibold">Garantia de 7 dias</p>
              <p className="text-sm text-gray-400">Não gostou? Devolvemos 100% do seu dinheiro.</p>
            </div>
          </div>
        </div>

        {/* FAQ rápido */}
        <div className="mt-12 text-center">
          <p className="text-gray-400">
            Dúvidas sobre os planos?{' '}
            <button className="text-purple-400 hover:text-purple-300 font-medium underline">
              Fale conosco no WhatsApp
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}
