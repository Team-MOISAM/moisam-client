import { useQuery } from "@tanstack/react-query";
import { getRecommendedPlaces } from "../service";

export const useRecommendedPlaces = (eventId: string, subwayId: number) => {
  return useQuery({
    queryKey: ["recommendedPlaces", eventId, subwayId],
    queryFn: () => getRecommendedPlaces(eventId, subwayId),
    enabled: !!eventId && !!subwayId,
    retry: 2,
  });
};
