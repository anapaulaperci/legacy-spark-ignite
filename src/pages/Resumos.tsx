import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, User, Play, Star, ArrowRight, Download, MessageCircle } from "lucide-react";
import jsPDF from 'jspdf';

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

  const handlePdfDownload = (resumoId?: number) => {
    // Se um ID específico for passado, gerar PDF para esse resumo
    if (resumoId) {
      const resumo = resumos.find(r => r.id === resumoId);
      if (resumo && (resumo.id === 1 || resumo.id === 2) && resumo.fullContent) {
        generatePDF(resumo);
        return;
      }
    }
    
    // Comportamento padrão para outros casos
    toast({
      title: "PDF em Desenvolvimento",
      description: "A funcionalidade de download de PDF ficará pronta em breve. Aguarde!",
      duration: 3000,
    });
  };

  const generatePDF = (resumo: typeof resumos[0]) => {
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      let yPosition = margin;

      // Helper function to remove emojis
      const removeEmojis = (text: string) => {
        return text.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim();
      };

      // Helper function to add text with word wrap
      const addText = (text: string, fontSize: number, isBold = false, isCenter = false) => {
        const cleanText = removeEmojis(text);
        pdf.setFontSize(fontSize);
        pdf.setFont("helvetica", isBold ? "bold" : "normal");
        
        if (isCenter) {
          const textWidth = pdf.getStringUnitWidth(cleanText) * fontSize / pdf.internal.scaleFactor;
          const textOffset = (pageWidth - textWidth) / 2;
          pdf.text(cleanText, textOffset, yPosition);
        } else {
          const lines = pdf.splitTextToSize(cleanText, pageWidth - 2 * margin);
          pdf.text(lines, margin, yPosition);
          yPosition += (lines.length - 1) * fontSize * 0.35;
        }
        yPosition += fontSize * 0.5;
      };

      const checkPageBreak = (neededSpace: number) => {
        if (yPosition + neededSpace > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        }
      };

      // Header - usando a cor principal do sistema (--primary: 270 100% 30%)
      pdf.setFillColor(153, 0, 153); // Cor primária do sistema
      pdf.rect(0, 0, pageWidth, 40, 'F');
      
      pdf.setTextColor(255, 255, 255);
      yPosition = 25;
      addText("Imersão de Posicionamento 2024", 18, true, true);
      
      pdf.setTextColor(0, 0, 0);
      yPosition = 60;
      
      // Title
      addText(resumo.title, 22, true, true);
      yPosition += 10;
      
      // Author and category
      addText(`Por: ${resumo.author} | Categoria: ${resumo.category}`, 12, false, true);
      yPosition += 15;
      
      // Description
      addText(resumo.description, 11);
      yPosition += 10;

      // Content processing
      if (resumo.fullContent) {
        const lines = resumo.fullContent.split('\n');
        
        lines.forEach((line) => {
          const trimmedLine = line.trim();
          
          if (trimmedLine === '' || trimmedLine === '---') {
            yPosition += 5;
            return;
          }

          checkPageBreak(20);

          // Headers
          if (trimmedLine.startsWith('## ')) {
            yPosition += 5;
            const title = removeEmojis(trimmedLine.replace('## ', '').replace(/\*\*/g, ''));
            addText(title, 16, true);
            yPosition += 5;
          }
          // Subheaders
          else if (trimmedLine.startsWith('### ')) {
            yPosition += 3;
            const title = removeEmojis(trimmedLine.replace('### ', '').replace(/\*\*/g, ''));
            addText('• ' + title, 14, true);
            yPosition += 3;
          }
          // Lists
          else if (trimmedLine.startsWith('* ')) {
            const item = removeEmojis(trimmedLine.replace('* ', '').replace(/\*\*/g, '').replace(/\*/g, ''));
            addText('  • ' + item, 10);
          }
          // Questions and answers
          else if (trimmedLine.startsWith('**Pergunta:**') || trimmedLine.startsWith('**Resposta:**')) {
            yPosition += 3;
            const text = removeEmojis(trimmedLine.replace(/\*\*/g, ''));
            addText(text, 11, true);
          }
          // Numbered lists
          else if (/^\d+\./.test(trimmedLine)) {
            const text = removeEmojis(trimmedLine.replace(/\*\*/g, '').replace(/\*/g, ''));
            addText(text, 10);
          }
          // Regular paragraphs
          else if (trimmedLine.length > 0) {
            const text = removeEmojis(trimmedLine.replace(/\*\*/g, '').replace(/\*/g, ''));
            addText(text, 10);
            yPosition += 2;
          }
        });
      }

      // Footer
      pdf.setFontSize(8);
      pdf.setTextColor(128, 128, 128);
      pdf.text("Gerado em " + new Date().toLocaleDateString('pt-BR'), margin, pageHeight - 10);
      pdf.text("© 2024 Imersão de Posicionamento - Material Exclusivo", pageWidth - margin - 100, pageHeight - 10);

      // Save the PDF
      pdf.save(`${resumo.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
      
      toast({
        title: "PDF Gerado com Sucesso!",
        description: `O material "${resumo.title}" foi baixado para seu dispositivo.`,
      });
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      toast({
        title: "Erro ao Gerar PDF",
        description: "Ocorreu um erro ao gerar o PDF. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const resumos = [
    {
      id: 1,
      title: "O começo - Conheça seu publico",
      description: "Palestra de abertura da Imersão de Posicionamento com foco em diferenciação entre persona e ICP, construção de autoridade e linha editorial estratégica.",
      author: "Ana",
      category: "Fundamentos",
      image: "/lovable-uploads/17e9dc7e-85aa-43f2-bdd3-b74a55a72ce9.png",
      rating: 4.9,
      isNew: true,
      fullContent: `
## Objetivos de Aprendizagem
* Compreender a diferença entre persona e ICP (Ideal Customer Profile)
* Analisar como a clareza de persona impacta todo o funil de marketing e vendas
* Aplicar o conhecimento de ICP para desenvolver linha editorial estratégica
* Identificar elementos de autoridade, prova social e conexão emocional em conteúdos
* Explorar como adaptar soluções às dores e desejos reais da audiência
---
## Conceitos-Chave
* Persona: Representação do público-alvo de forma ampla (ex: mulheres que querem emagrecer).
* ICP (Ideal Customer Profile): Subgrupo dentro da persona que representa o cliente ideal — quem executa, aplica e valoriza a solução.
* Linha editorial estratégica: Planejamento de conteúdo que inclui autoridade, prova social, conexão emocional, atração e quebra de objeções.
* Prova social: Demonstração de resultados reais (ex: faturamento, depoimentos).
* Autoridade: Reconhecimento de mercado (ex: palestrar, estar em masterminds).
* Nível de consciência: Grau de entendimento que o cliente tem sobre seus problemas e possíveis soluções.
* Custo de aquisição: Tempo ou dinheiro investido para trazer um lead qualificado até a venda.
* Funil de vendas: Jornada completa desde o primeiro contato com a marca até a conversão.
* Conteúdo estratégico: Produções que educam, conectam e conduzem o lead na jornada de compra.
* Objeções: Barreiras mentais do lead que impedem a compra.
---
## Conteúdo Principal
### 1. O passo zero de qualquer negócio
* Todo negócio nasce para resolver a dor de alguém — não apenas gerar dinheiro.
* Sem entender quem é essa pessoa, não se constrói um funil escalável.
* Mesmo empresas de 7 dígitos não têm clareza sobre sua persona/ICP.
### 2. Persona vs. ICP
* Persona: visão ampla e demográfica.
* ICP: cliente ideal com comportamentos e características específicas.
* Estratégia: comece pela persona, mas afunile para o ICP na hora da venda.
### 3. Funil, Zoom e custo de reunião
* Fazer reuniões com leads desalinhados gera custo alto e desperdício de tempo.
* Exemplo: entrar no Zoom para vender algo de R$ 50 mil para quem só pode pagar R$ 5 mil.
* Solução: segmentar bem antes de chamar para a reunião.
### 4. Linha editorial que vende
* Precisa conter:
  * Autoridade
  * Prova social
  * Conexão emocional
  * Quebra de objeção
  * Atração
* Exemplo: print de vendas = prova social, não autoridade.
* Autoridade = palestra, evento, mentoria, estar entre os grandes nomes do nicho.
### 5. Produção de conteúdo como parte da estratégia
* Produção de conteúdo não é um extra – é o coração da atração e do crescimento.
* Volume e consistência constroem autoridade e presença.
* "Meu trabalho envolve criar conteúdo" — visão de mentalidade profissional.
### 6. Ferramentas de IA e GPT personalizado
* GPTs personalizados têm limite de uso via OpenAI.
Para escala, usar API da OpenAI com controle de tokens.
* Exemplo de uso: GPT criado para mapear matriz de ICP com profundidade comportamental.
### 7. Universo do cliente e escuta ativa
* Pergunta central: "No que meu cliente pensa ao deitar a cabeça no travesseiro?"
* Mapear as dores, desejos, desafios emocionais e cotidianos do lead.
* Escuta ativa do cliente = base da criação de produtos e otimização da entrega.
### 8. Olhar para a concorrência
* Benchmark dos 3 principais players do nicho.
* Biblioteca de anúncios, tipo de produtos, abordagem de funil.
* Não para copiar, mas para entender o que já funciona no mercado.
---
## Exemplos e Casos Práticos
* Mentoria de IA:
  * Persona ampla: pessoas que querem lucrar com IA
  * ICP: executores, disciplinados, que sabem produzir conteúdo próprio
* IA de Vendas:
  * Concorrentes já existiam, mas entregavam de forma genérica
  * Solução criada com foco em personalização e funil completo
* Segmentação de emagrecimento:
  * Persona: mulheres que querem emagrecer
  * ICP: mulheres de 20 a 40 anos que rejeitam dietas restritivas
---
## Dúvidas e Esclarecimentos
**Pergunta:** Como saber se um conteúdo gera autoridade ou não?
**Resposta:** Depende da percepção da sua ICP. Print pode funcionar para alguns, palestras para outros.
**Pergunta:** O que é autoridade para meu público?
**Resposta:** Depende do nicho. Precisa ser validado com base no comportamento do ICP, não por intuição.
---
## Recursos Complementares
* GPT personalizado da Ana Paula para mapeamento de ICP (baseado na metodologia da empresa)
* Recomendação: acessar biblioteca de anúncios do Meta Ads dos concorrentes
* Leitura sugerida (implícita): Building a StoryBrand, Invisible Selling Machine, Customer Avatar Worksheet
---
## Atividades e Avaliações
* Exercício sugerido:
  1. Esboçar persona atual
  2. Identificar ICP
  3. Mapear elementos de linha editorial atual
  4. Criar pelo menos um conteúdo para cada tipo (autoridade, prova, emocional, objeção)
* Projeto longo: Criar planejamento editorial mensal baseado na matriz de ICP
---
## Síntese Final
* O negócio começa com clareza de persona e ICP — sem isso, não escala.
* Produzir conteúdo é estratégia central, não secundária.
* Linha editorial deve ser direcionada e balanceada entre autoridade, prova, emoção e objeções.
* O cliente ideal precisa ser ouvido constantemente, e os produtos devem nascer dessa escuta.
* Ferramentas de IA são úteis, mas exigem entendimento técnico para escalar.
      `
    },
    {
      id: 2,
      title: "Criação de Marca",
      description: "Estratégias avançadas de vídeo marketing e construção de marcas que realmente conectam com o público.",
      author: "Camilo Coutinho",
      category: "Branding",
      image: "/lovable-uploads/cd1ea6f5-17be-4606-b2f6-86441fa7e6e7.png",
      rating: 4.9,
      isNew: true,
      fullContent: `
## Objetivos de Aprendizagem

* Compreender a importância estratégica da marca pessoal para profissionais e empresas
* Identificar os pilares essenciais para construir uma marca forte e autêntica
* Aplicar o conceito de arquétipos junguianos para diferenciar marcas no mercado
* Analisar a percepção externa da marca pessoal e promover alinhamento com sua essência
* Criar um mapa de marca funcional para guiar design, conteúdo e posicionamento

---

## Conceitos-Chave

1. Marca pessoal: Não é apenas o logotipo, mas a percepção emocional, estratégica e simbólica que o mercado tem de você.
2. Percepção de valor: Como as pessoas julgam sua competência e autoridade com base em sinais visuais, narrativos e comportamentais.
3. Arquétipos de marca: Modelos universais de personalidade que moldam a comunicação da marca (ex: herói, cuidador, rebelde).
4. Consistência de marca: Alinhamento entre imagem, narrativa e presença digital. Gera confiança.
5. Mapa da marca: Framework visual que conecta estratégia, identidade e execução da comunicação.
6. Presença estratégica: Estar onde o seu público está e manter relevância com constância.
7. Design com propósito: O visual deve traduzir a personalidade e intenção da marca, não apenas seguir estéticas genéricas.
8. Autoconhecimento: Primeiro passo para uma marca autêntica é entender sua essência, forças, valores e estilo.
9. Tom de voz: Como a marca se comunica verbalmente — tom, ritmo e escolha de palavras.

---

## Conteúdo Principal

### 1. O que é Marca Pessoal e Por que Importa?

* Marca pessoal é como você é lembrado quando não está presente.
* Vai além de visual: é sobre identidade, posicionamento, energia e impacto.
* 70% das pessoas pesquisam online antes de contratar um profissional.
* Profissionais com marca pessoal forte cobram mais, são mais lembrados e têm mais oportunidades.

### 2. Pilares de uma Marca Forte

* Posicionamento: Como você quer ser lembrado? Por quais habilidades e diferenciais?
* Propósito: Qual a causa maior que motiva seu trabalho? Por que você faz o que faz?
* Presença: Onde você aparece e se comunica? Você está onde seu público está?
* Público: Quem você quer atrair? Qual o problema que resolve para esse público?

Esses pilares devem estar alinhados para gerar consistência.

### 3. O Poder do Autoconhecimento na Marca

Sem autoconhecimento, cria-se uma marca artificial, insustentável a longo prazo.

É preciso entender:
* Quem você é (valores, personalidade, singularidades)
* O que você faz (competências, história, diferenciais)  
* Para quem você serve (segmento, perfil ideal, dores que resolve)

### 4. O Exercício das 5 Perguntas

Enviar a 10 pessoas (5 do pessoal, 5 do profissional):

1. O que eu faço bem e não percebo?
2. Qual foi sua primeira impressão de mim e ela mudou?
3. O que posso melhorar na minha comunicação?
4. Algo que sempre quis saber de mim?
5. Uma história que te marcou comigo?

Esse exercício revela percepções ocultas que impactam diretamente sua imagem.

### 5. Introdução aos Arquétipos de Marca

Divididos em 4 grandes funções:

* Guiar (Governante, Sábio, Inocente)
* Inspirar (Herói, Criador, Amante)
* Conectar (Cuidador, Cara Comum, Bobo da Corte)
* Animar (Explorador, Mágico, Fora da Lei)

Cada um tem luz e sombra. Ex: Herói é um resolvedor de problemas, mas pode ser arrogante.

### 6. Exemplo de Análise Visual (Caso Ana)

* Três fotos foram avaliadas com base na essência percebida x identidade real
* A imagem que melhor expressa a Ana (Geek-Herói) não era a mais "sofisticada", mas a mais autêntica
* Fotos, expressões, roupas, cores e objetos comunicam sua marca, mesmo sem você dizer uma palavra

### 7. Aplicando o Mapa da Marca

O framework completo possui 3 camadas:

1. Estratégia (quem sou, como sou percebido, para onde vou)
2. Identidade (visual, verbal, narrativa, simbólica)
3. Marketing (produtos, conteúdo, canais, campanhas, escuta social)

Evita confusão sobre o que postar, como se vestir, como se comunicar.
Traz clareza para designer, social media, vídeos, pitch de vendas e muito mais.

---

## Exemplos e Casos Práticos

* Bake Love: marca criada do zero, com nome, ícone e visual baseados em sensações ("amor + sabor").
* Vista o Extraordinário: marca de camisetas com arquétipo de Bobo da Corte, visual inspirado no produto (camiseta com pesponto).
* Cliente enfermeira em Portugal: branding autêntico com aumento de 40 mil euros em 3 meses, sem mudar sua essência calma.

---

## Dúvidas e Esclarecimentos

**Pergunta:** Devo adaptar meu arquétipo ao público?
**Resposta:** Não. Adapte a linguagem, nunca a sua essência.

**Pergunta:** Cuidador vende menos?
**Resposta:** Não. Se comunicar corretamente, o cuidador gera percepção de valor emocional, que justifica preço.

**Pergunta:** Sou visto como arrogante. E agora?
**Resposta:** Às vezes é apenas um ruído de comunicação. A essência precisa ser realinhada com a expressão externa.

---

## Recursos Complementares

* Livro: O Herói e o Fora da Lei (Mark & Pearson)
* Ferramenta: Mapa de Empatia (para alinhar imagem vs. percepção)
* Outros: Artigos da Exame e Estadão sobre influenciadores-fundadores

---

## Atividades e Avaliações

* Exercício sugerido:
  1. Aplicar o exercício das 5 perguntas de percepção externa
  2. Preencher os 4 pilares da marca pessoal
  3. Identificar o arquétipo predominante
  4. Fazer mapa da marca (base para designer e social media)

---

## Síntese Final

1. Marca pessoal é um sistema: começa na essência e se manifesta em cada ponto de contato
2. Arquétipos oferecem direcionamento para a identidade e o conteúdo
3. O design é a expressão final de uma estratégia de marca bem definida
4. Presença sem consistência é ruído. Consistência com autenticidade gera valor

### Frase de Encerramento:
"Você está exatamente onde deveria estar. O que você faz com isso é o que define sua marca."
      `
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
      image: "/lovable-uploads/3b0d1df3-7102-4c52-ba2f-eb2338f927d7.png",
      rating: 4.6,
      isNew: false
    }
  ];

  const livrosIndicados = [
    {
      titulo: "Small Data: As Pequenas Pistas que Indicam Grandes Tendências",
      autor: "Martin Lindstrom",
      categoria: "Palestra 1",
      descricao: "Como pequenos detalhes do comportamento humano podem revelar grandes insights para inovação e crescimento de negócios.",
      capa: "/lovable-uploads/09c5877d-d784-4ad9-b961-8f685c34a0ce.png",
      linkCompra: "https://www.amazon.com.br/Small-Data-Indicam-Grandes-Tend%C3%AAncias/dp/8569809719"
    },
    {
      titulo: "O Herói e o Fora-da-Lei: Como Construir Marcas Extraordinárias Usando o Poder dos Arquétipos",
      autor: "Margaret Mark e Carol S. Pearson",
      categoria: "Palestra 2",
      descricao: "Descubra como usar arquétipos universais para criar marcas poderosas e memoráveis que conectam emocionalmente com seu público.",
      capa: "/lovable-uploads/0e398d8a-36f5-4826-85fb-e891d6308ef3.png",
      linkCompra: "https://www.amazon.com.br/her%C3%B3i-fora-lei-extraordin%C3%A1rias-arqu%C3%A9tipos/dp/8531608090"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      "Palestra 1": "bg-primary/10 text-primary border-primary/20",
      "Palestra 2": "bg-orange-500/10 text-orange-600 border-orange-200",
      "Palestra 3": "bg-red-500/10 text-red-600 border-red-200",
      "Palestra 4": "bg-purple-500/10 text-purple-600 border-purple-200",
      "Palestra 5": "bg-success/10 text-success border-success/20", 
      "Palestra 6": "bg-accent/10 text-accent-foreground border-accent/20",
      "Estratégia": "bg-success/10 text-success border-success/20", 
      "Público": "bg-accent/10 text-accent-foreground border-accent/20",
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
                      {resumo.author === 'Victor' && (
                        <a
                          href="https://wa.me/5541998927030"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-green-600 hover:text-green-700 transition-colors text-xs"
                        >
                          <MessageCircle className="w-3 h-3" />
                          Falar com Victor
                        </a>
                      )}
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
                        onClick={() => handlePdfDownload(resumo.id)}
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
      <div className="border-t border-border/40 bg-gradient-to-br from-muted/30 via-background to-muted/20">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 leading-tight">
              Livros <span className="italic bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Indicados</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Uma curadoria especial de livros essenciais para aprofundar seus conhecimentos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {livrosIndicados.map((livro, index) => (
              <article key={index} className="group h-full">
                <div className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-border/30 h-full flex flex-col group-hover:scale-[1.01]">
                  
                  {/* Gradient overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  {/* Capa do Livro */}
                  <div className="relative aspect-[2/3] bg-gradient-to-br from-muted/30 to-muted/60 overflow-hidden">
                    {livro.capa ? (
                      <img 
                        src={livro.capa} 
                        alt={`Capa do livro ${livro.titulo}`}
                        className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                        <div className="text-6xl text-primary/40">📚</div>
                      </div>
                    )}
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Category badge floating */}
                    <div className="absolute top-2 left-2 z-10">
                      <Badge variant="secondary" className={`${getCategoryColor(livro.categoria)} text-xs font-medium`}>
                        {livro.categoria}
                      </Badge>
                    </div>
                  </div>

                  {/* Informações do Livro */}
                  <div className="relative p-4 flex-1 flex flex-col space-y-2">
                    
                    <h3 className="text-base font-bold text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2">
                      {livro.titulo}
                    </h3>
                    
                    <p className="text-xs text-muted-foreground font-medium">
                      por <span className="text-foreground font-semibold">{livro.autor}</span>
                    </p>
                    
                    <p className="text-muted-foreground text-xs leading-relaxed flex-1 line-clamp-3">
                      {livro.descricao}
                    </p>

                    {/* Botão de Ação */}
                    <div className="pt-2 mt-auto">
                      {livro.linkCompra && (
                        <a
                          href={livro.linkCompra}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full"
                        >
                          <Button 
                            className="w-full bg-primary hover:bg-primary-glow text-primary-foreground font-medium py-2 text-xs rounded-md transition-all duration-300"
                          >
                            <span className="flex items-center justify-center gap-2">
                              📖 <span>Ver Livro</span>
                            </span>
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Call to Action aprimorado */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full border border-primary/20">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
              <p className="text-muted-foreground text-xs">
                <strong className="text-foreground">Dica:</strong> Livros selecionados para complementar o conteúdo da imersão
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resumos;