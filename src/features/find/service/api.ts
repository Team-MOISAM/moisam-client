import api from "@/shared/api/api";
import { FormattedData, CreateEventData } from "../model";

export const createEvent = async (payload: CreateEventData) => {
  const response = await api.post("/events", payload);

  if (response.data.result !== "SUCCESS") {
    throw new Error(response.data.error?.message || "모임 생성 실패");
  }

  return response.data;
};

export const addMember = async (payload: FormattedData, eventId: string) => {
  const response = await api.post(`/events/${eventId}/start-points`, payload);

  if (response.data.result !== "SUCCESS") {
    throw new Error(response.data.error?.message || "멤버 추가 실패");
  }

  return response.data;
};
