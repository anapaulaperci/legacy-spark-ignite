import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipForward, SkipBack, Volume2, Heart } from "lucide-react";
import { useState } from "react";

const FocusWave = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-secondary p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Focus Wave
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Música para concentração e produtividade
          </p>
        </div>

        {/* Music Player Card */}
        <Card className="bg-card/80 backdrop-blur-sm border border-border/50 shadow-elegant">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-foreground">
              Player de Música
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Album Art Placeholder */}
            <div className="flex justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                <div className="text-6xl text-primary/50">🎵</div>
              </div>
            </div>

            {/* Song Info */}
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-foreground">
                Ambient Focus Mix
              </h3>
              <p className="text-muted-foreground">
                Relaxing Instrumentals
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-primary to-primary-glow h-2 rounded-full transition-all duration-300" 
                  style={{ width: '35%' }}
                />
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>1:25</span>
                <span>4:12</span>
              </div>
            </div>

            {/* Player Controls */}
            <div className="flex items-center justify-center gap-6">
              <Button variant="ghost" size="lg" className="hover:bg-accent/10">
                <SkipBack className="h-6 w-6" />
              </Button>
              
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow text-primary-foreground w-16 h-16 rounded-full"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="h-8 w-8" />
                ) : (
                  <Play className="h-8 w-8 ml-1" />
                )}
              </Button>
              
              <Button variant="ghost" size="lg" className="hover:bg-accent/10">
                <SkipForward className="h-6 w-6" />
              </Button>
            </div>

            {/* Volume and Like */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="h-5 w-5 text-muted-foreground" />
                <div className="w-20 bg-muted rounded-full h-1">
                  <div className="bg-primary h-1 rounded-full w-3/4" />
                </div>
              </div>
              
              <Button variant="ghost" size="sm" className="hover:bg-accent/10">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Playlist Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card className="bg-card/60 backdrop-blur-sm border border-border/50 hover:shadow-card transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg">Foco Intenso</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4">
                Música instrumental para máxima concentração
              </p>
              <Button variant="outline" size="sm">
                Reproduzir Playlist
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card/60 backdrop-blur-sm border border-border/50 hover:shadow-card transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg">Relaxamento</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4">
                Sons ambiente para relaxar e meditar
              </p>
              <Button variant="outline" size="sm">
                Reproduzir Playlist
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FocusWave;