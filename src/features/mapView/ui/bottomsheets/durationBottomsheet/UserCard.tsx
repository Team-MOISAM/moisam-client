import Arrow from "@/assets/icon/rightArrow.svg";
import Subway from "@/assets/icon/subway.svg";
import Car from "@/assets/icon/car.svg";

interface UserCardProps {
  isTransit: boolean;
  name: string;
  startStation: string;
  totalTime: number;
  onClick?: () => void;
}

export const UserCard = ({ isTransit, name, startStation, totalTime, onClick }: UserCardProps) => {
  return (
    <div className="flex justify-between items-center" onClick={onClick}>
      <div className="py-[8px] cursor-pointer">
        <div className="flex gap-1 text-lg font-bold text-gray-70 items-center">
          <img src={isTransit ? Subway : Car} alt="transfer" className="w-5 h-5" />
          <span>{totalTime}분</span>
        </div>
        <p className="text-gray-40 text-sm">
          {name} · {startStation}
        </p>
      </div>
      <button>
        <img src={Arrow} alt="arrow" className="w-4 h-4" />
      </button>
    </div>
  );
};
