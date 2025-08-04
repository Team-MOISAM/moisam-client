import { SnapBottomSheet } from "@/shared/ui";
import { useEventStore } from "@/shared/stores";

import { CarDetail, FixedButton, Path, TransferDetail } from "./detailContents";

export const MapDetailBottomSheet = () => {
  const detailEventData = useEventStore(state => state.detailEventData);
  const eventData = useEventStore(state => state.eventData);

  if (!detailEventData || !eventData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SnapBottomSheet minHeightVh={30}>
        <SnapBottomSheet.Header />
        <TransferDetail
          type={detailEventData.isTransit}
          totalTime={detailEventData.totalTime}
          startPoint={detailEventData.startName}
          endPoint={eventData.meetingPointRouteGroups?.[0]?.meetingPoint?.endStationName || ""}
          isMe={detailEventData.isMe}
        />
        <SnapBottomSheet.Content>
          {detailEventData.isTransit ? (
            <Path
              startPoint={detailEventData.startName}
              endPoint={eventData.meetingPointRouteGroups?.[0]?.meetingPoint?.endStationName || ""}
              transferInfo={detailEventData.transitRoute}
            />
          ) : (
            <CarDetail
              driveDistance={detailEventData.drivingInfo.distance}
              toll={detailEventData.drivingInfo.toll}
              taxiToll={detailEventData.drivingInfo.taxi}
              parking={eventData.meetingPointRouteGroups?.[0]?.parkingLot}
            />
          )}
          <FixedButton />
        </SnapBottomSheet.Content>
      </SnapBottomSheet>
    </>
  );
};
