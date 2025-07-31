import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Brain, MessageSquare, FileText, Lightbulb, Zap, Star, Send, Bot, Target, Users, TrendingUp, BookOpen } from "lucide-react";
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
      description: "Especializada em criação e análise de Ideal Customer Profile",
      icon: Target,
      color: "bg-blue-500",
      prompt: "Sou especialista em Matriz de ICP (Ideal Customer Profile). Posso te ajudar a criar e analisar perfis detalhados dos seus clientes ideais, incluindo demografia, psicografia, comportamentos e necessidades."
    },
    {
      id: "linha-editorial",
      title: "IA de Linha Editorial",
      description: "Criação de estratégias de conteúdo e calendário editorial",
      icon: FileText,
      color: "bg-green-500",
      prompt: "Sou especialista em Linha Editorial. Posso te ajudar a criar estratégias de conteúdo, desenvolver calendários editoriais, definir tom de voz e criar pilares de conteúdo alinhados com seu posicionamento."
    },
    {
      id: "posicionamento",
      title: "IA de Posicionamento",
      description: "Estratégias completas de posicionamento de marca",
      icon: TrendingUp,
      color: "bg-purple-500",
      prompt: "Sou especialista em Posicionamento de Marca. Posso te ajudar a definir sua proposta de valor única, diferenciação competitiva, messaging framework e estratégias de comunicação para se destacar no mercado."
    },
    {
      id: "estudos-imersao",
      title: "IA de Estudos da Imersão",
      description: "Revisão e aplicação dos conteúdos da imersão",
      icon: BookOpen,
      color: "bg-orange-500",
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
    <div className="p-2 sm:p-5 sm:py-0 md:pt-5 space-y-5">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-primary/10 rounded-2xl">
            <Brain className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Centro de IAs Especializadas
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Escolha sua assistente especializada para diferentes aspectos do posicionamento
        </p>
      </div>

      {!selectedAI ? (
        /* AI Selection Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {aiOptions.map((ai) => (
            <Card 
              key={ai.id} 
              className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50"
              onClick={() => handleAISelection(ai)}
            >
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className={`p-4 ${ai.color} rounded-2xl`}>
                    <ai.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-xl">{ai.title}</CardTitle>
                <CardDescription className="text-center">
                  {ai.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  Iniciar Conversa
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Chat Interface */
        <div className="max-w-4xl mx-auto">
          {/* Selected AI Header */}
          <div className="mb-6 p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 ${selectedAIData?.color} rounded-xl`}>
                  <selectedAIData.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{selectedAIData?.title}</h2>
                  <p className="text-muted-foreground">{selectedAIData?.description}</p>
                </div>
              </div>
              <Button variant="outline" onClick={resetChat}>
                Trocar IA
              </Button>
            </div>
          </div>

          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Chat Especializado</CardTitle>
                  <CardDescription>
                    Conversando com {selectedAIData?.title}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-75"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150"></div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
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
                  className="flex-1 resize-none"
                  rows={2}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !prompt.trim()}
                  className="px-4"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default IA;