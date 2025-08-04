import { useMutation } from "@tanstack/react-query";
import { deleteStartPoint } from "../service";
import { useQueryClient } from "@tanstack/react-query";

export const useDeleteStartPoint = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ eventId, startPointId }: { eventId: string; startPointId: string }) =>
      deleteStartPoint(eventId, startPointId),

    onSuccess: (_, { eventId }) => {
      queryClient.invalidateQueries({ queryKey: ["eventRoutes", eventId] });
    },

    onError: error => {
      console.error("출발지 삭제 실패: ", error);
    },
  });
};
