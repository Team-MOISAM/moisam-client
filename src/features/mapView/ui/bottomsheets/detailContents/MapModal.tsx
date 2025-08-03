import { Modal } from "@/shared/ui";
import Close from "@/assets/icon/closeGray.svg";
import KakaoMap from "@/assets/icon/kakaoMap.svg";
import NaverMap from "@/assets/icon/naverMap.svg";
import TMap from "@/assets/icon/TMap.svg";
import { openKakaoMap, openNaverMap, openTMAP, useDeviceDetector } from "@/features/mapView/utils";
import { useEventStore } from "@/shared/stores";

interface MapModalProps {
  onClose: () => void;
}

export const MapModal = ({ onClose }: MapModalProps) => {
  const eventData = useEventStore(state => state.eventData);
  const detailEventData = useEventStore(state => state.detailEventData);
  const deviceType = useDeviceDetector();

  if (!eventData || !detailEventData) return;

  const firstGroup = eventData.meetingPointRouteGroups?.[0];
  const meetingPoint = firstGroup?.meetingPoint;

  if (!meetingPoint) return;

  const TransferMap = [
    {
      src: KakaoMap,
      alt: "kakaoMap",
      text: "카카오맵",
      onClick: () =>
        openKakaoMap({
          startLat: detailEventData.startLatitude,
          startLng: detailEventData.startLongitude,
          endPoint: meetingPoint.endStationName,
          endLat: meetingPoint.endLatitude,
          endLng: meetingPoint.endLongitude,
          isPc: deviceType === "Mac PC" || deviceType === "Windows PC" || deviceType === "Unknown Device",
        }),
    },
    {
      src: NaverMap,
      alt: "naverMap",
      text: "네이버지도",
      onClick: () =>
        openNaverMap({
          startPoint: detailEventData.startName,
          startLat: detailEventData.startLatitude,
          startLng: detailEventData.startLongitude,
          endPoint: meetingPoint.endStationName,
          endLat: meetingPoint.endLatitude,
          endLng: meetingPoint.endLongitude,
        }),
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
            <div className="flex flex-col gap-2 items-center cursor-pointer" onClick={item.onClick}>
              <img src={item.src} alt={item.alt} className="w-10 h-10" />
              <p className="text-xs font-medium text-gray-80">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
