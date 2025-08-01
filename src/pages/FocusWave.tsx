import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Settings, Volume2 } from 'lucide-react';

interface Preset {
  name: string;
  subtitle: string;
  frequency: number;
  state: string;
  baseFreq: number;
  icon: string;
}

const presets: Record<string, Preset> = {
  deepFocus: {
    name: 'Foco Profundo',
    subtitle: 'Ondas Beta • Concentração Máxima',
    frequency: 16,
    state: 'Beta',
    baseFreq: 200,
    icon: '🎯'
  },
  creative: {
    name: 'Criatividade',
    subtitle: 'Ondas Alpha • Pensamento Criativo',
    frequency: 10,
    state: 'Alpha',
    baseFreq: 180,
    icon: '💡'
  },
  study: {
    name: 'Estudo',
    subtitle: 'Ondas Beta • Aprendizado Eficaz',
    frequency: 14,
    state: 'Beta',
    baseFreq: 190,
    icon: '📚'
  },
  relax: {
    name: 'Relaxamento',
    subtitle: 'Ondas Theta • Redução de Stress',
    frequency: 6,
    state: 'Theta',
    baseFreq: 160,
    icon: '🧘'
  }
};

const FocusWave: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPreset, setCurrentPreset] = useState('deepFocus');
  const [sessionDuration, setSessionDuration] = useState(25);
  const [binauralVolume, setBinauralVolume] = useState(50);
  const [noiseVolume, setNoiseVolume] = useState(30);
  const [currentTime, setCurrentTime] = useState(0);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const audioContextRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<any>({});
  const startTimeRef = useRef<number>(0);
  const pausedTimeRef = useRef<number>(0);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Load saved preferences
    const savedPreset = localStorage.getItem('lastPreset');
    if (savedPreset && presets[savedPreset]) {
      setCurrentPreset(savedPreset);
    }

    const savedDuration = localStorage.getItem('sessionDuration');
    if (savedDuration) {
      setSessionDuration(parseInt(savedDuration));
    }

    const savedBinauralVolume = localStorage.getItem('binauralVolume');
    if (savedBinauralVolume) {
      setBinauralVolume(parseInt(savedBinauralVolume));
    }

    const savedNoiseVolume = localStorage.getItem('noiseVolume');
    if (savedNoiseVolume) {
      setNoiseVolume(parseInt(savedNoiseVolume));
    }

    // Show headphones reminder
    if (!localStorage.getItem('headphonesReminder')) {
      setTimeout(() => {
        showErrorModal('Use fones de ouvido para melhor experiência com batidas binaurais.');
        localStorage.setItem('headphonesReminder', 'shown');
      }, 1000);
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  const showErrorModal = (message: string) => {
    setErrorMessage(message);
    setShowError(true);
  };

  const togglePlayback = async () => {
    if (isPlaying) {
      pauseSession();
    } else {
      await startSession();
    }
  };

  const startSession = async () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }
      }

      const preset = presets[currentPreset];
      setupAudioNodes(preset);
      startAudioNodes();

      setIsPlaying(true);
      
      if (pausedTimeRef.current > 0) {
        startTimeRef.current = Date.now() - pausedTimeRef.current;
      } else {
        startTimeRef.current = Date.now();
      }

      timerIntervalRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setCurrentTime(elapsed);
      }, 1000);

    } catch (error) {
      console.error('Erro ao iniciar áudio:', error);
      showErrorModal('Erro ao iniciar o áudio. Verifique suas configurações.');
    }
  };

  const pauseSession = () => {
    if (!isPlaying) return;

    if (audioContextRef.current && audioContextRef.current.state === 'running') {
      audioContextRef.current.suspend();
    }

    setIsPlaying(false);
    pausedTimeRef.current = Date.now() - startTimeRef.current;

    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
  };

  const stopSession = () => {
    if (!isPlaying && pausedTimeRef.current === 0) return;

    if (nodesRef.current.masterGain) {
      const now = audioContextRef.current!.currentTime;
      nodesRef.current.masterGain.gain.linearRampToValueAtTime(0, now + 1);

      setTimeout(() => {
        if (nodesRef.current.leftOsc) nodesRef.current.leftOsc.stop();
        if (nodesRef.current.rightOsc) nodesRef.current.rightOsc.stop();
        if (nodesRef.current.noise) nodesRef.current.noise.stop();
        nodesRef.current = {};
      }, 1000);
    }

    setIsPlaying(false);
    pausedTimeRef.current = 0;
    setCurrentTime(0);

    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
  };

  const setupAudioNodes = (preset: Preset) => {
    const ctx = audioContextRef.current!;
    const nodes = nodesRef.current;

    // Create oscillators for binaural beats
    nodes.leftOsc = ctx.createOscillator();
    nodes.leftOsc.type = 'sine';
    nodes.leftOsc.frequency.value = preset.baseFreq;

    nodes.rightOsc = ctx.createOscillator();
    nodes.rightOsc.type = 'sine';
    nodes.rightOsc.frequency.value = preset.baseFreq + preset.frequency;

    // Gain nodes
    nodes.binauralGain = ctx.createGain();
    nodes.binauralGain.gain.value = binauralVolume / 100 * 0.3;

    // Pink noise
    const bufferSize = ctx.sampleRate * 2;
    nodes.noiseBuffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const output = nodes.noiseBuffer.getChannelData(channel);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.05;
        b6 = white * 0.115926;
      }
    }

    nodes.noise = ctx.createBufferSource();
    nodes.noise.buffer = nodes.noiseBuffer;
    nodes.noise.loop = true;

    nodes.noiseGain = ctx.createGain();
    nodes.noiseGain.gain.value = noiseVolume / 100 * 0.2;

    // Master gain
    nodes.masterGain = ctx.createGain();
    nodes.masterGain.gain.value = 0;

    // Connect nodes
    nodes.leftOsc.connect(nodes.binauralGain);
    nodes.rightOsc.connect(nodes.binauralGain);
    nodes.binauralGain.connect(nodes.masterGain);

    nodes.noise.connect(nodes.noiseGain);
    nodes.noiseGain.connect(nodes.masterGain);

    nodes.masterGain.connect(ctx.destination);
  };

  const startAudioNodes = () => {
    const ctx = audioContextRef.current!;
    const nodes = nodesRef.current;
    const now = ctx.currentTime;

    nodes.leftOsc.start(now);
    nodes.rightOsc.start(now);
    nodes.noise.start(now);

    // Fade in
    nodes.masterGain.gain.linearRampToValueAtTime(0.8, now + 2);

    // Auto-stop
    const stopTime = sessionDuration * 60 * 1000 - (pausedTimeRef.current || 0);
    setTimeout(() => {
      if (isPlaying) {
        stopSession();
        showErrorModal('Sessão concluída!');
      }
    }, stopTime);
  };

  const selectPreset = (presetId: string) => {
    setCurrentPreset(presetId);
    localStorage.setItem('lastPreset', presetId);

    if (isPlaying) {
      stopSession();
      setTimeout(() => startSession(), 500);
    }
  };

  const previousPreset = () => {
    const presetKeys = Object.keys(presets);
    const currentIndex = presetKeys.indexOf(currentPreset);
    const newIndex = (currentIndex - 1 + presetKeys.length) % presetKeys.length;
    selectPreset(presetKeys[newIndex]);
  };

  const nextPreset = () => {
    const presetKeys = Object.keys(presets);
    const currentIndex = presetKeys.indexOf(currentPreset);
    const newIndex = (currentIndex + 1) % presetKeys.length;
    selectPreset(presetKeys[newIndex]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (currentTime / (sessionDuration * 60)) * 100;

  return (
    <div className="min-h-screen bg-[#191919] text-white relative overflow-hidden">
      {/* Background effect */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400 rounded-full filter blur-[128px]" />
      </div>

      <div className="relative z-10 max-w-md mx-auto p-5 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between py-5 mb-5">
          <h1 className="text-xl font-semibold">Focus Wave</h1>
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <Settings className="w-6 h-6" />
          </button>
        </header>

        {/* Now Playing */}
        <div className="bg-[#232323] rounded-3xl p-8 mb-8 relative">
          <div className="absolute top-5 right-5 bg-purple-500/20 px-4 py-2 rounded-full text-sm font-medium backdrop-blur">
            {presets[currentPreset].state} {presets[currentPreset].frequency}Hz
          </div>

          {/* Album Art / Visualizer */}
          <div className="w-72 h-72 mx-auto mb-8 bg-[#2a2a2a] rounded-2xl flex items-center justify-center">
            <div className="flex items-center gap-1">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 bg-purple-500 rounded-full transition-all ${
                    isPlaying ? 'animate-pulse' : 'opacity-30'
                  }`}
                  style={{
                    height: `${40 + Math.random() * 40}%`,
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Track Info */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-2">{presets[currentPreset].name}</h2>
            <p className="text-gray-400">{presets[currentPreset].subtitle}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer">
              <div
                className="h-full bg-purple-500 rounded-full transition-all duration-100"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-400">
              <span>{formatTime(currentTime)}</span>
              <span>{sessionDuration}:00</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-5">
            <button
              onClick={previousPreset}
              className="p-3 hover:bg-white/5 rounded-full transition-colors"
            >
              <SkipBack className="w-6 h-6" />
            </button>
            
            <button
              onClick={togglePlayback}
              className="p-4 bg-purple-500 hover:bg-purple-600 rounded-full transition-all hover:scale-105"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8 ml-1" />
              )}
            </button>
            
            <button
              onClick={nextPreset}
              className="p-3 hover:bg-white/5 rounded-full transition-colors"
            >
              <SkipForward className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Preset Modes */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Modos de Foco
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(presets).map(([id, preset]) => (
              <button
                key={id}
                onClick={() => selectPreset(id)}
                className={`p-5 rounded-2xl border-2 transition-all ${
                  currentPreset === id
                    ? 'bg-purple-500/10 border-purple-500'
                    : 'bg-[#232323] border-transparent hover:border-gray-600'
                }`}
              >
                <div className="text-2xl mb-2">{preset.icon}</div>
                <div className="text-sm font-semibold">{preset.name}</div>
                <div className="text-xs text-gray-400">{preset.state} {preset.frequency}Hz</div>
              </button>
            ))}
          </div>
        </div>

        {/* Volume Controls */}
        <div className="bg-[#232323] rounded-2xl p-5 mb-5">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Batida Binaural</span>
              <span className="text-sm text-purple-400 font-medium">{binauralVolume}%</span>
            </div>
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-gray-400" />
              <input
                type="range"
                min="0"
                max="100"
                value={binauralVolume}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setBinauralVolume(value);
                  localStorage.setItem('binauralVolume', value.toString());
                  if (nodesRef.current.binauralGain) {
                    nodesRef.current.binauralGain.gain.value = value / 100 * 0.3;
                  }
                }}
                className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-purple-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Ruído Rosa</span>
              <span className="text-sm text-purple-400 font-medium">{noiseVolume}%</span>
            </div>
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-gray-400" />
              <input
                type="range"
                min="0"
                max="100"
                value={noiseVolume}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setNoiseVolume(value);
                  localStorage.setItem('noiseVolume', value.toString());
                  if (nodesRef.current.noiseGain) {
                    nodesRef.current.noiseGain.gain.value = value / 100 * 0.2;
                  }
                }}
                className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-purple-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Session Timer */}
        <div className="bg-[#232323] rounded-2xl p-5 text-center">
          <div className="text-4xl font-light mb-4 tabular-nums">{formatTime(currentTime)}</div>
          <div className="flex items-center justify-center gap-2">
            {[15, 25, 45, 60].map((duration) => (
              <button
                key={duration}
                onClick={() => {
                  setSessionDuration(duration);
                  localStorage.setItem('sessionDuration', duration.toString());
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  sessionDuration === duration
                    ? 'bg-purple-500'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                {duration}min
              </button>
            ))}
          </div>
        </div>

        {/* Error Modal */}
        {showError && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-5">
            <div className="bg-[#232323] rounded-2xl p-8 max-w-sm w-full text-center">
              <h3 className="text-xl font-semibold mb-4">⚠️ Atenção</h3>
              <p className="text-gray-400 mb-6">{errorMessage}</p>
              <button
                onClick={() => setShowError(false)}
                className="bg-purple-500 hover:bg-purple-600 px-8 py-2 rounded-lg font-medium transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FocusWave;