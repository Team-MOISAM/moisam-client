import { SnapBottomSheet } from "@/shared/ui";
import { useEventStore } from "@/shared/stores";

import { CarDetail, FixedButton, Path, TransferDetail } from "./detailContents";

export const MapDetailBottomSheet = () => {
  const detailEventData = useEventStore(state => state.detailEventData);
  const eventData = useEventStore(state => state.eventData);
  const meetingPointData = useEventStore(state => state.meetingPointData);

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
          endPoint={meetingPointData?.meetingPoint?.endStationName || ""}
          isMe={detailEventData.isMe}
        />
        <SnapBottomSheet.Content>
          {detailEventData.totalTime > 0 &&
            (detailEventData.isTransit ? (
              <Path
                startPoint={detailEventData.startName}
                endPoint={meetingPointData?.meetingPoint?.endStationName || ""}
                transferInfo={detailEventData.transitRoute}
              />
            ) : (
              <CarDetail
                driveDistance={detailEventData.drivingInfo?.distance}
                toll={detailEventData.drivingInfo?.toll}
                taxiToll={detailEventData.drivingInfo?.taxi}
                parking={meetingPointData?.parkingLot}
              />
            ))}
          <FixedButton disabled={detailEventData.totalTime <= 0} />
        </SnapBottomSheet.Content>
      </SnapBottomSheet>
    </>
  );
};
