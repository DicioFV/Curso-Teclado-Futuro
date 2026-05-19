// ========================================
// TECLA MASTER - Demonstração do Teclado Virtual
// ========================================

import { useState } from 'react';
import VirtualPiano from '../piano/VirtualPiano';

const chordExamples = [
  { name: 'Dó Maior', symbol: 'C', notes: ['C4', 'E4', 'G4'] },
  { name: 'Lá Menor', symbol: 'Am', notes: ['A4', 'C5', 'E5'] },
  { name: 'Sol Maior', symbol: 'G', notes: ['G4', 'B4', 'D5'] },
  { name: 'Fá Maior', symbol: 'F', notes: ['F4', 'A4', 'C5'] },
];

export default function PianoDemo() {
  const [selectedChord, setSelectedChord] = useState(chordExamples[0]);
  const [lastNote, setLastNote] = useState<string | null>(null);

  return (
    <section id="teclado" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-purple-900/10 to-[#0a0a0f]" />
      
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 
                         text-sm font-medium mb-4">
            🎹 Experimente Agora
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Teclado Virtual
            <span className="text-gradient block mt-2">Interativo</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Toque agora mesmo! Use o teclado do computador ou clique nas teclas. 
            Este é apenas um preview - na plataforma você terá acesso ao teclado completo de 88 teclas.
          </p>
        </div>

        {/* Chord selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {chordExamples.map((chord) => (
            <button
              key={chord.symbol}
              onClick={() => setSelectedChord(chord)}
              className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300
                        ${selectedChord.symbol === chord.symbol
                          ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-500/25'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}
            >
              <span className="font-bold">{chord.symbol}</span>
              <span className="text-sm ml-2 opacity-70">{chord.name}</span>
            </button>
          ))}
        </div>

        {/* Info do acorde selecionado */}
        <div className="text-center mb-6">
          <p className="text-gray-400">
            As teclas destacadas em <span className="text-cyan-400 font-medium">azul</span> formam o acorde{' '}
            <span className="text-white font-bold">{selectedChord.name} ({selectedChord.symbol})</span>
          </p>
        </div>

        {/* Piano */}
        <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-white/10">
          <VirtualPiano 
            highlightedNotes={selectedChord.notes}
            onNotePlay={(note) => setLastNote(note)}
            showLabels={true}
            showKeyboardKeys={true}
            size="lg"
          />
        </div>

        {/* Última nota tocada */}
        {lastNote && (
          <div className="mt-6 text-center animate-fade-in">
            <span className="text-gray-500">Última nota tocada: </span>
            <span className="text-purple-400 font-bold">{lastNote}</span>
          </div>
        )}

        {/* Features do teclado */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '🎵', label: 'Sons HD Realísticos' },
            { icon: '⌨️', label: 'Teclado do PC' },
            { icon: '🎛️', label: 'Suporte a MIDI' },
            { icon: '📱', label: 'Touch Screen' },
          ].map((feature) => (
            <div 
              key={feature.label}
              className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5"
            >
              <span className="text-2xl">{feature.icon}</span>
              <span className="text-sm text-gray-300">{feature.label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button className="btn-primary text-lg px-8 py-4">
            Acessar Teclado Completo (88 teclas)
          </button>
        </div>
      </div>
    </section>
  );
}
