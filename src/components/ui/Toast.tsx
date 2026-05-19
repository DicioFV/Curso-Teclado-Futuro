// ========================================
// TECLA MASTER - Sistema de Notificações Toast
// ========================================

import { useState, useEffect, createContext, useContext, ReactNode, useCallback } from 'react';

type ToastType = 'success' | 'error' | 'warning' | 'info' | 'achievement';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast deve ser usado dentro de um ToastProvider');
  }
  return context;
}

function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, toast.duration || 5000);
    return () => clearTimeout(timer);
  }, [toast.duration, onClose]);

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
    achievement: '🏆'
  };

  const colors = {
    success: 'from-green-600 to-green-500',
    error: 'from-red-600 to-red-500',
    warning: 'from-amber-600 to-amber-500',
    info: 'from-blue-600 to-blue-500',
    achievement: 'from-purple-600 to-pink-500'
  };

  const bgColors = {
    success: 'bg-green-500/10 border-green-500/20',
    error: 'bg-red-500/10 border-red-500/20',
    warning: 'bg-amber-500/10 border-amber-500/20',
    info: 'bg-blue-500/10 border-blue-500/20',
    achievement: 'bg-purple-500/10 border-purple-500/20'
  };

  return (
    <div 
      className={`flex items-start gap-3 p-4 rounded-xl border backdrop-blur-xl
                animate-slide-up min-w-[300px] max-w-[400px] ${bgColors[toast.type]}`}
    >
      <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${colors[toast.type]} 
                     flex items-center justify-center text-white font-bold flex-shrink-0`}>
        {icons[toast.type]}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-white font-semibold text-sm">{toast.title}</h4>
        {toast.message && (
          <p className="text-gray-400 text-sm mt-1">{toast.message}</p>
        )}
      </div>
      <button 
        onClick={onClose}
        className="text-gray-500 hover:text-white transition-colors"
      >
        ✕
      </button>
    </div>
  );
}

export default ToastProvider;
