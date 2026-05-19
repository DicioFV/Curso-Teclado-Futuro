// ========================================
// TECLA MASTER - Tipos e Interfaces
// ========================================

// Usuário e Autenticação
export interface User {
  id: string;
  name: string;
  email: string;
  whatsapp?: string;
  avatar?: string;
  plan: UserPlan;
  level: number;
  xp: number;
  streak: number;
  badges: Badge[];
  createdAt: Date;
  lastLoginAt: Date;
}

export type UserPlan = 'free' | 'pro' | 'master' | 'premium';

// Módulos e Aulas
export interface Module {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: ModuleCategory;
  difficulty: Difficulty;
  totalLessons: number;
  totalDuration: string;
  isLocked: boolean;
  requiredPlan: UserPlan;
  order: number;
  lessons: Lesson[];
  materials: Material[];
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  videoUrl?: string;
  thumbnail: string;
  duration: string;
  order: number;
  isCompleted?: boolean;
  isFavorite?: boolean;
}

export interface Material {
  id: string;
  title: string;
  type: 'pdf' | 'audio' | 'midi' | 'image';
  url: string;
  size: string;
}

// Categorias e Dificuldade
export type ModuleCategory = 
  | 'fundamentos'
  | 'tecnica'
  | 'harmonia'
  | 'gospel'
  | 'worship'
  | 'jazz'
  | 'blues'
  | 'classico'
  | 'pop'
  | 'mpb'
  | 'teoria'
  | 'ear-training'
  | 'repertorio';

export type Difficulty = 'iniciante' | 'intermediario' | 'avancado';

// Acordes
export interface Chord {
  id: string;
  name: string;
  symbol: string;
  type: ChordType;
  notes: string[];
  intervals: string[];
  inversions: ChordInversion[];
  audioUrl?: string;
}

export interface ChordInversion {
  name: string;
  notes: string[];
  bassNote: string;
}

export type ChordType = 
  | 'major'
  | 'minor'
  | 'diminished'
  | 'augmented'
  | 'major7'
  | 'minor7'
  | 'dominant7'
  | 'diminished7'
  | 'halfDiminished7'
  | 'minorMajor7'
  | 'sus2'
  | 'sus4'
  | 'add9'
  | 'add11'
  | '6'
  | 'm6'
  | '9'
  | 'm9'
  | '11'
  | '13';

// Escalas
export interface Scale {
  id: string;
  name: string;
  type: ScaleType;
  notes: string[];
  intervals: string[];
  degrees: string[];
  audioUrl?: string;
}

export type ScaleType = 
  | 'major'
  | 'natural-minor'
  | 'harmonic-minor'
  | 'melodic-minor'
  | 'pentatonic-major'
  | 'pentatonic-minor'
  | 'blues'
  | 'dorian'
  | 'phrygian'
  | 'lydian'
  | 'mixolydian'
  | 'locrian';

// Notas Musicais
export type NoteName = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B';
export type NoteNameLatin = 'Dó' | 'Dó#' | 'Ré' | 'Ré#' | 'Mi' | 'Fá' | 'Fá#' | 'Sol' | 'Sol#' | 'Lá' | 'Lá#' | 'Si';

export interface PianoKey {
  note: NoteName;
  octave: number;
  isBlack: boolean;
  midiNumber: number;
}

// Gamificação
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  badgeId?: string;
  progress: number;
  target: number;
  isCompleted: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  userName: string;
  avatar?: string;
  xp: number;
  level: number;
  streak: number;
}

// Ear Training
export interface EarTrainingExercise {
  id: string;
  type: 'interval' | 'chord' | 'scale' | 'progression';
  difficulty: Difficulty;
  question: string;
  correctAnswer: string;
  options: string[];
  audioUrl: string;
}

export interface EarTrainingStats {
  totalExercises: number;
  correctAnswers: number;
  accuracy: number;
  streakBest: number;
  byType: Record<string, { total: number; correct: number }>;
}

// Progresso do Aluno
export interface UserProgress {
  userId: string;
  completedLessons: string[];
  completedModules: string[];
  currentLesson?: string;
  totalWatchTime: number;
  lastActivity: Date;
  moduleProgress: Record<string, number>;
}

// Certificados
export interface Certificate {
  id: string;
  userId: string;
  moduleId?: string;
  type: 'module' | 'track' | 'completion';
  title: string;
  issuedAt: Date;
  verificationCode: string;
  pdfUrl?: string;
}

// Navegação e UI
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string;
  children?: NavItem[];
}

// Música/Repertório
export interface Song {
  id: string;
  title: string;
  artist: string;
  genre: string;
  difficulty: Difficulty;
  key: NoteName;
  tempo: number;
  duration: string;
  thumbnail: string;
  hasSheet: boolean;
  hasChords: boolean;
  hasPlayback: boolean;
  hasMidi: boolean;
}

// Notificações
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'achievement' | 'reminder';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

// API Responses
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Planos e Pagamento
export interface Plan {
  id: string;
  name: string;
  type: UserPlan;
  price: number;
  period: 'monthly' | 'quarterly' | 'yearly' | 'lifetime';
  features: string[];
  isPopular?: boolean;
}
