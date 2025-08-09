import Pin from "@/assets/icon/pin.svg";
import Arrow from "@/assets/icon/rightArrowGray.svg";
import PinBlue from "@/assets/icon/pinBlue.svg";

interface MeetPointCardProps {
  placeName: string | undefined;
  onClick?: () => void;
  isPlace?: boolean;
  isConfirmed?: boolean;
}

export const MeetPointCard = ({ placeName, onClick, isPlace = true, isConfirmed = false }: MeetPointCardProps) => {
  const isSelect = !!placeName;

  return (
    <div 
      className={`flex gap-3 p-3 rounded-2xl bg-white shadow-list w-full items-center ${onClick ? 'cursor-pointer' : ''}`} 
      onClick={onClick}
    >
      <div className={`w-10 h-10 flex justify-center items-center rounded-xl ${isConfirmed ? 'bg-sub-10' : 'bg-gray-5'}`}>
        <img src={isConfirmed ? PinBlue : Pin} alt="pin" className="w-6 h-6" />
      </div>
      <div className="w-full">
        <p className={`text-xs ${isSelect ? "text-sub-sub" : "text-gray-40"}`}>
          {isSelect ? "여기에서 모여요" : "어디서 만나실 건가요?"}
        </p>
        <span className="text-md font-semibold text-gray-90">{placeName ?? "장소를 정해보세요"}</span>
      </div>
      {(isPlace || placeName) && <img src={Arrow} alt="arrow" className="w-5 h-5" />}
    </div>
  );
};
