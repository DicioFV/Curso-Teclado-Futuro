// ========================================
// TECLA MASTER - Dicionário de Acordes
// ========================================

import { useState } from 'react';

// Tipos de acordes
type ChordQuality = 'major' | 'minor' | '7' | 'm7' | 'maj7' | 'dim' | 'aug' | 'sus4' | 'sus2';

interface ChordData {
  name: string;
  symbol: string;
  quality: ChordQuality;
  notes: number[]; // intervalos em semitons a partir da raiz
  description: string;
}

const chordTypes: Record<ChordQuality, ChordData> = {
  major: { name: 'Maior', symbol: '', quality: 'major', notes: [0, 4, 7], description: 'Acorde alegre e estável' },
  minor: { name: 'Menor', symbol: 'm', quality: 'minor', notes: [0, 3, 7], description: 'Acorde melancólico' },
  '7': { name: 'Dominante 7', symbol: '7', quality: '7', notes: [0, 4, 7, 10], description: 'Tensão que pede resolução' },
  'm7': { name: 'Menor com 7', symbol: 'm7', quality: 'm7', notes: [0, 3, 7, 10], description: 'Suave e jazzístico' },
  'maj7': { name: 'Maior com 7M', symbol: 'maj7', quality: 'maj7', notes: [0, 4, 7, 11], description: 'Sofisticado e aberto' },
  dim: { name: 'Diminuto', symbol: 'dim', quality: 'dim', notes: [0, 3, 6], description: 'Tensão instável' },
  aug: { name: 'Aumentado', symbol: 'aug', quality: 'aug', notes: [0, 4, 8], description: 'Suspense e movimento' },
  sus4: { name: 'Suspenso 4', symbol: 'sus4', quality: 'sus4', notes: [0, 5, 7], description: 'Aberto, sem terça' },
  sus2: { name: 'Suspenso 2', symbol: 'sus2', quality: 'sus2', notes: [0, 2, 7], description: 'Moderno e etéreo' },
};

const rootNotes = [
  { name: 'Dó', symbol: 'C', value: 0 },
  { name: 'Dó#', symbol: 'C#', value: 1 },
  { name: 'Ré', symbol: 'D', value: 2 },
  { name: 'Ré#', symbol: 'D#', value: 3 },
  { name: 'Mi', symbol: 'E', value: 4 },
  { name: 'Fá', symbol: 'F', value: 5 },
  { name: 'Fá#', symbol: 'F#', value: 6 },
  { name: 'Sol', symbol: 'G', value: 7 },
  { name: 'Sol#', symbol: 'G#', value: 8 },
  { name: 'Lá', symbol: 'A', value: 9 },
  { name: 'Lá#', symbol: 'A#', value: 10 },
  { name: 'Si', symbol: 'B', value: 11 },
];

const allNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

interface ChordDictionaryProps {
  compact?: boolean;
}

export default function ChordDictionary({ compact = false }: ChordDictionaryProps) {
  const [selectedRoot, setSelectedRoot] = useState(rootNotes[0]);
  const [selectedQuality, setSelectedQuality] = useState<ChordQuality>('major');

  const chord = chordTypes[selectedQuality];
  
  // Calcular notas do acorde
  const chordNotes = chord.notes.map(interval => {
    const noteIndex = (selectedRoot.value + interval) % 12;
    return allNotes[noteIndex];
  });

  // Renderizar mini teclado
  const renderMiniKeyboard = () => {
    const keys = [];
    const startNote = selectedRoot.value;
    
    for (let i = 0; i < 12; i++) {
      const noteIndex = (startNote + i) % 12;
      const note = allNotes[noteIndex];
      const isBlack = note.includes('#');
      const isInChord = chord.notes.includes(i);
      
      if (!isBlack) {
        keys.push(
          <div
            key={i}
            className={`relative w-10 h-24 rounded-b-lg transition-all duration-200
                      ${isInChord 
                        ? 'bg-gradient-to-b from-purple-400 to-purple-600 shadow-lg shadow-purple-500/30' 
                        : 'bg-gradient-to-b from-white to-gray-200'}
                      border border-gray-300`}
          >
            {isInChord && (
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-bold text-white">
                {note}
              </span>
            )}
          </div>
        );
      }
    }
    
    return keys;
  };

  if (compact) {
    return (
      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">
            {selectedRoot.symbol}{chord.symbol}
          </h3>
          <span className="text-sm text-gray-400">{chord.name}</span>
        </div>
        <div className="flex justify-center gap-0.5">
          {renderMiniKeyboard()}
        </div>
        <p className="text-center text-sm text-gray-500 mt-3">
          Notas: {chordNotes.join(' - ')}
        </p>
      </div>
    );
  }

  return (
    <section id="acordes" className="py-20 md:py-32 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-pink-500/10 text-pink-400 
                         text-sm font-medium mb-4">
            🎹 Dicionário Interativo
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Dicionário de
            <span className="text-gradient block mt-2">Acordes</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Explore todos os acordes em qualquer tonalidade. Veja, ouça e aprenda!
          </p>
        </div>

        {/* Chord Builder */}
        <div className="card-premium p-6 sm:p-10">
          {/* Seletores */}
          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            {/* Selector de Nota Raiz */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">
                Nota Raiz (Fundamental)
              </label>
              <div className="grid grid-cols-6 gap-2">
                {rootNotes.map((note) => (
                  <button
                    key={note.symbol}
                    onClick={() => setSelectedRoot(note)}
                    className={`py-3 rounded-lg font-bold text-sm transition-all
                              ${selectedRoot.symbol === note.symbol
                                ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg'
                                : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}
                  >
                    {note.symbol}
                  </button>
                ))}
              </div>
            </div>

            {/* Selector de Qualidade */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">
                Tipo de Acorde
              </label>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(chordTypes).map(([key, type]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedQuality(key as ChordQuality)}
                    className={`py-3 rounded-lg font-medium text-sm transition-all
                              ${selectedQuality === key
                                ? 'bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-lg'
                                : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}
                  >
                    {type.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Display do Acorde */}
          <div className="text-center mb-8">
            <div className="inline-block">
              <h3 className="text-6xl sm:text-7xl font-bold text-gradient mb-2">
                {selectedRoot.symbol}{chord.symbol}
              </h3>
              <p className="text-xl text-gray-400">
                {selectedRoot.name} {chord.name}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {chord.description}
              </p>
            </div>
          </div>

          {/* Visualização no Teclado */}
          <div className="bg-black/40 rounded-2xl p-6 mb-8">
            <div className="flex justify-center gap-0.5 overflow-x-auto">
              {renderMiniKeyboard()}
            </div>
          </div>

          {/* Informações do Acorde */}
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-xl p-5 text-center">
              <p className="text-sm text-gray-500 mb-2">Notas</p>
              <p className="text-xl font-bold text-white">
                {chordNotes.join(' - ')}
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-5 text-center">
              <p className="text-sm text-gray-500 mb-2">Intervalos</p>
              <p className="text-xl font-bold text-white">
                {chord.notes.map((n) => {
                  const intervals = ['T', 'b2', '2', 'b3', '3', '4', 'b5', '5', '#5', '6', 'b7', '7'];
                  return intervals[n];
                }).join(' - ')}
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-5 text-center">
              <p className="text-sm text-gray-500 mb-2">Cifra</p>
              <p className="text-xl font-bold text-gradient">
                {selectedRoot.symbol}{chord.symbol}
              </p>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button className="btn-primary flex items-center gap-2">
              <span>🔊</span> Ouvir Acorde
            </button>
            <button className="btn-secondary flex items-center gap-2">
              <span>📚</span> Ver Inversões
            </button>
            <button className="btn-secondary flex items-center gap-2">
              <span>🎵</span> Aplicações
            </button>
          </div>
        </div>

        {/* CTA para versão completa */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">
            Esta é apenas uma prévia. Na plataforma completa você terá acesso a:
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            {['Todas as inversões', 'Voicings avançados', 'Áudio HD', 'Aplicações práticas', 'Campo harmônico'].map((item) => (
              <span key={item} className="px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-400">
                ✓ {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
