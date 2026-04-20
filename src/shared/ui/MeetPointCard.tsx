import Pin from "@/assets/icon/pin.svg";
import Arrow from "@/assets/icon/rightArrowGray.svg";
import PinBlue from "@/assets/icon/pinBlue.svg";
import { useEventStore } from "../stores";
import { useGetMPImage } from "@/features/mapView/hooks/useGetMPImage";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface MeetPointCardProps {
  placeName?: string | undefined;
  placeImage?: string | undefined;
  onClick?: () => void;
  isPlace?: boolean;
}

export const MeetPointCard = ({ placeName, placeImage, onClick, isPlace = true }: MeetPointCardProps) => {
  const [imageSource, setImageSource] = useState<string | undefined>(undefined);

  const location = useLocation();
  const isMapView = location.pathname.includes("mapView");
  const isSelect = !!placeName;

  const meetingPointData = useEventStore(state => state.meetingPointData);

  const subwayId = meetingPointData?.subwayId;

  const { data } = useGetMPImage(subwayId);

  useEffect(() => {
    if (data === undefined) return;

    // 장소를 확정 후 MPcard 컴포넌트의 카페 이미지 설정
    if (isSelect) {
      setImageSource(placeImage ? placeImage : PinBlue);
    }
  }, [data, isSelect, placeImage]);

  // 장소를 확정 전에는 카드를 렌더링하지 않음
  if (!isSelect) {
    return null;
  }

  return (
    <div
      className={`flex gap-3 p-3 h-[66px] rounded-2xl bg-white ${isMapView ? "shadow-meetPointCard" : "border border-gray-10"} w-full items-center ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}>
      <div
        className={`w-10 h-10 flex flex-shrink-0 justify-center items-center rounded-xl ${isSelect ? "bg-sub-10" : "bg-gray-5"}`}>
        {isMapView ? (
          <img src={imageSource} alt="pin" className="w-full h-full object-cover rounded-xl" />
        ) : (
          <img
            src={isSelect ? placeImage : Pin}
            alt="pin"
            className={isSelect ? "w-full h-full object-cover rounded-xl" : "w-6 h-6"}
          />
        )}
      </div>
      <div className="flex justify-between items-center w-full">
        <div>
          <p className={`text-labelXs ${isSelect ? "text-sub-sub" : "text-gray-40"}`}>
            {isSelect ? "여기에서 모여요" : "어디서 만나실 건가요?"}
          </p>
          <span className="text-md font-semibold text-gray-90">
            {placeName ?? (isMapView ? "역 주변 카페 보러가기" : "장소를 확정해주세요")}
          </span>
        </div>
        {isPlace && <img src={Arrow} alt="arrow" className="w-5 h-5" />}
      </div>
    </div>
  );
};
