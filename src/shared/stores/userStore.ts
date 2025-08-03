import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  nickname: string | null;
  profileImageUrl: string | null;
  email: string | null;
  personalInfoAgreement: boolean;
  setNickname: (nickname: string) => void;
  setProfileImgUrl: (url: string) => void;
  setEmail: (email: string) => void;
  setPersonalInfoAgreement: (agree: boolean) => void;
  reset: () => void;
}

export const useUserStore = create(
  persist<UserState>(
    set => ({
      nickname: null,
      profileImageUrl: null,
      email: null,
      personalInfoAgreement: false,
      setNickname: nickname => set({ nickname }),
      setProfileImgUrl: url => set({ profileImageUrl: url }),
      setEmail: email => set({ email }),
      setPersonalInfoAgreement: agree => set({ personalInfoAgreement: agree }),

      reset: () => {
        set({
          nickname: null,
          profileImageUrl: null,
          email: null,
          personalInfoAgreement: false,
        });
        localStorage.removeItem("user-storage");
      },
    }),
    {
      name: "user-storage",
    }
  )
);
