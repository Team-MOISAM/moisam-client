import api from "@/shared/api/api";
import { GetEventRouteResponse } from "@/shared/model";

export const getEventInfo = async (eventId: string, guestId?: string) => {
  const response = await api.get<{
    result: string;
    data: GetEventRouteResponse;
    error?: {
      code: string;
      message: string;
    };
  }>(`/events/${eventId}`, {
    params: guestId ? { guestId } : {},
  });

  if (response.data.result === "SUCCESS") {
    return response.data.data;
  }

  throw new Error(response.data.error?.message || "모임 경로 조회 실패");
};

export const deleteStartPoint = async (eventId: string, startPointId: string) => {
  const response = await api.delete(`/events/${eventId}/start-points/${startPointId}`);

  if (response.data.result === "SUCCESS") {
    return true;
  }

  throw new Error(response.data.error?.message || "출발지 삭제 실패");
};

export const deleteEvent = async (eventId: string) => {
  const response = await api.delete(`/events/${eventId}`);

  if (response.data.result === "SUCCESS") {
    return true;
  }

  throw new Error(response.data.error?.message || "모임 삭제 실패");
};

export const getMeetingPotinPlaceImage = async (subwayId: number) => {
  const response = await api.get<{
    result: string;
    data: {
      image: string;
    } | null;
    error?: {
      code: string;
      message: string;
    };
  }>("/places/image", {
    params: {
      subwayId,
    },
  });

  if (response.data.result === "SUCCESS") {
    return response.data.data;
  }

  throw new Error(response.data.error?.message || "모임 장소 이미지 조회 실패");
};
