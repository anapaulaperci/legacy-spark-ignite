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
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
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
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
    },
    {
      name: "Sabrina",
      description: "Palestrante Convidada",
      instagram: "#",
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe18b8"
    },
    {
      name: "Victor",
      description: "Palestrante Convidado",
      instagram: "#",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-40">
          <div className="text-center">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 text-sm rounded-full px-4 py-2 shadow-sm">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                <img 
                  src="/lovable-uploads/7433a794-51a8-45eb-81be-aeaccb87a06f.png" 
                  alt="Logo" 
                  className="w-4 h-4 object-contain"
                />
              </div>
              Sem pressa e sem pausa
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Imersão de Posicionamento,
              </span>
              <br />
              <span className="text-gray-800">
                produção de conteúdo e vendas.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 mb-16 font-medium mt-8">
              Por: Ana Paula Perci e Convidados.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/resumos">
                <Button
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Começar Jornada
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link to="/auth">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-4 text-lg transition-all duration-300"
                >
                  Fazer Login
                </Button>
              </Link>
            </div>

            {/* Hero Image */}
            <div className="mt-20 relative">
              <div className="relative max-w-4xl mx-auto">
                <div className="aspect-video bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                  <div 
                    className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 bg-cover bg-center relative"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1743360543515-d3b506e6d3c2?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
                    }}
                  >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/20" />
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button 
                        type="button" 
                        className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                      >
                        <svg className="w-8 h-8 text-purple-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-purple-300 to-purple-500 rounded-full opacity-15 animate-pulse delay-1000"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Speakers
            </h2>
            <Button 
              variant="outline" 
              className="bg-red-500 hover:bg-red-600 text-white border-red-500 hover:border-red-600 px-6 py-2"
            >
              speakers
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-12">
            {speakers.map((speaker, index) => (
              <a 
                key={index}
                href={speaker.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group cursor-pointer text-center"
              >
                <div className="transition-all duration-300">
                  <div className="relative mb-8">
                    <div className="w-48 h-48 mx-auto rounded-full overflow-hidden">
                      <img 
                        src={speaker.image}
                        alt={speaker.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-bold text-2xl text-gray-900">
                      {speaker.name}
                    </h3>
                    <p className="text-gray-600 text-lg">
                      {speaker.description}
                    </p>
                    {speaker.bio && (
                      <p className="text-xs text-gray-500 line-clamp-3 max-w-xs mx-auto leading-relaxed mt-2">
                        {speaker.bio}
                      </p>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Cronograma da <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">Imersão</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Confira a programação completa dos dias de imersão
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ backgroundColor: '#3B0765' }}>
              {/* Header */}
              <div className="grid grid-cols-2 border-b border-purple-500/30">
                <div className="p-4 text-center text-white/70 font-medium border-r border-purple-500/30">
                  Horário
                </div>
                <div className="p-4 text-center text-orange-400 font-bold text-lg">
                  Posicionamento, Produção & Vendas
                </div>
              </div>

              {/* Schedule Rows */}
              <div className="divide-y divide-purple-500/30">
                {/* Registros no Sistema */}
                <div className="grid grid-cols-2">
                  <div className="p-4 bg-purple-400/20 border-r border-purple-500/30">
                    <div className="text-white font-bold">09:00 - 10:00</div>
                    <div className="text-white/70 text-sm">Registros</div>
                  </div>
                  <div className="p-6 text-center">
                    <div className="text-white font-bold text-lg">Registros no Sistema & Credenciamento</div>
                  </div>
                </div>

                {/* Início */}
                <div className="grid grid-cols-2">
                  <div className="p-4 bg-purple-400/20 border-r border-purple-500/30">
                    <div className="text-white font-bold">10:00</div>
                    <div className="text-white/70 text-sm">Abertura</div>
                  </div>
                  <div className="p-6 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <img 
                        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                        alt="Ana Paula Perci" 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-white font-bold text-lg">Palestra: Ana Paula Perci</div>
                        <div className="text-white/70 text-sm">Abertura e Posicionamento Digital</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Camilo Coutinho */}
                <div className="grid grid-cols-2">
                  <div className="p-4 bg-purple-400/20 border-r border-purple-500/30">
                    <div className="text-white font-bold">11:00</div>
                    <div className="text-white/70 text-sm">Palestra</div>
                  </div>
                  <div className="p-6 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <img 
                        src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                        alt="Camilo Coutinho" 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-white font-bold text-lg">Palestra: Camilo Coutinho</div>
                        <div className="text-white/70 text-sm">Marketing de Vídeo e Produção de Conteúdo</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Almoço */}
                <div className="grid grid-cols-2" style={{ backgroundColor: '#6F9AF7' }}>
                  <div className="p-4 border-r border-blue-300/30">
                    <div className="text-white font-bold">12:30 - 14:00</div>
                    <div className="text-white/70 text-sm">Intervalo</div>
                  </div>
                  <div className="p-6 text-center">
                    <div className="text-white font-bold text-lg">Almoço & Relacionamento</div>
                  </div>
                </div>

                {/* Melina Dantas */}
                <div className="grid grid-cols-2">
                  <div className="p-4 bg-purple-400/20 border-r border-purple-500/30">
                    <div className="text-white font-bold">14:00</div>
                    <div className="text-white/70 text-sm">Palestra</div>
                  </div>
                  <div className="p-6 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <img 
                        src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" 
                        alt="Melina Dantas" 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-white font-bold text-lg">Palestra: Melina Dantas</div>
                        <div className="text-white/70 text-sm">Estratégias de Marca</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sabrina */}
                <div className="grid grid-cols-2">
                  <div className="p-4 bg-purple-400/20 border-r border-purple-500/30">
                    <div className="text-white font-bold">15:00</div>
                    <div className="text-white/70 text-sm">Palestra</div>
                  </div>
                  <div className="p-6 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <img 
                        src="https://images.unsplash.com/photo-1581090464777-f3220bbe18b8" 
                        alt="Sabrina" 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-white font-bold text-lg">Palestra: Sabrina</div>
                        <div className="text-white/70 text-sm">Desenvolvimento de Conteúdo</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Victor */}
                <div className="grid grid-cols-2">
                  <div className="p-4 bg-purple-400/20 border-r border-purple-500/30">
                    <div className="text-white font-bold">16:00</div>
                    <div className="text-white/70 text-sm">Palestra</div>
                  </div>
                  <div className="p-6 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <img 
                        src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                        alt="Victor" 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-white font-bold text-lg">Palestra: Victor</div>
                        <div className="text-white/70 text-sm">Estratégias Digitais</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pausa Lanche */}
                <div className="grid grid-cols-2">
                  <div className="p-4 bg-purple-400/20 border-r border-purple-500/30">
                    <div className="text-white font-bold">17:00</div>
                    <div className="text-white/70 text-sm">Pausa</div>
                  </div>
                  <div className="p-6 text-center">
                    <div className="text-white font-bold text-lg">Pausa para Lanche</div>
                  </div>
                </div>

                {/* Ana Paula Perci - Encerramento */}
                <div className="grid grid-cols-2">
                  <div className="p-4 bg-purple-400/20 border-r border-purple-500/30">
                    <div className="text-white font-bold">17:30</div>
                    <div className="text-white/70 text-sm">Encerramento</div>
                  </div>
                  <div className="p-6 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <img 
                        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                        alt="Ana Paula Perci" 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-white font-bold text-lg">Encerramento: Ana Paula Perci</div>
                        <div className="text-white/70 text-sm">Conclusões e Próximos Passos</div>
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