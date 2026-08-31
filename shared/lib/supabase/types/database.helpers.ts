import { Database } from './supabase';

// Helper to extract table rows
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

// Helper to extract table inserts
export type TablesInsert<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];

// Helper to extract table updates
export type TablesUpdate<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];

// Helper to extract database Enums
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];

// Helper to extract table views
export type Views<T extends keyof Database['public']['Views']> =
  Database['public']['Views'][T]['Row'];
