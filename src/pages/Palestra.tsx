import { useParams, Navigate, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { User, ArrowLeft, ChevronRight, Instagram } from "lucide-react";

const Palestra = () => {
  const { id } = useParams();
  
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
                {resumo.id === 1 && resumo.fullContent ? (
                  <div className="prose prose-lg max-w-none text-muted-foreground">
                    {resumo.fullContent.split('\n').map((line, index) => {
                      if (line.startsWith('## ')) {
                        return <h2 key={index} className="text-2xl font-bold text-foreground mt-8 mb-4">{line.replace('## ', '')}</h2>
                      }
                      if (line.startsWith('### ')) {
                        return <h3 key={index} className="text-xl font-semibold text-foreground mt-6 mb-3">{line.replace('### ', '')}</h3>
                      }
                      if (line.startsWith('**') && line.endsWith('**')) {
                        return <p key={index} className="font-semibold text-foreground mt-4 mb-2">{line.replace(/\*\*/g, '')}</p>
                      }
                      if (line.startsWith('- ')) {
                        return <li key={index} className="ml-4 mb-2">{line.replace('- ', '')}</li>
                      }
                      if (line.trim() === '') {
                        return <br key={index} />
                      }
                      return <p key={index} className="mb-3 leading-relaxed">{line}</p>
                    })}
                  </div>
                ) : (
                  <>
                    <p className="text-muted-foreground">
                      Este material está sendo preparado especialmente para você. Em breve, todo o conteúdo detalhado estará disponível.
                    </p>
                    <p className="text-muted-foreground">
                      Enquanto isso, acompanhe nossos outros materiais disponíveis e fique atento às atualizações.
                    </p>
                  </>
                )}
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