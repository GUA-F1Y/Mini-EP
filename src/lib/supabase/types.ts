export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      tracks: {
        Row: {
          id: string
          track_number: number
          title: string
          artist: string
          album: string
          duration: number
          audio_url: string
          cover_url: string
          lyrics: string | null
          genre: string | null
          plays_count: number
          likes_count: number
          release_date: string
          created_at: string
        }
        Insert: {
          id?: string
          track_number: number
          title: string
          artist?: string
          album?: string
          duration?: number
          audio_url: string
          cover_url: string
          lyrics?: string | null
          genre?: string | null
          plays_count?: number
          likes_count?: number
          release_date?: string
          created_at?: string
        }
        Update: {
          id?: string
          track_number?: number
          title?: string
          artist?: string
          album?: string
          duration?: number
          audio_url?: string
          cover_url?: string
          lyrics?: string | null
          genre?: string | null
          plays_count?: number
          likes_count?: number
          release_date?: string
          created_at?: string
        }
        Relationships: []
      }
      fan_messages: {
        Row: {
          id: string
          name: string
          location: string | null
          message: string
          likes_count: number
          is_approved: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          location?: string | null
          message: string
          likes_count?: number
          is_approved?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          location?: string | null
          message?: string
          likes_count?: number
          is_approved?: boolean
          created_at?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          subject: string
          message: string
          type: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          subject: string
          message: string
          type?: string
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          subject?: string
          message?: string
          type?: string
          status?: string
          created_at?: string
        }
        Relationships: []
      }
      gallery_items: {
        Row: {
          id: string
          title: string
          image_url: string
          category: string
          aspect_ratio: string | null
          caption: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          image_url: string
          category?: string
          aspect_ratio?: string | null
          caption?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          image_url?: string
          category?: string
          aspect_ratio?: string | null
          caption?: string | null
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_track_likes: {
        Args: { track_id: string }
        Returns: undefined
      }
      increment_fan_message_likes: {
        Args: { msg_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// ── Helper types (mirrors the generated output from `supabase gen types`) ──────

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
        Database['public']['Views'])
    ? (Database['public']['Tables'] &
        Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database['public']['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never
