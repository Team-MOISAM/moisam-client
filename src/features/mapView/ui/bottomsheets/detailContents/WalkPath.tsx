import { TransitRoute } from "@/shared/model";
import { useEventStore } from "@/shared/stores";
import Walk from "@/assets/icon/walk.svg";
import Path from "@/assets/icon/middlePath.svg";

interface WalkPathProps extends TransitRoute {
  previousInfo: TransitRoute | null;
  nextInfo: TransitRoute | null;
}

export const WalkPath = ({ sectionTime, distance, previousInfo, nextInfo }: WalkPathProps) => {
  const eventData = useEventStore(state => state.eventData);

  const nextTransferType = nextInfo?.trafficType;

  const firstGroup = eventData?.meetingPointRouteGroups?.[0];
  const meetingPoint = firstGroup?.meetingPoint;

  // 다음 역이 없으면 meetingPoint의 endStationName을 사용
  const nextStationName = nextInfo?.startBoardName ?? meetingPoint?.endStationName;

  let displayStationName = nextStationName;

  if (nextTransferType === "SUBWAY") {
    // "역"이 포함되어 있는지 확인하고 없으면 붙이기
    displayStationName = nextStationName?.includes("역") ? nextStationName : `${nextStationName}역`;
  } else if (nextTransferType === "BUS") {
    displayStationName = `${nextStationName} 승강장`;
  }

  return (
    <div className="flex gap-3">
      <div className="flex flex-col">
        <img src={Walk} alt="walk" className="w-6 h-6" />
        <img src={Path} alt="Path" className="ml-[11px] w-[2px] h-[55px]" />
      </div>
      <div className="flex flex-col">
        <span className="text-md font-medium text-gray-90 break-keep whitespace-normal mb-[2px]">
          {previousInfo?.startExitNo
            ? `${previousInfo.startExitNo}번 출구로 나와서, ${displayStationName}까지 걷기`
            : `${displayStationName}까지 걷기`}
        </span>
        <div className="flex items-center gap-[6px] text-sm mb-8">
          <p className="font-semibold text-gray-50">{sectionTime}분</p>
          <p className="text-gray-30">{distance}m 이동</p>
        </div>
      </div>
    </div>
  );
};
