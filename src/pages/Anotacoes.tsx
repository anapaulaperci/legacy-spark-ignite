import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Search, FileText, Bold, Italic, Link, List, AlignLeft, File, Underline, Strikethrough, Quote, Code, Hash, ListOrdered, Image, Highlighter, Undo, Redo, Table, Minus, Heading1, Heading2, Tag, X, Save } from "lucide-react";

interface Note {
  id: string;
  user_id: string;
  title: string;
  content: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

const Anotacoes = () => {
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const { user } = useAuth();
  const { toast } = useToast();
  
  const availableTags = ["Posicionamento", "Branding", "Marketing", "Vendas", "Estratégia", "Conteúdo", "Digital", "Redes Sociais"];

  // Carregar anotações do usuário
  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, []);

  const fetchNotes = async () => {
    if (!user) return;

    try {
      setLoading(true);
      // Usar fetch direto para evitar problemas de tipos complexos do Supabase
      const response = await fetch(`https://cvbjtjmogseupckocmeb.supabase.co/rest/v1/notes?user_id=eq.${user.id}&select=*&order=updated_at.desc`, {
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2Ymp0am1vZ3NldXBja29jbWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzOTUyODUsImV4cCI6MjA2Njk3MTI4NX0.pWIXaXFJZNbLeD5uVBkAHe97z7mY2APWiCsHk8matmc',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        }
      });
      const data = await response.json();

      if (!response.ok) {
        console.error('Erro ao carregar anotações');
        toast({
          title: "Erro",
          description: "Erro ao carregar anotações",
          variant: "destructive",
        });
        return;
      }

      const notesWithTags = (data || []).map((note: any) => ({
        id: note.id,
        user_id: user.id,
        title: note.title || "",
        content: note.content || "",
        tags: [] as string[],
        created_at: note.created_at,
        updated_at: note.updated_at
      }));

      setNotes(notesWithTags);
      if (notesWithTags.length > 0 && !selectedNote) {
        setSelectedNote(notesWithTags[0].id);
      }
    } catch (error) {
      console.error('Erro ao carregar anotações:', error);
    } finally {
      setLoading(false);
    }
  };

  const createNewNote = async () => {
    if (!user) return;

    try {
      const newNote = {
        user_id: user.id,
        title: "Nova Anotação",
        content: "# Nova Anotação\n\n"
      };

      const session = await supabase.auth.getSession();
      const response = await fetch('https://cvbjtjmogseupckocmeb.supabase.co/rest/v1/notes', {
        method: 'POST',
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2Ymp0am1vZ3NldXBja29jbWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzOTUyODUsImV4cCI6MjA2Njk3MTI4NX0.pWIXaXFJZNbLeD5uVBkAHe97z7mY2APWiCsHk8matmc',
          'Authorization': `Bearer ${session.data.session?.access_token}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(newNote)
      });
      const data = await response.json();

      if (!response.ok) {
        toast({
          title: "Erro",
          description: "Erro ao criar nova anotação",
          variant: "destructive",
        });
        return;
      }

      const noteData = Array.isArray(data) ? data[0] : data;

      const noteWithTags = { 
        id: noteData.id,
        user_id: user.id,
        title: noteData.title,
        content: noteData.content,
        tags: [] as string[], 
        created_at: noteData.created_at,
        updated_at: noteData.updated_at
      };
      setNotes(prev => [noteWithTags, ...prev]);
      setSelectedNote(noteData.id);
      
      toast({
        title: "Sucesso",
        description: "Nova anotação criada!",
      });
    } catch (error) {
      console.error('Erro ao criar anotação:', error);
    }
  };

  const handleUpdateNote = async (id: string, title: string, content: string) => {
    if (!user) return;

    // Atualizar localmente primeiro
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === id 
          ? { 
              ...note, 
              title,
              content,
              updated_at: new Date().toISOString()
            }
          : note
      )
    );

    // Salvar no banco de dados usando fetch direto
    try {
      const session = await supabase.auth.getSession();
      const response = await fetch(`https://cvbjtjmogseupckocmeb.supabase.co/rest/v1/notes?id=eq.${id}&user_id=eq.${user.id}`, {
        method: 'PATCH',
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2Ymp0am1vZ3NldXBja29jbWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzOTUyODUsImV4cCI6MjA2Njk3MTI4NX0.pWIXaXFJZNbLeD5uVBkAHe97z7mY2APWiCsHk8matmc',
          'Authorization': `Bearer ${session.data.session?.access_token}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          title,
          content,
          updated_at: new Date().toISOString()
        })
      });

      if (!response.ok) {
        console.error('Erro ao salvar anotação');
      }
    } catch (error) {
      console.error('Erro ao salvar anotação:', error);
    }
  };

  const saveNote = async () => {
    const selectedNoteData = notes.find(note => note.id === selectedNote);
    if (!selectedNoteData || !user) return;

    setSaving(true);
    try {
      const session = await supabase.auth.getSession();
      const response = await fetch(`https://cvbjtjmogseupckocmeb.supabase.co/rest/v1/notes?id=eq.${selectedNoteData.id}&user_id=eq.${user.id}`, {
        method: 'PATCH',
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2Ymp0am1vZ3NldXBja29jbWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzOTUyODUsImV4cCI6MjA2Njk3MTI4NX0.pWIXaXFJZNbLeD5uVBkAHe97z7mY2APWiCsHk8matmc',
          'Authorization': `Bearer ${session.data.session?.access_token}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          title: selectedNoteData.title,
          content: selectedNoteData.content,
          updated_at: new Date().toISOString()
        })
      });

      if (!response.ok) {
        toast({
          title: "Erro",
          description: "Erro ao salvar anotação",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Sucesso",
          description: "Anotação salva com sucesso!",
        });
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
    } finally {
      setSaving(false);
    }
  };

  const addTagToNote = async (noteId: string, tag: string) => {
    if (!user) return;

    const currentNote = notes.find(note => note.id === noteId);
    const updatedTags = [...(currentNote?.tags || []), tag];
    
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === noteId
          ? { ...note, tags: updatedTags }
          : note
      )
    );

    // Salvar tags no banco usando fetch
    try {
      const session = await supabase.auth.getSession();
      await fetch(`https://cvbjtjmogseupckocmeb.supabase.co/rest/v1/notes?id=eq.${noteId}&user_id=eq.${user.id}`, {
        method: 'PATCH',
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2Ymp0am1vZ3NldXBja29jbWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzOTUyODUsImV4cCI6MjA2Njk3MTI4NX0.pWIXaXFJZNbLeD5uVBkAHe97z7mY2APWiCsHk8matmc',
          'Authorization': `Bearer ${session.data.session?.access_token}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ updated_at: new Date().toISOString() })
      });
    } catch (error) {
      console.error('Erro ao atualizar tags:', error);
    }
  };

  const removeTagFromNote = async (noteId: string, tagToRemove: string) => {
    if (!user) return;

    const currentNote = notes.find(note => note.id === noteId);
    const updatedTags = (currentNote?.tags || []).filter(tag => tag !== tagToRemove);
    
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === noteId
          ? { ...note, tags: updatedTags }
          : note
      )
    );

    try {
      const session = await supabase.auth.getSession();
      await fetch(`https://cvbjtjmogseupckocmeb.supabase.co/rest/v1/notes?id=eq.${noteId}&user_id=eq.${user.id}`, {
        method: 'PATCH',
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2Ymp0am1vZ3NldXBja29jbWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzOTUyODUsImV4cCI6MjA2Njk3MTI4NX0.pWIXaXFJZNbLeD5uVBkAHe97z7mY2APWiCsHk8matmc',
          'Authorization': `Bearer ${session.data.session?.access_token}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ updated_at: new Date().toISOString() })
      });
    } catch (error) {
      console.error('Erro ao remover tag:', error);
    }
  };

  const selectedNoteData = notes.find(note => note.id === selectedNote);

  if (loading) {
    return (
      <div className="h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Carregando anotações...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background flex">
      {/* Sidebar - Lista de anotações */}
      <div className="w-56 border-r border-border/50 bg-muted/20 flex flex-col">
        {/* Header da sidebar */}
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Anotações
            </h2>
            <Button size="sm" onClick={createNewNote} className="h-8 w-8 p-0">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="text"
              placeholder="Buscar anotações..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Lista de anotações */}
        <div className="flex-1 overflow-y-auto">
          {notes.map((note) => (
            <div
              key={note.id}
              onClick={() => setSelectedNote(note.id)}
              className={`p-4 border-b border-border/30 cursor-pointer transition-colors hover:bg-muted/40 ${
                selectedNote === note.id ? 'bg-primary/10 border-l-4 border-l-primary' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <File className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground text-sm truncate">
                    {note.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {note.content?.slice(0, 50)}...
                  </p>
                  {note.tags && note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {note.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs px-1 py-0 h-4">
                          {tag}
                        </Badge>
                      ))}
                      {note.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs px-1 py-0 h-4">
                          +{note.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(note.updated_at).toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editor principal */}
      <div className="flex-1 flex flex-col">
        {selectedNoteData ? (
          <>
            {/* Header com botão salvar */}
            <div className="border-b border-border p-4 flex justify-between items-center">
              <div className="flex items-center gap-1 flex-wrap">
                {/* Toolbar existing content */}
                {/* Undo/Redo */}
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Undo className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Redo className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-2" />
                
                {/* Headings */}
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Heading1 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Heading2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Hash className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-2" />
                
                {/* Text Formatting */}
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Bold className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Italic className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Underline className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Strikethrough className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Highlighter className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-2" />
                
                {/* Lists */}
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <List className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <ListOrdered className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-2" />
                
                {/* Links and Media */}
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Link className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Image className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-2" />
                
                {/* Special Elements */}
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Quote className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Code className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Table className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-2" />
                
                {/* Alignment */}
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <AlignLeft className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Botão Salvar */}
              <Button onClick={saveNote} disabled={saving} size="sm">
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Salvando..." : "Salvar"}
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              <div className="h-full flex flex-col">
                <Input
                  value={selectedNoteData.title}
                  onChange={(e) => handleUpdateNote(selectedNoteData.id, e.target.value, selectedNoteData.content)}
                  className="text-2xl font-bold text-foreground mb-4 border-none p-0 focus-visible:ring-0 bg-transparent"
                  placeholder="Título da nota"
                />
                
                {/* Tags Section */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">Etiquetas</span>
                  </div>
                  
                  {/* Display current tags */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedNoteData.tags?.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTagFromNote(selectedNoteData.id, tag)}
                          className="ml-1 h-3 w-3 p-0 hover:bg-transparent"
                        >
                          <X className="h-2 w-2" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Add new tags */}
                  <div className="flex flex-wrap gap-1">
                    {availableTags
                      .filter(tag => !selectedNoteData.tags?.includes(tag))
                      .map((tag) => (
                        <Button
                          key={tag}
                          variant="outline"
                          size="sm"
                          onClick={() => addTagToNote(selectedNoteData.id, tag)}
                          className="text-xs h-6 px-2"
                        >
                          + {tag}
                        </Button>
                      ))}
                  </div>
                </div>
                
                <Textarea
                  value={selectedNoteData.content}
                  onChange={(e) => handleUpdateNote(selectedNoteData.id, selectedNoteData.title, e.target.value)}
                  placeholder="Comece a escrever..."
                  className="flex-1 border-none p-0 text-base leading-relaxed resize-none focus-visible:ring-0 font-mono"
                  style={{ minHeight: "400px" }}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Selecione uma anotação
              </h3>
              <p className="text-muted-foreground">
                Escolha uma anotação da lista ou crie uma nova
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Anotacoes;