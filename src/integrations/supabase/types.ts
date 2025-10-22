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
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          description: string | null
          icon: string
          gradient: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          icon: string
          gradient?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          icon?: string
          gradient?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      lotteries: {
        Row: {
          id: string
          title: string
          description: string
          image_url: string
          category_id: string | null
          ticket_price: number
          total_tickets: number
          sold_tickets: number | null
          start_time: string
          end_time: string
          status: string | null
          featured: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          image_url: string
          category_id?: string | null
          ticket_price?: number
          total_tickets?: number
          sold_tickets?: number | null
          start_time?: string
          end_time: string
          status?: string | null
          featured?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          image_url?: string
          category_id?: string | null
          ticket_price?: number
          total_tickets?: number
          sold_tickets?: number | null
          start_time?: string
          end_time?: string
          status?: string | null
          featured?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lotteries_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
      tickets: {
        Row: {
          id: string
          user_id: string | null
          lottery_id: string | null
          ticket_number: string
          purchase_price: number
          purchased_at: string
          status: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          lottery_id?: string | null
          ticket_number: string
          purchase_price: number
          purchased_at?: string
          status?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          lottery_id?: string | null
          ticket_number?: string
          purchase_price?: number
          purchased_at?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tickets_lottery_id_fkey"
            columns: ["lottery_id"]
            isOneToOne: false
            referencedRelation: "lotteries"
            referencedColumns: ["id"]
          }
        ]
      }
      user_profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          wallet_balance: number | null
          phone: string | null
          date_of_birth: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          wallet_balance?: number | null
          phone?: string | null
          date_of_birth?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          wallet_balance?: number | null
          phone?: string | null
          date_of_birth?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      winners: {
        Row: {
          id: string
          lottery_id: string | null
          user_id: string | null
          ticket_id: string | null
          prize_description: string
          won_at: string
          claimed: boolean | null
          claimed_at: string | null
        }
        Insert: {
          id?: string
          lottery_id?: string | null
          user_id?: string | null
          ticket_id?: string | null
          prize_description: string
          won_at?: string
          claimed?: boolean | null
          claimed_at?: string | null
        }
        Update: {
          id?: string
          lottery_id?: string | null
          user_id?: string | null
          ticket_id?: string | null
          prize_description?: string
          won_at?: string
          claimed?: boolean | null
          claimed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "winners_lottery_id_fkey"
            columns: ["lottery_id"]
            isOneToOne: false
            referencedRelation: "lotteries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "winners_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
