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
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=200&fit=crop&crop=center",
      rating: 4.6,
      isNew: false
    }
  ];

  const livrosIndicados = [
    {
      titulo: "Posicionamento: A Batalha por Sua Mente",
      autor: "Al Ries e Jack Trout",
      categoria: "Posicionamento",
      descricao: "O livro clássico que define os fundamentos do posicionamento de marca e como conquistar um espaço na mente do consumidor.",
      capa: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop&crop=center",
      linkCompra: "https://www.amazon.com.br/s?k=posicionamento+batalha+mente"
    },
    {
      titulo: "Content Inc.",
      autor: "Joe Pulizzi",
      categoria: "Produção de Conteúdo",
      descricao: "Como construir um negócio de milhões de dólares sem dinheiro de marketing, apenas criando conteúdo que as pessoas querem.",
      capa: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&crop=center",
      linkCompra: "https://www.amazon.com.br/s?k=content+inc+joe+pulizzi"
    },
    {
      titulo: "Storybrand",
      autor: "Donald Miller",
      categoria: "Branding",
      descricao: "Aprenda a clarificar sua mensagem para que os clientes escutem usando o poder das histórias.",
      capa: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop&crop=center",
      linkCompra: "https://www.amazon.com.br/s?k=storybrand+donald+miller"
    },
    {
      titulo: "Marketing de Conteúdo",
      autor: "Rafael Rez",
      categoria: "Linha Editorial",
      descricao: "A moeda do século XXI: como criar conteúdo relevante para conquistar audiências e gerar resultados.",
      capa: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=400&fit=crop&crop=center",
      linkCompra: "https://www.amazon.com.br/s?k=marketing+conteudo+rafael+rez"
    },
    {
      titulo: "Dotcom Secrets",
      autor: "Russell Brunson",
      categoria: "Vendas",
      descricao: "Os funis de vendas online que transformaram uma empresa iniciante em um império de oito dígitos.",
      capa: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=400&fit=crop&crop=center",
      linkCompra: "https://www.amazon.com.br/s?k=dotcom+secrets+russell+brunson"
    },
    {
      titulo: "Purple Cow",
      autor: "Seth Godin", 
      categoria: "Estratégia",
      descricao: "Transforme seu negócio sendo notável. Aprenda por que ser seguro é arriscado e ser arriscado é seguro.",
      capa: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=center",
      linkCompra: "https://www.amazon.com.br/s?k=purple+cow+seth+godin"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      "Fundamentos": "bg-primary/10 text-primary border-primary/20",
      "Estratégia": "bg-success/10 text-success border-success/20", 
      "Público": "bg-accent/10 text-accent-foreground border-accent/20",
      "Branding": "bg-orange-500/10 text-orange-600 border-orange-200",
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
      <div className="border-t border-border/40 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-normal text-foreground mb-4 leading-tight">
              Livros <span className="italic">Indicados</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Uma curadoria especial de livros essenciais para aprofundar seus conhecimentos em posicionamento digital
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {livrosIndicados.map((livro, index) => (
              <article key={index} className="group">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-border/20">
                  {/* Capa do Livro */}
                  <div className="aspect-[3/4] bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                    {livro.capa ? (
                      <img 
                        src={livro.capa} 
                        alt={`Capa do livro ${livro.titulo}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-6xl text-primary/30">📚</div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Informações do Livro */}
                  <div className="p-6">
                    <div className="mb-3">
                      <Badge variant="secondary" className={`${getCategoryColor(livro.categoria)} text-xs`}>
                        {livro.categoria}
                      </Badge>
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-2 leading-tight group-hover:text-primary transition-colors">
                      {livro.titulo}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-2 font-medium">
                      por {livro.autor}
                    </p>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                      {livro.descricao}
                    </p>

                    {/* Botões de Ação */}
                    <div className="flex gap-2">
                      {livro.linkCompra && (
                        <a
                          href={livro.linkCompra}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full"
                        >
                          <Button variant="outline" size="sm" className="w-full text-xs">
                            📖 Ver Livro
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground text-sm">
              <strong>Dica:</strong> Estes livros foram cuidadosamente selecionados para complementar o conteúdo da imersão
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resumos;