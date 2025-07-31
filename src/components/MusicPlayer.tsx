import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Music,
  Heart,
  MoreVertical,
  Repeat,
  Shuffle
} from "lucide-react";

interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  cover: string;
  audioUrl: string;
}

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  const playlist: Track[] = [
    {
      id: 1,
      title: "Focus Deep Work",
      artist: "Study Beats",
      album: "Concentration",
      duration: "3:24",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      audioUrl: "#"
    },
    {
      id: 2,
      title: "Calm Energy",
      artist: "Ambient Flow",
      album: "Productivity",
      duration: "4:15",
      cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=300&fit=crop",
      audioUrl: "#"
    },
    {
      id: 3,
      title: "Background Study",
      artist: "Lo-Fi Mix",
      album: "Learning Mode",
      duration: "5:32",
      cover: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=300&h=300&fit=crop",
      audioUrl: "#"
    }
  ];

  const currentSong = playlist[currentTrack];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  return (
    <div className="fixed right-4 top-16 w-64 z-50">
      <Card className="border-purple-700/50 text-white shadow-2xl backdrop-blur-sm overflow-hidden rounded-3xl" style={{ backgroundColor: '#110A1D' }}>
        {/* Header */}
        <div className="px-3 py-2 border-b border-purple-700/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Music className="h-3 w-3 text-purple-300" />
              <span className="font-medium text-xs">Study Playlist</span>
            </div>
            <Button variant="ghost" size="sm" className="text-purple-300 hover:text-white hover:bg-purple-700/50 h-6 w-6 p-0">
              <MoreVertical className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Album Art */}
        <div className="p-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 group">
            <img 
              src={currentSong.cover} 
              alt={currentSong.album}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            
            {/* Floating Play Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30"
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4 text-white" />
                ) : (
                  <Play className="h-4 w-4 text-white ml-0.5" />
                )}
              </Button>
            </div>
          </div>

          {/* Track Info */}
          <div className="text-center mb-4">
            <h3 className="font-bold text-sm text-white mb-1 truncate">{currentSong.title}</h3>
            <p className="text-purple-300 text-xs mb-1 truncate">{currentSong.artist}</p>
            <p className="text-purple-400 text-xs truncate">{currentSong.album}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <Slider
              value={[progress]}
              onValueChange={(value) => setProgress(value[0])}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-purple-300 mt-1">
              <span>1:23</span>
              <span>{currentSong.duration}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleShuffle}
              className={`text-purple-300 hover:text-white hover:bg-purple-700/50 h-6 w-6 p-0 ${
                isShuffle ? "text-purple-200" : ""
              }`}
            >
              <Shuffle className="h-3 w-3" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={prevTrack}
              className="text-purple-300 hover:text-white hover:bg-purple-700/50 h-6 w-6 p-0"
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            
            <Button
              onClick={togglePlay}
              className="w-9 h-9 rounded-full bg-white text-purple-900 hover:bg-purple-100 flex items-center justify-center"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4 ml-0.5" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={nextTrack}
              className="text-purple-300 hover:text-white hover:bg-purple-700/50 h-6 w-6 p-0"
            >
              <SkipForward className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleRepeat}
              className={`text-purple-300 hover:text-white hover:bg-purple-700/50 h-6 w-6 p-0 ${
                isRepeat ? "text-purple-200" : ""
              }`}
            >
              <Repeat className="h-3 w-3" />
            </Button>
          </div>

          {/* Secondary Controls */}
          <div className="flex items-center justify-between gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLike}
              className={`text-purple-300 hover:text-white hover:bg-purple-700/50 h-6 w-6 p-0 ${
                isLiked ? "text-red-400" : ""
              }`}
            >
              <Heart className={`h-3 w-3 ${isLiked ? "fill-current" : ""}`} />
            </Button>
            
            <div className="flex items-center gap-2 flex-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
                className="text-purple-300 hover:text-white hover:bg-purple-700/50 h-6 w-6 p-0"
              >
                {isMuted ? (
                  <VolumeX className="h-3 w-3" />
                ) : (
                  <Volume2 className="h-3 w-3" />
                )}
              </Button>
              
              <Slider
                value={[isMuted ? 0 : volume]}
                onValueChange={(value) => setVolume(value[0])}
                max={100}
                step={1}
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MusicPlayer;