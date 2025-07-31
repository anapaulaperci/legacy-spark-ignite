import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, FileText, Bold, Italic, Link, List, AlignLeft, File, Underline, Strikethrough, Quote, Code, Hash, ListOrdered, Image, Highlighter, Undo, Redo, Table, Minus, Heading1, Heading2, Tag, X } from "lucide-react";

const Anotacoes = () => {
  const [selectedNote, setSelectedNote] = useState<number | null>(1);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  
  const availableTags = ["Posicionamento", "Branding", "Marketing", "Vendas", "Estratégia", "Conteúdo", "Digital", "Redes Sociais"];
  
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Anotações da Imersão - Dia 1",
      preview: "Principais conceitos sobre posicionamento digital...",
      content: "# Anotações da Imersão - Dia 1\n\n## Principais conceitos sobre posicionamento digital\n\nEscreva aqui suas anotações da primeira palestra...",
      lastModified: "2 min atrás",
      tags: ["Posicionamento", "Digital"]
    },
    {
      id: 2,
      title: "Estratégias de Branding",
      preview: "Como construir uma marca forte no mercado...",
      content: "# Estratégias de Branding\n\n## Como construir uma marca forte\n\nSuas anotações sobre branding...",
      lastModified: "1 hora atrás",
      tags: ["Branding", "Estratégia"]
    }
  ]);

  const createNewNote = () => {
    const newNote = {
      id: Date.now(),
      title: "Nova Anotação",
      preview: "Comece a escrever...",
      content: "# Nova Anotação\n\n",
      lastModified: "agora",
      tags: []
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote.id);
  };

  const handleUpdateNote = useCallback((id: number, title: string, content: string) => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === id 
          ? { 
              ...note, 
              title,
              content,
              preview: content.slice(0, 50) + "...",
              lastModified: "agora"
            }
          : note
      )
    );
  }, []);

  const addTagToNote = (noteId: number, tag: string) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === noteId
          ? { ...note, tags: [...(note.tags || []), tag] }
          : note
      )
    );
  };

  const removeTagFromNote = (noteId: number, tagToRemove: string) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === noteId
          ? { ...note, tags: (note.tags || []).filter(tag => tag !== tagToRemove) }
          : note
      )
    );
  };

  const selectedNoteData = notes.find(note => note.id === selectedNote);

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
                    {note.preview}
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
                    {note.lastModified}
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
            {/* Toolbar */}
            <div className="border-b border-border p-4">
              <div className="flex items-center gap-1 flex-wrap">
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