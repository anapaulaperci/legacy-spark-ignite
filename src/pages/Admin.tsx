import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Users, Shield, UserX, Plus, Search, Crown, Trash2, AlertTriangle } from "lucide-react";

interface Profile {
  id: string;
  user_id: string;
  display_name: string;
  avatar_url?: string;
  role: string;
  created_at: string;
  updated_at: string;
}

const Admin = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newUserRole, setNewUserRole] = useState("user");
  const [creating, setCreating] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchUserRole();
    fetchProfiles();
  }, [user]);

  const fetchUserRole = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error('Error fetching user role:', error);
      return;
    }

    setUserRole(data?.role || 'user');
  };

  const fetchProfiles = async () => {
    setLoading(true);
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Erro",
        description: "Erro ao carregar usuários.",
        variant: "destructive",
      });
    } else {
      setProfiles(data || []);
    }
    
    setLoading(false);
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('user_id', userId);

    if (error) {
      toast({
        title: "Erro",
        description: "Erro ao atualizar papel do usuário.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Sucesso",
        description: "Papel do usuário atualizado com sucesso!",
      });
      fetchProfiles();
    }
  };

  const createNewUser = async () => {
    if (!newUserEmail || !newUserPassword || !newUserName) {
      toast({
        title: "Erro",
        description: "Todos os campos são obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    setCreating(true);

    try {
      // Criar usuário usando signUp, mas sem confirmar email automaticamente
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newUserEmail,
        password: newUserPassword,
        options: {
          data: {
            display_name: newUserName
          },
          emailRedirectTo: undefined // Não redirecionar automaticamente
        }
      });

      if (authError) {
        toast({
          title: "Erro",
          description: `Erro ao criar usuário: ${authError.message}`,
          variant: "destructive",
        });
        return;
      }

      if (authData.user) {
        // Aguardar um pouco para o perfil ser criado automaticamente
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Atualizar o perfil com o papel especificado
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ 
            role: newUserRole,
            display_name: newUserName 
          })
          .eq('user_id', authData.user.id);

        if (profileError) {
          console.error('Erro ao atualizar perfil:', profileError);
        }

        toast({
          title: "Sucesso",
          description: `Usuário ${newUserName} criado com sucesso! Email de confirmação enviado.`,
        });

        // Limpar formulário e fechar modal
        setNewUserEmail("");
        setNewUserPassword("");
        setNewUserName("");
        setNewUserRole("user");
        setIsCreateDialogOpen(false);
        
        // Recarregar lista de usuários
        fetchProfiles();
      }

    } catch (error: any) {
      console.error('Erro ao criar usuário:', error);
      toast({
        title: "Erro",
        description: "Erro inesperado ao criar usuário.",
        variant: "destructive",
      });
    } finally {
      setCreating(false);
    }
  };

  const deleteUser = async (userId: string) => {
    setDeleting(true);
    
    try {
      // Delete user profile
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('user_id', userId);

      if (profileError) {
        toast({
          title: "Erro",
          description: "Erro ao excluir perfil do usuário.",
          variant: "destructive",
        });
        return;
      }

      // Delete auth user (requires admin API call)
      const { error: authError } = await supabase.auth.admin.deleteUser(userId);

      if (authError) {
        toast({
          title: "Erro",
          description: "Erro ao excluir usuário do sistema de autenticação.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Sucesso",
        description: "Usuário excluído com sucesso!",
      });
      
      setDeleteUserId(null);
      fetchProfiles();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro inesperado ao excluir usuário.",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  const filteredProfiles = profiles.filter(profile =>
    profile.display_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.user_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'destructive';
      case 'moderator':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="h-4 w-4" />;
      case 'moderator':
        return <Shield className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  if (userRole !== 'admin') {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <UserX className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Acesso Negado</h3>
              <p className="text-muted-foreground">
                Você não tem permissão para acessar esta área. Apenas administradores podem gerenciar usuários.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl blur opacity-20 animate-pulse"></div>
              <div className="relative p-6 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl shadow-xl border border-white/20">
                <Crown className="h-16 w-16 text-transparent bg-gradient-to-br from-red-600 to-orange-600 bg-clip-text" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-600 via-orange-600 to-red-800 bg-clip-text text-transparent">
              Administração
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Controle total do sistema - Gerencie usuários, permissões e configurações
          </p>
          <Badge variant="destructive" className="flex items-center gap-2 mx-auto w-fit mt-4">
            <Crown className="h-4 w-4" />
            Acesso Administrativo
          </Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Total de Usuários</CardTitle>
              <Users className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">{profiles.length}</div>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">usuários registrados</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-700 dark:text-red-300">Administradores</CardTitle>
              <Crown className="h-5 w-5 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-900 dark:text-red-100">
                {profiles.filter(p => p.role === 'admin').length}
              </div>
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">com acesso total</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 border-emerald-200 dark:border-emerald-800 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Usuários Ativos</CardTitle>
              <Shield className="h-5 w-5 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">
                {profiles.filter(p => p.role === 'user').length}
              </div>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">usuários padrão</p>
            </CardContent>
          </Card>
        </div>

        {/* User Management */}
        <div className="max-w-6xl mx-auto">
          <Card className="shadow-2xl border-0 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-700 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Users className="h-6 w-6" />
                    Gerenciamento de Usuários
                  </CardTitle>
                  <CardDescription className="text-base mt-2">
                    Controle completo sobre usuários, permissões e acesso ao sistema
                  </CardDescription>
                </div>
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg" size="lg">
                      <Plus className="h-4 w-4" />
                      Criar Usuário
                    </Button>
                  </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Criar Novo Usuário</DialogTitle>
                  <DialogDescription>
                    Preencha os dados para criar um novo usuário no sistema.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      placeholder="Nome completo"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@exemplo.com"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Senha (mínimo 6 caracteres)"
                      value={newUserPassword}
                      onChange={(e) => setNewUserPassword(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="role">Papel</Label>
                    <Select value={newUserRole} onValueChange={setNewUserRole}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">Usuário</SelectItem>
                        <SelectItem value="moderator">Moderador</SelectItem>
                        <SelectItem value="admin">Administrador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                    disabled={creating}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={createNewUser} disabled={creating}>
                    {creating ? "Criando..." : "Criar Usuário"}
                  </Button>
                </DialogFooter>
              </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="p-6">
          {/* Search */}
          <div className="mb-6">
            <Label htmlFor="search" className="sr-only">Buscar usuários</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Buscar por nome, email ou papel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Users Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Papel</TableHead>
                  <TableHead>Criado em</TableHead>
                  <TableHead className="text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6">
                      Carregando usuários...
                    </TableCell>
                  </TableRow>
                ) : filteredProfiles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6">
                      Nenhum usuário encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProfiles.map((profile) => (
                    <TableRow key={profile.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                            {getRoleIcon(profile.role)}
                          </div>
                          <div>
                            <div className="font-medium">
                              {profile.display_name || 'Sem nome'}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {profile.user_id}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {profile.user_id.slice(0, 8)}...
                      </TableCell>
                      <TableCell>
                        <Badge variant={getRoleBadgeVariant(profile.role)}>
                          {profile.role === 'admin' ? 'Administrador' : 
                           profile.role === 'moderator' ? 'Moderador' : 'Usuário'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(profile.created_at).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Select
                            value={profile.role}
                            onValueChange={(newRole) => updateUserRole(profile.user_id, newRole)}
                            disabled={profile.user_id === user?.id}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="user">Usuário</SelectItem>
                              <SelectItem value="moderator">Moderador</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          {profile.user_id !== user?.id && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setDeleteUserId(profile.user_id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Delete Confirmation Dialog */}
          <Dialog open={!!deleteUserId} onOpenChange={() => setDeleteUserId(null)}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                  Confirmar Exclusão
                </DialogTitle>
                <DialogDescription>
                  Esta ação é <strong>irreversível</strong>. O usuário será excluído permanentemente do sistema, incluindo todos os seus dados.
                </DialogDescription>
              </DialogHeader>
              <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-700 dark:text-red-300">
                  ⚠️ <strong>Atenção:</strong> Todos os dados relacionados a este usuário serão perdidos permanentemente.
                </p>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setDeleteUserId(null)}
                  disabled={deleting}
                >
                  Cancelar
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => deleteUserId && deleteUser(deleteUserId)}
                  disabled={deleting}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {deleting ? "Excluindo..." : "Excluir Usuário"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;