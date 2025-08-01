import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Zap, Star, Target, FileText, BookOpen, Sparkles, Cpu, Layers } from "lucide-react";

const IA = () => {
  const aiOptions = [
    {
      id: "matriz-icp",
      title: "IA de Matriz de ICP",
      description: "Criação e análise de Ideal Customer Profile com precisão avançada",
      icon: Target,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      shadowColor: "shadow-blue-500/25",
      hoverColor: "hover:shadow-blue-500/40",
      gptLink: "https://chatgpt.com/g/g-688cb262c8d0819190f12b8a9bc1218c-matriz-de-icp"
    },
    {
      id: "linha-editorial",
      title: "IA de Linha Editorial",
      description: "Estratégias de conteúdo e calendário editorial inteligente",
      icon: FileText,
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      shadowColor: "shadow-purple-500/25",
      hoverColor: "hover:shadow-purple-500/40",
      gptLink: "https://chatgpt.com/g/g-linha-editorial" // Você precisará fornecer este link
    },
    {
      id: "estudos-imersao",
      title: "IA de Estudos",
      description: "Revisão e aplicação prática dos conteúdos da imersão",
      icon: BookOpen,
      color: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      shadowColor: "shadow-emerald-500/25",
      hoverColor: "hover:shadow-emerald-500/40",
      gptLink: "https://chatgpt.com/g/g-estudos-imersao" // Você precisará fornecer este link
    }
  ];

  const handleAIActivation = (ai: any) => {
    if (ai.id === 'matriz-icp') {
      // Abrir o link do GPT personalizado em uma nova janela
      window.open(ai.gptLink, '_blank', 'noopener,noreferrer');
    } else {
      // Para Linha Editorial e Estudos, mostrar mensagem
      alert('Faremos a IA juntos ao final do dia.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="p-2 sm:p-5 sm:py-0 md:pt-5 space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-20 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl shadow-xl border border-white/20 overflow-hidden">
                <img 
                  src="/lovable-uploads/da4a1b4f-7426-4531-bd3a-a48207005dd7.png" 
                  alt="Ana Paula Perci" 
                  className="w-28 h-28 object-cover"
                />
                <Sparkles className="h-6 w-6 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Centro de IAs
            </span>
            <br />
            <span className="text-foreground">Especializadas</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Potencialize seus resultados com assistentes inteligentes especializadas em diferentes aspectos do posicionamento estratégico
          </p>
        </div>

        {/* AI Selection Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aiOptions.map((ai, index) => (
              <Card 
                key={ai.id} 
                className={`group cursor-pointer transition-all duration-500 hover:scale-105 border-0 ${ai.shadowColor} shadow-xl ${ai.hoverColor} hover:shadow-2xl overflow-hidden`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 pointer-events-none"></div>
                <CardHeader className="text-center relative z-10 pb-4">
                  <div className="flex justify-center mb-6">
                    <div className={`relative p-6 ${ai.color} rounded-2xl shadow-lg transform transition-transform group-hover:rotate-3`}>
                      <ai.icon className="h-10 w-10 text-white" />
                      <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {ai.title}
                  </CardTitle>
                  <CardDescription className="text-center text-sm leading-relaxed">
                    {ai.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <Button 
                    onClick={() => handleAIActivation(ai)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg group-hover:shadow-xl transition-all" 
                    size="lg"
                  >
                    <Cpu className="h-4 w-4 mr-2" />
                    Ativar IA
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Features Section */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-8 text-foreground">Recursos Avançados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex flex-col items-center p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl backdrop-blur">
                <Layers className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="font-semibold mb-2">Análise Profunda</h3>
                <p className="text-sm text-muted-foreground text-center">Insights detalhados baseados em dados e tendências do mercado</p>
              </div>
              <div className="flex flex-col items-center p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl backdrop-blur">
                <Zap className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="font-semibold mb-2">Respostas Instantâneas</h3>
                <p className="text-sm text-muted-foreground text-center">Soluções rápidas e precisas para seus desafios estratégicos</p>
              </div>
              <div className="flex flex-col items-center p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl backdrop-blur">
                <Star className="h-8 w-8 text-yellow-600 mb-3" />
                <h3 className="font-semibold mb-2">Personalização Total</h3>
                <p className="text-sm text-muted-foreground text-center">Adaptadas ao seu nicho e objetivos específicos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IA;