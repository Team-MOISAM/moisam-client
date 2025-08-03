import { SnapBottomSheet } from "@/shared/ui";
import { useEventStore } from "@/shared/stores";
import { TransferType } from "../../model";
import { CarDetail, FixedButton, Path, TransferDetail } from "./detailContents";

interface MapDetailBottomSheetProps {
  type: TransferType;
  setType: React.Dispatch<React.SetStateAction<"subway" | "car">>;
}

export const MapDetailBottomSheet = ({ type, setType }: MapDetailBottomSheetProps) => {
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
          type={type}
          setType={setType}
          averageDuration={type === "car" ? detailEventData.driveTime : detailEventData.transitTime}
          startPoint={detailEventData.startName}
          endPoint={eventData.meetingPointRouteGroups?.[0]?.meetingPoint?.endStationName || ""}
          isMe={detailEventData.isMe}
        />
        <SnapBottomSheet.Content>
          {type === "subway" ? (
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
