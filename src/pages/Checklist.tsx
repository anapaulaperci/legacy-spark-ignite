import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckSquare, Circle, Trophy, Target, Clock, TrendingUp, Plus, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const Checklist = () => {
  const { user } = useAuth();
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [taskThemes, setTaskThemes] = useState<Record<string, string>>({});
  const [taskPriorities, setTaskPriorities] = useState<Record<string, string>>({});
  const [taskDates, setTaskDates] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const themeOptions = [
    "Posicionamento",
    "Linha Editorial", 
    "Vendas",
    "Produção de Conteúdo",
    "Análise"
  ];

  const priorityOptions = [
    { value: "alta", label: "Alta", color: "bg-red-100 text-red-800 border-red-200" },
    { value: "média", label: "Média", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
    { value: "baixa", label: "Baixa", color: "bg-green-100 text-green-800 border-green-200" }
  ];

  const sections = [
    {
      id: "1",
      title: "Fundamentos",
      description: "Base conceitual do posicionamento",
      icon: Circle,
      color: "text-primary",
      items: [
        { id: "1-1", task: "Entender o conceito de posicionamento de marca", priority: "alta" },
        { id: "1-2", task: "Estudar casos de posicionamento bem-sucedidos", priority: "alta" },
        { id: "1-3", task: "Identificar diferentes tipos de posicionamento", priority: "média" },
        { id: "1-4", task: "Completar exercícios de fixação", priority: "baixa" }
      ]
    },
    {
      id: "2",
      title: "Análise de Mercado",
      description: "Compreensão do ambiente competitivo",
      icon: Target,
      color: "text-accent",
      items: [
        { id: "2-1", task: "Mapear principais concorrentes diretos", priority: "alta" },
        { id: "2-2", task: "Analisar posicionamento dos concorrentes", priority: "alta" },
        { id: "2-3", task: "Identificar gaps no mercado", priority: "média" }
      ]
    },
    {
      id: "3",
      title: "Estratégia",
      description: "Desenvolvimento da estratégia de posicionamento",
      icon: TrendingUp,
      color: "text-success",
      items: [
        { id: "3-1", task: "Definir proposta de valor única", priority: "alta" },
        { id: "3-2", task: "Criar personas detalhadas", priority: "alta" },
        { id: "3-3", task: "Desenvolver mensagem principal", priority: "média" }
      ]
    },
    {
      id: "4",
      title: "Plano de Implementação",
      description: "Execução e acompanhamento",
      icon: Trophy,
      color: "text-destructive",
      items: [
        { id: "4-1", task: "Criar plano de comunicação", priority: "alta" },
        { id: "4-2", task: "Definir métricas de acompanhamento", priority: "média" },
        { id: "4-3", task: "Implementar estratégia", priority: "alta" }
      ]
    }
  ];

  // Carregar progresso do usuário
  const loadUserProgress = () => {
    if (!user) return;

    try {
      const storageKey = `checklist_progress_${user.id}`;
      const savedProgress = localStorage.getItem(storageKey);
      
      if (savedProgress) {
        const data = JSON.parse(savedProgress);
        setCheckedItems(data.checked_items || {});
        setTaskThemes(data.task_themes || {});
        setTaskPriorities(data.task_priorities || {});
        setTaskDates(data.task_dates || {});
      }
    } catch (error) {
      console.error('Erro ao carregar progresso:', error);
    } finally {
      setLoading(false);
    }
  };

  // Salvar progresso do usuário
  const saveUserProgress = () => {
    if (!user) return;

    try {
      const progressData = {
        checked_items: checkedItems,
        task_themes: taskThemes,
        task_priorities: taskPriorities,
        task_dates: taskDates,
        updated_at: new Date().toISOString()
      };

      const storageKey = `checklist_progress_${user.id}`;
      localStorage.setItem(storageKey, JSON.stringify(progressData));
    } catch (error) {
      console.error('Erro ao salvar progresso:', error);
    }
  };

  // UseEffect para carregar dados na inicialização
  useEffect(() => {
    loadUserProgress();
  }, [user]);

  // UseEffect para salvar automaticamente quando o progresso muda
  useEffect(() => {
    if (!loading && user) {
      const timeoutId = setTimeout(() => {
        saveUserProgress();
      }, 1000); // Debounce de 1 segundo

      return () => clearTimeout(timeoutId);
    }
  }, [checkedItems, taskThemes, taskPriorities, taskDates, loading, user]);

  const handleItemCheck = (itemId: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleThemeChange = (itemId: string, theme: string) => {
    setTaskThemes(prev => ({
      ...prev,
      [itemId]: theme
    }));
  };

  const handlePriorityChange = (itemId: string, priority: string) => {
    setTaskPriorities(prev => ({
      ...prev,
      [itemId]: priority
    }));
  };

  const handleDateChange = (itemId: string, date: string) => {
    setTaskDates(prev => ({
      ...prev,
      [itemId]: date
    }));
  };

  const getSectionProgress = (sectionId: string) => {
    const sectionItems = sections.find(s => s.id === sectionId)?.items || [];
    const completedItems = sectionItems.filter(item => checkedItems[item.id]).length;
    return Math.round((completedItems / sectionItems.length) * 100);
  };

  const getTotalProgress = () => {
    const totalItems = sections.reduce((acc, section) => acc + section.items.length, 0);
    const completedItems = Object.values(checkedItems).filter(Boolean).length;
    return Math.round((completedItems / totalItems) * 100);
  };

  const getThemeColor = (theme: string) => {
    switch (theme) {
      case "Posicionamento":
        return "bg-blue-500";
      case "Linha Editorial":
        return "bg-green-500";
      case "Vendas":
        return "bg-orange-500";
      case "Produção de Conteúdo":
        return "bg-purple-500";
      case "Análise":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "alta":
        return "bg-red-100 text-red-800 border-red-200";
      case "média":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "baixa":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const totalProgress = getTotalProgress();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-4">Carregando progresso...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Checklist de Posicionamento
              </h1>
              <p className="text-muted-foreground">
                Acompanhe seu progresso através dos marcos do projeto
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Item
            </Button>
          </div>
          
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progresso Geral</span>
              <span className="font-medium text-foreground">{totalProgress}%</span>
            </div>
            <Progress value={totalProgress} className="h-2" />
          </div>
        </div>

        {/* Checklist Items */}
        <div className="space-y-4">
          {sections.map((section) => {
            const progress = getSectionProgress(section.id);
            const SectionIcon = section.icon;
            
            return (
              <Card key={section.id} className="border border-border/50 shadow-sm">
                {/* Section Header */}
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <SectionIcon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold text-foreground">
                          {section.title}
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                          {section.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        {section.items.filter(item => checkedItems[item.id]).length}/{section.items.length}
                      </div>
                      <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-300" 
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                {/* Section Items - Monday.com Style com Colunas */}
                <CardContent className="pt-0">
                  <div className="grid gap-2">
                    {section.items.map((item) => {
                      const selectedTheme = taskThemes[item.id];
                      const themeColor = selectedTheme ? getThemeColor(selectedTheme) : "bg-gray-200";
                      
                      return (
                        <div 
                          key={item.id} 
                          className={`group relative bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 animate-fade-in ${
                            checkedItems[item.id] ? 'opacity-70' : ''
                          }`}
                        >
                          {/* Colored left border */}
                          <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-lg ${themeColor}`} />
                          
                          <div className="p-4 pl-6">
                            {/* Grid layout com todas as colunas */}
                            <div className="grid grid-cols-9 gap-3 items-center">
                              {/* Checkbox e Tarefa - 4 colunas */}
                              <div className="col-span-4 flex items-center gap-3">
                                <Checkbox
                                  id={item.id}
                                  checked={checkedItems[item.id] || false}
                                  onCheckedChange={() => handleItemCheck(item.id)}
                                  className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 hover:border-green-400 transition-colors shrink-0"
                                />
                                <label 
                                  htmlFor={item.id}
                                  className={`font-medium cursor-pointer transition-all duration-200 text-sm ${
                                    checkedItems[item.id] 
                                      ? 'text-gray-400 line-through' 
                                      : 'text-gray-800 hover:text-blue-600'
                                  }`}
                                >
                                  {item.task}
                                </label>
                              </div>
                              
                              {/* Tema - 3 colunas */}
                              <div className="col-span-3">
                                <Select 
                                  value={taskThemes[item.id] || ""} 
                                  onValueChange={(value) => handleThemeChange(item.id, value)}
                                >
                                  <SelectTrigger 
                                    className={`h-8 text-xs border-gray-200 hover:border-gray-300 transition-colors ${
                                      selectedTheme ? 'bg-gray-50' : 'bg-white'
                                    }`}
                                  >
                                    <div className="flex items-center gap-1">
                                      {selectedTheme && (
                                        <div className={`w-2 h-2 rounded-full ${themeColor}`} />
                                      )}
                                      <SelectValue placeholder="Tema" />
                                    </div>
                                  </SelectTrigger>
                                  <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                                    {themeOptions.map((theme) => (
                                      <SelectItem key={theme} value={theme} className="text-xs hover:bg-gray-50">
                                        <div className="flex items-center gap-2">
                                          <div className={`w-2 h-2 rounded-full ${getThemeColor(theme)}`} />
                                          {theme}
                                        </div>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              {/* Prioridade Selecionável - 1 coluna */}
                              <div className="col-span-1">
                                <Select 
                                  value={taskPriorities[item.id] || item.priority} 
                                  onValueChange={(value) => handlePriorityChange(item.id, value)}
                                >
                                  <SelectTrigger className="h-8 text-xs border-gray-200 hover:border-gray-300 transition-colors bg-white">
                                    <SelectValue placeholder="Prioridade" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                                    {priorityOptions.map((priority) => (
                                      <SelectItem key={priority.value} value={priority.value} className="text-xs hover:bg-gray-50">
                                        <div className="flex items-center gap-2">
                                          <div className={`w-2 h-2 rounded-full ${
                                            priority.value === 'alta' ? 'bg-red-500' : 
                                            priority.value === 'média' ? 'bg-yellow-500' : 'bg-green-500'
                                          }`} />
                                          {priority.label}
                                        </div>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              
                              {/* Status - 1 coluna */}
                              <div className="col-span-1 flex justify-center">
                                {checkedItems[item.id] ? (
                                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                                ) : (
                                  <div className="w-3 h-3 bg-gray-300 rounded-full" />
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-20 transition-opacity duration-200 rounded-lg pointer-events-none" />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex justify-center">
          <Button variant="outline" size="sm">
            Exportar Progresso
          </Button>
        </div>

        {/* Success Message */}
        {totalProgress === 100 && (
          <Card className="mt-6 border-green-200 bg-green-50">
            <CardContent className="p-6 text-center">
              <Trophy className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-green-800 mb-2">Parabéns!</h3>
              <p className="text-green-700">Você completou todos os itens do checklist!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Checklist;