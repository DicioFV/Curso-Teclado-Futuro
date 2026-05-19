// ========================================
// TECLA MASTER - Contexto Global da Aplicação
// ========================================

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Module, UserProgress, Notification } from '../types';

// Interface do Contexto
interface AppContextType {
  // Usuário
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // UI
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isMobile: boolean;
  theme: 'dark' | 'light';
  
  // Progresso
  progress: UserProgress | null;
  updateProgress: (lessonId: string) => void;
  
  // Módulos
  currentModule: Module | null;
  setCurrentModule: (module: Module | null) => void;
  
  // Player
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  currentTime: number;
  setCurrentTime: (time: number) => void;
  
  // Notificações
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
  markAsRead: (id: string) => void;
  clearNotifications: () => void;
  
  // Teclado Virtual
  selectedKey: string | null;
  setSelectedKey: (key: string | null) => void;
  activeNotes: string[];
  setActiveNotes: (notes: string[]) => void;
  
  // Transposição
  transpose: number;
  setTranspose: (value: number) => void;
  
  // Metrônomo
  bpm: number;
  setBpm: (bpm: number) => void;
  isMetronomeOn: boolean;
  toggleMetronome: () => void;
}

// Criar o contexto
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider do contexto
export function AppProvider({ children }: { children: ReactNode }) {
  // Estados do usuário
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Estados da UI
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [theme] = useState<'dark' | 'light'>('dark');
  
  // Estados de progresso
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  
  // Estados do player
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  
  // Estados de notificações
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  // Estados do teclado virtual
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [activeNotes, setActiveNotes] = useState<string[]>([]);
  
  // Estados de transposição e metrônomo
  const [transpose, setTranspose] = useState(0);
  const [bpm, setBpm] = useState(120);
  const [isMetronomeOn, setIsMetronomeOn] = useState(false);
  
  // Detectar mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Simular carregamento inicial (depois será substituído por autenticação real)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  
  // Funções auxiliares
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleMetronome = () => setIsMetronomeOn(!isMetronomeOn);
  
  const updateProgress = (lessonId: string) => {
    if (progress) {
      setProgress({
        ...progress,
        completedLessons: [...progress.completedLessons, lessonId],
        lastActivity: new Date()
      });
    }
  };
  
  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };
  
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };
  
  const clearNotifications = () => {
    setNotifications([]);
  };
  
  // Valor do contexto
  const value: AppContextType = {
    user,
    setUser,
    isAuthenticated: !!user,
    isLoading,
    isSidebarOpen,
    toggleSidebar,
    isMobile,
    theme,
    progress,
    updateProgress,
    currentModule,
    setCurrentModule,
    isPlaying,
    setIsPlaying,
    currentTime,
    setCurrentTime,
    notifications,
    addNotification,
    markAsRead,
    clearNotifications,
    selectedKey,
    setSelectedKey,
    activeNotes,
    setActiveNotes,
    transpose,
    setTranspose,
    bpm,
    setBpm,
    isMetronomeOn,
    toggleMetronome
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// Hook personalizado para usar o contexto
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp deve ser usado dentro de um AppProvider');
  }
  return context;
}

export default AppContext;
