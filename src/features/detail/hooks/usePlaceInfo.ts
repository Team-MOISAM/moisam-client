import { useQuery } from "@tanstack/react-query";
import { getPlaceInfo } from "../service";
import { PlaceInfo } from "../model";

interface UsePlaceInfoProps {
  placeId?: string;
  eventId?: string;
  subwayId?: string;
}

export const usePlaceInfo = ({ placeId, eventId, subwayId }: UsePlaceInfoProps) => {
  return useQuery<PlaceInfo>({
    queryKey: ["placeInfo", placeId, eventId, subwayId],
    queryFn: () => getPlaceInfo({ placeId: placeId!, eventId: eventId!, subwayId }),
    enabled: !!placeId && !!eventId,
    retry: 2, // 실패 시 최대 두 번 재시도
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터 캐시 유지
  });
};
