import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { User, Trophy, Calendar, BookOpen, CheckCircle, Target, TrendingUp, Award, Clock, Star } from "lucide-react";

const Perfil = () => {
  const userStats = {
    name: "Maria Silva",
    email: "maria.silva@email.com",
    joinDate: "Janeiro 2024",
    avatar: "",
    level: "Intermediário",
    totalHours: 28,
    completedModules: 12,
    totalModules: 20,
    currentStreak: 7,
    longestStreak: 15,
    certificates: 2,
    points: 1250
  };

  const achievements = [
    {
      id: 1,
      title: "Primeiro Módulo",
      description: "Completou seu primeiro módulo",
      icon: BookOpen,
      earned: true,
      date: "15/01/2024"
    },
    {
      id: 2,
      title: "Semana Consistente",
      description: "Estudou por 7 dias consecutivos",
      icon: Calendar,
      earned: true,
      date: "22/01/2024"
    },
    {
      id: 3,
      title: "Analista Expert",
      description: "Completou todos os módulos de análise",
      icon: Target,
      earned: true,
      date: "28/01/2024"
    },
    {
      id: 4,
      title: "Estrategista",
      description: "Dominou as estratégias de posicionamento",
      icon: TrendingUp,
      earned: false,
      date: null
    },
    {
      id: 5,
      title: "Mentor",
      description: "Ajudou 5 colegas no fórum",
      icon: Award,
      earned: false,
      date: null
    },
    {
      id: 6,
      title: "Completista",
      description: "Finalizou 100% do curso",
      icon: Trophy,
      earned: false,
      date: null
    }
  ];

  const recentActivity = [
    {
      type: "module",
      title: "Análise de Concorrência",
      date: "Hoje, 14:30",
      status: "completed"
    },
    {
      type: "quiz",
      title: "Quiz: Fundamentos",
      date: "Ontem, 16:45",
      status: "completed",
      score: 85
    },
    {
      type: "download",
      title: "Template Canvas",
      date: "2 dias atrás",
      status: "downloaded"
    },
    {
      type: "forum",
      title: "Respondeu no fórum",
      date: "3 dias atrás",
      status: "posted"
    }
  ];

  const weeklyProgress = [
    { day: "S", hours: 2 },
    { day: "T", hours: 3 },
    { day: "Q", hours: 1 },
    { day: "Q", hours: 4 },
    { day: "S", hours: 2 },
    { day: "S", hours: 3 },
    { day: "D", hours: 0 }
  ];

  const progressPercentage = (userStats.completedModules / userStats.totalModules) * 100;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-2xl">
              <User className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Meu Perfil
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Acompanhe seu progresso, conquistas e estatísticas de aprendizado
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Card */}
          <div className="lg:col-span-1">
            <Card className="border-border">
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={userStats.avatar} />
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {userStats.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl">{userStats.name}</CardTitle>
                <CardDescription>{userStats.email}</CardDescription>
                <Badge className="mt-2 bg-primary text-primary-foreground">
                  Nível {userStats.level}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">Progresso do Curso</div>
                  <Progress value={progressPercentage} className="h-3 mb-2" />
                  <div className="text-sm font-medium">
                    {userStats.completedModules} de {userStats.totalModules} módulos
                  </div>
                </div>
                
                <div className="pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Membro desde:</span>
                    <span className="font-medium">{userStats.joinDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Horas estudadas:</span>
                    <span className="font-medium">{userStats.totalHours}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sequência atual:</span>
                    <span className="font-medium">{userStats.currentStreak} dias</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pontos:</span>
                    <span className="font-medium text-primary">{userStats.points}</span>
                  </div>
                </div>
                
                <Button className="w-full mt-6">
                  Editar Perfil
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Stats and Progress */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="text-center border-border">
                <CardContent className="p-4">
                  <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{userStats.completedModules}</div>
                  <div className="text-sm text-muted-foreground">Módulos</div>
                </CardContent>
              </Card>
              <Card className="text-center border-border">
                <CardContent className="p-4">
                  <Clock className="h-8 w-8 text-accent mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{userStats.totalHours}</div>
                  <div className="text-sm text-muted-foreground">Horas</div>
                </CardContent>
              </Card>
              <Card className="text-center border-border">
                <CardContent className="p-4">
                  <Star className="h-8 w-8 text-success mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{userStats.currentStreak}</div>
                  <div className="text-sm text-muted-foreground">Dias seguidos</div>
                </CardContent>
              </Card>
              <Card className="text-center border-border">
                <CardContent className="p-4">
                  <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{userStats.certificates}</div>
                  <div className="text-sm text-muted-foreground">Certificados</div>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Activity */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-primary" />
                  Atividade Semanal
                </CardTitle>
                <CardDescription>Horas de estudo nos últimos 7 dias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between h-32">
                  {weeklyProgress.map((day, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className="bg-primary rounded-t-md w-8 transition-all duration-300 hover:bg-primary-glow"
                        style={{ height: `${(day.hours / 4) * 80}px`, minHeight: day.hours > 0 ? '8px' : '2px' }}
                      ></div>
                      <div className="text-xs text-muted-foreground mt-2">{day.day}</div>
                      <div className="text-xs font-medium">{day.hours}h</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-primary" />
                  Atividade Recente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30">
                      <div className={`p-2 rounded-lg ${
                        activity.status === 'completed' ? 'bg-success/10 text-success' :
                        activity.status === 'downloaded' ? 'bg-accent/10 text-accent' :
                        'bg-primary/10 text-primary'
                      }`}>
                        {activity.type === 'module' && <BookOpen className="h-4 w-4" />}
                        {activity.type === 'quiz' && <Target className="h-4 w-4" />}
                        {activity.type === 'download' && <CheckCircle className="h-4 w-4" />}
                        {activity.type === 'forum' && <User className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-foreground">{activity.title}</div>
                        <div className="text-sm text-muted-foreground">{activity.date}</div>
                      </div>
                      {activity.score && (
                        <Badge variant="outline">{activity.score}%</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Achievements Section */}
        <Card className="mt-8 border-border">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-primary" />
              Conquistas
            </CardTitle>
            <CardDescription>
              Seus marcos e realizações no curso
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => {
                const IconComponent = achievement.icon;
                return (
                  <div 
                    key={achievement.id} 
                    className={`p-4 rounded-lg border transition-all duration-200 ${
                      achievement.earned 
                        ? 'bg-success-light border-success/20 hover:border-success/40' 
                        : 'bg-muted/30 border-border hover:border-muted-foreground/20'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        achievement.earned 
                          ? 'bg-success text-success-foreground' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-medium ${
                          achievement.earned ? 'text-success' : 'text-muted-foreground'
                        }`}>
                          {achievement.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                        {achievement.earned && achievement.date && (
                          <p className="text-xs text-success mt-1">
                            Conquistado em {achievement.date}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Perfil;