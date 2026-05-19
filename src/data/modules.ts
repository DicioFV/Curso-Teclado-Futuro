// ========================================
// TECLA MASTER - Dados dos Módulos do Curso
// ========================================

import { Module, Lesson } from '../types';

// Função auxiliar para gerar aulas
const generateLessons = (moduleId: string, count: number, baseTitle: string): Lesson[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${moduleId}-lesson-${i + 1}`,
    moduleId,
    title: `${baseTitle} - Aula ${i + 1}`,
    description: `Nesta aula você aprenderá conceitos importantes sobre ${baseTitle.toLowerCase()}.`,
    thumbnail: `https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&h=225&fit=crop`,
    duration: `${Math.floor(Math.random() * 20) + 10}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
    order: i + 1,
    isCompleted: false,
    isFavorite: false
  }));
};

// Módulos do Curso
export const modules: Module[] = [
  // MÓDULO 1 - Fundamentos
  {
    id: 'mod-001',
    title: 'Primeiros Passos no Teclado',
    description: 'Comece sua jornada musical! Aprenda a postura correta, conheça as teclas do teclado e toque suas primeiras notas.',
    thumbnail: 'https://images.unsplash.com/photo-1552422535-c45813c61732?w=800&h=450&fit=crop',
    category: 'fundamentos',
    difficulty: 'iniciante',
    totalLessons: 20,
    totalDuration: '5h 30min',
    isLocked: false,
    requiredPlan: 'free',
    order: 1,
    lessons: generateLessons('mod-001', 20, 'Primeiros Passos'),
    materials: [
      { id: 'mat-001', title: 'Apostila do Módulo 1', type: 'pdf', url: '#', size: '2.5 MB' },
      { id: 'mat-002', title: 'Exercícios de Postura', type: 'pdf', url: '#', size: '1.2 MB' }
    ]
  },
  
  // MÓDULO 2 - Leitura Musical
  {
    id: 'mod-002',
    title: 'Leitura Musical Básica',
    description: 'Aprenda a ler partituras, entenda as figuras rítmicas e domine a leitura de cifras.',
    thumbnail: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&h=450&fit=crop',
    category: 'teoria',
    difficulty: 'iniciante',
    totalLessons: 25,
    totalDuration: '6h 45min',
    isLocked: false,
    requiredPlan: 'free',
    order: 2,
    lessons: generateLessons('mod-002', 25, 'Leitura Musical'),
    materials: [
      { id: 'mat-003', title: 'Apostila de Leitura Musical', type: 'pdf', url: '#', size: '3.1 MB' }
    ]
  },
  
  // MÓDULO 3 - Acordes Básicos
  {
    id: 'mod-003',
    title: 'Acordes Básicos para Iniciantes',
    description: 'Domine os acordes maiores e menores. Aprenda as tríades e comece a acompanhar músicas.',
    thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=450&fit=crop',
    category: 'harmonia',
    difficulty: 'iniciante',
    totalLessons: 30,
    totalDuration: '8h 15min',
    isLocked: false,
    requiredPlan: 'pro',
    order: 3,
    lessons: generateLessons('mod-003', 30, 'Acordes Básicos'),
    materials: [
      { id: 'mat-004', title: 'Dicionário de Acordes Básicos', type: 'pdf', url: '#', size: '4.2 MB' }
    ]
  },
  
  // MÓDULO 4 - Gospel Iniciante
  {
    id: 'mod-004',
    title: 'Teclado Gospel - Nível 1',
    description: 'Entre no mundo do louvor! Aprenda acordes e progressões essenciais para tocar na igreja.',
    thumbnail: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?w=800&h=450&fit=crop',
    category: 'gospel',
    difficulty: 'iniciante',
    totalLessons: 25,
    totalDuration: '7h 00min',
    isLocked: false,
    requiredPlan: 'pro',
    order: 4,
    lessons: generateLessons('mod-004', 25, 'Gospel Iniciante'),
    materials: [
      { id: 'mat-005', title: 'Cifras Harpa Cristã Vol. 1', type: 'pdf', url: '#', size: '5.0 MB' }
    ]
  },
  
  // MÓDULO 5 - Técnica de Mãos
  {
    id: 'mod-005',
    title: 'Técnica: Independência das Mãos',
    description: 'Desenvolva a independência entre mão direita e esquerda com exercícios progressivos.',
    thumbnail: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&h=450&fit=crop',
    category: 'tecnica',
    difficulty: 'intermediario',
    totalLessons: 20,
    totalDuration: '5h 45min',
    isLocked: true,
    requiredPlan: 'pro',
    order: 5,
    lessons: generateLessons('mod-005', 20, 'Independência das Mãos'),
    materials: []
  },
  
  // MÓDULO 6 - Campo Harmônico
  {
    id: 'mod-006',
    title: 'Campo Harmônico Completo',
    description: 'Entenda a teoria por trás das progressões. Domine o campo harmônico maior e menor.',
    thumbnail: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=450&fit=crop',
    category: 'harmonia',
    difficulty: 'intermediario',
    totalLessons: 22,
    totalDuration: '6h 30min',
    isLocked: true,
    requiredPlan: 'master',
    order: 6,
    lessons: generateLessons('mod-006', 22, 'Campo Harmônico'),
    materials: []
  },
  
  // MÓDULO 7 - Worship Moderno
  {
    id: 'mod-007',
    title: 'Worship Moderno Internacional',
    description: 'Toque como Hillsong, Bethel e Elevation. Aprenda pads, strings e técnicas contemporâneas.',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=450&fit=crop',
    category: 'worship',
    difficulty: 'intermediario',
    totalLessons: 28,
    totalDuration: '8h 00min',
    isLocked: true,
    requiredPlan: 'master',
    order: 7,
    lessons: generateLessons('mod-007', 28, 'Worship Moderno'),
    materials: []
  },
  
  // MÓDULO 8 - Escalas
  {
    id: 'mod-008',
    title: 'Escalas: Do Básico ao Avançado',
    description: 'Domine todas as escalas essenciais: maiores, menores, pentatônicas, blues e modais.',
    thumbnail: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=800&h=450&fit=crop',
    category: 'tecnica',
    difficulty: 'intermediario',
    totalLessons: 24,
    totalDuration: '6h 45min',
    isLocked: true,
    requiredPlan: 'pro',
    order: 8,
    lessons: generateLessons('mod-008', 24, 'Escalas'),
    materials: []
  },
  
  // MÓDULO 9 - Jazz Básico
  {
    id: 'mod-009',
    title: 'Introdução ao Jazz Piano',
    description: 'Entre no mundo do jazz! Aprenda voicings, acordes de 7ª, II-V-I e swing.',
    thumbnail: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&h=450&fit=crop',
    category: 'jazz',
    difficulty: 'avancado',
    totalLessons: 26,
    totalDuration: '7h 30min',
    isLocked: true,
    requiredPlan: 'premium',
    order: 9,
    lessons: generateLessons('mod-009', 26, 'Jazz Piano'),
    materials: []
  },
  
  // MÓDULO 10 - Gospel Avançado
  {
    id: 'mod-010',
    title: 'Gospel Avançado - Runs e Fills',
    description: 'Leve seu gospel ao próximo nível! Aprenda runs, fills, modulações e arranjos profissionais.',
    thumbnail: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&h=450&fit=crop',
    category: 'gospel',
    difficulty: 'avancado',
    totalLessons: 30,
    totalDuration: '9h 00min',
    isLocked: true,
    requiredPlan: 'premium',
    order: 10,
    lessons: generateLessons('mod-010', 30, 'Gospel Avançado'),
    materials: []
  },
  
  // MÓDULO 11 - Improvisação
  {
    id: 'mod-011',
    title: 'Improvisação Criativa',
    description: 'Liberte sua criatividade! Aprenda a improvisar em qualquer estilo musical.',
    thumbnail: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&h=450&fit=crop',
    category: 'tecnica',
    difficulty: 'avancado',
    totalLessons: 22,
    totalDuration: '6h 15min',
    isLocked: true,
    requiredPlan: 'premium',
    order: 11,
    lessons: generateLessons('mod-011', 22, 'Improvisação'),
    materials: []
  },
  
  // MÓDULO 12 - Rearmonização
  {
    id: 'mod-012',
    title: 'Rearmonização e Modulação',
    description: 'Técnicas avançadas para transformar qualquer música com harmonias sofisticadas.',
    thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=450&fit=crop',
    category: 'harmonia',
    difficulty: 'avancado',
    totalLessons: 20,
    totalDuration: '5h 45min',
    isLocked: true,
    requiredPlan: 'premium',
    order: 12,
    lessons: generateLessons('mod-012', 20, 'Rearmonização'),
    materials: []
  }
];

// Módulos em destaque (para a home)
export const featuredModules = modules.slice(0, 4);

// Módulos por categoria
export const modulesByCategory = {
  fundamentos: modules.filter(m => m.category === 'fundamentos'),
  teoria: modules.filter(m => m.category === 'teoria'),
  harmonia: modules.filter(m => m.category === 'harmonia'),
  tecnica: modules.filter(m => m.category === 'tecnica'),
  gospel: modules.filter(m => m.category === 'gospel'),
  worship: modules.filter(m => m.category === 'worship'),
  jazz: modules.filter(m => m.category === 'jazz')
};

// Nomes das categorias em português
export const categoryNames: Record<string, string> = {
  fundamentos: 'Fundamentos',
  teoria: 'Teoria Musical',
  harmonia: 'Harmonia',
  tecnica: 'Técnica',
  gospel: 'Gospel',
  worship: 'Worship',
  jazz: 'Jazz',
  blues: 'Blues',
  classico: 'Clássico',
  pop: 'Pop',
  mpb: 'MPB',
  'ear-training': 'Treino de Ouvido',
  repertorio: 'Repertório'
};

// Cores das categorias
export const categoryColors: Record<string, string> = {
  fundamentos: 'from-blue-600 to-blue-400',
  teoria: 'from-purple-600 to-purple-400',
  harmonia: 'from-pink-600 to-pink-400',
  tecnica: 'from-green-600 to-green-400',
  gospel: 'from-amber-600 to-amber-400',
  worship: 'from-cyan-600 to-cyan-400',
  jazz: 'from-orange-600 to-orange-400',
  blues: 'from-indigo-600 to-indigo-400',
  classico: 'from-red-600 to-red-400',
  pop: 'from-rose-600 to-rose-400',
  mpb: 'from-emerald-600 to-emerald-400',
  'ear-training': 'from-violet-600 to-violet-400',
  repertorio: 'from-teal-600 to-teal-400'
};
