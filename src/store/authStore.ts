import { create } from 'zustand';
import { User, UserRole } from '../types';
import pool from '../config/database';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  role: UserRole | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  role: null,
  
  login: async (username: string, password: string) => {
    try {
      const [rows] = await pool.execute(
        'SELECT id, username, name, role, branch FROM users WHERE username = ? AND password = SHA2(?, 256) AND active = 1',
        [username, password]
      );

      const users = rows as any[];
      if (users.length > 0) {
        const user = users[0];
        set({ 
          user: user,
          isAuthenticated: true,
          role: user.role as UserRole
        });
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false, role: null });
  }
}));