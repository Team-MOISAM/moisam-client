import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editEventName } from "../service";
import { EventData } from "../model";

export const useEditEventName = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ eventId, payload }: { eventId: string; payload: EventData }) => editEventName(eventId, payload),

    onSuccess: (_, { eventId }) => {
      queryClient.invalidateQueries({ queryKey: ["eventRoutes", eventId] });
    },

    onError: error => {
      console.error("모임 수정 실패: ", error);
    },
  });
};
