import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Instagram } from "lucide-react";

const Home = () => {
  const speakers = [
    {
      name: "Ana Paula Perci",
      description: "Especialista em Posicionamento de Marca",
      instagram: "https://www.instagram.com/anapaulaperci/",
      image: "/lovable-uploads/c85b5bb7-f5f4-4baa-a602-61b2fad66181.png"
    },
    {
      name: "Camilo Coutinho",
      description: "Estrategista digital e autoridade em Video Marketing",
      bio: "Sou estrategista especializado em vídeo marketing e criação de conteúdo de vendas, com a missão de transformar qualquer mensagem em vídeos que realmente convertem, em qualquer plataforma. Autor do livro Vídeos que Vendem Mais (2020), ajudo empresas e criadores a dominarem o poder das suas marcas e empresas em conteúdos que impulsionam resultados.",
      instagram: "#",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
    },
    {
      name: "Melina Dantas",
      description: "Palestrante Convidada",
      instagram: "#",
      image: "/lovable-uploads/6811a272-1c33-4ff6-b54b-e955acc9bdc0.png"
    },
    {
      name: "Sabrina",
      description: "Palestrante Convidada",
      instagram: "#",
      image: "/lovable-uploads/e3453f5b-ac17-4f8e-a922-270689feaeed.png"
    },
    {
      name: "Victor",
      description: "Palestrante Convidado",
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
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with title and button */}
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Palestrantes
            </h2>
            <Button 
              variant="default"
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2 rounded-lg shadow-lg"
            >
              Ver todos os palestrantes
            </Button>
          </div>

          {/* Speakers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {speakers.map((speaker, index) => (
              <a 
                key={index}
                href={speaker.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group cursor-pointer"
              >
                <div className="bg-card rounded-2xl p-8 text-center shadow-card hover:shadow-elegant transition-all duration-300 hover:transform hover:scale-105 border border-border/50">
                  {/* Speaker Image */}
                  <div className="relative mb-6">
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden shadow-lg">
                      <img 
                        src={speaker.image}
                        alt={speaker.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  
                  {/* Speaker Info */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                      {speaker.name}
                    </h3>
                    <p className="text-muted-foreground text-sm font-medium">
                      {speaker.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
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
                  <div className="p-6 bg-accent-light border-r border-border">
                    <div className="text-foreground font-bold text-lg">09:00 - 10:00</div>
                    <div className="text-muted-foreground text-sm">Registros</div>
                  </div>
                  <div className="p-6 text-left">
                    <div className="text-foreground font-bold text-lg">Registros no Sistema & Credenciamento</div>
                  </div>
                </div>

                {/* Ana Paula - Início */}
                <div className="grid grid-cols-2 hover:bg-secondary/30 transition-colors duration-200">
                  <div className="p-6 bg-accent-light border-r border-border">
                    <div className="text-foreground font-bold text-lg">10:00</div>
                    <div className="text-muted-foreground text-sm">Abertura</div>
                  </div>
                  <div className="p-6 text-left">
                    <div className="flex items-center gap-4">
                      <img 
                        src="/lovable-uploads/c85b5bb7-f5f4-4baa-a602-61b2fad66181.png" 
                        alt="Ana Paula Perci" 
                        className="w-12 h-12 rounded-full object-cover shadow-card"
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
                  <div className="p-6 bg-accent-light border-r border-border">
                    <div className="text-foreground font-bold text-lg">11:00</div>
                    <div className="text-muted-foreground text-sm">Palestra</div>
                  </div>
                  <div className="p-6 text-left">
                    <div className="flex items-center gap-4">
                      <img 
                        src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                        alt="Camilo Coutinho" 
                        className="w-12 h-12 rounded-full object-cover shadow-card"
                      />
                      <div>
                        <div className="text-foreground font-bold text-lg">Palestra: Camilo Coutinho</div>
                        <div className="text-muted-foreground text-sm">Marketing de Vídeo e Produção de Conteúdo</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Almoço */}
                <div className="grid grid-cols-2 bg-warning-light hover:bg-warning-light/80 transition-colors duration-200">
                  <div className="p-6 border-r border-border">
                    <div className="text-foreground font-bold text-lg">12:30 - 14:00</div>
                    <div className="text-muted-foreground text-sm">Intervalo</div>
                  </div>
                  <div className="p-6 text-left">
                    <div className="text-foreground font-bold text-lg">Almoço & Relacionamento</div>
                  </div>
                </div>

                {/* Melina Dantas */}
                <div className="grid grid-cols-2 hover:bg-secondary/30 transition-colors duration-200">
                  <div className="p-6 bg-accent-light border-r border-border">
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
                        <div className="text-muted-foreground text-sm">Estratégias de Marca</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sabrina */}
                <div className="grid grid-cols-2 hover:bg-secondary/30 transition-colors duration-200">
                  <div className="p-6 bg-accent-light border-r border-border">
                    <div className="text-foreground font-bold text-lg">15:00</div>
                    <div className="text-muted-foreground text-sm">Palestra</div>
                  </div>
                  <div className="p-6 text-left">
                    <div className="flex items-center gap-4">
                       <img 
                         src="/lovable-uploads/e3453f5b-ac17-4f8e-a922-270689feaeed.png" 
                         alt="Sabrina" 
                         className="w-12 h-12 rounded-full object-cover shadow-card"
                       />
                      <div>
                        <div className="text-foreground font-bold text-lg">Palestra: Sabrina</div>
                        <div className="text-muted-foreground text-sm">Desenvolvimento de Conteúdo</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Victor */}
                <div className="grid grid-cols-2 hover:bg-secondary/30 transition-colors duration-200">
                  <div className="p-6 bg-accent-light border-r border-border">
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
                        <div className="text-muted-foreground text-sm">Estratégias Digitais</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pausa Lanche */}
                <div className="grid grid-cols-2 hover:bg-secondary/30 transition-colors duration-200">
                  <div className="p-6 bg-accent-light border-r border-border">
                    <div className="text-foreground font-bold text-lg">17:00</div>
                    <div className="text-muted-foreground text-sm">Pausa</div>
                  </div>
                  <div className="p-6 text-left">
                    <div className="text-foreground font-bold text-lg">Pausa para Lanche</div>
                  </div>
                </div>

                {/* Ana Paula Perci - Encerramento */}
                <div className="grid grid-cols-2 hover:bg-secondary/30 transition-colors duration-200">
                  <div className="p-6 bg-accent-light border-r border-border">
                    <div className="text-foreground font-bold text-lg">17:30</div>
                    <div className="text-muted-foreground text-sm">Encerramento</div>
                  </div>
                  <div className="p-6 text-left">
                    <div className="flex items-center gap-4">
                      <img 
                        src="/lovable-uploads/c85b5bb7-f5f4-4baa-a602-61b2fad66181.png" 
                        alt="Ana Paula Perci" 
                        className="w-12 h-12 rounded-full object-cover shadow-card"
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

    </div>
  );
};

export default Home;