export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action: string
          created_at: string
          id: string
          ip_address: string | null
          metadata: Json
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          ip_address?: string | null
          metadata?: Json
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          ip_address?: string | null
          metadata?: Json
          user_id?: string | null
        }
        Relationships: []
      }
      affiliate_attributions: {
        Row: {
          affiliate_id: string
          code: string
          created_at: string
          discount_usd: number
          email: string
          id: string
          source: string
          user_id: string | null
        }
        Insert: {
          affiliate_id: string
          code: string
          created_at?: string
          discount_usd: number
          email: string
          id?: string
          source?: string
          user_id?: string | null
        }
        Update: {
          affiliate_id?: string
          code?: string
          created_at?: string
          discount_usd?: number
          email?: string
          id?: string
          source?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_attributions_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliate_resource_access: {
        Row: {
          access_type: string
          affiliate_id: string
          created_at: string
          id: string
          ip_hash: string | null
          resource_id: string
          resource_version: string | null
          user_agent: string | null
        }
        Insert: {
          access_type?: string
          affiliate_id: string
          created_at?: string
          id?: string
          ip_hash?: string | null
          resource_id: string
          resource_version?: string | null
          user_agent?: string | null
        }
        Update: {
          access_type?: string
          affiliate_id?: string
          created_at?: string
          id?: string
          ip_hash?: string | null
          resource_id?: string
          resource_version?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_resource_access_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "affiliate_resource_access_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "affiliate_resources"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliate_resources: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          file_path: string
          id: string
          resource_type: string
          slug: string
          status: string
          subtitle: string | null
          title: string
          updated_at: string
          version: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          file_path: string
          id?: string
          resource_type?: string
          slug: string
          status?: string
          subtitle?: string | null
          title: string
          updated_at?: string
          version?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          file_path?: string
          id?: string
          resource_type?: string
          slug?: string
          status?: string
          subtitle?: string | null
          title?: string
          updated_at?: string
          version?: string
        }
        Relationships: []
      }
      affiliates: {
        Row: {
          code: string
          country_code: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          payout_country: string | null
          payout_recipient_name: string | null
          paypal_email: string | null
          status: string
          terms_accepted_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          code: string
          country_code?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          payout_country?: string | null
          payout_recipient_name?: string | null
          paypal_email?: string | null
          status?: string
          terms_accepted_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          code?: string
          country_code?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          payout_country?: string | null
          payout_recipient_name?: string | null
          paypal_email?: string | null
          status?: string
          terms_accepted_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      commissions: {
        Row: {
          affiliate_id: string
          amount_usd: number
          commissionable_amount_usd: number | null
          created_at: string
          currency: string
          discount_usd: number
          id: string
          order_id: string
          payout_record_id: string | null
          period_month: string
          status: string
          updated_at: string
          void_reason: string | null
        }
        Insert: {
          affiliate_id: string
          amount_usd?: number
          commissionable_amount_usd?: number | null
          created_at?: string
          currency?: string
          discount_usd?: number
          id?: string
          order_id: string
          payout_record_id?: string | null
          period_month?: string
          status?: string
          updated_at?: string
          void_reason?: string | null
        }
        Update: {
          affiliate_id?: string
          amount_usd?: number
          commissionable_amount_usd?: number | null
          created_at?: string
          currency?: string
          discount_usd?: number
          id?: string
          order_id?: string
          payout_record_id?: string | null
          period_month?: string
          status?: string
          updated_at?: string
          void_reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "commissions_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: true
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_payout_record_id_fkey"
            columns: ["payout_record_id"]
            isOneToOne: false
            referencedRelation: "payout_records"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          challenge: string
          company: string | null
          created_at: string
          email: string
          id: string
          ip_address: string | null
          kind: string
          name: string
          phone: string | null
          service: string
          status: string
          updated_at: string
        }
        Insert: {
          challenge: string
          company?: string | null
          created_at?: string
          email: string
          id?: string
          ip_address?: string | null
          kind?: string
          name: string
          phone?: string | null
          service: string
          status?: string
          updated_at?: string
        }
        Update: {
          challenge?: string
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          ip_address?: string | null
          kind?: string
          name?: string
          phone?: string | null
          service?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      document_sections: {
        Row: {
          created_at: string
          document_id: string
          id: string
          page_start: number | null
          part: string | null
          slug: string
          sort_order: number
          summary: string | null
          title: string
        }
        Insert: {
          created_at?: string
          document_id: string
          id?: string
          page_start?: number | null
          part?: string | null
          slug: string
          sort_order?: number
          summary?: string | null
          title: string
        }
        Update: {
          created_at?: string
          document_id?: string
          id?: string
          page_start?: number | null
          part?: string | null
          slug?: string
          sort_order?: number
          summary?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_sections_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "product_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      downloads: {
        Row: {
          created_at: string
          document_id: string
          id: string
          ip_address: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          document_id: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          document_id?: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "downloads_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "product_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      email_logs: {
        Row: {
          created_at: string
          error: string | null
          id: string
          metadata: Json
          provider_message_id: string | null
          recipient: string
          status: string
          subject: string | null
          template: string
        }
        Insert: {
          created_at?: string
          error?: string | null
          id?: string
          metadata?: Json
          provider_message_id?: string | null
          recipient: string
          status?: string
          subject?: string | null
          template: string
        }
        Update: {
          created_at?: string
          error?: string | null
          id?: string
          metadata?: Json
          provider_message_id?: string | null
          recipient?: string
          status?: string
          subject?: string | null
          template?: string
        }
        Relationships: []
      }
      entitlements: {
        Row: {
          access_type: string
          created_at: string
          granted_at: string
          id: string
          order_id: string | null
          product_id: string
          revoked_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          access_type?: string
          created_at?: string
          granted_at?: string
          id?: string
          order_id?: string | null
          product_id: string
          revoked_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          access_type?: string
          created_at?: string
          granted_at?: string
          id?: string
          order_id?: string | null
          product_id?: string
          revoked_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "entitlements_order_fk"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entitlements_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          affiliate_discount_usd: number
          affiliate_id: string | null
          amount_inr: number
          attribution_status: string
          commissionable_amount_usd: number | null
          country_code: string | null
          created_at: string
          discount_display_amount: number
          display_amount: number | null
          display_currency: string
          email: string
          full_name: string | null
          fx_rate: number | null
          id: string
          metadata: Json
          original_display_amount: number | null
          paid_at: string | null
          product_id: string
          provider: Database["public"]["Enums"]["payment_provider"]
          provider_order_id: string | null
          referral_code: string | null
          referral_source: string | null
          status: Database["public"]["Enums"]["order_status"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          affiliate_discount_usd?: number
          affiliate_id?: string | null
          amount_inr: number
          attribution_status?: string
          commissionable_amount_usd?: number | null
          country_code?: string | null
          created_at?: string
          discount_display_amount?: number
          display_amount?: number | null
          display_currency?: string
          email: string
          full_name?: string | null
          fx_rate?: number | null
          id?: string
          metadata?: Json
          original_display_amount?: number | null
          paid_at?: string | null
          product_id: string
          provider: Database["public"]["Enums"]["payment_provider"]
          provider_order_id?: string | null
          referral_code?: string | null
          referral_source?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          affiliate_discount_usd?: number
          affiliate_id?: string | null
          amount_inr?: number
          attribution_status?: string
          commissionable_amount_usd?: number | null
          country_code?: string | null
          created_at?: string
          discount_display_amount?: number
          display_amount?: number | null
          display_currency?: string
          email?: string
          full_name?: string | null
          fx_rate?: number | null
          id?: string
          metadata?: Json
          original_display_amount?: number | null
          paid_at?: string | null
          product_id?: string
          provider?: Database["public"]["Enums"]["payment_provider"]
          provider_order_id?: string | null
          referral_code?: string | null
          referral_source?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          order_id: string
          provider: Database["public"]["Enums"]["payment_provider"]
          provider_payment_id: string
          raw: Json
          status: string
          updated_at: string
          verified: boolean
        }
        Insert: {
          amount: number
          created_at?: string
          currency: string
          id?: string
          order_id: string
          provider: Database["public"]["Enums"]["payment_provider"]
          provider_payment_id: string
          raw?: Json
          status: string
          updated_at?: string
          verified?: boolean
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          order_id?: string
          provider?: Database["public"]["Enums"]["payment_provider"]
          provider_payment_id?: string
          raw?: Json
          status?: string
          updated_at?: string
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      payout_batches: {
        Row: {
          affiliate_count: number
          created_at: string
          id: string
          notes: string | null
          period_month: string
          processed_at: string | null
          status: string
          total_amount_usd: number
          updated_at: string
        }
        Insert: {
          affiliate_count?: number
          created_at?: string
          id?: string
          notes?: string | null
          period_month: string
          processed_at?: string | null
          status?: string
          total_amount_usd?: number
          updated_at?: string
        }
        Update: {
          affiliate_count?: number
          created_at?: string
          id?: string
          notes?: string | null
          period_month?: string
          processed_at?: string | null
          status?: string
          total_amount_usd?: number
          updated_at?: string
        }
        Relationships: []
      }
      payout_records: {
        Row: {
          affiliate_id: string
          amount_usd: number
          batch_id: string
          created_at: string
          failure_reason: string | null
          id: string
          notes: string | null
          paid_at: string | null
          payout_country: string | null
          paypal_email: string | null
          period_month: string
          recipient_name: string | null
          sales_count: number
          status: string
          updated_at: string
        }
        Insert: {
          affiliate_id: string
          amount_usd?: number
          batch_id: string
          created_at?: string
          failure_reason?: string | null
          id?: string
          notes?: string | null
          paid_at?: string | null
          payout_country?: string | null
          paypal_email?: string | null
          period_month: string
          recipient_name?: string | null
          sales_count?: number
          status?: string
          updated_at?: string
        }
        Update: {
          affiliate_id?: string
          amount_usd?: number
          batch_id?: string
          created_at?: string
          failure_reason?: string | null
          id?: string
          notes?: string | null
          paid_at?: string | null
          payout_country?: string | null
          paypal_email?: string | null
          period_month?: string
          recipient_name?: string | null
          sales_count?: number
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payout_records_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payout_records_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "payout_batches"
            referencedColumns: ["id"]
          },
        ]
      }
      product_documents: {
        Row: {
          category: string
          created_at: string
          file_size_bytes: number | null
          id: string
          is_published: boolean
          page_count: number | null
          product_id: string
          slug: string
          sort_order: number
          storage_path: string
          subtitle: string | null
          summary: string | null
          title: string
          updated_at: string
          version: string
        }
        Insert: {
          category: string
          created_at?: string
          file_size_bytes?: number | null
          id?: string
          is_published?: boolean
          page_count?: number | null
          product_id: string
          slug: string
          sort_order?: number
          storage_path: string
          subtitle?: string | null
          summary?: string | null
          title: string
          updated_at?: string
          version?: string
        }
        Update: {
          category?: string
          created_at?: string
          file_size_bytes?: number | null
          id?: string
          is_published?: boolean
          page_count?: number | null
          product_id?: string
          slug?: string
          sort_order?: number
          storage_path?: string
          subtitle?: string | null
          summary?: string | null
          title?: string
          updated_at?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_documents_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_updates: {
        Row: {
          body: string
          created_at: string
          id: string
          product_id: string
          published_at: string
          title: string
          version: string | null
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          product_id: string
          published_at?: string
          title: string
          version?: string | null
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          product_id?: string
          published_at?: string
          title?: string
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_updates_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          price_inr: number
          slug: string
          tagline: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          price_inr: number
          slug: string
          tagline?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          price_inr?: number
          slug?: string
          tagline?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          country_code: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          country_code?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          country_code?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      rate_limits: {
        Row: {
          bucket: string
          hits: number
          id: string
          identifier: string
          window_start: string
        }
        Insert: {
          bucket: string
          hits?: number
          id?: string
          identifier: string
          window_start?: string
        }
        Update: {
          bucket?: string
          hits?: number
          id?: string
          identifier?: string
          window_start?: string
        }
        Relationships: []
      }
      referral_clicks: {
        Row: {
          affiliate_id: string | null
          code: string
          created_at: string
          event: string
          id: string
          ip_hash: string | null
          landing_path: string | null
          referer: string | null
          user_agent: string | null
        }
        Insert: {
          affiliate_id?: string | null
          code: string
          created_at?: string
          event?: string
          id?: string
          ip_hash?: string | null
          landing_path?: string | null
          referer?: string | null
          user_agent?: string | null
        }
        Update: {
          affiliate_id?: string | null
          code?: string
          created_at?: string
          event?: string
          id?: string
          ip_hash?: string | null
          landing_path?: string | null
          referer?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referral_clicks_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      webhook_events: {
        Row: {
          attempts: number
          created_at: string
          error: string | null
          event_id: string
          event_type: string | null
          id: string
          payload: Json
          processed_at: string | null
          provider: Database["public"]["Enums"]["payment_provider"]
          signature_verified: boolean
          status: string
        }
        Insert: {
          attempts?: number
          created_at?: string
          error?: string | null
          event_id: string
          event_type?: string | null
          id?: string
          payload?: Json
          processed_at?: string | null
          provider: Database["public"]["Enums"]["payment_provider"]
          signature_verified?: boolean
          status?: string
        }
        Update: {
          attempts?: number
          created_at?: string
          error?: string | null
          event_id?: string
          event_type?: string | null
          id?: string
          payload?: Json
          processed_at?: string | null
          provider?: Database["public"]["Enums"]["payment_provider"]
          signature_verified?: boolean
          status?: string
        }
        Relationships: []
      }
      webhook_logs: {
        Row: {
          error_message: string | null
          event_id: string
          event_type: string | null
          id: string
          payload_hash: string | null
          processed_at: string | null
          processing_status: string
          provider: string
          received_at: string
          signature_status: string
        }
        Insert: {
          error_message?: string | null
          event_id: string
          event_type?: string | null
          id?: string
          payload_hash?: string | null
          processed_at?: string | null
          processing_status?: string
          provider: string
          received_at?: string
          signature_status?: string
        }
        Update: {
          error_message?: string | null
          event_id?: string
          event_type?: string | null
          id?: string
          payload_hash?: string | null
          processed_at?: string | null
          processing_status?: string
          provider?: string
          received_at?: string
          signature_status?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      current_affiliate_id: { Args: never; Returns: string }
      has_entitlement: {
        Args: { _product_id: string; _user_id: string }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "customer"
      order_status:
        | "pending"
        | "processing"
        | "paid"
        | "failed"
        | "expired"
        | "refunded"
      payment_provider: "paypal" | "nowpayments"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
      app_role: ["admin", "customer"],
      order_status: [
        "pending",
        "processing",
        "paid",
        "failed",
        "expired",
        "refunded",
      ],
      payment_provider: ["paypal", "nowpayments"],
    },
  },
} as const
