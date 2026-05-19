// ========================================
// TECLA MASTER - Seção de FAQ
// ========================================

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqItems: FAQItem[] = [
  {
    category: 'Geral',
    question: 'Preciso ter um teclado para começar o curso?',
    answer: 'Não necessariamente! Você pode começar usando nosso teclado virtual interativo diretamente no navegador. No entanto, para uma experiência completa e para praticar técnicas avançadas, recomendamos adquirir um teclado de pelo menos 61 teclas.'
  },
  {
    category: 'Geral',
    question: 'O curso é bom para iniciantes absolutos?',
    answer: 'Sim! O TECLA MASTER foi projetado para atender desde iniciantes que nunca tocaram uma nota até músicos avançados que querem se especializar. Nosso módulo "Primeiros Passos" ensina tudo do zero, incluindo postura, leitura básica e seus primeiros acordes.'
  },
  {
    category: 'Geral',
    question: 'Quanto tempo leva para aprender a tocar?',
    answer: 'Depende da sua dedicação! Com 30 minutos de prática diária, a maioria dos alunos consegue tocar músicas simples em 2-4 semanas. Para tocar na igreja com confiança, a média é de 3-6 meses. O importante é a consistência nos estudos.'
  },
  {
    category: 'Planos',
    question: 'Qual a diferença entre os planos?',
    answer: 'O plano GRATUITO dá acesso a módulos básicos e ferramentas essenciais. O PRO desbloqueia mais módulos e recursos intermediários. O MASTER inclui todos os módulos de gospel, worship e suporte prioritário. O PREMIUM oferece acesso total vitalício a todo o conteúdo, incluindo jazz, blues e mentorias.'
  },
  {
    category: 'Planos',
    question: 'Posso cancelar minha assinatura a qualquer momento?',
    answer: 'Sim! Não há fidelidade. Você pode cancelar quando quiser. Além disso, oferecemos garantia de 7 dias - se não gostar, devolvemos 100% do seu investimento sem perguntas.'
  },
  {
    category: 'Planos',
    question: 'Como funciona a garantia de 7 dias?',
    answer: 'É simples: você tem 7 dias para explorar a plataforma. Se por qualquer motivo não ficar satisfeito, basta enviar um email ou mensagem no WhatsApp solicitando o reembolso. Devolvemos 100% do valor, sem burocracia.'
  },
  {
    category: 'Conteúdo',
    question: 'O curso tem foco em música gospel?',
    answer: 'Sim! Temos módulos específicos para gospel, worship, Harpa Cristã e louvor contemporâneo. Mas também cobrimos outros estilos como pop, MPB, jazz e blues para quem quer expandir seus horizontes musicais.'
  },
  {
    category: 'Conteúdo',
    question: 'Receberei certificado ao final do curso?',
    answer: 'Sim! Você receberá certificados ao concluir cada módulo e um certificado geral de conclusão. Todos os certificados têm QR Code de verificação e podem ser adicionados ao seu LinkedIn ou currículo.'
  },
  {
    category: 'Técnico',
    question: 'Posso acessar pelo celular?',
    answer: 'Sim! O TECLA MASTER é uma PWA (Progressive Web App) que funciona perfeitamente em celulares Android e iPhone, tablets e computadores. Você pode até instalar como um aplicativo na tela inicial do seu celular.'
  },
  {
    category: 'Técnico',
    question: 'Preciso de internet para acessar?',
    answer: 'Para assistir às aulas em vídeo, sim. Porém, recursos como o dicionário de acordes, metrônomo e exercícios de teoria podem funcionar offline depois de carregados. No plano PREMIUM, você pode baixar aulas para assistir sem internet.'
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = ['Todos', ...new Set(faqItems.map(item => item.category))];
  
  const filteredItems = selectedCategory === 'Todos' 
    ? faqItems 
    : faqItems.filter(item => item.category === selectedCategory);

  return (
    <section id="faq" className="py-20 md:py-32 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 
                         text-sm font-medium mb-4">
            ❓ Dúvidas Frequentes
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Perguntas
            <span className="text-gradient block mt-2">Frequentes</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Tire suas dúvidas sobre o curso, planos e como começar sua jornada musical.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                        ${selectedCategory === category
                          ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredItems.map((item, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300
                          ${isOpen 
                            ? 'bg-white/5 border-purple-500/30' 
                            : 'bg-white/[0.02] border-white/5 hover:border-white/10'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-start gap-4">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center
                                   flex-shrink-0 transition-colors
                                   ${isOpen 
                                     ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white' 
                                     : 'bg-white/5 text-gray-400'}`}>
                      ?
                    </span>
                    <span className={`text-lg font-medium transition-colors
                                   ${isOpen ? 'text-white' : 'text-gray-300'}`}>
                      {item.question}
                    </span>
                  </div>
                  <span className={`text-2xl transition-transform duration-300 flex-shrink-0 ml-4
                                 ${isOpen ? 'rotate-45 text-purple-400' : 'text-gray-500'}`}>
                    +
                  </span>
                </button>
                
                <div className={`overflow-hidden transition-all duration-300
                              ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                  <p className="px-6 pb-6 pl-[72px] text-gray-400 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still have questions? */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-4xl">💬</span>
            <div className="text-left">
              <p className="text-white font-semibold">Ainda tem dúvidas?</p>
              <p className="text-gray-400 text-sm">Nossa equipe está pronta para ajudar!</p>
            </div>
            <button className="btn-primary px-6 py-3">
              Falar no WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
