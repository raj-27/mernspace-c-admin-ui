import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

interface Authstate {
    user: null | User;
    setUser: (user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<Authstate>()(
    devtools((set) => ({
        user: null,
        setUser: (user) => set({ user }),
        logout: () => set({ user: null }),
    }))
);
