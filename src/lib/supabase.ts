import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

// Типи для наших таблиць
export type Category = Database['public']['Tables']['categories']['Row'];
export type Lottery = Database['public']['Tables']['lotteries']['Row'];
export type UserProfile = Database['public']['Tables']['user_profiles']['Row'];
export type Ticket = Database['public']['Tables']['tickets']['Row'];
export type Winner = Database['public']['Tables']['winners']['Row'];

// Типи для вставки даних
export type CategoryInsert = Database['public']['Tables']['categories']['Insert'];
export type LotteryInsert = Database['public']['Tables']['lotteries']['Insert'];
export type UserProfileInsert = Database['public']['Tables']['user_profiles']['Insert'];
export type TicketInsert = Database['public']['Tables']['tickets']['Insert'];
export type WinnerInsert = Database['public']['Tables']['winners']['Insert'];

// Функції для роботи з категоріями
export const categoryService = {
  async getAll() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  }
};

// Функції для роботи з лотереями
export const lotteryService = {
  async getAll(options?: { featured?: boolean; status?: string; limit?: number }) {
    let query = supabase
      .from('lotteries')
      .select(`
        *,
        categories (
          id,
          name,
          icon,
          gradient
        )
      `)
      .order('created_at', { ascending: false });

    if (options?.featured !== undefined) {
      query = query.eq('featured', options.featured);
    }

    if (options?.status) {
      query = query.eq('status', options.status);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;
    
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('lotteries')
      .select(`
        *,
        categories (
          id,
          name,
          icon,
          gradient
        )
      `)
      .eq('id', id)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  async getByCategory(categoryId: string) {
    const { data, error } = await supabase
      .from('lotteries')
      .select(`
        *,
        categories (
          id,
          name,
          icon,
          gradient
        )
      `)
      .eq('category_id', categoryId)
      .eq('status', 'active')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
};

// Функції для роботи з профілями користувачів
export const userProfileService = {
  async getCurrent() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  async update(updates: Partial<UserProfile>) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  async updateWalletBalance(amount: number) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('user_profiles')
      .update({ wallet_balance: amount })
      .eq('id', user.id)
      .select()
      .maybeSingle();
    
    if (error) throw error;
    return data;
  }
};

// Функції для роботи з квитками
export const ticketService = {
  async getUserTickets() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('tickets')
      .select(`
        *,
        lotteries (
          id,
          title,
          image_url,
          end_time,
          status
        )
      `)
      .eq('user_id', user.id)
      .order('purchased_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async purchaseTicket(lotteryId: string, ticketNumber: string, price: number) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('tickets')
      .insert({
        user_id: user.id,
        lottery_id: lotteryId,
        ticket_number: ticketNumber,
        purchase_price: price
      })
      .select()
      .maybeSingle();
    
    if (error) throw error;
    return data;
  }
};

// Функції для роботи з переможцями
export const winnerService = {
  async getRecent(limit = 10) {
    const { data, error } = await supabase
      .from('winners')
      .select(`
        *,
        lotteries (
          id,
          title,
          image_url
        ),
        user_profiles (
          id,
          full_name,
          avatar_url
        )
      `)
      .order('won_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data;
  },

  async getUserWins() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('winners')
      .select(`
        *,
        lotteries (
          id,
          title,
          image_url
        ),
        tickets (
          id,
          ticket_number
        )
      `)
      .eq('user_id', user.id)
      .order('won_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
};

// Функції для автентифікації
export const authService = {
  async signUp(email: string, password: string, fullName?: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    });
    
    if (error) throw error;
    return data;
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut({
      scope: 'local'
    });
    if (error) throw error;
    
    // Очищуємо локальне сховище
    if (typeof window !== 'undefined') {
      localStorage.removeItem('supabase.auth.token');
    }
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
};

export { supabase };