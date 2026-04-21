import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { GetEventRouteResponse, MeetingPointRouteGroup, RouteResponse } from "../model";

export enum PointType {
  MIDDLE = "MIDDLE",
  HOT_PLACE = "HOT_PLACE",
}

interface EventStoreState {
  eventData: GetEventRouteResponse | null;
  setEventData: (data: GetEventRouteResponse) => void;
  clearEventData: () => void;
  isDetail: boolean;
  toggleDetail: () => void;
  detailEventData: RouteResponse | null;
  setDetailEventData: (data: RouteResponse) => void;
  meetingPointData: MeetingPointRouteGroup | null;
  setMeetingPointData: (data: MeetingPointRouteGroup) => void;
  selectedPointType: PointType;
  setSelectedPointType: (pointType: PointType) => void;
}

export const useEventStore = create<EventStoreState>()(
  devtools(set => ({
    eventData: null,
    setEventData: data => set({ eventData: data }),
    clearEventData: () => set({ eventData: null }),
    isDetail: false,
    toggleDetail: () => set(state => ({ isDetail: !state.isDetail })),
    detailEventData: null,
    setDetailEventData: data => set({ detailEventData: data }),
    meetingPointData: null,
    setMeetingPointData: data => set({ meetingPointData: data }),
    selectedPointType: PointType.MIDDLE,
    setSelectedPointType: pointType => set({ selectedPointType: pointType }),
  }))
);
