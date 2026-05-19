// ========================================
// TECLA MASTER - Metrônomo Profissional
// ========================================

import { useState, useEffect, useRef, useCallback } from 'react';

interface MetronomeProps {
  initialBpm?: number;
  compact?: boolean;
}

export default function Metronome({ initialBpm = 120, compact = false }: MetronomeProps) {
  const [bpm, setBpm] = useState(initialBpm);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [timeSignature, setTimeSignature] = useState(4);
  const [volume, setVolume] = useState(0.7);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);
  const tapTimesRef = useRef<number[]>([]);

  // Inicializar AudioContext
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Tocar click do metrônomo
  const playClick = useCallback((isAccent: boolean) => {
    if (!audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.value = isAccent ? 1000 : 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(volume * (isAccent ? 1 : 0.7), ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  }, [volume]);

  // Controle do metrônomo
  useEffect(() => {
    if (isPlaying) {
      const interval = (60 / bpm) * 1000;
      
      intervalRef.current = window.setInterval(() => {
        setCurrentBeat(prev => {
          const nextBeat = (prev + 1) % timeSignature;
          playClick(nextBeat === 0);
          return nextBeat;
        });
      }, interval);
      
      // Tocar primeiro beat imediatamente
      playClick(true);
      setCurrentBeat(0);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setCurrentBeat(0);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, bpm, timeSignature, playClick]);

  // Tap tempo
  const handleTapTempo = () => {
    const now = Date.now();
    tapTimesRef.current.push(now);
    
    // Manter apenas os últimos 4 taps
    if (tapTimesRef.current.length > 4) {
      tapTimesRef.current.shift();
    }
    
    if (tapTimesRef.current.length >= 2) {
      const intervals = [];
      for (let i = 1; i < tapTimesRef.current.length; i++) {
        intervals.push(tapTimesRef.current[i] - tapTimesRef.current[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b) / intervals.length;
      const newBpm = Math.round(60000 / avgInterval);
      
      if (newBpm >= 20 && newBpm <= 300) {
        setBpm(newBpm);
      }
    }
    
    // Limpar após 2 segundos de inatividade
    setTimeout(() => {
      if (Date.now() - tapTimesRef.current[tapTimesRef.current.length - 1] > 2000) {
        tapTimesRef.current = [];
      }
    }, 2100);
  };

  // Ajustar BPM com botões
  const adjustBpm = (delta: number) => {
    setBpm(prev => Math.max(20, Math.min(300, prev + delta)));
  };

  if (compact) {
    return (
      <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all
                    ${isPlaying 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-90'}`}
        >
          {isPlaying ? '⏹' : '▶'}
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <button onClick={() => adjustBpm(-5)} className="w-8 h-8 rounded bg-white/10 hover:bg-white/20">-</button>
            <span className="text-xl font-bold text-white w-16 text-center">{bpm}</span>
            <button onClick={() => adjustBpm(5)} className="w-8 h-8 rounded bg-white/10 hover:bg-white/20">+</button>
            <span className="text-gray-500">BPM</span>
          </div>
        </div>
        {/* Beat indicators */}
        <div className="flex gap-1">
          {[...Array(timeSignature)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all
                        ${currentBeat === i && isPlaying
                          ? i === 0 
                            ? 'bg-purple-500 scale-125' 
                            : 'bg-cyan-500 scale-110'
                          : 'bg-white/20'}`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="card-premium p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">⏱️ Metrônomo</h3>
        <p className="text-gray-400">Mantenha o tempo perfeito</p>
      </div>

      {/* BPM Display */}
      <div className="text-center mb-8">
        <div className="text-7xl font-bold text-gradient mb-2">{bpm}</div>
        <div className="text-gray-400">BPM</div>
      </div>

      {/* Beat indicators */}
      <div className="flex justify-center gap-3 mb-8">
        {[...Array(timeSignature)].map((_, i) => (
          <div
            key={i}
            className={`w-6 h-6 rounded-full transition-all duration-100
                      ${currentBeat === i && isPlaying
                        ? i === 0 
                          ? 'bg-gradient-to-r from-purple-500 to-purple-400 scale-125 shadow-lg shadow-purple-500/50' 
                          : 'bg-gradient-to-r from-cyan-500 to-cyan-400 scale-110 shadow-lg shadow-cyan-500/50'
                        : 'bg-white/10'}`}
          />
        ))}
      </div>

      {/* Slider de BPM */}
      <div className="mb-8">
        <input
          type="range"
          min="20"
          max="300"
          value={bpm}
          onChange={(e) => setBpm(Number(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer
                   [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 
                   [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full 
                   [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-purple-500 
                   [&::-webkit-slider-thumb]:to-cyan-500 [&::-webkit-slider-thumb]:cursor-pointer
                   [&::-webkit-slider-thumb]:shadow-lg"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Lento (20)</span>
          <span>Rápido (300)</span>
        </div>
      </div>

      {/* Controles */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          onClick={() => adjustBpm(-5)}
          className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xl font-bold transition-all"
        >
          -5
        </button>
        <button
          onClick={() => adjustBpm(-1)}
          className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold transition-all"
        >
          -1
        </button>
        
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl
                    transition-all duration-300 shadow-xl
                    ${isPlaying 
                      ? 'bg-red-500 hover:bg-red-600 shadow-red-500/30' 
                      : 'bg-gradient-to-r from-purple-600 to-cyan-500 hover:shadow-purple-500/50'}`}
        >
          {isPlaying ? '⏹' : '▶️'}
        </button>
        
        <button
          onClick={() => adjustBpm(1)}
          className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold transition-all"
        >
          +1
        </button>
        <button
          onClick={() => adjustBpm(5)}
          className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xl font-bold transition-all"
        >
          +5
        </button>
      </div>

      {/* Tap Tempo & Time Signature */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={handleTapTempo}
          className="py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-all"
        >
          👆 Tap Tempo
        </button>
        
        <select
          value={timeSignature}
          onChange={(e) => setTimeSignature(Number(e.target.value))}
          className="py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white 
                   focus:outline-none focus:border-purple-500 cursor-pointer"
        >
          <option value={2}>2/4</option>
          <option value={3}>3/4</option>
          <option value={4}>4/4</option>
          <option value={6}>6/8</option>
        </select>
      </div>

      {/* Volume */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
          <span>🔊 Volume</span>
          <span>{Math.round(volume * 100)}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer
                   [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 
                   [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full 
                   [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer"
        />
      </div>

      {/* Presets de BPM */}
      <div className="mt-6">
        <p className="text-sm text-gray-500 mb-3">Tempos comuns:</p>
        <div className="flex flex-wrap gap-2">
          {[60, 80, 100, 120, 140, 160].map((preset) => (
            <button
              key={preset}
              onClick={() => setBpm(preset)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all
                        ${bpm === preset
                          ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
            >
              {preset}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
