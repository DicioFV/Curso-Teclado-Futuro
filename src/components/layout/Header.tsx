// ========================================
// TECLA MASTER - Header/Navegação Principal
// ========================================

import { useState } from 'react';
import { useApp } from '../../contexts/AppContext';

// Ícones SVG inline para evitar dependências
const Icons = {
  Menu: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  Close: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Search: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Bell: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  ),
  User: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Piano: () => (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H8v-4h4v4zm-3-6V5h2v6H9zm6 6h-4v-4h4v4zm-3-6V5h2v6h-2zm6 6h-4v-4h4v4z"/>
    </svg>
  )
};

// Links de navegação
const navLinks = [
  { href: '#home', label: 'Início' },
  { href: '#cursos', label: 'Cursos' },
  { href: '#acordes', label: 'Acordes' },
  { href: '#escalas', label: 'Escalas' },
  { href: '#treino', label: 'Treino de Ouvido' },
  { href: '#planos', label: 'Planos' }
];

export default function Header() {
  const { user, isSidebarOpen, toggleSidebar } = useApp();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Gradiente de fundo com blur */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-transparent backdrop-blur-sm" />
      
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg blur-lg opacity-50" />
                <div className="relative bg-gradient-to-r from-purple-600 to-cyan-500 p-2 rounded-lg">
                  <Icons.Piano />
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl md:text-2xl font-bold">
                  <span className="text-gradient">TECLA</span>
                  <span className="text-white ml-1">MASTER</span>
                </h1>
                <p className="text-[10px] text-gray-400 -mt-1">Curso Premium de Teclado</p>
              </div>
            </div>

            {/* Navegação Desktop */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white
                           rounded-lg hover:bg-white/10 transition-all duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Ações do Header */}
            <div className="flex items-center gap-2 md:gap-4">
              
              {/* Campo de Busca */}
              <div className={`relative transition-all duration-300 ${isSearchOpen ? 'w-48 md:w-64' : 'w-10'}`}>
                {isSearchOpen ? (
                  <div className="flex items-center bg-white/10 rounded-full border border-white/20 overflow-hidden">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Buscar aulas, acordes..."
                      className="w-full bg-transparent px-4 py-2 text-sm text-white placeholder-gray-400 
                               focus:outline-none"
                      autoFocus
                    />
                    <button
                      onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                      className="p-2 text-gray-400 hover:text-white"
                    >
                      <Icons.Close />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 
                             transition-all duration-300"
                    aria-label="Buscar"
                  >
                    <Icons.Search />
                  </button>
                )}
              </div>

              {/* Notificações */}
              <button
                className="relative p-2 text-gray-400 hover:text-white rounded-full 
                         hover:bg-white/10 transition-all duration-300 hidden sm:block"
                aria-label="Notificações"
              >
                <Icons.Bell />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* Usuário / Login */}
              {user ? (
                <button className="flex items-center gap-2 p-1 rounded-full hover:bg-white/10 transition-all">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 
                                flex items-center justify-center text-sm font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </button>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <button className="px-4 py-2 text-sm font-medium text-white hover:text-purple-400 
                                   transition-colors">
                    Entrar
                  </button>
                  <button className="btn-primary text-sm px-4 py-2">
                    Começar Grátis
                  </button>
                </div>
              )}

              {/* Menu Mobile */}
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg 
                         hover:bg-white/10 transition-all"
                aria-label="Menu"
              >
                {isSidebarOpen ? <Icons.Close /> : <Icons.Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Menu Mobile Expandido */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 bg-[#0a0a0f]/98 backdrop-blur-xl
                    border-t border-white/10 transition-all duration-300 overflow-hidden
                    ${isSidebarOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="px-4 py-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={toggleSidebar}
                className="block px-4 py-3 text-lg font-medium text-gray-300 hover:text-white
                         rounded-xl hover:bg-white/10 transition-all"
              >
                {link.label}
              </a>
            ))}
            
            <div className="pt-4 border-t border-white/10 space-y-3">
              <button className="w-full py-3 text-center text-white font-medium 
                               bg-white/10 rounded-xl hover:bg-white/20 transition-all">
                Entrar
              </button>
              <button className="w-full btn-primary py-3 text-center">
                Começar Grátis
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
