export interface UserEventHistoryResponses {
  eventId: string;
  eventDate: string;
  eventTime: string;
  eventName: string;
  middlePointName: string;
  placeName: string;
  participatedPeopleCount: number;
  userProfileImageUrls: string[];
  eventMadeAgo: number;
  eventHourAgo: number;
  isReviewed: boolean;
}

export interface UserEvents {
  userEventHistoryResponses: UserEventHistoryResponses[];
  hasNextPage: boolean;
  lastEventId: string;
}
