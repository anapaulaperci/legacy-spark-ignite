import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Instagram } from "lucide-react";

const Home = () => {
  const speakers = [
    {
      name: "Ana Paula Perci",
      description: "Estrategista de Marketing, especialista em IA e Lançamento",
      instagram: "https://www.instagram.com/anapaulaperci/",
      image: "/lovable-uploads/e7c2891f-cb86-4ac8-bf0d-1dfc2771329a.png"
    },
    {
      name: "Camilo Coutinho",
      description: "Estrategista Digital e autoridade em video marketing e construção de marcas",
      bio: "Sou estrategista especializado em vídeo marketing e criação de conteúdo de vendas, com a missão de transformar qualquer mensagem em vídeos que realmente convertem, em qualquer plataforma. Autor do livro Vídeos que Vendem Mais (2020), ajudo empresas e criadores a dominarem o poder das suas marcas e empresas em conteúdos que impulsionam resultados.",
      instagram: "#",
      image: "/lovable-uploads/20480f60-63bc-423c-a703-ec778a012ca4.png"
    },
    {
      name: "Melina Dantas",
      description: "Especialista em criação de times de venda de alta performace",
      instagram: "#",
      image: "/lovable-uploads/6811a272-1c33-4ff6-b54b-e955acc9bdc0.png"
    },
    {
      name: "Sabrina Oliveira",
      description: "Educadora, neurocientista e cuidadora do programa VemMED",
      instagram: "#",
      image: "/lovable-uploads/e3453f5b-ac17-4f8e-a922-270689feaeed.png"
    },
    {
      name: "Victor",
      description: "Eu sou estrategista de YouTube e especialista em thumbnails",
      instagram: "#",
      image: "/lovable-uploads/c6993261-b266-40b5-aba1-09af95ef9cea.png"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-secondary">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32">
          <div className="text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 bg-primary-light backdrop-blur-sm border border-primary/20 text-primary text-sm rounded-full px-4 py-2 shadow-lg">
              <div className="w-6 h-6 bg-gradient-to-r from-primary to-primary-glow rounded-full flex items-center justify-center">
                <img 
                  src="/lovable-uploads/7433a794-51a8-45eb-81be-aeaccb87a06f.png" 
                  alt="Logo" 
                  className="w-4 h-4 object-contain"
                />
              </div>
              Sem pressa e sem pausa
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Imersão de Posicionamento,
              </span>
              <br />
              <span className="text-muted-foreground">
                produção de conteúdo e vendas.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 font-medium">
              Por: Ana Paula Perci e Convidados.
            </p>

            {/* CTA Button */}
            <Link to="/resumos">
              <Button
                size="lg" 
                className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow text-primary-foreground px-8 py-4 text-lg shadow-elegant hover:scale-105 transition-all duration-300"
              >
                Começar Jornada
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section className="speakers-section">
        <div className="section-header">
          <h2 className="section-title">Palestrantes</h2>
        </div>

        {/* Speakers Grid */}
        <div className="speakers-grid">
          {speakers.map((speaker, index) => (
            <div key={index} className="speaker-card">
              <a 
                href={speaker.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {/* Speaker Image */}
                <img 
                  src={speaker.image}
                  alt={speaker.name}
                  className={`speaker-image ${speaker.name === 'Ana Paula Perci' ? 'object-top' : ''}`}
                />
                
                {/* Speaker Info */}
                <h3 className="speaker-name">
                  {speaker.name}
                </h3>
                <p className="speaker-role">
                  {speaker.description}
                </p>
              </a>
              
              {/* Camilo Contact Link */}
              {speaker.name === 'Camilo Coutinho' && (
                <a
                  href="https://www.instagram.com/camilocoutinho/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-primary hover:text-primary-glow transition-colors duration-200 text-sm font-medium"
                >
                  <Instagram className="w-4 h-4" />
                  Falar com ele
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-16 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Cronograma da <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Imersão</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Confira a programação completa dos dias de imersão
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-card rounded-2xl overflow-hidden shadow-elegant border border-border">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-primary-glow p-6">
                <div className="grid grid-cols-2">
                  <div className="text-primary-foreground/80 font-semibold text-lg">
                    Horário
                  </div>
                  <div className="text-primary-foreground font-bold text-xl">
                    Posicionamento, Produção & Vendas
                  </div>
                </div>
              </div>

              {/* Schedule Rows */}
              <div className="divide-y divide-border">
                {/* Registros no Sistema */}
                <div className="grid grid-cols-2 hover:bg-secondary/30 transition-colors duration-200">
                  <div className="p-6 border-r border-border bg-white">
                    <div className="text-foreground font-bold text-lg">09:00 - 10:00</div>
                    <div className="text-muted-foreground text-sm">Registros</div>
                  </div>
                  <div className="p-6 text-left">
                    <div className="text-foreground font-bold text-lg">Registros no Sistema & Credenciamento</div>
                  </div>
                </div>

                {/* Ana Paula - Início */}
                <div className="grid grid-cols-2 hover:bg-secondary/30 transition-colors duration-200">
                  <div className="p-6 border-r border-border bg-white">
                    <div className="text-foreground font-bold text-lg">10:00</div>
                    <div className="text-muted-foreground text-sm">Abertura</div>
                  </div>
                  <div className="p-6 text-left">
                    <div className="flex items-center gap-4">
                      <img 
                        src="/lovable-uploads/e7c2891f-cb86-4ac8-bf0d-1dfc2771329a.png" 
                        alt="Ana Paula Perci" 
                        className="w-12 h-12 rounded-full object-cover object-top shadow-card"
                      />
                      <div>
                        <div className="text-foreground font-bold text-lg">Palestra: Ana Paula Perci</div>
                        <div className="text-muted-foreground text-sm">Abertura e Posicionamento Digital</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Camilo Coutinho */}
                <div className="grid grid-cols-2 hover:bg-secondary/30 transition-colors duration-200">
                  <div className="p-6 border-r border-border bg-white">
                    <div className="text-foreground font-bold text-lg">11:00</div>
                    <div className="text-muted-foreground text-sm">Palestra</div>
                  </div>
                  <div className="p-6 text-left">
                    <div className="flex items-center gap-4">
                      <img 
                        src="/lovable-uploads/20480f60-63bc-423c-a703-ec778a012ca4.png" 
                        alt="Camilo Coutinho" 
                        className="w-12 h-12 rounded-full object-cover shadow-card"
                      />
                      <div>
                        <div className="text-foreground font-bold text-lg">Palestra: Camilo Coutinho</div>
                        <div className="text-muted-foreground text-sm">Estrategista Digital e autoridade em video marketing e construção de marcas</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Almoço */}
                <div className="grid grid-cols-2 bg-warning-light hover:bg-warning-light/80 transition-colors duration-200">
                  <div className="p-6 border-r border-border" style={{ backgroundColor: '#E6E6E6' }}>
                    <div className="text-foreground font-bold text-lg">12:30 - 14:00</div>
                    <div className="text-muted-foreground text-sm">Intervalo</div>
                  </div>
                  <div className="p-6 text-left" style={{ backgroundColor: '#E6E6E6' }}>
                    <div className="text-foreground font-bold text-lg">Almoço & Relacionamento</div>
                  </div>
                </div>

                {/* Melina Dantas */}
                <div className="grid grid-cols-2 hover:bg-secondary/30 transition-colors duration-200">
                  <div className="p-6 border-r border-border bg-white">
                    <div className="text-foreground font-bold text-lg">14:00</div>
                    <div className="text-muted-foreground text-sm">Palestra</div>
                  </div>
                  <div className="p-6 text-left">
                    <div className="flex items-center gap-4">
                       <img 
                         src="/lovable-uploads/6811a272-1c33-4ff6-b54b-e955acc9bdc0.png" 
                         alt="Melina Dantas" 
                         className="w-12 h-12 rounded-full object-cover shadow-card"
                       />
                      <div>
                        <div className="text-foreground font-bold text-lg">Palestra: Melina Dantas</div>
                        <div className="text-muted-foreground text-sm">Especialista em criação de times de venda de alta performace</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sabrina */}
                <div className="grid grid-cols-2 hover:bg-secondary/30 transition-colors duration-200">
                  <div className="p-6 border-r border-border bg-white">
                    <div className="text-foreground font-bold text-lg">15:00</div>
                    <div className="text-muted-foreground text-sm">Palestra</div>
                  </div>
                  <div className="p-6 text-left">
                    <div className="flex items-center gap-4">
                       <img 
                         src="/lovable-uploads/e3453f5b-ac17-4f8e-a922-270689feaeed.png" 
                         alt="Sabrina Oliveira" 
                         className="w-12 h-12 rounded-full object-cover shadow-card"
                       />
                      <div>
                        <div className="text-foreground font-bold text-lg">Palestra: Sabrina Oliveira</div>
                        <div className="text-muted-foreground text-sm">Educadora, neurocientista e cuidadora do programa VemMED</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Victor */}
                <div className="grid grid-cols-2 hover:bg-secondary/30 transition-colors duration-200">
                  <div className="p-6 border-r border-border bg-white">
                    <div className="text-foreground font-bold text-lg">16:00</div>
                    <div className="text-muted-foreground text-sm">Palestra</div>
                  </div>
                  <div className="p-6 text-left">
                    <div className="flex items-center gap-4">
                       <img 
                         src="/lovable-uploads/c6993261-b266-40b5-aba1-09af95ef9cea.png" 
                         alt="Victor" 
                         className="w-12 h-12 rounded-full object-cover shadow-card"
                       />
                      <div>
                        <div className="text-foreground font-bold text-lg">Palestra: Victor</div>
                        <div className="text-muted-foreground text-sm">Eu sou estrategista de YouTube e especialista em thumbnails</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pausa Lanche */}
                <div className="grid grid-cols-2 hover:bg-secondary/30 transition-colors duration-200">
                  <div className="p-6 border-r border-border" style={{ backgroundColor: '#E6E6E6' }}>
                    <div className="text-foreground font-bold text-lg">17:00</div>
                    <div className="text-muted-foreground text-sm">Pausa</div>
                  </div>
                  <div className="p-6 text-left" style={{ backgroundColor: '#E6E6E6' }}>
                    <div className="text-foreground font-bold text-lg">Pausa para Lanche</div>
                  </div>
                </div>

                {/* Ana Paula Perci - Encerramento */}
                <div className="grid grid-cols-2 hover:bg-secondary/30 transition-colors duration-200">
                  <div className="p-6 border-r border-border bg-white">
                    <div className="text-foreground font-bold text-lg">17:30</div>
                    <div className="text-muted-foreground text-sm">Encerramento</div>
                  </div>
                  <div className="p-6 text-left">
                    <div className="flex items-center gap-4">
                      <img 
                        src="/lovable-uploads/e7c2891f-cb86-4ac8-bf0d-1dfc2771329a.png" 
                        alt="Ana Paula Perci" 
                        className="w-12 h-12 rounded-full object-cover object-top shadow-card"
                      />
                      <div>
                        <div className="text-foreground font-bold text-lg">Encerramento: Ana Paula Perci</div>
                        <div className="text-muted-foreground text-sm">Conclusões e Próximos Passos</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsor Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/10 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-card rounded-2xl shadow-elegant border border-border p-8">
            <div className="mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Patrocinador Oficial
              </h3>
              <p className="text-muted-foreground">
                Conheça a ferramenta que está revolucionando o atendimento digital
              </p>
            </div>
            
            <div className="mb-8">
              <div className="flex items-center justify-center mb-6">
                <img 
                  src="/lovable-uploads/24085614-c765-489c-8a0d-81953f526209.png" 
                  alt="Unnichat Logo" 
                  className="h-16 md:h-20 object-contain"
                />
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                A plataforma completa de atendimento que integra WhatsApp, Instagram, Facebook e muito mais em um só lugar.
              </p>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 mb-6">
              <div className="text-2xl font-bold text-primary mb-2">
                🎉 Oferta Especial para Participantes da Imersão
              </div>
              <p className="text-lg text-foreground font-semibold mb-3">
                30 dias grátis para testar
              </p>
              <p className="text-sm text-muted-foreground">
                Experimente todas as funcionalidades sem compromisso
              </p>
            </div>

            <a
              href="https://links.unnichat.com.br/30-dias-gratis-unnichat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow text-primary-foreground px-8 py-4 text-lg shadow-elegant hover:scale-105 transition-all duration-300"
              >
                Aproveitar Desconto
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>

            <p className="text-xs text-muted-foreground mt-4">
              *Oferta válida apenas para novos usuários durante o período da imersão
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;