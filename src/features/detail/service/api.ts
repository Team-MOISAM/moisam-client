import api from "@/shared/api/api";

interface PlaceInfoProps {
  placeId: string;
  eventId: string;
  subwayId?: string;
}

export const getPlaceInfo = async ({ placeId, eventId, subwayId }: PlaceInfoProps) => {
  const params: any = { placeId, eventId };
  if (subwayId) {
    params.subwayId = subwayId;
  }
  
  const response = await api.get(`/places/${placeId}`, {
    params,
  });

  if (response.data.result === "SUCCESS") {
    return response.data.data;
  }

  throw new Error(response.data.error?.message || "모임 장소 조회 실패");
};

export const patchPlaceInfo = async ({ placeId, eventId, subwayId }: PlaceInfoProps) => {
  const requestBody = {
    placeId,
    subwayId: subwayId ? Number(subwayId) : undefined,
  };

  const response = await api.patch(`/events/${eventId}/place`, requestBody);

  if (response.data.result === "SUCCESS") {
    return true;
  }

  throw new Error(response.data.error?.message || "모임 장소 확정 실패");
};

export const cancelPlaceInfo = async (eventId: string) => {
  const response = await api.delete(`/events/${eventId}/place`);

  if (response.data.result === "SUCCESS") {
    return true;
  }

  throw new Error(response.data.error?.message || "모임 장소 확정 취소 실패");
};
