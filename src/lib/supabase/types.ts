export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
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
      }
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
  }
}
