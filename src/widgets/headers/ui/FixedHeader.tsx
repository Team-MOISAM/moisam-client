import Back from "@/assets/icon/back.svg";
import Share from "@/assets/icon/share.svg";

interface FixedHeaderProps {
  backClick: () => void;
  shareClick: () => void;
  name: string;
}

export const FixedHeader = ({ backClick, shareClick, name }: FixedHeaderProps) => {
  return (
    <div className="flex justify-between relative bg-white px-5 py-3">
      <button onClick={backClick}>
        <img src={Back} alt="back" className="w-6 h-6" />
      </button>
      <span className="text-lg font-semibold text-gray-90 max-w-[252px] overflow-hidden text-ellipsis whitespace-nowrap">
        {name}
      </span>
      <button onClick={shareClick}>
        <img src={Share} alt="share" className="w-6 h-6" />
      </button>
    </div>
  );
};
