import { useQuery } from "@tanstack/react-query";
import { getMeetingPotinPlaceImage } from "../service";

export const useGetMPImage = (subwayId: number | undefined) => {
  return useQuery({
    queryKey: ["getMPImage", subwayId],
    queryFn: () => {
      if (!subwayId) throw new Error("subwayId가 없습니다.");
      return getMeetingPotinPlaceImage(subwayId);
    },
    enabled: !!subwayId, // subwayId가 있을 때만 요청
    retry: false, // 자동 재시도 방지
  });
};
