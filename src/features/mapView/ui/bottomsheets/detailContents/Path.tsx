import { TransitRoute } from "@/shared/model";
import { BusPath } from "./BusPath";
import { SubwayPath } from "./SubwayPath";
import { WalkPath } from "./WalkPath";
import Start from "@/assets/icon/start.svg";
import ShortPath from "@/assets/icon/shortPath.svg";
import End from "@/assets/icon/end.svg";

interface PathProps {
  startPoint: string;
  endPoint: string;
  transferInfo: TransitRoute[];
}

export const Path = ({ startPoint, endPoint, transferInfo }: PathProps) => {
  return (
    <div className="flex flex-col my-4 mx-5 mb-[84px]">
      <div className="flex gap-3 items-center">
        <div className="relative">
          <img src={Start} alt="start" className="w-6 h-7" />
          <span className="absolute top-[5px] left-[3px] right-[3px] text-labelXxs font-semibold text-white">출발</span>
        </div>
        <span className="text-md font-semibold text-gray-90">{startPoint}</span>
      </div>
      <img src={ShortPath} alt="shortPath" className="ml-[11px] w-[2px] h-8" />

      {transferInfo?.map((info, index) => {
        const isLastIndex = index === (transferInfo?.length || 0) - 1;
        const prevInfo = index > 0 ? transferInfo?.[index - 1] : null;
        const nextInfo = index < (transferInfo?.length || 0) - 1 ? transferInfo?.[index + 1] : null;

        if (info.trafficType === "SUBWAY") {
          return <SubwayPath key={index} {...info} />;
        }
        if (info.trafficType === "BUS") {
          return <BusPath key={index} {...info} />;
        } // 버스 추후 확인해봐야함
        if (info.trafficType === "WALKING" && !isLastIndex && info.distance !== 0) {
          return <WalkPath key={index} {...info} previousInfo={prevInfo} nextInfo={nextInfo} />;
        }
        return null;
      })}

      <div className="flex gap-3 items-center">
        <div className="relative">
          <img src={End} alt="end" className="w-6 h-7" />
          <span className="absolute top-[5px] left-[3px] right-[3px] text-labelXxs font-semibold text-white">도착</span>
        </div>
        <span className="text-md font-semibold text-gray-90">{endPoint}역</span>
      </div>
    </div>
  );
};
