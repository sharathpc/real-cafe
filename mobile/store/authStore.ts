import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { UserModel } from "@/models";
import { MmkvStorage } from "./mmkvStorage";

interface AuthStore {
  token: string | null;
  user: UserModel | null;
  vendorApiToken: string | null;
  setAuthInfo: (
    token: string,
    user: UserModel,
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
