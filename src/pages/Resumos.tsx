import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, User, Play, Star, ArrowRight, Download, MessageCircle } from "lucide-react";

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
      title: "O começo - Conheça seu publico",
      description: "Palestra de abertura da Imersão de Posicionamento com foco em diferenciação entre persona e ICP, construção de autoridade e linha editorial estratégica.",
      author: "Ana",
      category: "Fundamentos",
      image: "/lovable-uploads/17e9dc7e-85aa-43f2-bdd3-b74a55a72ce9.png",
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
      title: "Funil de Vendas",
      description: "Estratégias avançadas para construir um funil de vendas eficiente que converte prospects em clientes fiéis.",
      author: "Melina",
      category: "Vendas",
      image: "/lovable-uploads/783accb5-3ea0-482f-9285-dfdc4d9883fc.png",
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
      title: "Linha Editorial e IA",
      description: "Como criar uma linha editorial consistente utilizando inteligência artificial para otimizar seu conteúdo.",
      author: "Ana Paula Perci",
      category: "Linha Editorial",
      image: "/lovable-uploads/3b0d1df3-7102-4c52-ba2f-eb2338f927d7.png",
      rating: 4.6,
      isNew: false
    }
  ];

  const livrosIndicados = [
    {
      titulo: "Small Data: As Pequenas Pistas que Indicam Grandes Tendências",
      autor: "Martin Lindstrom",
      categoria: "Palestra 1",
      descricao: "Como pequenos detalhes do comportamento humano podem revelar grandes insights para inovação e crescimento de negócios.",
      capa: "/lovable-uploads/09c5877d-d784-4ad9-b961-8f685c34a0ce.png",
      linkCompra: "https://www.amazon.com.br/Small-Data-Indicam-Grandes-Tend%C3%AAncias/dp/8569809719"
    },
    {
      titulo: "O Herói e o Fora-da-Lei: Como Construir Marcas Extraordinárias Usando o Poder dos Arquétipos",
      autor: "Margaret Mark e Carol S. Pearson",
      categoria: "Palestra 2",
      descricao: "Descubra como usar arquétipos universais para criar marcas poderosas e memoráveis que conectam emocionalmente com seu público.",
      capa: "/lovable-uploads/0e398d8a-36f5-4826-85fb-e891d6308ef3.png",
      linkCompra: "https://www.amazon.com.br/her%C3%B3i-fora-lei-extraordin%C3%A1rias-arqu%C3%A9tipos/dp/8531608090"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      "Palestra 1": "bg-primary/10 text-primary border-primary/20",
      "Palestra 2": "bg-orange-500/10 text-orange-600 border-orange-200",
      "Palestra 3": "bg-red-500/10 text-red-600 border-red-200",
      "Palestra 4": "bg-purple-500/10 text-purple-600 border-purple-200",
      "Palestra 5": "bg-success/10 text-success border-success/20", 
      "Palestra 6": "bg-accent/10 text-accent-foreground border-accent/20",
      "Estratégia": "bg-success/10 text-success border-success/20", 
      "Público": "bg-accent/10 text-accent-foreground border-accent/20",
      "Vendas": "bg-red-500/10 text-red-600 border-red-200",
      "Linha Editorial": "bg-purple-500/10 text-purple-600 border-purple-200",
      "Posicionamento": "bg-blue-500/10 text-blue-600 border-blue-200",
      "Produção de Conteúdo": "bg-green-500/10 text-green-600 border-green-200"
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
                      {resumo.author === 'Victor' && (
                        <a
                          href="https://wa.me/41998927030"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-primary hover:text-primary-glow transition-colors text-xs"
                        >
                          <MessageCircle className="w-3 h-3" />
                          Falar com Victor
                        </a>
                      )}
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

      {/* Seção de Livros Indicados */}
      <div className="border-t border-border/40 bg-gradient-to-br from-muted/30 via-background to-muted/20">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 leading-tight">
              Livros <span className="italic bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Indicados</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Uma curadoria especial de livros essenciais para aprofundar seus conhecimentos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {livrosIndicados.map((livro, index) => (
              <article key={index} className="group h-full">
                <div className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-border/30 h-full flex flex-col group-hover:scale-[1.01]">
                  
                  {/* Gradient overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  {/* Capa do Livro */}
                  <div className="relative aspect-[2/3] bg-gradient-to-br from-muted/30 to-muted/60 overflow-hidden">
                    {livro.capa ? (
                      <img 
                        src={livro.capa} 
                        alt={`Capa do livro ${livro.titulo}`}
                        className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                        <div className="text-6xl text-primary/40">📚</div>
                      </div>
                    )}
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Category badge floating */}
                    <div className="absolute top-2 left-2 z-10">
                      <Badge variant="secondary" className={`${getCategoryColor(livro.categoria)} text-xs font-medium`}>
                        {livro.categoria}
                      </Badge>
                    </div>
                  </div>

                  {/* Informações do Livro */}
                  <div className="relative p-4 flex-1 flex flex-col space-y-2">
                    
                    <h3 className="text-base font-bold text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2">
                      {livro.titulo}
                    </h3>
                    
                    <p className="text-xs text-muted-foreground font-medium">
                      por <span className="text-foreground font-semibold">{livro.autor}</span>
                    </p>
                    
                    <p className="text-muted-foreground text-xs leading-relaxed flex-1 line-clamp-3">
                      {livro.descricao}
                    </p>

                    {/* Botão de Ação */}
                    <div className="pt-2 mt-auto">
                      {livro.linkCompra && (
                        <a
                          href={livro.linkCompra}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full"
                        >
                          <Button 
                            className="w-full bg-primary hover:bg-primary-glow text-primary-foreground font-medium py-2 text-xs rounded-md transition-all duration-300"
                          >
                            <span className="flex items-center justify-center gap-2">
                              📖 <span>Ver Livro</span>
                            </span>
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Call to Action aprimorado */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full border border-primary/20">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
              <p className="text-muted-foreground text-xs">
                <strong className="text-foreground">Dica:</strong> Livros selecionados para complementar o conteúdo da imersão
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resumos;