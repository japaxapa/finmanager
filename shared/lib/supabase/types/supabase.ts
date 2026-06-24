export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.5';
  };
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      accounts: {
        Row: {
          created_at: string;
          id: string;
          initial_balance: number | null;
          name: string;
          type: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          initial_balance?: number | null;
          name?: string;
          type: string;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          initial_balance?: number | null;
          name?: string;
          type?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'accounts_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      categories: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          type: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          type: string;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          type?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'categories_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      profiles: {
        Row: {
          created_at: string;
          full_name: string;
          id: string;
        };
        Insert: {
          created_at?: string;
          full_name?: string;
          id?: string;
        };
        Update: {
          created_at?: string;
          full_name?: string;
          id?: string;
        };
        Relationships: [];
      };
      recurring_transactions: {
        Row: {
          account_id: string;
          active: boolean | null;
          amount: number | null;
          category_id: string | null;
          created_at: string | null;
          description: string | null;
          frequency: string;
          id: string;
          next_execution: string;
          type: string;
          user_id: string;
        };
        Insert: {
          account_id: string;
          active?: boolean | null;
          amount?: number | null;
          category_id?: string | null;
          created_at?: string | null;
          description?: string | null;
          frequency: string;
          id?: string;
          next_execution: string;
          type: string;
          user_id: string;
        };
        Update: {
          account_id?: string;
          active?: boolean | null;
          amount?: number | null;
          category_id?: string | null;
          created_at?: string | null;
          description?: string | null;
          frequency?: string;
          id?: string;
          next_execution?: string;
          type?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'recurring_transactions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'recurring_transactions_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'recurring_transactions_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      tags: {
        Row: {
          color: string | null;
          created_at: string;
          id: string;
          name: string;
          user_id: string;
        };
        Insert: {
          color?: string | null;
          created_at?: string;
          id?: string;
          name?: string;
          user_id?: string;
        };
        Update: {
          color?: string | null;
          created_at?: string;
          id?: string;
          name?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'tags_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      transaction: {
        Row: {
          account_id: string;
          amount: number;
          category_id: string | null;
          created_at: string;
          description: string | null;
          id: string;
          transation_date: string;
          type: string;
          user_id: string;
        };
        Insert: {
          account_id?: string;
          amount?: number;
          category_id?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          transation_date: string;
          type?: string;
          user_id?: string;
        };
        Update: {
          account_id?: string;
          amount?: number;
          category_id?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          transation_date?: string;
          type?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'transaction_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'transaction_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'transaction_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      transation_tags: {
        Row: {
          tag_id: string;
          transation_id: string;
        };
        Insert: {
          tag_id?: string;
          transation_id?: string;
        };
        Update: {
          tag_id?: string;
          transation_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'transation_tags_tag_id_fkey';
            columns: ['tag_id'];
            isOneToOne: false;
            referencedRelation: 'tags';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'transation_tags_transation_id_fkey';
            columns: ['transation_id'];
            isOneToOne: false;
            referencedRelation: 'transaction';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      transaction_type: 'income' | 'expense' | 'transfer';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      transaction_type: ['income', 'expense', 'transfer'],
    },
  },
} as const;
