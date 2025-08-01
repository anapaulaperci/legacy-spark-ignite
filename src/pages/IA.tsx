import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Brain, MessageSquare, FileText, Lightbulb, Zap, Star, Send, Bot, Target, Users, TrendingUp, BookOpen, Sparkles, Cpu, Layers } from "lucide-react";
import { useState } from "react";

const IA = () => {
  const [selectedAI, setSelectedAI] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "assistant",
      content: "Olá! Selecione uma das IAs especializadas para começar nossa conversa.",
      timestamp: new Date()
    }
  ]);

  const aiOptions = [
    {
      id: "matriz-icp",
      title: "IA de Matriz de ICP",
      description: "Criação e análise de Ideal Customer Profile com precisão avançada",
      icon: Target,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      shadowColor: "shadow-blue-500/25",
      hoverColor: "hover:shadow-blue-500/40",
      prompt: "Sou especialista em Matriz de ICP (Ideal Customer Profile). Posso te ajudar a criar e analisar perfis detalhados dos seus clientes ideais, incluindo demografia, psicografia, comportamentos e necessidades."
    },
    {
      id: "linha-editorial",
      title: "IA de Linha Editorial",
      description: "Estratégias de conteúdo e calendário editorial inteligente",
      icon: FileText,
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      shadowColor: "shadow-purple-500/25",
      hoverColor: "hover:shadow-purple-500/40",
      prompt: "Sou especialista em Linha Editorial. Posso te ajudar a criar estratégias de conteúdo, desenvolver calendários editoriais, definir tom de voz e criar pilares de conteúdo alinhados com seu posicionamento."
    },
    {
      id: "estudos-imersao",
      title: "IA de Estudos",
      description: "Revisão e aplicação prática dos conteúdos da imersão",
      icon: BookOpen,
      color: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      shadowColor: "shadow-emerald-500/25",
      hoverColor: "hover:shadow-emerald-500/40",
      prompt: "Sou especialista nos Estudos da Imersão Posicionamento. Posso te ajudar a revisar os conteúdos, esclarecer dúvidas, aplicar os aprendizados ao seu negócio e criar planos de implementação práticos."
    }
  ];

  const handleAISelection = (ai: any) => {
    setSelectedAI(ai.id);
    const aiMessage = {
      id: messages.length + 1,
      type: "assistant",
      content: ai.prompt,
      timestamp: new Date()
    };
    setMessages([aiMessage]);
  };

  const handleSendMessage = async () => {
    if (!prompt.trim() || !selectedAI) return;

    setIsLoading(true);
    const userMessage = {
      id: messages.length + 1,
      type: "user",
      content: prompt,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setPrompt("");

    // Simular resposta da IA (aqui você integraria com uma API real)
    setTimeout(() => {
      const selectedAIData = aiOptions.find(ai => ai.id === selectedAI);
      const aiResponse = {
        id: messages.length + 2,
        type: "assistant",
        content: `Como ${selectedAIData?.title}, vou te ajudar com essa questão. Com base na minha especialização, aqui estão minhas recomendações...`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const resetChat = () => {
    setSelectedAI(null);
    setMessages([
      {
        id: 1,
        type: "assistant",
        content: "Olá! Selecione uma das IAs especializadas para começar nossa conversa.",
        timestamp: new Date()
      }
    ]);
  };

  const selectedAIData = aiOptions.find(ai => ai.id === selectedAI);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="p-2 sm:p-5 sm:py-0 md:pt-5 space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-20 animate-pulse"></div>
              <div className="relative p-6 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl shadow-xl border border-white/20">
                <Brain className="h-16 w-16 text-transparent bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text" />
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

        {!selectedAI ? (
          /* AI Selection Grid */
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {aiOptions.map((ai, index) => (
                <Card 
                  key={ai.id} 
                  className={`group cursor-pointer transition-all duration-500 hover:scale-105 border-0 ${ai.shadowColor} shadow-xl ${ai.hoverColor} hover:shadow-2xl overflow-hidden`}
                  onClick={() => handleAISelection(ai)}
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
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg group-hover:shadow-xl transition-all" size="lg">
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
        ) : (
          /* Chat Interface */
          <div className="max-w-5xl mx-auto">
            {/* Selected AI Header */}
            <div className="mb-8 p-6 bg-gradient-to-r from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className={`relative p-4 ${selectedAIData?.color} rounded-2xl shadow-lg`}>
                    <selectedAIData.icon className="h-8 w-8 text-white" />
                    <div className="absolute inset-0 bg-white/20 rounded-2xl"></div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{selectedAIData?.title}</h2>
                    <p className="text-muted-foreground text-lg">{selectedAIData?.description}</p>
                  </div>
                </div>
                <Button variant="outline" onClick={resetChat} className="hover:bg-destructive hover:text-destructive-foreground">
                  Trocar IA
                </Button>
              </div>
            </div>

            <Card className="h-[700px] flex flex-col shadow-2xl border-0 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
              <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-t-lg">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Chat Especializado</CardTitle>
                    <CardDescription className="text-base">
                      Conversando com {selectedAIData?.title}
                    </CardDescription>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-600 font-medium">Online</span>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-900/50 dark:to-slate-800">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-4 shadow-lg ${
                        message.type === 'user'
                          ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                          : 'bg-white dark:bg-slate-800 text-foreground border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <span className="text-xs opacity-70 mt-2 block">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-lg border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                        <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-75"></div>
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-150"></div>
                        <span className="ml-2 text-sm text-muted-foreground">Pensando...</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>

              {/* Input */}
              <div className="border-t bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 p-6 rounded-b-lg">
                <div className="flex gap-4">
                  <Textarea
                    placeholder={`Digite sua pergunta para ${selectedAIData?.title}...`}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="flex-1 resize-none border-2 focus:border-blue-500 dark:focus:border-purple-500 rounded-xl"
                    rows={3}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isLoading || !prompt.trim()}
                    className="px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all"
                    size="lg"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default IA;