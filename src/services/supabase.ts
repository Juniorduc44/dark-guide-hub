import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Database = {
  public: {
    Tables: {
      purchases: {
        Row: {
          id: string;
          payment_hash: string;
          product_id: string;
          product_title: string;
          amount_sats: number;
          session_id: string;
          verified: boolean;
          created_at: string;
          expires_at: string;
        };
        Insert: {
          payment_hash: string;
          product_id: string;
          product_title: string;
          amount_sats: number;
          session_id: string;
          verified?: boolean;
        };
        Update: {
          verified?: boolean;
        };
      };
    };
  };
};
