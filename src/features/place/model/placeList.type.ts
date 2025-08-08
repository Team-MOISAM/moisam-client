import { PlaceScore } from "@/shared/model";

export interface PlaceResponse {
  id: string;
  category: string;
  name: string;
  image?: string;
  openTime?: string;
  closeTime?: string;
  distance: number;
  averageRating: number | null;
  googleRating?: number;
  placeScore?: PlaceScore | null;
}

export interface PlaceList {
  result: string;
  data: {
    eventName: string;
    middlePointName: string;
    confirmedPlaceResponse: PlaceResponse | null;
    placeResponses: PlaceResponse[];
  };
  error?: {
    code: string;
    message: string;
  };
}
