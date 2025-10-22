import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { authService, userProfileService } from '@/lib/supabase';
import type { UserProfile } from '@/lib/supabase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Отримуємо поточного користувача при завантаженні
    const getInitialUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
        
        if (currentUser) {
          const userProfile = await userProfileService.getCurrent();
          setProfile(userProfile);
        }
      } catch (error) {
        console.error('Error getting initial user:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialUser();

    // Підписуємося на зміни стану автентифікації
    const { data: authListener } = authService.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          try {
            const userProfile = await userProfileService.getCurrent();
            setProfile(userProfile);
          } catch (error) {
            console.error('Error fetching user profile:', error);
            setProfile(null);
          }
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName?: string) => {
    setLoading(true);
    try {
      const result = await authService.signUp(email, password, fullName);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await authService.signIn(email, password);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await authService.signOut();
      // Очищуємо стан після успішного виходу
      setUser(null);
      setProfile(null);
      setSession(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      const updatedProfile = await userProfileService.update(updates);
      setProfile(updatedProfile);
      return updatedProfile;
    } catch (error) {
      throw error;
    }
  };

  return {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    isAuthenticated: !!user
  };
}