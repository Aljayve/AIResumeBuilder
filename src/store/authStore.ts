import { create } from "zustand";
import { userApi, type UserProfile } from "../api/user.api";

interface AuthState {
    user: UserProfile | null;
    loading: boolean;
    fetchUser: () => Promise<void>;
    clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    loading: true,
    fetchUser: async () => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            set({ loading: false, user: null });
            return;
        }
        try {
            const res = await userApi.getProfile();
            set({ user: res.data, loading: false });
        } catch {
            set({ user: null, loading: false });
        }
    },
    clearUser: () => set({ user: null }),
}));
