import { Modal } from "@/shared/ui";
import Close from "@/assets/icon/closeGray.svg";
import KakaoMap from "@/assets/icon/kakaoMap.svg";
import NaverMap from "@/assets/icon/naverMap.svg";
import TMap from "@/assets/icon/TMap.svg";
import { openKakaoMap, openNaverMap, openTMAP, useDeviceDetector } from "@/features/mapView/utils";
import { useEventStore, useUserStore } from "@/shared/stores";
import { gtagEvent } from "@/shared/utils";

interface MapModalProps {
  onClose: () => void;
}

export const MapModal = ({ onClose }: MapModalProps) => {
  const eventData = useEventStore(state => state.eventData);
  const meetingPointData = useEventStore(state => state.meetingPointData);
  const detailEventData = useEventStore(state => state.detailEventData);
  const nickname = useUserStore(state => state.nickname);
  const deviceType = useDeviceDetector();

  if (!eventData || !detailEventData) return;

  const meetingPoint = meetingPointData?.meetingPoint;

  if (!meetingPoint) return;

  const handleKakaoMapClick = () => {
    gtagEvent("view_route_kakao", {
      current_user: nickname ?? "unknown",
      target_user: detailEventData.nickname,
      surface: "route_detail_map_modal",
    });

    openKakaoMap({
      startLat: detailEventData.startLatitude,
      startLng: detailEventData.startLongitude,
      endPoint: meetingPoint.endStationName,
      endLat: meetingPoint.endLatitude,
      endLng: meetingPoint.endLongitude,
      isPc: deviceType === "Mac PC" || deviceType === "Windows PC" || deviceType === "Unknown Device",
    });
  };

  const handleNaverMapClick = () => {
    gtagEvent("view_route_naver", {
      current_user: nickname ?? "unknown",
      target_user: detailEventData.nickname,
      surface: "route_detail_map_modal",
    });

    openNaverMap({
      startPoint: detailEventData.startName,
      startLat: detailEventData.startLatitude,
      startLng: detailEventData.startLongitude,
      endPoint: meetingPoint.endStationName,
      endLat: meetingPoint.endLatitude,
      endLng: meetingPoint.endLongitude,
    });
  };

  const TransferMap = [
    {
      src: KakaoMap,
      alt: "kakaoMap",
      text: "카카오맵",
      onClick: handleKakaoMapClick,
    },
    {
      src: NaverMap,
      alt: "naverMap",
      text: "네이버지도",
      onClick: handleNaverMapClick,
    },
    ...(deviceType === "iPhone"
      ? [
          {
            src: TMap,
            alt: "tMap",
            text: "TMAP",
            onClick: () =>
              openTMAP({
                endPoint: meetingPoint.endStationName,
                endLat: meetingPoint.endLatitude,
                endLng: meetingPoint.endLongitude,
              }),
          },
        ]
      : []),
  ];

  return (
    <Modal onClose={onClose}>
      <div className="p-5 pb-6 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <span className="text-md font-semibold text-gray-90">지도에서 보기</span>
          <button onClick={onClose}>
            <img src={Close} alt="close" className="w-6 h-6" />
          </button>
        </div>
        <div className="flex gap-6 justify-center items-center">
          {TransferMap.map(item => (
            <div key={item.alt} className="flex flex-col gap-2 items-center cursor-pointer" onClick={item.onClick}>
              <img src={item.src} alt={item.alt} className="w-10 h-10" />
              <p className="text-labelXs font-medium text-gray-80">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
