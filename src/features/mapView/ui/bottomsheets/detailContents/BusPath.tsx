import { TransitRoute } from "@/shared/model";
import { BusChip } from "./BusChip";
import Bus from "@/assets/icon/bus.svg";
import Path from "@/assets/icon/shortPath.svg";

export const BusPath = ({ startBoardName, endBoardName, laneName, stationCount, sectionTime }: TransitRoute) => {
  return (
    <>
      <div className="flex gap-3 items-center">
        <div className="flex flex-col items-center w-fit">
          <img src={Bus} alt="bus" className="w-6 h-6" />
          <div className="h-[87px] w-1 bg-gray-70" />
          <div className="flex w-6 h-6 justify-center items-center bg-gray-70 rounded-[30px] text-labelXxs font-semibold text-white">
            하차
          </div>
        </div>
        <div className="flex flex-col text-md font-medium text-gray-90">
          <span className="mb-2">{startBoardName} 승차</span>
          <div className="flex gap-1 mb-2">{laneName && <BusChip busNumber={laneName} />}</div>
          <div className="flex items-center gap-[6px] text-sm mb-8">
            <p className="font-semibold text-gray-50">{sectionTime}분</p>
            <p className="text-gray-30">{stationCount}개 정류장 이동</p>
          </div>
          <span>{endBoardName} 하차</span>
        </div>
      </div>
      <img src={Path} alt="shortPath" className="ml-[11px] w-[2px] h-8" />
    </>
  );
};
