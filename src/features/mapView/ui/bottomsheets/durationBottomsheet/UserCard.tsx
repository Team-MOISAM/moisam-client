import Arrow from "@/assets/icon/rightArrow.svg";
import Subway from "@/assets/icon/subway.svg";
import Car from "@/assets/icon/car.svg";
import Warning from "@/assets/icon/warning.svg";

interface UserCardProps {
  isTransit: boolean;
  name: string;
  startStation: string;
  totalTime: number;
  onClick?: () => void;
}

export const UserCard = ({ isTransit, name, startStation, totalTime, onClick }: UserCardProps) => {
  return (
    <div className="flex justify-between items-center" onClick={totalTime > 0 ? onClick : undefined}>
      <div className="py-[8px] cursor-pointer">
        <div className="flex gap-1 text-lg font-bold text-gray-70 items-center">
          {totalTime > 0 ? (
            <>
              <img src={isTransit ? Subway : Car} alt="transfer" className="w-5 h-5" />
              <span>
                {totalTime >= 60 ? `${Math.floor(totalTime / 60)}시간 ${totalTime % 60}분` : `${totalTime}분`}
              </span>
            </>
          ) : (
            <>
              <img src={Warning} alt="warning" className="w-5 h-5" />
              <span>지금 경로를 확인할 수 없어요</span>
            </>
          )}
        </div>
        <p className="text-gray-40 text-sm">
          {name} · {startStation}
        </p>
      </div>
      {totalTime > 0 && (
        <button>
          <img src={Arrow} alt="arrow" className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
