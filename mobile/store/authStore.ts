import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { IUser } from "@/models";
import { MmkvStorage } from "./mmkvStorage";

interface AuthStore {
  token: string | null;
  user: IUser;
  vendorApiToken: string | null;
  setAuthInfo: (token: string, user: IUser, vendorApiToken?: string) => void;
  setUserInfo: (user: IUser) => void;
  logout: () => void;
}

const USER_DEFAULT_DATA = {
  documentId: "",
  blocked: false,
  confirmed: true,
  createdAt: "",
  email: "",
  publishedAt: "",
  role: "",
  updatedAt: "",
  username: "",
  firstname: "",
  lastname: "",
  id: 0,
  isActive: true,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, _) => ({
      token: null,
      user: USER_DEFAULT_DATA,
      vendorApiToken: null,
      setAuthInfo: (token, user, vendorApiToken) =>
        set({ token, user, vendorApiToken }),
      setUserInfo: (user) => set({ user }),
      logout: () => set({ token: null, user: USER_DEFAULT_DATA }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => MmkvStorage),
    }
  )
);
