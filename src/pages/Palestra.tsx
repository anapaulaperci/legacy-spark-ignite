import { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft, Star, User, Instagram, BookOpen, MessageCircle, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';

// Função para processar markdown
const parseMarkdown = (text: string) => {
  // Processar texto em negrito **texto**
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Processar texto em itálico *texto*
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Processar links [texto](url)
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:text-primary-glow underline" target="_blank" rel="noopener noreferrer">$1</a>');
  
  return text;
};

// Componente para renderizar conteúdo markdown
const MarkdownContent = ({ content }: { content: string }) => {
  const lines = content.split('\n');
  const elements: JSX.Element[] = [];
  let listItems: string[] = [];
  let listIndex = 0;

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${listIndex++}`} className="space-y-3 mb-8 ml-6">
          {listItems.map((item, idx) => (
            <li key={idx} className="list-disc text-muted-foreground leading-relaxed text-lg" 
                dangerouslySetInnerHTML={{ __html: parseMarkdown(item) }} />
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    
    if (trimmedLine === '') {
      flushList();
      elements.push(<div key={`space-${index}`} className="h-6" />);
      return;
    }

    // Linha horizontal ---
    if (trimmedLine === '---') {
      flushList();
      elements.push(
        <div key={index} className="w-full h-px bg-gradient-to-r from-primary/30 to-transparent my-12"></div>
      );
      return;
    }

    // Títulos com ## (incluindo markdown)
    if (trimmedLine.startsWith('## ')) {
      flushList();
      const title = trimmedLine.replace('## ', '');
      elements.push(
        <div key={index} className="mt-16 mb-8 first:mt-0">
          <h2 className="text-3xl font-bold text-foreground mb-6" dangerouslySetInnerHTML={{ __html: parseMarkdown(title) }} />
        </div>
      );
      return;
    }

    // Subtítulos com ###
    if (trimmedLine.startsWith('### ')) {
      flushList();
      const title = trimmedLine.replace('### ', '');
      elements.push(
        <h3 key={index} className="text-2xl font-semibold text-foreground mt-12 mb-6 flex items-center gap-3">
          <span className="w-2 h-2 bg-primary rounded-full"></span>
          <span dangerouslySetInnerHTML={{ __html: parseMarkdown(title) }} />
        </h3>
      );
      return;
    }

    // Lista com bullets *
    if (trimmedLine.startsWith('* ')) {
      const item = trimmedLine.replace('* ', '');
      listItems.push(item);
      return;
    }

    // Lista numerada
    if (/^\d+\.\s/.test(trimmedLine)) {
      flushList();
      const content = trimmedLine.replace(/^\d+\.\s/, '');
      elements.push(
        <div key={index} className="bg-muted/30 p-4 rounded-lg border-l-4 border-primary mb-4">
          <p className="text-lg text-foreground" dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }} />
        </div>
      );
      return;
    }

    // Parágrafos com **Pergunta:** e **Resposta:**
    if (trimmedLine.startsWith('**Pergunta:**') || trimmedLine.startsWith('**Resposta:**')) {
      flushList();
      elements.push(
        <p key={index} className="mb-4 text-foreground leading-relaxed text-lg" 
           dangerouslySetInnerHTML={{ __html: parseMarkdown(trimmedLine) }} />
      );
      return;
    }

    // Listas com indentação (sublistas)
    if (trimmedLine.match(/^\s{2,}\*/)) {
      const item = trimmedLine.replace(/^\s*\*\s/, '');
      listItems.push(`&nbsp;&nbsp;&nbsp;&nbsp;• ${item}`);
      return;
    }

    // Se chegou aqui e temos itens de lista pendentes, vamos processar a lista
    flushList();

    // Parágrafo normal
    if (trimmedLine.length > 0) {
      elements.push(
        <p key={index} className="mb-6 text-muted-foreground leading-relaxed text-lg" 
           dangerouslySetInnerHTML={{ __html: parseMarkdown(trimmedLine) }} />
      );
    }
  });

  // Processar última lista se existir
  flushList();

  return <div className="prose prose-lg prose-slate max-w-none">{elements}</div>;
};

export default function Palestra() {
  const { id } = useParams();
  const [userRatings, setUserRatings] = useState<{[key: number]: number}>({});
  const { toast } = useToast();

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
      // Convertendo HSL para RGB: 270° 100% 30% = RGB(153, 0, 153)
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
      isNew: true,
      fullContent: `
## **🎯 Objetivos de Aprendizagem**
* **Compreender** a diferença entre *persona* e *ICP (Ideal Customer Profile)*
* **Analisar** como a clareza de persona impacta todo o funil de marketing e vendas
* **Aplicar** o conhecimento de ICP para desenvolver linha editorial estratégica
* **Identificar** elementos de autoridade, prova social e conexão emocional em conteúdos
* **Explorar** como adaptar soluções às dores e desejos reais da audiência
---
## **📘 Conceitos-Chave**
* **Persona**: Representação do público-alvo de forma ampla (ex: mulheres que querem emagrecer).
* **ICP (Ideal Customer Profile)**: Subgrupo dentro da persona que representa o cliente ideal — quem executa, aplica e valoriza a solução.
* **Linha editorial estratégica**: Planejamento de conteúdo que inclui *autoridade*, *prova social*, *conexão emocional*, *atração* e *quebra de objeções*.
* **Prova social**: Demonstração de resultados reais (ex: faturamento, depoimentos).
* **Autoridade**: Reconhecimento de mercado (ex: palestrar, estar em masterminds).
* **Nível de consciência**: Grau de entendimento que o cliente tem sobre seus problemas e possíveis soluções.
* **Custo de aquisição**: Tempo ou dinheiro investido para trazer um lead qualificado até a venda.
* **Funil de vendas**: Jornada completa desde o primeiro contato com a marca até a conversão.
* **Conteúdo estratégico**: Produções que educam, conectam e conduzem o lead na jornada de compra.
* **Objeções**: Barreiras mentais do lead que impedem a compra.
---
## **🧱 Conteúdo Principal**
### **📍1. O passo zero de qualquer negócio**
* Todo negócio nasce para **resolver a dor de alguém** — não apenas gerar dinheiro.
* Sem entender **quem é essa pessoa**, não se constrói um funil escalável.
* Mesmo empresas de 7 dígitos não têm clareza sobre sua persona/ICP.
### **📍2. Persona vs. ICP**
* Persona: visão ampla e demográfica.
* ICP: cliente ideal com comportamentos e características específicas.
* Estratégia: **comece pela persona**, mas **afunile para o ICP** na hora da venda.
### **📍3. Funil, Zoom e custo de reunião**
* Fazer reuniões com leads desalinhados gera **custo alto e desperdício de tempo**.
* Exemplo: entrar no Zoom para vender algo de R$ 50 mil para quem só pode pagar R$ 5 mil.
* Solução: **segmentar bem antes de chamar para a reunião**.
### **📍4. Linha editorial que vende**
* Precisa conter:
  * *Autoridade*
  * *Prova social*
  * *Conexão emocional*
  * *Quebra de objeção*
  * *Atração*
* Exemplo: print de vendas = prova social, não autoridade.
* Autoridade = palestra, evento, mentoria, estar entre os grandes nomes do nicho.
### **📍5. Produção de conteúdo como parte da estratégia**
* **Produção de conteúdo não é um extra** – é o coração da atração e do crescimento.
* **Volume e consistência** constroem autoridade e presença.
* "Meu trabalho envolve criar conteúdo" — visão de mentalidade profissional.
### **📍6. Ferramentas de IA e GPT personalizado**
* GPTs personalizados têm **limite de uso via OpenAI**.
Para escala, usar **API da OpenAI** com controle de tokens.
* Exemplo de uso: GPT criado para mapear matriz de ICP com profundidade comportamental.
### **📍7. Universo do cliente e escuta ativa**
* Pergunta central: **"No que meu cliente pensa ao deitar a cabeça no travesseiro?"**
* Mapear as *dores, desejos, desafios emocionais e cotidianos* do lead.
* Escuta ativa do cliente = base da criação de produtos e otimização da entrega.
### **📍8. Olhar para a concorrência**
* **Benchmark** dos 3 principais players do nicho.
* Biblioteca de anúncios, tipo de produtos, abordagem de funil.
* Não para copiar, mas para entender o que já funciona no mercado.
---
## **💡 Exemplos e Casos Práticos**
* **Mentoria de IA**:
  * Persona ampla: pessoas que querem lucrar com IA
  * ICP: executores, disciplinados, que sabem produzir conteúdo próprio
* **IA de Vendas**:
  * Concorrentes já existiam, mas entregavam de forma genérica
  * Solução criada com foco em personalização e funil completo
* **Segmentação de emagrecimento**:
  * Persona: mulheres que querem emagrecer
  * ICP: mulheres de 20 a 40 anos que rejeitam dietas restritivas
---
## **❓ Dúvidas e Esclarecimentos**
**Pergunta:** Como saber se um conteúdo gera autoridade ou não?
**Resposta:** Depende da percepção da sua ICP. Print pode funcionar para alguns, palestras para outros.
**Pergunta:** O que é autoridade para meu público?
**Resposta:** Depende do nicho. Precisa ser validado com base no comportamento do ICP, não por intuição.
---
## **📚 Recursos Complementares**
* **GPT personalizado da Ana Paula** para mapeamento de ICP (baseado na metodologia da empresa)
* Recomendação: acessar **biblioteca de anúncios do Meta Ads** dos concorrentes
* Leitura sugerida (implícita): *Building a StoryBrand*, *Invisible Selling Machine*, *Customer Avatar Worksheet*
---
## **📝 Atividades e Avaliações**
* **Exercício sugerido:**
  1. Esboçar persona atual
  2. Identificar ICP
  3. Mapear elementos de linha editorial atual
  4. Criar pelo menos um conteúdo para cada tipo (autoridade, prova, emocional, objeção)
* **Projeto longo:** Criar planejamento editorial mensal baseado na matriz de ICP
---
## **🔚 Síntese Final**
* O **negócio começa com clareza de persona e ICP** — sem isso, não escala.
* **Produzir conteúdo é estratégia central**, não secundária.
* **Linha editorial deve ser direcionada e balanceada** entre autoridade, prova, emoção e objeções.
* O **cliente ideal precisa ser ouvido constantemente**, e os produtos devem nascer dessa escuta.
* **Ferramentas de IA são úteis**, mas exigem entendimento técnico para escalar.
      `
    },
    {
      id: 2,
      title: "Fundamentos da Marca Pessoal",
      description: "Estratégias avançadas de vídeo marketing e construção de marcas que realmente conectam com o público.",
      author: "Camilo Coutinho",
      category: "Branding",
      image: "/lovable-uploads/cd1ea6f5-17be-4606-b2f6-86441fa7e6e7.png",
      isNew: true,
      fullContent: `
## **🎯 Objetivos de Aprendizagem**

* **Compreender** a importância estratégica da marca pessoal para profissionais e empresas
* **Identificar** os pilares essenciais para construir uma marca forte e autêntica
* **Aplicar** o conceito de arquétipos junguianos para diferenciar marcas no mercado
* **Analisar** a percepção externa da marca pessoal e promover alinhamento com sua essência
* **Criar** um mapa de marca funcional para guiar design, conteúdo e posicionamento

---

## **📘 Conceitos-Chave**

1. **Marca pessoal**: Não é apenas o logotipo, mas a percepção emocional, estratégica e simbólica que o mercado tem de você.
2. **Percepção de valor**: Como as pessoas julgam sua competência e autoridade com base em sinais visuais, narrativos e comportamentais.
3. **Arquétipos de marca**: Modelos universais de personalidade que moldam a comunicação da marca (ex: herói, cuidador, rebelde).
4. **Consistência de marca**: Alinhamento entre imagem, narrativa e presença digital. Gera confiança.
5. **Mapa da marca**: Framework visual que conecta estratégia, identidade e execução da comunicação.
6. **Presença estratégica**: Estar onde o seu público está e manter relevância com constância.
7. **Design com propósito**: O visual deve traduzir a personalidade e intenção da marca, não apenas seguir estéticas genéricas.
8. **Autoconhecimento**: Primeiro passo para uma marca autêntica é entender sua essência, forças, valores e estilo.
9. **Tom de voz**: Como a marca se comunica verbalmente — tom, ritmo e escolha de palavras.

---

## **🧱 Conteúdo Principal**

### **📍1. O que é Marca Pessoal e Por que Importa?**

* Marca pessoal é **como você é lembrado** quando não está presente.
* Vai além de visual: é sobre *identidade*, *posicionamento*, *energia* e *impacto*.
* **70% das pessoas** pesquisam online antes de contratar um profissional.
* Profissionais com marca pessoal forte **cobram mais**, são mais lembrados e têm mais oportunidades.

### **📍2. Pilares de uma Marca Forte**

* **Posicionamento**: Como você quer ser lembrado? Por quais habilidades e diferenciais?
* **Propósito**: Qual a causa maior que motiva seu trabalho? Por que você faz o que faz?
* **Presença**: Onde você aparece e se comunica? Você está onde seu público está?
* **Público**: Quem você quer atrair? Qual o problema que resolve para esse público?

Esses pilares devem estar **alinhados** para gerar consistência.

### **📍3. O Poder do Autoconhecimento na Marca**

Sem autoconhecimento, cria-se uma marca **artificial**, **insustentável** a longo prazo.

É preciso entender:
* **Quem você é** (valores, personalidade, singularidades)
* **O que você faz** (competências, história, diferenciais)  
* **Para quem você serve** (segmento, perfil ideal, dores que resolve)

### **📍4. O Exercício das 5 Perguntas**

Enviar a **10 pessoas** (5 do pessoal, 5 do profissional):

1. O que eu faço bem e não percebo?
2. Qual foi sua primeira impressão de mim e ela mudou?
3. O que posso melhorar na minha comunicação?
4. Algo que sempre quis saber de mim?
5. Uma história que te marcou comigo?

Esse exercício revela **percepções ocultas** que impactam diretamente sua imagem.

### **📍5. Introdução aos Arquétipos de Marca**

Divididos em **4 grandes funções**:

* **Guiar** (Governante, Sábio, Inocente)
* **Inspirar** (Herói, Criador, Amante)
* **Conectar** (Cuidador, Cara Comum, Bobo da Corte)
* **Animar** (Explorador, Mágico, Fora da Lei)

Cada um tem **luz e sombra**. Ex: Herói é um resolvedor de problemas, mas pode ser arrogante.

### **📍6. Exemplo de Análise Visual (Caso Ana)**

* Três fotos foram avaliadas com base na **essência percebida** x **identidade real**
* A imagem que melhor expressa a Ana (Geek-Herói) não era a mais "sofisticada", mas a **mais autêntica**
* Fotos, expressões, roupas, cores e objetos **comunicam sua marca**, mesmo sem você dizer uma palavra

### **📍7. Aplicando o Mapa da Marca**

O framework completo possui **3 camadas**:

1. **Estratégia** (quem sou, como sou percebido, para onde vou)
2. **Identidade** (visual, verbal, narrativa, simbólica)
3. **Marketing** (produtos, conteúdo, canais, campanhas, escuta social)

Evita confusão sobre o que postar, como se vestir, como se comunicar.
Traz **clareza** para designer, social media, vídeos, pitch de vendas e muito mais.

---

## **💡 Exemplos e Casos Práticos**

* **Bake Love**: marca criada do zero, com nome, ícone e visual baseados em sensações ("amor + sabor").
* **Vista o Extraordinário**: marca de camisetas com arquétipo de Bobo da Corte, visual inspirado no produto (camiseta com pesponto).
* **Cliente enfermeira em Portugal**: branding autêntico com **aumento de 40 mil euros** em 3 meses, sem mudar sua essência calma.

---

## **❓ Dúvidas e Esclarecimentos**

**Pergunta:** Devo adaptar meu arquétipo ao público?
**Resposta:** Não. Adapte a linguagem, nunca a sua essência.

**Pergunta:** Cuidador vende menos?
**Resposta:** Não. Se comunicar corretamente, o cuidador gera percepção de valor emocional, que justifica preço.

**Pergunta:** Sou visto como arrogante. E agora?
**Resposta:** Às vezes é apenas um ruído de comunicação. A essência precisa ser realinhada com a expressão externa.

---

## **📚 Recursos Complementares**

* **Livro**: *O Herói e o Fora da Lei* (Mark & Pearson)
* **Ferramenta**: Mapa de Empatia (para alinhar imagem vs. percepção)
* **Outros**: Artigos da Exame e Estadão sobre influenciadores-fundadores

---

## **📝 Atividades e Avaliações**

* **Exercício sugerido:**
  1. Aplicar o exercício das 5 perguntas de percepção externa
  2. Preencher os 4 pilares da marca pessoal
  3. Identificar o arquétipo predominante
  4. Fazer mapa da marca (base para designer e social media)

---

## **🔚 Síntese Final**

1. **Marca pessoal é um sistema**: começa na essência e se manifesta em cada ponto de contato
2. **Arquétipos oferecem direcionamento** para a identidade e o conteúdo
3. **O design é a expressão final** de uma estratégia de marca bem definida
4. **Presença sem consistência é ruído**. Consistência com autenticidade gera valor

### **💫 Frase de Encerramento:**
*"Você está exatamente onde deveria estar. O que você faz com isso é o que define sua marca."*
      `
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
              
              {/* WhatsApp Link for Victor */}
              {resumo.author === 'Victor' && (
                <>
                  <span className="text-muted-foreground">·</span>
                  <a
                    href="https://wa.me/41998927030"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary-glow transition-colors text-sm font-medium"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Falar com Victor
                  </a>
                </>
              )}
              
              {/* Contact Links for other instructors */}
              {['Ana', 'Melina', 'Sabrina', 'Ana Paula Perci'].includes(resumo.author) && (
                <>
                  <span className="text-muted-foreground">·</span>
                  <span className="inline-flex items-center gap-2 text-primary text-sm font-medium">
                    <MessageCircle className="w-4 h-4" />
                    Falar com {resumo.author.split(' ')[0]}
                  </span>
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
            {(resumo.id === 1 || resumo.id === 2) && resumo.fullContent ? (
              <>
                <MarkdownContent content={resumo.fullContent} />
                
                {/* Download PDF Button */}
                <div className="mt-16 pt-8 border-t border-border">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Baixar Material em PDF
                    </h3>
                    <p className="text-muted-foreground mb-6 text-sm max-w-md mx-auto">
                      Faça o download deste conteúdo em formato PDF para estudar offline e ter como referência
                    </p>
                    <Button 
                      onClick={() => generatePDF(resumo)}
                      className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow text-primary-foreground px-6 py-3 shadow-elegant hover:scale-105 transition-all duration-300"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Baixar PDF
                    </Button>
                  </div>
                </div>
              </>
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