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
    subtitle: 'Música Criativa • 15 min',
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
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
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
      if (currentPreset === 'creative') {
        // Use music file for creative session
        if (!audioElementRef.current) {
          audioElementRef.current = new Audio();
          audioElementRef.current.volume = binauralVolume / 100;
          audioElementRef.current.loop = false;
          audioElementRef.current.preload = 'auto';
          
          // Lista de URLs para tentar, em ordem de prioridade
          const musicUrls = [
            'http://venturize.com.br/criatividade.wav',
            '/music/creative-session.mp3',
            './music/creative-session.mp3'
          ];
          
          let audioLoaded = false;
          
          for (const url of musicUrls) {
            try {
              console.log('🎵 Tentando carregar música de:', url);
              audioElementRef.current.src = url;
              
              await new Promise((resolve, reject) => {
                const audio = audioElementRef.current!;
                const timeout = setTimeout(() => {
                  console.log('⏰ Timeout ao carregar de:', url);
                  reject(new Error('Timeout'));
                }, 10000); // Aumentei para 10 segundos
                
                audio.oncanplaythrough = () => {
                  clearTimeout(timeout);
                  console.log('✅ Música carregada com sucesso de:', url);
                  console.log('📊 Duração da música:', audio.duration, 'segundos');
                  resolve(true);
                };
                
                audio.onerror = (error) => {
                  clearTimeout(timeout);
                  console.log('❌ Erro ao carregar de:', url, error);
                  reject(error);
                };
                
                audio.onloadstart = () => {
                  console.log('📥 Iniciando carregamento de:', url);
                };
                
                audio.onprogress = () => {
                  console.log('📈 Progresso do carregamento...');
                };
                
                audio.load();
              });
              
              audioLoaded = true;
              break;
              
            } catch (error) {
              console.log('⚠️ Falha ao carregar de:', url, error);
              continue;
            }
          }
          
          if (!audioLoaded) {
            console.error('💥 Nenhuma fonte de áudio funcionou, usando sons binaurais como fallback');
            // Fallback para sons binaurais se o arquivo não carregar
            audioElementRef.current = null;
            
            // Usar sons binaurais como fallback
            if (!audioContextRef.current) {
              audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }
            
            if (audioContextRef.current.state === 'suspended') {
              await audioContextRef.current.resume();
            }

            const preset = presets[currentPreset];
            setupAudioNodes(preset);
            startAudioNodes();
            
            showErrorModal('Arquivo de música não encontrado. Usando sons binaurais.');
            
            setIsPlaying(true);
            
            if (pausedTimeRef.current > 0) {
              startTimeRef.current = Date.now() - pausedTimeRef.current;
            } else {
              startTimeRef.current = Date.now();
              pausedTimeRef.current = 0;
            }

            timerIntervalRef.current = setInterval(() => {
              const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
              setCurrentTime(elapsed);
            }, 1000);
            
            return; // Sair da função aqui pois já configuramos o fallback
          }
        }
        
        audioElementRef.current.currentTime = pausedTimeRef.current / 1000;
        await audioElementRef.current.play();
      } else {
        // Use binaural beats for other sessions
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }

        if (audioContextRef.current.state !== 'running') {
          console.log('Audio context state:', audioContextRef.current.state);
          await audioContextRef.current.resume();
        }

        const preset = presets[currentPreset];
        setupAudioNodes(preset);
        startAudioNodes();
      }

      setIsPlaying(true);
      
      if (pausedTimeRef.current > 0) {
        startTimeRef.current = Date.now() - pausedTimeRef.current;
      } else {
        startTimeRef.current = Date.now();
        pausedTimeRef.current = 0;
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

    if (currentPreset === 'creative' && audioElementRef.current) {
      // Pause music file
      audioElementRef.current.pause();
    } else {
      // Stop all audio nodes instead of suspending context
      if (nodesRef.current.leftOsc) {
        try {
          nodesRef.current.leftOsc.stop();
        } catch (e) {}
      }
      if (nodesRef.current.rightOsc) {
        try {
          nodesRef.current.rightOsc.stop();
        } catch (e) {}
      }
      if (nodesRef.current.noise) {
        try {
          nodesRef.current.noise.stop();
        } catch (e) {}
      }

      // Clear nodes but keep the context
      nodesRef.current = {};
    }

    setIsPlaying(false);
    pausedTimeRef.current = Date.now() - startTimeRef.current;

    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
  };

  const stopSession = () => {
    if (!isPlaying && pausedTimeRef.current === 0) return;

    if (currentPreset === 'creative' && audioElementRef.current) {
      // Stop music file
      audioElementRef.current.pause();
      audioElementRef.current.currentTime = 0;
    } else {
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
    
    // Clear any existing nodes first
    const nodes = nodesRef.current;
    if (nodes.leftOsc) {
      try { nodes.leftOsc.stop(); } catch (e) {}
    }
    if (nodes.rightOsc) {
      try { nodes.rightOsc.stop(); } catch (e) {}
    }
    if (nodes.noise) {
      try { nodes.noise.stop(); } catch (e) {}
    }
    
    // Reset nodes object
    nodesRef.current = {};
    const newNodes = nodesRef.current;

    // Create oscillators for binaural beats
    newNodes.leftOsc = ctx.createOscillator();
    newNodes.leftOsc.type = 'sine';
    newNodes.leftOsc.frequency.value = preset.baseFreq;

    newNodes.rightOsc = ctx.createOscillator();
    newNodes.rightOsc.type = 'sine';
    newNodes.rightOsc.frequency.value = preset.baseFreq + preset.frequency;

    // Create stereo panner for left and right channels
    newNodes.leftPanner = ctx.createStereoPanner();
    newNodes.leftPanner.pan.value = -1; // Left channel
    
    newNodes.rightPanner = ctx.createStereoPanner();
    newNodes.rightPanner.pan.value = 1; // Right channel

    // Gain nodes
    newNodes.binauralGain = ctx.createGain();
    newNodes.binauralGain.gain.value = binauralVolume / 100 * 0.3;

    // Pink noise
    const bufferSize = ctx.sampleRate * 2;
    newNodes.noiseBuffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const output = newNodes.noiseBuffer.getChannelData(channel);
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

    newNodes.noise = ctx.createBufferSource();
    newNodes.noise.buffer = newNodes.noiseBuffer;
    newNodes.noise.loop = true;

    newNodes.noiseGain = ctx.createGain();
    newNodes.noiseGain.gain.value = noiseVolume / 100 * 0.2;

    // Master gain
    newNodes.masterGain = ctx.createGain();
    newNodes.masterGain.gain.value = 0;

    // Connect nodes properly
    newNodes.leftOsc.connect(newNodes.leftPanner);
    newNodes.rightOsc.connect(newNodes.rightPanner);
    
    newNodes.leftPanner.connect(newNodes.binauralGain);
    newNodes.rightPanner.connect(newNodes.binauralGain);
    
    newNodes.binauralGain.connect(newNodes.masterGain);

    newNodes.noise.connect(newNodes.noiseGain);
    newNodes.noiseGain.connect(newNodes.masterGain);

    newNodes.masterGain.connect(ctx.destination);
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
      // Save current playing state
      const wasPlaying = isPlaying;
      stopSession();
      
      // Restart with new preset after a brief delay
      setTimeout(async () => {
        if (wasPlaying) {
          await startSession();
        }
      }, 100);
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
    <div className="min-h-screen bg-gradient-to-br from-background to-card text-foreground relative overflow-hidden">
      {/* Background effect */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full filter blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full filter blur-[128px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-5 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between py-5 mb-5">
          <h1 className="text-xl font-semibold">Focus Wave</h1>
          <button className="p-2 hover:bg-muted/10 rounded-full transition-colors">
            <Settings className="w-6 h-6" />
          </button>
        </header>

        {/* Main Content - Player and Presets */}
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          {/* Now Playing */}
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-3xl p-8 flex-1 relative shadow-card">
            <div className="absolute top-5 right-5 bg-primary/20 px-4 py-2 rounded-full text-sm font-medium backdrop-blur">
              {presets[currentPreset].state} {presets[currentPreset].frequency}Hz
            </div>

            {/* Album Art / Visualizer */}
            <div className="w-full max-w-72 h-72 mx-auto mb-8 bg-muted/20 backdrop-blur-sm border border-border rounded-2xl flex items-center justify-center">
              <div className="text-8xl mb-4">
                {presets[currentPreset].icon}
              </div>
              <div className="absolute bottom-4 flex items-center gap-1">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 bg-primary rounded-full transition-all ${
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
              <p className="text-muted-foreground">{presets[currentPreset].subtitle}</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="h-1 bg-muted/30 rounded-full overflow-hidden cursor-pointer">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-100"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{sessionDuration}:00</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-5">
              <button
                onClick={previousPreset}
                className="p-3 hover:bg-muted/20 rounded-full transition-colors"
              >
                <SkipBack className="w-6 h-6" />
              </button>
              
              <button
                onClick={togglePlayback}
                className="p-4 bg-gradient-to-r from-primary to-accent hover:shadow-glow rounded-full transition-all hover:scale-105"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-white" />
                ) : (
                  <Play className="w-8 h-8 ml-1 text-white" />
                )}
              </button>
              
              <button
                onClick={nextPreset}
                className="p-3 hover:bg-muted/20 rounded-full transition-colors"
              >
                <SkipForward className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Preset Modes */}
          <div className="lg:w-80">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Modos de Foco
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
              {Object.entries(presets).map(([id, preset]) => (
                <button
                  key={id}
                  onClick={() => selectPreset(id)}
                  className={`p-5 rounded-2xl border-2 transition-all shadow-card ${
                    currentPreset === id
                      ? 'bg-primary/10 border-primary backdrop-blur-sm'
                      : 'bg-card/30 border-border hover:border-primary/50 backdrop-blur-sm'
                  }`}
                >
                  <div className="flex items-center lg:flex-col lg:items-start gap-3 lg:gap-2">
                    <div className="text-2xl">{preset.icon}</div>
                    <div className="flex-1 lg:flex-none text-left lg:text-left">
                      <div className="text-sm font-semibold">{preset.name}</div>
                      <div className="text-xs text-muted-foreground">{preset.state} {preset.frequency}Hz</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Volume Controls */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-5 mb-5 shadow-card">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">{currentPreset === 'creative' ? 'Volume' : 'Batida Binaural'}</span>
              <span className="text-sm text-primary font-medium">{binauralVolume}%</span>
            </div>
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-muted-foreground" />
              <input
                type="range"
                min="0"
                max="100"
                value={binauralVolume}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setBinauralVolume(value);
                  localStorage.setItem('binauralVolume', value.toString());
                  
                  if (currentPreset === 'creative' && audioElementRef.current) {
                    audioElementRef.current.volume = value / 100;
                  } else if (nodesRef.current.binauralGain) {
                    nodesRef.current.binauralGain.gain.value = value / 100 * 0.3;
                  }
                }}
                className="flex-1 h-1 bg-muted/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
              />
            </div>
          </div>

          {currentPreset !== 'creative' && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Ruído Rosa</span>
                <span className="text-sm text-primary font-medium">{noiseVolume}%</span>
              </div>
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-muted-foreground" />
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
                  className="flex-1 h-1 bg-muted/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>

        {/* Session Timer */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-5 text-center shadow-card">
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
                    ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground'
                    : 'bg-muted/20 hover:bg-muted/30 backdrop-blur-sm'
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
            <div className="bg-card border border-border rounded-2xl p-8 max-w-sm w-full text-center shadow-elegant backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4">⚠️ Atenção</h3>
              <p className="text-muted-foreground mb-6">{errorMessage}</p>
              <button
                onClick={() => setShowError(false)}
                className="bg-gradient-to-r from-primary to-accent hover:shadow-glow text-primary-foreground px-8 py-2 rounded-lg font-medium transition-all"
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