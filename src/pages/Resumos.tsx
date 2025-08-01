import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, User, Play, Star, ArrowRight, Download } from "lucide-react";

const Resumos = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userRatings, setUserRatings] = useState<{[key: number]: number}>({});

  const handleRating = (resumoId: number, rating: number) => {
    setUserRatings(prev => ({
      ...prev,
      [resumoId]: rating
    }));
  };

  const renderStars = (resumoId: number, currentRating: number) => {
    const userRating = userRatings[resumoId] || 0;
    
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRating(resumoId, star)}
            className="group/star"
          >
            <Star 
              className={`h-4 w-4 transition-colors cursor-pointer ${
                star <= userRating 
                  ? 'fill-yellow-400 text-yellow-400' 
                  : 'text-gray-300 hover:text-yellow-300'
              }`}
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-muted-foreground">
          {userRating > 0 ? `${userRating}/5` : `${currentRating}/5.0`}
        </span>
      </div>
    );
  };

  const openPalestraContent = (resumo: typeof resumos[0]) => {
    navigate(`/palestra/${resumo.id}`);
  };

  const handlePdfDownload = () => {
    toast({
      title: "PDF em Desenvolvimento",
      description: "A funcionalidade de download de PDF ficará pronta em breve. Aguarde!",
      duration: 3000,
    });
  };

  const resumos = [
    {
      id: 1,
      title: "Abertura",
      description: "Bem-vindos à Imersão Posicionamento 2024! Uma jornada transformadora para acelerar sua presença digital.",
      author: "Ana Paula Perci",
      category: "Fundamentos",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=200&fit=crop&crop=center",
      rating: 4.9,
      isNew: true
    },
    {
      id: 2,
      title: "Criação de Marca",
      description: "Estratégias avançadas de vídeo marketing e construção de marcas que realmente conectam com o público.",
      author: "Camilo Coutinho",
      category: "Branding",
      image: "/lovable-uploads/cd1ea6f5-17be-4606-b2f6-86441fa7e6e7.png",
      rating: 4.9,
      isNew: true
    },
    {
      id: 3,
      title: "Palestra 03",
      description: "Técnicas avançadas para identificar, segmentar e compreender profundamente seu público ideal.",
      author: "Melina",
      category: "Público",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop&crop=center",
      rating: 4.7,
      isNew: false
    },
    {
      id: 4,
      title: "Narrativa para Produção de Conteúdo",
      description: "Como criar narrativas envolventes e estratégicas que conectam com sua audiência e convertem em resultados.",
      author: "Sabrina",
      category: "Estratégia",
      image: "/lovable-uploads/d4242b89-2846-46e8-a772-305652e6d729.png",
      rating: 4.8,
      isNew: true
    },
    {
      id: 5,
      title: "Produção de Conteúdo no Youtube",
      description: "Como criar conteúdo envolvente e estratégico para crescer seu canal no YouTube e conectar com sua audiência.",
      author: "Victor",
      category: "Estratégia",
      image: "/lovable-uploads/7415a5cb-e16d-4cac-9ae6-36fc65ed4f92.png",
      rating: 4.9,
      isNew: true
    },
    {
      id: 6,
      title: "Palestra 06",
      description: "Aprenda a contar a história da sua marca de forma envolvente e memorável para seu público.",
      author: "Ana Paula Perci",
      category: "Fundamentos",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=200&fit=crop&crop=center",
      rating: 4.6,
      isNew: false
    },
    {
      id: 7,
      title: "Palestra 07",
      description: "Como medir e acompanhar o sucesso das suas estratégias de posicionamento de marca.",
      author: "Ana Paula Perci",
      category: "Estratégia",
      image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=400&h=200&fit=crop&crop=center",
      rating: 4.8,
      isNew: true
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      "Fundamentos": "bg-primary/10 text-primary border-primary/20",
      "Estratégia": "bg-success/10 text-success border-success/20", 
      "Público": "bg-accent/10 text-accent-foreground border-accent/20",
      "Branding": "bg-orange-500/10 text-orange-600 border-orange-200"
    };
    return colors[category as keyof typeof colors] || "bg-muted text-muted-foreground border-muted";
  };

  return (
    <div className="min-h-screen bg-background">
      
      {/* Header Section - Medium Style */}
      <div className="border-b border-border/40">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-normal text-foreground mb-6 leading-tight">
            Material de <span className="italic">Estudos</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Uma coleção de materiais exclusivos para sua jornada de posicionamento digital
          </p>
        </div>
      </div>

      {/* Content Area - Medium Style Feed */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="divide-y divide-border space-y-0">
          {resumos.map((resumo, index) => (
            <article key={resumo.id} className="group cursor-pointer pt-12 first:pt-0">
              <div className="flex flex-col md:flex-row md:items-start gap-8">
                {/* Content */}
                <div className="flex-1 order-2 md:order-1">
                  {/* Category & Author */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">{resumo.author}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">·</span>
                    <Badge variant="secondary" className={`${getCategoryColor(resumo.category)} text-xs`}>
                      {resumo.category}
                    </Badge>
                    {resumo.isNew && (
                      <>
                        <span className="text-sm text-muted-foreground">·</span>
                        <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200 text-xs">
                          Novo
                        </Badge>
                      </>
                    )}
                  </div>

                  {/* Title */}
                  <h2 
                    className="text-2xl md:text-3xl font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors cursor-pointer"
                    onClick={() => openPalestraContent(resumo)}
                  >
                    {resumo.title}
                  </h2>

                  {/* Description */}
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6 line-clamp-3">
                    {resumo.description}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center justify-end">

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-muted-foreground hover:text-black hover:bg-yellow-400 transition-colors"
                        onClick={handlePdfDownload}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Baixar PDF
                      </Button>
                      <Button 
                        className="group/btn"
                        onClick={() => openPalestraContent(resumo)}
                      >
                        <BookOpen className="h-4 w-4 mr-2 transition-transform group-hover/btn:scale-110" />
                        Abrir
                      </Button>
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="mt-8"></div>

                </div>

                {/* Image */}
                <div className="order-1 md:order-2 md:w-48 md:flex-shrink-0">
                  <div className="relative aspect-[4/3] md:aspect-square overflow-hidden rounded-lg bg-muted">
                    <img 
                      src={resumo.image} 
                      alt={resumo.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    
                    {/* Play Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm">
                        <Play className="h-5 w-5 text-gray-900 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Resumos;