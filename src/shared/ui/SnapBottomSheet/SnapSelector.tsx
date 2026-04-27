import { cn } from "@/lib/utils";
import { PointType, useEventStore } from "@/shared/stores";

export const SnapSelector = () => {
  const pointTypeLabels: Record<PointType, string> = {
    [PointType.MIDDLE]: "중간장소",
    [PointType.HOT_PLACE]: "핫플위주",
  };
  const pointTypes = Object.values(PointType);
  const selectedPointType = useEventStore(state => state.selectedPointType);
  const setSelectedPointType = useEventStore(state => state.setSelectedPointType);
  const selectedIndex = pointTypes.indexOf(selectedPointType);

  const handlePointTypeClick = (type: PointType) => {
    setSelectedPointType(type);
  };

  return (
    <div className="absolute -top-[56px] left-1/2 transform -translate-x-1/2">
      <div className="relative py-1 px-1.5 rounded-[130px] bg-white shadow-selector">
        <div
          className="absolute top-1 bottom-1 rounded-[38px] bg-gray-80 transition-transform duration-300 ease-out"
          style={{
            width: "calc((100% - 12px) / 2)",
            transform: `translateX(${selectedIndex * 100}%)`,
          }}
        />
        {pointTypes.map(item => (
          <button
            key={item}
            className={cn(
              "relative z-10 text-sm font-medium py-[5px] px-3 rounded-[38px] transition-colors duration-200 ease-out",
              {
                "text-white": selectedPointType === item,
                "text-gray-40": selectedPointType !== item,
              }
            )}
            onClick={() => handlePointTypeClick(item)}>
            {pointTypeLabels[item]}
          </button>
        ))}
      </div>
    </div>
  );
};
