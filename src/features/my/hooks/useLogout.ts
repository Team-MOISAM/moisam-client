import { useMutation } from "@tanstack/react-query";
import { logout } from "../service";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/shared/stores";

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      useUserStore.getState().reset();
      navigate("/");
    },
    onError: error => {
      console.error("로그아웃 실패: ", error);
    },
  });
};
