import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postPlaceInfo } from "../service";
import { PlaceInfo } from "../model";

export const useSetPlace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postPlaceInfo,
    onSuccess: (_, variables) => {
      const { placeId, eventId, subwayId } = variables;

      // 즉시 캐시에 반영
      queryClient.setQueryData<PlaceInfo>(["placeInfo", placeId, eventId, subwayId], prev => {
        if (!prev) return prev;
        return { ...prev, isConfirmed: true, isChanged: false };
      });

      // 이후 실제 데이터 재확인 (정합성 보장)
      queryClient.invalidateQueries({ queryKey: ["placeInfo", placeId, eventId, subwayId] });
    },
    onError: error => {
      console.error("모임 장소 확정 실패: ", error);
    },
  });
};
