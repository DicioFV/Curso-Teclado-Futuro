// ========================================
// TECLA MASTER - Tela de Loading Premium
// ========================================

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({ message = 'Carregando...' }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0f]">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                      w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px] animate-pulse" />
      </div>

      <div className="relative text-center">
        {/* Logo animado */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-2xl blur-xl opacity-50 animate-pulse" />
          <div className="relative w-20 h-20 mx-auto bg-gradient-to-r from-purple-600 to-cyan-500 rounded-2xl 
                        flex items-center justify-center shadow-2xl">
            <span className="text-4xl animate-bounce">🎹</span>
          </div>
        </div>

        {/* Nome */}
        <h1 className="text-2xl font-bold mb-4">
          <span className="text-gradient">TECLA</span>
          <span className="text-white ml-2">MASTER</span>
        </h1>

        {/* Spinner */}
        <div className="flex justify-center mb-4">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
        </div>

        {/* Mensagem */}
        <p className="text-gray-400 animate-pulse">{message}</p>

        {/* Progress bar fake */}
        <div className="mt-6 w-48 mx-auto h-1 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full animate-pulse"
            style={{ 
              width: '60%',
              animation: 'loading 2s ease-in-out infinite'
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes loading {
          0% { width: 0%; }
          50% { width: 80%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}

// Mini spinner para uso inline
export function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-4'
  };

  return (
    <div className={`${sizes[size]} border-purple-600 border-t-transparent rounded-full animate-spin`} />
  );
}

// Skeleton para loading de conteúdo
export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-gray-800 rounded animate-pulse ${className}`} />
  );
}
