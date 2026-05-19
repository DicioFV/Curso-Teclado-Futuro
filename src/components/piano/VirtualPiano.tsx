// ========================================
// TECLA MASTER - Teclado Virtual Interativo
// ========================================

import { useState, useCallback, useEffect } from 'react';

interface PianoKeyData {
  note: string;
  noteLatin: string;
  isBlack: boolean;
  keyboardKey: string;
}

// Definição das teclas do piano (2 oitavas)
const pianoKeys: PianoKeyData[] = [
  { note: 'C4', noteLatin: 'Dó', isBlack: false, keyboardKey: 'a' },
  { note: 'C#4', noteLatin: 'Dó#', isBlack: true, keyboardKey: 'w' },
  { note: 'D4', noteLatin: 'Ré', isBlack: false, keyboardKey: 's' },
  { note: 'D#4', noteLatin: 'Ré#', isBlack: true, keyboardKey: 'e' },
  { note: 'E4', noteLatin: 'Mi', isBlack: false, keyboardKey: 'd' },
  { note: 'F4', noteLatin: 'Fá', isBlack: false, keyboardKey: 'f' },
  { note: 'F#4', noteLatin: 'Fá#', isBlack: true, keyboardKey: 't' },
  { note: 'G4', noteLatin: 'Sol', isBlack: false, keyboardKey: 'g' },
  { note: 'G#4', noteLatin: 'Sol#', isBlack: true, keyboardKey: 'y' },
  { note: 'A4', noteLatin: 'Lá', isBlack: false, keyboardKey: 'h' },
  { note: 'A#4', noteLatin: 'Lá#', isBlack: true, keyboardKey: 'u' },
  { note: 'B4', noteLatin: 'Si', isBlack: false, keyboardKey: 'j' },
  { note: 'C5', noteLatin: 'Dó', isBlack: false, keyboardKey: 'k' },
  { note: 'C#5', noteLatin: 'Dó#', isBlack: true, keyboardKey: 'o' },
  { note: 'D5', noteLatin: 'Ré', isBlack: false, keyboardKey: 'l' },
  { note: 'D#5', noteLatin: 'Ré#', isBlack: true, keyboardKey: 'p' },
  { note: 'E5', noteLatin: 'Mi', isBlack: false, keyboardKey: ';' },
];

// Frequências das notas para Web Audio API
const noteFrequencies: Record<string, number> = {
  'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13,
  'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00,
  'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88,
  'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'D#5': 622.25,
  'E5': 659.25,
};

interface VirtualPianoProps {
  highlightedNotes?: string[];
  onNotePlay?: (note: string) => void;
  showLabels?: boolean;
  showKeyboardKeys?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function VirtualPiano({
  highlightedNotes = [],
  onNotePlay,
  showLabels = true,
  showKeyboardKeys = true,
  size = 'md'
}: VirtualPianoProps) {
  const [activeNotes, setActiveNotes] = useState<Set<string>>(new Set());
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  // Inicializar Audio Context
  useEffect(() => {
    const ctx = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    setAudioContext(ctx);
    return () => {
      ctx.close();
    };
  }, []);

  // Tocar uma nota
  const playNote = useCallback((note: string) => {
    if (!audioContext) return;

    const frequency = noteFrequencies[note];
    if (!frequency) return;

    // Criar oscilador
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Configurar som de piano (aproximação)
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

    // Envelope ADSR simplificado
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1.5);

    // Atualizar estado
    setActiveNotes(prev => new Set([...prev, note]));
    setTimeout(() => {
      setActiveNotes(prev => {
        const newSet = new Set(prev);
        newSet.delete(note);
        return newSet;
      });
    }, 200);

    onNotePlay?.(note);
  }, [audioContext, onNotePlay]);

  // Keyboard event listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const key = pianoKeys.find(k => k.keyboardKey === e.key.toLowerCase());
      if (key) {
        playNote(key.note);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playNote]);

  // Dimensões baseadas no tamanho
  const sizes = {
    sm: { whiteWidth: 32, whiteHeight: 100, blackWidth: 20, blackHeight: 60 },
    md: { whiteWidth: 44, whiteHeight: 140, blackWidth: 28, blackHeight: 85 },
    lg: { whiteWidth: 56, whiteHeight: 180, blackWidth: 36, blackHeight: 110 },
  };

  const { whiteWidth, whiteHeight, blackWidth, blackHeight } = sizes[size];

  // Separar teclas brancas e pretas
  const whiteKeys = pianoKeys.filter(k => !k.isBlack);
  const blackKeys = pianoKeys.filter(k => k.isBlack);

  // Calcular posição das teclas pretas
  const getBlackKeyPosition = (note: string): number => {
    const blackKeyOffsets: Record<string, number> = {
      'C#4': 0.7, 'D#4': 1.8, 'F#4': 3.7, 'G#4': 4.75, 'A#4': 5.8,
      'C#5': 7.7, 'D#5': 8.8
    };
    return (blackKeyOffsets[note] || 0) * whiteWidth;
  };

  return (
    <div className="relative">
      {/* Container do piano */}
      <div 
        className="relative bg-gradient-to-b from-gray-900 to-black rounded-2xl p-4 shadow-2xl overflow-hidden"
        style={{ 
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.1)' 
        }}
      >
        {/* Brilho superior */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        
        {/* Container das teclas */}
        <div 
          className="relative flex"
          style={{ height: whiteHeight + 20 }}
        >
          {/* Teclas Brancas */}
          {whiteKeys.map((key, index) => {
            const isActive = activeNotes.has(key.note);
            const isHighlighted = highlightedNotes.includes(key.note);

            return (
              <div
                key={key.note}
                onClick={() => playNote(key.note)}
                className={`
                  relative cursor-pointer transition-all duration-75 select-none
                  ${isActive 
                    ? 'translate-y-1' 
                    : 'hover:-translate-y-0.5'}
                `}
                style={{
                  width: whiteWidth,
                  height: whiteHeight,
                  marginRight: index < whiteKeys.length - 1 ? 2 : 0,
                }}
              >
                {/* Tecla */}
                <div 
                  className={`
                    absolute inset-0 rounded-b-lg transition-all duration-75
                    ${isActive 
                      ? 'bg-gradient-to-b from-purple-300 to-purple-400 shadow-inner' 
                      : isHighlighted
                        ? 'bg-gradient-to-b from-cyan-100 to-cyan-200'
                        : 'bg-gradient-to-b from-white to-gray-100'}
                  `}
                  style={{
                    boxShadow: isActive 
                      ? 'inset 0 3px 5px rgba(0,0,0,0.2)' 
                      : '0 4px 6px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.8)'
                  }}
                />

                {/* Label da nota */}
                {showLabels && (
                  <div className="absolute bottom-2 left-0 right-0 text-center">
                    <span className={`text-xs font-medium ${isActive ? 'text-purple-800' : 'text-gray-600'}`}>
                      {key.noteLatin}
                    </span>
                  </div>
                )}

                {/* Tecla do teclado */}
                {showKeyboardKeys && (
                  <div className="absolute bottom-8 left-0 right-0 text-center">
                    <span className="text-[10px] text-gray-400 uppercase bg-gray-200 px-1.5 py-0.5 rounded">
                      {key.keyboardKey}
                    </span>
                  </div>
                )}
              </div>
            );
          })}

          {/* Teclas Pretas */}
          {blackKeys.map((key) => {
            const isActive = activeNotes.has(key.note);
            const isHighlighted = highlightedNotes.includes(key.note);
            const leftPos = getBlackKeyPosition(key.note);

            return (
              <div
                key={key.note}
                onClick={() => playNote(key.note)}
                className={`
                  absolute cursor-pointer z-10 transition-all duration-75 select-none
                  ${isActive ? 'translate-y-0.5' : 'hover:-translate-y-0.5'}
                `}
                style={{
                  width: blackWidth,
                  height: blackHeight,
                  left: leftPos,
                  top: 0,
                }}
              >
                {/* Tecla */}
                <div 
                  className={`
                    absolute inset-0 rounded-b-md transition-all duration-75
                    ${isActive 
                      ? 'bg-gradient-to-b from-purple-700 to-purple-900' 
                      : isHighlighted
                        ? 'bg-gradient-to-b from-cyan-600 to-cyan-800'
                        : 'bg-gradient-to-b from-gray-800 to-black'}
                  `}
                  style={{
                    boxShadow: isActive 
                      ? 'inset 0 2px 4px rgba(0,0,0,0.5)' 
                      : '0 4px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)'
                  }}
                />

                {/* Tecla do teclado */}
                {showKeyboardKeys && (
                  <div className="absolute bottom-2 left-0 right-0 text-center">
                    <span className="text-[10px] text-gray-400 uppercase">
                      {key.keyboardKey}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Instrução */}
      <p className="text-center text-sm text-gray-500 mt-4">
        🎹 Use o teclado do computador (A-L) ou clique nas teclas para tocar
      </p>
    </div>
  );
}
