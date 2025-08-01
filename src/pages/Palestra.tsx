import { useParams, Navigate, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { User, ArrowLeft, ChevronRight, Instagram } from "lucide-react";

const Palestra = () => {
  const { id } = useParams();
  
  const resumos = [
    {
      id: 1,
      title: "Abertura",
      description: "Bem-vindos à Imersão Posicionamento 2024! Uma jornada transformadora para acelerar sua presença digital.",
      author: "Ana Paula Perci",
      category: "Fundamentos",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=200&fit=crop&crop=center",
      isNew: true
    },
    {
      id: 2,
      title: "Criação de Marca",
      description: "Estratégias avançadas de vídeo marketing e construção de marcas que realmente conectam com o público.",
      author: "Camilo Coutinho",
      category: "Branding",
      image: "/lovable-uploads/cd1ea6f5-17be-4606-b2f6-86441fa7e6e7.png",
      isNew: true
    },
    {
      id: 3,
      title: "Palestra 03",
      description: "Técnicas avançadas para identificar, segmentar e compreender profundamente seu público ideal.",
      author: "Melina",
      category: "Público",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop&crop=center",
      isNew: false
    },
    {
      id: 4,
      title: "Narrativa para Produção de Conteúdo",
      description: "Como criar narrativas envolventes e estratégicas que conectam com sua audiência e convertem em resultados.",
      author: "Sabrina",
      category: "Estratégia",
      image: "/lovable-uploads/d4242b89-2846-46e8-a772-305652e6d729.png",
      isNew: true
    },
    {
      id: 5,
      title: "Produção de Conteúdo no Youtube",
      description: "Como criar conteúdo envolvente e estratégico para crescer seu canal no YouTube e conectar com sua audiência.",
      author: "Victor",
      category: "Estratégia",
      image: "/lovable-uploads/7415a5cb-e16d-4cac-9ae6-36fc65ed4f92.png",
      isNew: true
    },
    {
      id: 6,
      title: "Palestra 06",
      description: "Aprenda a contar a história da sua marca de forma envolvente e memorável para seu público.",
      author: "Ana Paula Perci",
      category: "Fundamentos",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=200&fit=crop&crop=center",
      isNew: false
    },
    {
      id: 7,
      title: "Palestra 07",
      description: "Como medir e acompanhar o sucesso das suas estratégias de posicionamento de marca.",
      author: "Ana Paula Perci",
      category: "Estratégia",
      image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=400&h=200&fit=crop&crop=center",
      isNew: true
    }
  ];

  const resumo = resumos.find(r => r.id === parseInt(id || ''));
  
  if (!resumo) {
    return <Navigate to="/resumos" replace />;
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      "Fundamentos": "bg-primary/10 text-primary border-primary/20",
      "Estratégia": "bg-success/10 text-success border-success/20", 
      "Público": "bg-accent/10 text-accent-foreground border-accent/20",
      "Branding": "bg-orange-500/10 text-orange-600 border-orange-200"
    };
    return colors[category as keyof typeof colors] || "bg-muted text-muted-foreground border-muted";
  };

  const otherResumes = resumos.filter(r => r.id !== resumo.id);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="px-4 sm:px-6 lg:px-8 pt-6">
            <Link 
              to="/resumos" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para Material de Estudos
            </Link>
          </div>

          {/* Hero */}
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="pt-10 md:pt-20 pb-14 md:pb-20">
              {/* Heading */}
              <div className="mb-10 max-w-xl mx-auto text-center">
                <h1 className="font-bold text-foreground text-4xl md:text-5xl mb-5">
                  {resumo.title}
                </h1>

                <p className="mt-5 text-sm md:text-lg text-muted-foreground">
                  {resumo.description}
                </p>
                
                {/* Meta info */}
                <div className="mt-6 flex justify-center items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-3 w-3 text-primary" />
                    </div>
                    <span><strong>Instrutor:</strong> {resumo.author}</span>
                  </div>
                  <span>·</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className={`${getCategoryColor(resumo.category)} text-xs`}>
                      {resumo.category}
                    </Badge>
                  </div>
                  {resumo.isNew && (
                    <>
                      <span>·</span>
                      <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200 text-xs">
                        Novo
                      </Badge>
                    </>
                  )}
                </div>

                {/* Instagram Link for Camilo */}
                {resumo.author === 'Camilo Coutinho' && (
                  <div className="mt-4">
                    <a
                      href="https://www.instagram.com/camilocoutinho/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:text-primary-glow transition-colors text-sm font-medium"
                    >
                      <Instagram className="w-4 h-4" />
                      Falar com Camilo
                    </a>
                  </div>
                )}
              </div>
              {/* End Heading */}

              <div className="w-full h-64 md:h-96 bg-muted rounded-xl overflow-hidden">
                <img 
                  className="w-full h-full object-cover rounded-xl" 
                  src={resumo.image} 
                  alt={resumo.title} 
                />
              </div>
            </div>
          </div>
          {/* End Hero */}

          {/* Title Description */}
          <div className="px-4 sm:px-6 lg:px-8">
            {/* Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10">
              <div className="lg:pe-[20%]">
                <h2 className="font-semibold text-2xl md:text-3xl text-foreground">
                  Conteúdo em desenvolvimento
                </h2>
              </div>
              {/* End Col */}

              <div className="space-y-5">
                <p className="text-muted-foreground">
                  Este material está sendo preparado especialmente para você. Em breve, todo o conteúdo detalhado estará disponível.
                </p>
                <p className="text-muted-foreground">
                  Enquanto isso, acompanhe nossos outros materiais disponíveis e fique atento às atualizações.
                </p>
              </div>
              {/* End Col */}
            </div>
            {/* End Grid */}
            
            <div className="mt-12 p-8 bg-muted/30 rounded-xl text-center">
              <p className="text-muted-foreground text-sm mb-8">
                <strong>Material Exclusivo da Imersão Posicionamento 2024</strong><br />
                Conteúdo desenvolvido especialmente para acelerar sua jornada profissional
              </p>
            </div>

            {/* User Rating Section */}
            <div className="mt-8 p-8 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent border border-primary/10 rounded-2xl">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Como você avalia este conteúdo?
                </h3>
                <p className="text-muted-foreground text-sm mb-8">
                  Sua avaliação nos ajuda a melhorar continuamente nossos materiais
                </p>
                
                <div className="flex items-center justify-center gap-3 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className="group/star transition-all duration-200 hover:scale-110"
                    >
                      <svg 
                        className="h-8 w-8 text-muted-foreground hover:text-yellow-400 transition-colors cursor-pointer" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={1.5} 
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" 
                        />
                      </svg>
                    </button>
                  ))}
                </div>
                
                <div className="flex justify-center gap-2 text-xs text-muted-foreground">
                  <span>Ruim</span>
                  <span className="px-8">Regular</span>
                  <span>Excelente</span>
                </div>
              </div>
            </div>
          </div>
          {/* End Title Description */}
        </div>

        {/* Sidebar - Other Lectures */}
        <div className="hidden xl:block w-80 border-l border-border/30 bg-background">
          <div className="sticky top-0 p-8 h-screen overflow-y-auto">
            <h3 className="font-normal text-lg text-foreground mb-8">
              Mais para ler
            </h3>
            
            <div className="divide-y divide-border/30 space-y-0">
              {otherResumes.map((lecture) => (
                <Link
                  key={lecture.id}
                  to={`/palestra/${lecture.id}`}
                  className="block group"
                >
                  <article className="group-hover:opacity-75 transition-opacity duration-200 py-8 first:pt-0">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant="secondary" className={`${getCategoryColor(lecture.category)} text-xs border-none`}>
                          {lecture.category}
                        </Badge>
                        {lecture.isNew && (
                          <span className="text-xs text-emerald-600 font-medium">Novo</span>
                        )}
                      </div>
                      
                      <h4 className="font-medium text-foreground text-base leading-snug line-clamp-2 group-hover:underline">
                        {lecture.title}
                      </h4>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {lecture.description}
                      </p>
                      
                      <div className="pt-2">
                        <span className="text-xs text-muted-foreground">{lecture.author}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
            
            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-border/30 text-center">
              <p className="text-xs text-muted-foreground">
                © 2025 Ana Paula Perci
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Palestra;