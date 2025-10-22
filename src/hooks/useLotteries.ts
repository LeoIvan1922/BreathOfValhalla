import { useState, useEffect } from 'react';
import { lotteryService, categoryService } from '@/lib/supabase';
import type { Lottery, Category } from '@/lib/supabase';

interface LotteryWithCategory extends Lottery {
  categories: Category | null;
}

export function useLotteries(options?: { 
  featured?: boolean; 
  status?: string; 
  limit?: number;
  categoryId?: string;
}) {
  const [lotteries, setLotteries] = useState<LotteryWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLotteries = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let data;
        if (options?.categoryId) {
          data = await lotteryService.getByCategory(options.categoryId);
        } else {
          data = await lotteryService.getAll(options);
        }
        
        setLotteries(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Помилка завантаження лотерей');
        console.error('Error fetching lotteries:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLotteries();
  }, [options?.featured, options?.status, options?.limit, options?.categoryId]);

  const refetch = async () => {
    const fetchLotteries = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let data;
        if (options?.categoryId) {
          data = await lotteryService.getByCategory(options.categoryId);
        } else {
          data = await lotteryService.getAll(options);
        }
        
        setLotteries(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Помилка завантаження лотерей');
        console.error('Error fetching lotteries:', err);
      } finally {
        setLoading(false);
      }
    };

    await fetchLotteries();
  };

  return {
    lotteries,
    loading,
    error,
    refetch
  };
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await categoryService.getAll();
        setCategories(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Помилка завантаження категорій');
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error
  };
}

export function useLottery(id: string) {
  const [lottery, setLottery] = useState<LotteryWithCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchLottery = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await lotteryService.getById(id);
        setLottery(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Помилка завантаження лотереї');
        console.error('Error fetching lottery:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLottery();
  }, [id]);

  return {
    lottery,
    loading,
    error
  };
}