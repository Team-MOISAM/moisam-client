import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { GetEventRouteResponse, MeetingPointRouteGroup, RouteResponse } from "../model";

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
  }))
);
