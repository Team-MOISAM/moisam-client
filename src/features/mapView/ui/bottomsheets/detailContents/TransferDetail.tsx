import ArrowLine from "@/assets/icon/rightArrowLine.svg";
import Subway from "@/assets/icon/subway.svg";
import Car from "@/assets/icon/car.svg";
import Warning from "@/assets/icon/warning.svg";

interface TransferDetailProps {
  type: boolean;
  totalTime: number;
  startPoint: string;
  endPoint: string;
}

export const TransferDetail = ({ type, totalTime, startPoint, endPoint }: TransferDetailProps) => {
  return (
    <div className="flex flex-col px-5 py-4 gap-1">
      <div className="flex items-center gap-[6px]">
        {totalTime > 0 ? (
          <>
            <img src={type ? Subway : Car} alt="transfer" className="w-6 h-6" />
            <span className="text-xl font-bold text-gray-90">{totalTime}분</span>
          </>
        ) : (
          <>
            <img src={Warning} alt="warning" className="w-6 h-6" />
            <span className="text-xl font-bold text-gray-90">지금 경로를 확인할 수 없어요</span>
          </>
        )}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-1 items-center text-md font-semibold text-gray-60">
          {startPoint}
          <img src={ArrowLine} alt="arrow" className="w-4 h-4" />
          {endPoint}
        </div>
      </div>
    </div>
  );
};
