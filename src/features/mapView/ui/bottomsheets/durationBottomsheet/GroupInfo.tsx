import { PointType, useEventStore } from "@/shared/stores";
import { useFormattedDuration } from "@/shared/hooks";

export const GroupInfo = () => {
  const eventData = useEventStore(state => state.eventData);
  const selectedPointType = useEventStore(state => state.selectedPointType);

  const averageTime =
    selectedPointType === PointType.MIDDLE ? eventData?.coordinate.averageTime : eventData?.popularity.averageTime;
  const formattedAverageTime = useFormattedDuration(averageTime?.toString() ?? "0");

  if (!eventData) return null;

  return (
    <div className="mx-5 flex flex-col gap-4 mb-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-80 text-lg font-bold pb-[2px]">
            {selectedPointType === PointType.MIDDLE
              ? eventData.coordinate.meetingPoint.endStationName
              : eventData.popularity.meetingPoint.endStationName}
            역
          </h1>
          <p className="text-gray-40 text-sm">평균 {formattedAverageTime} 소요</p>
        </div>
      </div>
    </div>
  );
};
