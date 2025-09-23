import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelPlaceInfo } from "../service";

export const useCancelPlace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelPlaceInfo,
    onSuccess: (_, eventId) => {
      queryClient.invalidateQueries({
        queryKey: ["placeInfo"],
        predicate: (query) => {
          const queryKey = query.queryKey;
          return queryKey.length >= 3 && queryKey[2] === eventId;
        }
      });
    },
    onError: error => {
      console.error("모임 장소 확정 취소 실패: ", error);
    },
  });
};