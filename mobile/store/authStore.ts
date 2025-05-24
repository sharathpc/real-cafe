import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { UserModel } from "@/models";
import { MmkvStorage } from "./mmkvStorage";

interface AuthStore {
  token: string | null;
  user: UserModel;
  vendorApiToken: string | null;
  setAuthInfo: (
    token: string,
    user: UserModel,
    vendorApiToken?: string
  ) => void;
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
      logout: () => set({ token: null, user: USER_DEFAULT_DATA }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => MmkvStorage),
    }
  )
);
