import { getLocationInfo } from "../service/coord2Address";
import { loadKakaoMapSdk } from "@/shared/utils";
import { Dispatch, SetStateAction } from "react";
import { StartPointInfo } from "../model";
import Location from "@/assets/icon/location.svg";
import { gtagEvent } from "@/shared/utils";

interface GetLocationButtonProps {
  setValue: Dispatch<SetStateAction<string>>;
  setStartPointInfo: (info: StartPointInfo) => void;
  name: string;
  onError?: () => void;
}

export const GetLocationButton = ({ setValue, setStartPointInfo, name, onError }: GetLocationButtonProps) => {
  const handleGetCurrentLocation = async () => {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        });
      });

      await loadKakaoMapSdk();

      const locationInfo = await getLocationInfo(position.coords.latitude, position.coords.longitude);

      gtagEvent("load_current_location", {
        current_location: locationInfo.placeName,
        surface: "find_location_step",
      });

      setValue(locationInfo.placeName);

      setStartPointInfo({
        name,
        startPoint: locationInfo.placeName,
        address: locationInfo.address,
        roadAddress: locationInfo.roadAddress,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } catch (error) {
      console.error("위치 검색 실패", error);
      onError?.(); // 부모에게 에러 알림
    }
  };

  return (
    <button
      onClick={handleGetCurrentLocation}
      className="flex gap-2 w-full justify-center items-center text-sub-sub text-md font-semibold rounded-2xl">
      <img src={Location} alt="현재 위치" className="w-5 h-5" />현 위치 불러오기
    </button>
  );
};
