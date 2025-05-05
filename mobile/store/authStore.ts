import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { PluginUsersPermissionsUser } from "@/types/contentTypes";
import { MmkvStorage } from "./mmkvStorage";

interface AuthStore {
  token: string | null;
  user: PluginUsersPermissionsUser | null;
  vendorApiToken: string | null;
  setAuthInfo: (
    token: string,
    user: PluginUsersPermissionsUser,
    vendorApiToken?: string
  ) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, _) => ({
      token: null,
      user: null,
      vendorApiToken: null,
      setAuthInfo: (token, user, vendorApiToken) =>
        set({ token, user, vendorApiToken }),
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => MmkvStorage),
    }
  )
);
