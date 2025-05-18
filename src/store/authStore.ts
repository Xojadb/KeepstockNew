import { create } from 'zustand';
import { User, UserRole } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  role: UserRole | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Mock users for demo
const mockUsers = [
  {
    id: '1',
    username: 'store1',
    password: 'password123',
    name: 'Store User',
    role: 'store' as UserRole,
    branch: 'Branch 1'
  },
  {
    id: '2',
    username: 'manager1',
    password: 'password123',
    name: 'Manager User',
    role: 'manager' as UserRole
  },
  {
    id: '3',
    username: 'admin',
    password: 'admin123',
    name: 'Super Admin',
    role: 'admin' as UserRole
  }
];

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  role: null,
  
  login: async (username: string, password: string) => {
    // Simulate API call
    const user = mockUsers.find(u => u.username === username && u.password === password);
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      set({ 
        user: userWithoutPassword, 
        isAuthenticated: true,
        role: userWithoutPassword.role
      });
      return true;
    }
    
    return false;
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false, role: null });
  }
}));