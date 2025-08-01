import { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft, Star, User, Instagram, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Palestra() {
  const { id } = useParams();
  const [userRatings, setUserRatings] = useState<{[key: number]: number}>({});

  const resumos = [
    {
      id: 1,
      title: "O começo - Conheça seu publico",
      description: "Palestra de abertura da Imersão de Posicionamento com foco em diferenciação entre persona e ICP, construção de autoridade e linha editorial estratégica.",
      author: "Ana",
      category: "Fundamentos",
      image: "/lovable-uploads/17e9dc7e-85aa-43f2-bdd3-b74a55a72ce9.png",
      isNew: true,
      fullContent: `
## Informações da Palestra
**Data:** 08/01/2025  
**Horário:** 10h da manhã  
**Contexto:** Imersão de Posicionamento com uso de aplicativo próprio para anotações

## Objetivos de Aprendizagem

- Dominar a diferenciação entre persona, público-alvo e matriz ICP
- Identificar e criar elementos de autoridade específicos para cada nicho
- Construir linha editorial estratégica que eleva nível de consciência
- Implementar processo contínuo de escuta e adaptação do negócio
- Conectar profundamente conteúdo com universo emocional do cliente

## Conceitos-Chave Aprofundados

### 1. Persona vs ICP - A Diferença Crucial

**Persona:** Avatar geral com dados demográficos (onde mora, gênero, idade, filhos, CLT/empresário)

**ICP (Ideal Customer Profile):** Conjunto específico de comportamentos ideais

**Exemplo Prático - Mentoria IA:**
- **Persona:** "Toda pessoa querendo faturar 30-100k com IA"
- **ICP:** "Executora, não mimizenta, visão longo prazo, disciplinada, produz conteúdo"

### 2. Elementos da Linha Editorial

Ana enfatizou que muitos confundem os elementos:

**Autoridade ≠ Prova Social**

- **Autoridade:** "Palestrar em mastermind, fazer eventos, estudar constantemente"
- **NÃO é autoridade:** "Prints de faturamento" (isso é prova social)

**Prova Social:** Demonstração tangível de resultados
- "Se digo que você vai faturar X, olha que eu fiz"
- Cases de clientes, transformações documentadas

**Quebra de Objeção:** Atacar medos específicos
- "Se acham IA complexo, mostro fazendo em 5 minutos"
- "Se querem dieta não rigorosa, mostro minha metodologia flexível"

**Conexão Emocional:** Entrar no universo mental do cliente

### 3. Custo de Venda e Assertividade

- Custo de reunião Zoom está altíssimo
- Não pode entrar em reunião com lead de 5k querendo vender solução de 50k
- Afunilar comunicação = diminuir custo de venda

## Conteúdo Principal Expandido

### Seção 1: O Problema das Empresas Grandes

Ana revelou insights de suas consultorias:
- Empresas de 7 dígitos sem clareza de persona
- Chegam em platô e não conseguem escalar
- "Como escalo se não tenho clareza do meu funil?"
- Funil começa no entendimento profundo da matriz ICP

### Seção 2: O Exercício do Travesseiro

**Pergunta fundamental:** "Quando seu lead coloca a cabeça no travesseiro, no que pensa?"

- Se está preocupado, pensa na preocupação
- Se angustiado, pensa no problema complexo
- Esse é o momento que abre celular e vê seu anúncio
- "A pessoa que acorda com preguiça e abre Instagram"

**Para empresas B2B:**
- Processos organizados?
- Ganham quanto poderiam?
- Time está feliz?
- Gestor satisfeito?

### Seção 3: Análise Competitiva Inteligente

Ana compartilhou método não convencional:
- "O que top 3 do nicho estão fazendo?"
- "Se é top e faz algo, tem insight valioso"
- Analisar biblioteca de anúncios
- "Se investe dinheiro no Facebook, tem potencial"
- Não copiar, mas entender padrões de sucesso

### Seção 4: O Processo de Escuta Contínua

**Filosofia central:** "Negócio digital é processo de escuta"

- Escutar o que cliente diz que quer
- Identificar dificuldades relacionadas à solução
- Descobrir o que tornaria vida mais fácil
- "Nossa empresa existe para tornar vida do cliente mais fácil"

**Exemplo do time de IA:**
- Time jovem queria criar aplicativo complexo
- Ana: "Cliente prefere WhatsApp, não complique"
- "Empresa não existe para satisfazer o que EU preciso"

### Seção 5: Produção de Conteúdo Estratégico

**Problema comum:** "Produzo muito conteúdo mas não vende"

- Conteúdo fala com todo mundo = não gera conexão
- Sem elementos de autoridade para público específico
- Linha editorial fragmentada não eleva consciência

**Solução - Consistência dos Elementos:**
- Autoridade consistente
- Prova social regular
- Quebra de objeções recorrente
- Conexão emocional constante
- Elementos de atração

### Seção 6: Nível de Consciência e Volume

Ana compartilhou insight do mastermind:
- "Nível de consciência sobre IA ainda muito baixo"
- "Estamos numa bolha"
- **Solução:** Conteúdo em volume para educar mercado
- "Sem volume, não atrai gente suficiente (exceto ticket muito alto)"

## Exemplos e Casos Práticos Detalhados

### Case IA de Vendas - Processo de Inovação

**Análise:** "Já tinha bastante gente fazendo"

**Diferencial identificado:**
- Outros não olhavam funil completo
- Falta de personalização
- Soluções incompletas

**Solução Ana:** Modelar para necessidades reais  
**Melhoria contínua:** "Refazendo para otimizar baseado em feedback"

### Exemplo Nicho Financeiro

- Consultoria com empresa do setor
- "Acorda sem saber se Trump vai mexer no GPS"
- Necessidade de adaptar comunicação ao contexto
- Manter posicionamento mas considerar fatores externos

### GPT Personalizado - Limitações

- Usa tokens da OpenAI
- Limitação de uso (não indefinido)
- **Solução para escala:** API própria
- "Salvamos cliente que travou GPT para base grande"

## Insights Profundos e Filosofia

### Sobre Criação de Produtos
"Você cria produto para resolver problema do lead, não seu problema de dinheiro"
- Resolver problema = ganhar dinheiro naturalmente
- Foco no dinheiro sem resolver problema = não funciona

### Sobre Conteúdo e Consciência
"Linha editorial fragmentada não vende"
- Só autoridade = "fica estudando mas nunca mostra case"
- Só emocional = "coach de boteco"
- Só prova social = "ninguém sabe o que faz"

### Sobre Adaptação de Mercado
- Mercado muda, sociedade evolui
- Não pode fingir que mudanças não existem
- Adaptar mantendo princípios da empresa

## Dúvidas e Esclarecimentos Aprofundados

### Elementos de Autoridade por Nicho
**Pergunta crucial:** "Vocês sabem o que seria conteúdo de autoridade para seu público?"
- Varia drasticamente por persona
- Print funciona para alguns, não para outros
- Precisa mergulhar no universo específico

### Consistência vs Resultados
- "No começo é dolorido"
- "Fica confuso se é autoridade ou não"
- "Vem da consistência"
- "Depois fica automático"

## Atividades Práticas Propostas

### Exercício de Mapeamento
- Usar GPT personalizado fornecido
- Mapear matriz ICP profundamente
- Conectar com linha editorial
- Identificar elementos para cada tipo de conteúdo

### Análise de Universo
- Responder: "No que meu lead pensa ao dormir?"
- Mapear preocupações e angústias
- Entender contexto de vida
- Criar conteúdo que intercepta esses momentos

## Síntese Final Expandida

### Princípios Fundamentais
- **Clareza antes de escala:** "Sem ICP claro, empresa não passa do platô"
- **Escuta como filosofia:** "Negócio digital = processo contínuo de escuta"
- **Facilitar, não complicar:** "Se não facilita vida do cliente, ele muda de empresa"
- **Consistência editorial:** "Elementos fragmentados não elevam consciência"
- **Volume com propósito:** "Produzir muito mas com estratégia clara"

### Aplicações Imediatas
- Parar de fazer conteúdo genérico
- Mapear profundamente o momento do travesseiro
- Analisar top 3 concorrentes estrategicamente
- Criar GPT ou sistema para escalar insights
- Implementar os 4 elementos em cada peça

### Conexão com Realidade Atual
- Considerar contexto político/econômico
- Adaptar para momento de baixa consciência sobre IA
- Preparar para mudanças constantes do mercado
      `
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
      title: "Funil de Vendas",
      description: "Estratégias avançadas para construir um funil de vendas eficiente que converte prospects em clientes fiéis.",
      author: "Melina",
      category: "Vendas",
      image: "/lovable-uploads/783accb5-3ea0-482f-9285-dfdc4d9883fc.png",
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
      title: "Linha Editorial e IA",
      description: "Como criar uma linha editorial consistente utilizando inteligência artificial para otimizar seu conteúdo.",
      author: "Ana Paula Perci",
      category: "Linha Editorial",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=200&fit=crop&crop=center",
      isNew: false
    }
  ];

  const resumo = resumos.find(r => r.id === parseInt(id || ''));
  
  if (!resumo) {
    return <Navigate to="/resumos" replace />;
  }

  const handleRating = (resumoId: number, rating: number) => {
    setUserRatings(prev => ({ ...prev, [resumoId]: rating }));
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Fundamentos": "bg-primary/10 text-primary border-primary/20",
      "Estratégia": "bg-success/10 text-success border-success/20", 
      "Público": "bg-accent/10 text-accent-foreground border-accent/20",
      "Branding": "bg-orange-500/10 text-orange-600 border-orange-200",
      "Vendas": "bg-red-500/10 text-red-600 border-red-200",
      "Linha Editorial": "bg-purple-500/10 text-purple-600 border-purple-200"
    };
    return colors[category as keyof typeof colors] || "bg-muted text-muted-foreground border-muted";
  };

  const otherResumes = resumos.filter(r => r.id !== resumo.id);

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/resumos" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para Material de Estudos
          </Link>
        </div>
      </header>

      {/* Article Container */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Article Header */}
        <header className="py-12 md:py-20 border-b border-border">
          <div className="max-w-3xl mx-auto text-center">
            {/* Category Badge */}
            <div className="mb-6">
              <Badge variant="secondary" className={`${getCategoryColor(resumo.category)} text-sm font-medium`}>
                {resumo.category}
              </Badge>
              {resumo.isNew && (
                <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200 text-sm font-medium ml-2">
                  Novo
                </Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              {resumo.title}
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              {resumo.description}
            </p>
            
            {/* Author Info */}
            <div className="flex items-center justify-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">{resumo.author}</p>
                  <p className="text-xs text-muted-foreground">Instrutor</p>
                </div>
              </div>
              
              {/* Instagram Link for Camilo */}
              {resumo.author === 'Camilo Coutinho' && (
                <>
                  <span className="text-muted-foreground">·</span>
                  <a
                    href="https://www.instagram.com/camilocoutinho/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary-glow transition-colors text-sm font-medium"
                  >
                    <Instagram className="w-4 h-4" />
                    Falar com Camilo
                  </a>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="py-12">
          <div className="w-full h-64 md:h-96 lg:h-[500px] bg-muted rounded-2xl overflow-hidden shadow-lg">
            <img 
              className="w-full h-full object-cover" 
              src={resumo.image} 
              alt={resumo.title} 
            />
          </div>
        </div>

        {/* Article Content */}
        <div className="pb-20">
          <div className="max-w-3xl mx-auto">
            {resumo.id === 1 && resumo.fullContent ? (
              <div className="prose prose-lg prose-slate max-w-none">
                {resumo.fullContent.split('\n').map((line, index) => {
                  if (line.startsWith('## ')) {
                    return (
                      <h2 key={index} className="text-3xl font-bold text-foreground mt-16 mb-6 first:mt-0 pb-3 border-b border-border">
                        {line.replace('## ', '')}
                      </h2>
                    )
                  }
                  if (line.startsWith('### ')) {
                    return (
                      <h3 key={index} className="text-2xl font-semibold text-foreground mt-12 mb-4">
                        {line.replace('### ', '')}
                      </h3>
                    )
                  }
                  if (line.startsWith('**') && line.endsWith('**') && line.length > 4) {
                    return (
                      <p key={index} className="text-lg font-semibold text-foreground mt-8 mb-4 bg-muted/30 p-4 rounded-lg border-l-4 border-primary">
                        {line.replace(/\*\*/g, '')}
                      </p>
                    )
                  }
                  if (line.startsWith('- ')) {
                    return (
                      <li key={index} className="mb-3 text-muted-foreground leading-relaxed list-disc ml-6">
                        {line.replace('- ', '')}
                      </li>
                    )
                  }
                  if (line.trim() === '') {
                    return <div key={index} className="h-4" />
                  }
                  if (line.trim().length > 0) {
                    return (
                      <p key={index} className="mb-6 text-muted-foreground leading-relaxed text-lg">
                        {line}
                      </p>
                    )
                  }
                  return null
                })}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                    <BookOpen className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Conteúdo em Desenvolvimento
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Este material está sendo preparado especialmente para você. Em breve, todo o conteúdo detalhado estará disponível.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Enquanto isso, acompanhe nossos outros materiais disponíveis e fique atento às atualizações.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Article Footer */}
        <footer className="border-t border-border py-12">
          <div className="max-w-3xl mx-auto">
            {/* Rating Section */}
            <div className="text-center mb-12">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Como você avalia este conteúdo?
              </h3>
              <p className="text-muted-foreground text-sm mb-8">
                Sua avaliação nos ajuda a melhorar continuamente nossos materiais
              </p>
              
              <div className="flex items-center justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating(resumo.id, star)}
                    className="group transition-transform hover:scale-110"
                  >
                    <Star 
                      className={`w-8 h-8 transition-colors ${
                        star <= (userRatings[resumo.id] || 0)
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-muted-foreground group-hover:text-yellow-400'
                      }`}
                    />
                  </button>
                ))}
              </div>
              
              {userRatings[resumo.id] && (
                <p className="text-sm text-muted-foreground">
                  Você avaliou com {userRatings[resumo.id]} estrela{userRatings[resumo.id] !== 1 ? 's' : ''}
                </p>
              )}
            </div>

            {/* Material Info */}
            <div className="bg-muted/30 rounded-xl p-8 text-center">
              <p className="text-muted-foreground text-sm">
                <strong className="text-foreground">Material Exclusivo da Imersão Posicionamento 2024</strong><br />
                Conteúdo desenvolvido especialmente para acelerar sua jornada profissional
              </p>
            </div>
          </div>
        </footer>
      </article>

      {/* Related Content Sidebar - Fixed Position */}
      {otherResumes.length > 0 && (
        <aside className="fixed right-6 top-1/2 -translate-y-1/2 w-80 bg-card border border-border rounded-xl shadow-lg p-6 hidden xl:block">
          <h3 className="font-semibold text-foreground mb-4 text-lg">
            Mais para ler
          </h3>
          <div className="space-y-4">
            {otherResumes.slice(0, 3).map((item) => (
              <Link
                key={item.id}
                to={`/palestra/${item.id}`}
                className="block group"
              >
                <div className="flex gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.author}
                    </p>
                    <Badge variant="secondary" className={`${getCategoryColor(item.category)} text-xs mt-2`}>
                      {item.category}
                    </Badge>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      )}
    </div>
  );
}