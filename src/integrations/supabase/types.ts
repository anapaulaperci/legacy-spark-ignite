export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      briefings: {
        Row: {
          additional_info: string
          app_name: string
          authentication: string
          colors: string
          context: string
          created_at: string
          data_storage: string
          devices: string[]
          differential: string
          features: string[]
          how_they_use: string
          id: string
          integrations: string
          monetization: string
          objective: string
          target_audience: string
          tone: string
          updated_at: string
          user_flow: string
          visual_style: string
        }
        Insert: {
          additional_info: string
          app_name: string
          authentication: string
          colors: string
          context: string
          created_at?: string
          data_storage: string
          devices?: string[]
          differential: string
          features?: string[]
          how_they_use: string
          id?: string
          integrations: string
          monetization: string
          objective: string
          target_audience: string
          tone: string
          updated_at?: string
          user_flow: string
          visual_style: string
        }
        Update: {
          additional_info?: string
          app_name?: string
          authentication?: string
          colors?: string
          context?: string
          created_at?: string
          data_storage?: string
          devices?: string[]
          differential?: string
          features?: string[]
          how_they_use?: string
          id?: string
          integrations?: string
          monetization?: string
          objective?: string
          target_audience?: string
          tone?: string
          updated_at?: string
          user_flow?: string
          visual_style?: string
        }
        Relationships: []
      }
      call_recordings: {
        Row: {
          client_id: string
          created_at: string
          duration_seconds: number | null
          id: string
          recording_url: string
          title: string
          transcription: string | null
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          duration_seconds?: number | null
          id?: string
          recording_url: string
          title: string
          transcription?: string | null
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          duration_seconds?: number | null
          id?: string
          recording_url?: string
          title?: string
          transcription?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "call_recordings_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      call_summaries: {
        Row: {
          call_date: string
          client_id: string
          created_at: string
          id: string
          summary: string
          transcription: string
          updated_at: string
        }
        Insert: {
          call_date: string
          client_id: string
          created_at?: string
          id?: string
          summary: string
          transcription: string
          updated_at?: string
        }
        Update: {
          call_date?: string
          client_id?: string
          created_at?: string
          id?: string
          summary?: string
          transcription?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "call_summaries_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      client_links: {
        Row: {
          client_id: string
          created_at: string
          description: string | null
          id: string
          tags: string[] | null
          title: string
          updated_at: string
          url: string
        }
        Insert: {
          client_id: string
          created_at?: string
          description?: string | null
          id?: string
          tags?: string[] | null
          title: string
          updated_at?: string
          url: string
        }
        Update: {
          client_id?: string
          created_at?: string
          description?: string | null
          id?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_links_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      client_notes: {
        Row: {
          client_id: string
          content: string
          created_at: string
          id: string
          title: string
          updated_at: string
        }
        Insert: {
          client_id: string
          content: string
          created_at?: string
          id?: string
          title: string
          updated_at?: string
        }
        Update: {
          client_id?: string
          content?: string
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_notes_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      client_tasks: {
        Row: {
          assigned_to: string | null
          assigned_to_name: string | null
          client_id: string
          created_at: string
          description: string | null
          id: string
          link: string | null
          sector: string | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          assigned_to_name?: string | null
          client_id: string
          created_at?: string
          description?: string | null
          id?: string
          link?: string | null
          sector?: string | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          assigned_to_name?: string | null
          client_id?: string
          created_at?: string
          description?: string | null
          id?: string
          link?: string | null
          sector?: string | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_tasks_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          created_at: string
          id: string
          instagram_channel: string | null
          name: string
          niche: string
          photo_url: string | null
          tiktok_channel: string | null
          updated_at: string
          user_id: string
          youtube_channel: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          instagram_channel?: string | null
          name: string
          niche: string
          photo_url?: string | null
          tiktok_channel?: string | null
          updated_at?: string
          user_id: string
          youtube_channel?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          instagram_channel?: string | null
          name?: string
          niche?: string
          photo_url?: string | null
          tiktok_channel?: string | null
          updated_at?: string
          user_id?: string
          youtube_channel?: string | null
        }
        Relationships: []
      }
      course_access: {
        Row: {
          course_id: string
          expires_at: string | null
          granted_at: string
          granted_by: string
          id: string
          user_id: string
        }
        Insert: {
          course_id: string
          expires_at?: string | null
          granted_at?: string
          granted_by?: string
          id?: string
          user_id: string
        }
        Update: {
          course_id?: string
          expires_at?: string | null
          granted_at?: string
          granted_by?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_access_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      course_modules: {
        Row: {
          content: string | null
          course_id: string
          created_at: string
          description: string | null
          duration_minutes: number | null
          id: string
          is_published: boolean
          order_index: number
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          content?: string | null
          course_id: string
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_published?: boolean
          order_index?: number
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          content?: string | null
          course_id?: string
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_published?: boolean
          order_index?: number
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_modules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      course_progress: {
        Row: {
          completed_at: string | null
          course_id: string
          id: string
          last_accessed_at: string | null
          module_id: string
          progress_percentage: number | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          course_id: string
          id?: string
          last_accessed_at?: string | null
          module_id: string
          progress_percentage?: number | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          course_id?: string
          id?: string
          last_accessed_at?: string | null
          module_id?: string
          progress_percentage?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_progress_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_progress_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "course_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: string
          is_published: boolean
          order_index: number
          thumbnail_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          is_published?: boolean
          order_index?: number
          thumbnail_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          is_published?: boolean
          order_index?: number
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      ideias: {
        Row: {
          created_at: string
          id: string
          ideia: string
          nome: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          ideia: string
          nome: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          ideia?: string
          nome?: string
          updated_at?: string
        }
        Relationships: []
      }
      imports: {
        Row: {
          created_at: string
          file_type: string
          id: string
          name: string
          records_count: number
          user_id: string
        }
        Insert: {
          created_at?: string
          file_type: string
          id?: string
          name: string
          records_count?: number
          user_id: string
        }
        Update: {
          created_at?: string
          file_type?: string
          id?: string
          name?: string
          records_count?: number
          user_id?: string
        }
        Relationships: []
      }
      lead_interactions: {
        Row: {
          created_at: string
          id: string
          interaction_type: string
          interaction_value: string | null
          lead_id: string
          metadata: Json | null
          score_impact: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          interaction_type: string
          interaction_value?: string | null
          lead_id: string
          metadata?: Json | null
          score_impact?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          interaction_type?: string
          interaction_value?: string | null
          lead_id?: string
          metadata?: Json | null
          score_impact?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_interactions_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_tags: {
        Row: {
          color: string
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          color?: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          color?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          behavioral_score: number | null
          company: string | null
          conversion_date: string | null
          created_at: string
          demographic_score: number | null
          email: string
          engagement_score: number | null
          id: string
          job_title: string | null
          last_interaction_at: string | null
          lead_source: string
          name: string
          notes: string | null
          phone: string | null
          predicted_conversion_probability: number | null
          status: string
          tags: string[] | null
          total_score: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          behavioral_score?: number | null
          company?: string | null
          conversion_date?: string | null
          created_at?: string
          demographic_score?: number | null
          email: string
          engagement_score?: number | null
          id?: string
          job_title?: string | null
          last_interaction_at?: string | null
          lead_source?: string
          name: string
          notes?: string | null
          phone?: string | null
          predicted_conversion_probability?: number | null
          status?: string
          tags?: string[] | null
          total_score?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          behavioral_score?: number | null
          company?: string | null
          conversion_date?: string | null
          created_at?: string
          demographic_score?: number | null
          email?: string
          engagement_score?: number | null
          id?: string
          job_title?: string | null
          last_interaction_at?: string | null
          lead_source?: string
          name?: string
          notes?: string | null
          phone?: string | null
          predicted_conversion_probability?: number | null
          status?: string
          tags?: string[] | null
          total_score?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      meetings: {
        Row: {
          created_at: string
          duration_minutes: number | null
          end_time: string | null
          id: string
          meeting_title: string
          meeting_topic: string | null
          meeting_url: string | null
          participant_count: number | null
          start_time: string
          status: string
          updated_at: string
          user_id: string
          zoom_meeting_id: string
        }
        Insert: {
          created_at?: string
          duration_minutes?: number | null
          end_time?: string | null
          id?: string
          meeting_title: string
          meeting_topic?: string | null
          meeting_url?: string | null
          participant_count?: number | null
          start_time: string
          status?: string
          updated_at?: string
          user_id: string
          zoom_meeting_id: string
        }
        Update: {
          created_at?: string
          duration_minutes?: number | null
          end_time?: string | null
          id?: string
          meeting_title?: string
          meeting_topic?: string | null
          meeting_url?: string | null
          participant_count?: number | null
          start_time?: string
          status?: string
          updated_at?: string
          user_id?: string
          zoom_meeting_id?: string
        }
        Relationships: []
      }
      mentorship_schedule: {
        Row: {
          client_id: string
          created_at: string
          description: string | null
          duration_minutes: number | null
          id: string
          scheduled_date: string
          status: string | null
          title: string
          updated_at: string
          zoom_link: string | null
        }
        Insert: {
          client_id: string
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          scheduled_date: string
          status?: string | null
          title: string
          updated_at?: string
          zoom_link?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          scheduled_date?: string
          status?: string | null
          title?: string
          updated_at?: string
          zoom_link?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mentorship_schedule_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      notes: {
        Row: {
          content: string
          created_at: string
          id: string
          title: string
          updated_at: string
        }
        Insert: {
          content?: string
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      participants: {
        Row: {
          channel: string
          created_at: string
          id: string
          name: string
          niche: string
          photo: string | null
          weekly_progress: Json
        }
        Insert: {
          channel: string
          created_at?: string
          id: string
          name: string
          niche: string
          photo?: string | null
          weekly_progress?: Json
        }
        Update: {
          channel?: string
          created_at?: string
          id?: string
          name?: string
          niche?: string
          photo?: string | null
          weekly_progress?: Json
        }
        Relationships: []
      }
      processing_logs: {
        Row: {
          created_at: string
          details: Json | null
          error_message: string | null
          id: string
          processing_time_ms: number | null
          status: string
          step_name: string
          transcription_id: string
        }
        Insert: {
          created_at?: string
          details?: Json | null
          error_message?: string | null
          id?: string
          processing_time_ms?: number | null
          status: string
          step_name: string
          transcription_id: string
        }
        Update: {
          created_at?: string
          details?: Json | null
          error_message?: string | null
          id?: string
          processing_time_ms?: number | null
          status?: string
          step_name?: string
          transcription_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "processing_logs_transcription_id_fkey"
            columns: ["transcription_id"]
            isOneToOne: false
            referencedRelation: "transcriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          role?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      project_members: {
        Row: {
          id: string
          joined_at: string
          project_id: string
          role: string | null
          user_id: string
        }
        Insert: {
          id?: string
          joined_at?: string
          project_id: string
          role?: string | null
          user_id: string
        }
        Update: {
          id?: string
          joined_at?: string
          project_id?: string
          role?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_project_members_project_id"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          color: string | null
          created_at: string
          created_by: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          color?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      redacoes: {
        Row: {
          categoria: string | null
          competencia_1: number | null
          competencia_2: number | null
          competencia_3: number | null
          competencia_4: number | null
          competencia_5: number | null
          created_at: string
          feedback_competencias: Json | null
          feedback_geral: string | null
          id: string
          pontuacao_total: number | null
          redacao: string
          status: string | null
          tema: string
          titulo: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          categoria?: string | null
          competencia_1?: number | null
          competencia_2?: number | null
          competencia_3?: number | null
          competencia_4?: number | null
          competencia_5?: number | null
          created_at?: string
          feedback_competencias?: Json | null
          feedback_geral?: string | null
          id?: string
          pontuacao_total?: number | null
          redacao: string
          status?: string | null
          tema: string
          titulo: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          categoria?: string | null
          competencia_1?: number | null
          competencia_2?: number | null
          competencia_3?: number | null
          competencia_4?: number | null
          competencia_5?: number | null
          created_at?: string
          feedback_competencias?: Json | null
          feedback_geral?: string | null
          id?: string
          pontuacao_total?: number | null
          redacao?: string
          status?: string | null
          tema?: string
          titulo?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      sales: {
        Row: {
          cliente: string
          created_at: string
          data: string
          id: string
          import_name: string
          produto: string | null
          user_id: string
          valor: number
        }
        Insert: {
          cliente: string
          created_at?: string
          data: string
          id?: string
          import_name: string
          produto?: string | null
          user_id: string
          valor: number
        }
        Update: {
          cliente?: string
          created_at?: string
          data?: string
          id?: string
          import_name?: string
          produto?: string | null
          user_id?: string
          valor?: number
        }
        Relationships: []
      }
      scoring_rules: {
        Row: {
          category: string
          condition_field: string
          condition_operator: string
          condition_value: string
          created_at: string
          id: string
          is_active: boolean | null
          rule_name: string
          score_points: number
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          condition_field: string
          condition_operator: string
          condition_value: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          rule_name: string
          score_points: number
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          condition_field?: string
          condition_operator?: string
          condition_value?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          rule_name?: string
          score_points?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      study_areas: {
        Row: {
          color: string
          created_at: string
          description: string | null
          id: string
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          color?: string
          created_at?: string
          description?: string | null
          id?: string
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          color?: string
          created_at?: string
          description?: string | null
          id?: string
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      study_notes: {
        Row: {
          content: string
          created_at: string
          id: string
          study_area_id: string | null
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          study_area_id?: string | null
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          study_area_id?: string | null
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "study_notes_study_area_id_fkey"
            columns: ["study_area_id"]
            isOneToOne: false
            referencedRelation: "study_areas"
            referencedColumns: ["id"]
          },
        ]
      }
      study_references: {
        Row: {
          created_at: string
          description: string | null
          id: string
          study_area_id: string | null
          title: string
          updated_at: string
          url: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          study_area_id?: string | null
          title: string
          updated_at?: string
          url: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          study_area_id?: string | null
          title?: string
          updated_at?: string
          url?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "study_references_study_area_id_fkey"
            columns: ["study_area_id"]
            isOneToOne: false
            referencedRelation: "study_areas"
            referencedColumns: ["id"]
          },
        ]
      }
      study_tasks: {
        Row: {
          completed: boolean
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          priority: string
          study_area_id: string | null
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          completed?: boolean
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string
          study_area_id?: string | null
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          completed?: boolean
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string
          study_area_id?: string | null
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "study_tasks_study_area_id_fkey"
            columns: ["study_area_id"]
            isOneToOne: false
            referencedRelation: "study_areas"
            referencedColumns: ["id"]
          },
        ]
      }
      swipefile_access: {
        Row: {
          client_id: string
          granted_at: string
          granted_by: string
          id: string
          swipefile_id: string
        }
        Insert: {
          client_id: string
          granted_at?: string
          granted_by?: string
          id?: string
          swipefile_id: string
        }
        Update: {
          client_id?: string
          granted_at?: string
          granted_by?: string
          id?: string
          swipefile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "swipefile_access_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "swipefile_access_swipefile_id_fkey"
            columns: ["swipefile_id"]
            isOneToOne: false
            referencedRelation: "swipefiles"
            referencedColumns: ["id"]
          },
        ]
      }
      swipefiles: {
        Row: {
          content: string | null
          created_at: string
          created_by: string
          description: string | null
          file_type: string | null
          file_url: string | null
          id: string
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          assignee_id: string | null
          created_at: string
          created_by: string
          description: string | null
          due_date: string | null
          id: string
          priority: string
          project_id: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          assignee_id?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string
          project_id: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          assignee_id?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string
          project_id?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_tasks_project_id"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      transcriptions: {
        Row: {
          confidence_score: number | null
          content: string
          created_at: string
          id: string
          language: string | null
          meeting_id: string
          processing_status: string
          speakers: Json | null
          timestamps: Json | null
          updated_at: string
          word_count: number | null
        }
        Insert: {
          confidence_score?: number | null
          content: string
          created_at?: string
          id?: string
          language?: string | null
          meeting_id: string
          processing_status?: string
          speakers?: Json | null
          timestamps?: Json | null
          updated_at?: string
          word_count?: number | null
        }
        Update: {
          confidence_score?: number | null
          content?: string
          created_at?: string
          id?: string
          language?: string | null
          meeting_id?: string
          processing_status?: string
          speakers?: Json | null
          timestamps?: Json | null
          updated_at?: string
          word_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "transcriptions_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "meetings"
            referencedColumns: ["id"]
          },
        ]
      }
      user_permissions: {
        Row: {
          can_create_users: boolean | null
          can_delete_users: boolean | null
          can_edit_users: boolean | null
          can_manage_clients: boolean | null
          can_view_all_clients: boolean | null
          created_at: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          can_create_users?: boolean | null
          can_delete_users?: boolean | null
          can_edit_users?: boolean | null
          can_manage_clients?: boolean | null
          can_view_all_clients?: boolean | null
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          can_create_users?: boolean | null
          can_delete_users?: boolean | null
          can_edit_users?: boolean | null
          can_manage_clients?: boolean | null
          can_view_all_clients?: boolean | null
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      webhook_configs: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          last_triggered_at: string | null
          name: string
          secret_key: string | null
          total_received: number | null
          updated_at: string
          user_id: string
          webhook_url: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          last_triggered_at?: string | null
          name: string
          secret_key?: string | null
          total_received?: number | null
          updated_at?: string
          user_id: string
          webhook_url: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          last_triggered_at?: string | null
          name?: string
          secret_key?: string | null
          total_received?: number | null
          updated_at?: string
          user_id?: string
          webhook_url?: string
        }
        Relationships: []
      }
      webhook_logs: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          leads_created: number | null
          payload: Json
          status: string
          webhook_config_id: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          leads_created?: number | null
          payload: Json
          status?: string
          webhook_config_id: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          leads_created?: number | null
          payload?: Json
          status?: string
          webhook_config_id?: string
        }
        Relationships: []
      }
      youtube_videos: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          study_area_id: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string
          url: string
          user_id: string | null
          video_id: string
          watched: boolean
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          study_area_id?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          url: string
          user_id?: string | null
          video_id: string
          watched?: boolean
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          study_area_id?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          url?: string
          user_id?: string | null
          video_id?: string
          watched?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "youtube_videos_study_area_id_fkey"
            columns: ["study_area_id"]
            isOneToOne: false
            referencedRelation: "study_areas"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      current_user_is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      ensure_admin_setup: {
        Args: { user_email: string }
        Returns: string
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      has_permission: {
        Args: { permission_name: string }
        Returns: boolean
      }
      promote_to_admin: {
        Args: { user_email?: string }
        Returns: string
      }
      promote_user_to_admin: {
        Args: { user_email: string }
        Returns: string
      }
      remove_tag_from_all_leads: {
        Args: { tag_name: string }
        Returns: undefined
      }
    }
    Enums: {
      user_role: "admin" | "manager" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["admin", "manager", "user"],
    },
  },
} as const
