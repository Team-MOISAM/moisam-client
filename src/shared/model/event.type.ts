export interface MeetingPoint {
  endStationName: string;
  endLongitude: number;
  endLatitude: number;
}

export interface TransitRoute {
  trafficType: string;
  startExitNo?: string;
  endExitNo?: string;
  distance: number;
  laneName?: string;
  startBoardName?: string;
  endBoardName?: string;
  stationCount: number;
  passStopList?: {
    stations: {
      index: number;
      stationName: string;
      x: string;
      y: string;
    }[];
  };
  sectionTime: number;
}

export interface DrivingInfo {
  taxi: number;
  toll: number;
  duration: number;
  distance: number;
}

export interface DrivingRoute {
  name: string;
  coordinates: {
    x: string;
    y: string;
  }[];
}

export interface RouteResponse {
  isTransit: boolean;
  isMe: boolean;
  id: string;
  userId: number;
  guestId: string;
  nickname: string;
  profileImage: string | null;
  startName: string;
  startLongitude: number;
  startLatitude: number;
  transitRoute: TransitRoute[];
  transitTime: number;
  driveTime: number;
  drivingInfo: DrivingInfo;
  drivingRoute: DrivingRoute[];
  totalTime: number;
}

export interface ParkingLot {
  name: string;
  longitude: number;
  latitude: number;
  distance: number;
}

export interface GetEventRouteResponse {
  eventName: string;
  eventDate: string;
  eventTime: string;
  eventMaker: string;
  placeName: string;
  peopleCount: number;
  meetingPointRouteGroups: MeetingPointRouteGroup[];
}

export interface MeetingPointRouteGroup {
  subwayId: number;
  averageTime: number;
  meetingPoint: MeetingPoint;
  routeResponse: RouteResponse[];
  parkingLot: ParkingLot;
}
