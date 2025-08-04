export interface StartPointInfo {
  id?: string;
  name: string;
  startPoint: string;
  address: string;
  roadAddress: string;
  longitude: number;
  latitude: number;
}

export interface FormattedData {
  username?: string;
  startPoint: string;
  address: string;
  roadAddress: string;
  longitude: number;
  latitude: number;
  isTransit: boolean;
}

export interface CreateEventData {
  eventName: string;
  eventDate: string;
  eventTime: string;
  username: string;
  startPoint: string;
  address: string;
  roadAddress: string;
  longitude: number;
  latitude: number;
  isTransit: boolean;
}
