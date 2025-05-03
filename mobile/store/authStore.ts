import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { PluginUsersPermissionsUser } from "@/types/contentTypes";
import { MmkvStorage } from "./mmkvStorage";

interface AuthStore {
  token: string | null;
  user: PluginUsersPermissionsUser | null;
  setAuthInfo: (token: string, user: PluginUsersPermissionsUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      setAuthInfo: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => MmkvStorage),
    }
  )
);
