// ========================================
// TECLA MASTER - Footer Premium
// ========================================

const footerLinks = {
  curso: [
    { label: 'Todos os Cursos', href: '#cursos' },
    { label: 'Gospel & Worship', href: '#gospel' },
    { label: 'Jazz & Blues', href: '#jazz' },
    { label: 'Piano Clássico', href: '#classico' },
    { label: 'Harpa Cristã', href: '#harpa' }
  ],
  recursos: [
    { label: 'Dicionário de Acordes', href: '#acordes' },
    { label: 'Escalas Musicais', href: '#escalas' },
    { label: 'Treino de Ouvido', href: '#treino' },
    { label: 'Metrônomo', href: '#metronomo' },
    { label: 'Teclado Virtual', href: '#teclado' }
  ],
  suporte: [
    { label: 'Central de Ajuda', href: '#ajuda' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contato', href: '#contato' },
    { label: 'Comunidade', href: '#comunidade' },
    { label: 'WhatsApp', href: '#whatsapp' }
  ],
  legal: [
    { label: 'Termos de Uso', href: '#termos' },
    { label: 'Política de Privacidade', href: '#privacidade' },
    { label: 'Política de Reembolso', href: '#reembolso' }
  ]
};

const socialLinks = [
  { name: 'Instagram', href: '#', icon: '📸' },
  { name: 'YouTube', href: '#', icon: '🎬' },
  { name: 'Facebook', href: '#', icon: '👥' },
  { name: 'TikTok', href: '#', icon: '🎵' }
];

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#0a0a0f] to-black border-t border-white/5">
      {/* Gradiente decorativo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Grid Principal */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Logo e Descrição */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-purple-600 to-cyan-500 p-2 rounded-lg">
                <span className="text-2xl">🎹</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">TECLA MASTER</h3>
                <p className="text-xs text-gray-500">Curso Premium de Teclado</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              A plataforma mais completa de ensino de teclado e piano do Brasil. 
              Do zero ao avançado, gospel, worship, jazz e muito mais.
            </p>
            
            {/* Redes Sociais */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 
                           flex items-center justify-center text-lg
                           transition-all duration-300 hover:scale-110"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links - Curso */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Cursos
            </h4>
            <ul className="space-y-3">
              {footerLinks.curso.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links - Recursos */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Recursos
            </h4>
            <ul className="space-y-3">
              {footerLinks.recursos.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links - Suporte */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Suporte
            </h4>
            <ul className="space-y-3">
              {footerLinks.suporte.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links - Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Badges de Segurança */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-sm">
                <span className="text-green-500">🔒</span>
                <span className="text-gray-400">Pagamento 100% Seguro</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-sm">
                <span className="text-blue-500">✓</span>
                <span className="text-gray-400">Garantia de 7 Dias</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-sm">
                <span className="text-yellow-500">⭐</span>
                <span className="text-gray-400">+10.000 Alunos</span>
              </div>
            </div>

            {/* Newsletter Mini */}
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Seu melhor email"
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm
                         text-white placeholder-gray-500 focus:outline-none focus:border-purple-500
                         w-48"
              />
              <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 
                               rounded-lg text-sm font-medium text-white
                               hover:shadow-lg hover:shadow-purple-500/25 transition-all">
                Inscrever
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} TECLA MASTER. Todos os direitos reservados.
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Desenvolvido com 💜 para músicos de todo o Brasil
          </p>
        </div>
      </div>
    </footer>
  );
}
