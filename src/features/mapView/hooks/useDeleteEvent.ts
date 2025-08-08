import { useMutation } from "@tanstack/react-query";
import { deleteEvent } from "../service";
import { useNavigate } from "react-router-dom";

export const useDeleteEvent = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (eventId: string) => deleteEvent(eventId),

    onSuccess: () => {
      navigate("/history");
    },

    onError: error => {
      console.error("모임 삭제 실패: ", error);
    },
  });
};
