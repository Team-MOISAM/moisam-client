import Back from "@/assets/icon/whiteBack.svg";
import BackScroll from "@/assets/icon/back.svg";
import Share from "@/assets/icon/whiteShare.svg";
import ShareScroll from "@/assets/icon/share.svg";

interface ScrolledHeaderProps {
  backClick: () => void;
  shareClick: () => void;
  isScrolled: boolean;
  name: string;
}

export const ScrolledHeader = ({ backClick, shareClick, isScrolled, name }: ScrolledHeaderProps) => {
  return (
    <div
      className={`flex justify-between px-5 py-3 ${isScrolled ? "relative bg-white shadow-pin02" : "absolute top-0 left-0 w-full bg-[linear-gradient(180deg,_rgba(8,8,10,0.60)_8%,_rgba(28,28,34,0.00)_100%)]"}`}>
      <button onClick={backClick}>
        <img src={isScrolled ? BackScroll : Back} alt="back" className="w-6 h-6" />
      </button>
      {isScrolled && (
        <span className="text-lg font-semibold text-gray-90 max-w-[252px] overflow-hidden text-ellipsis whitespace-nowrap">
          {name}
        </span>
      )}
      <button onClick={shareClick}>
        <img src={isScrolled ? ShareScroll : Share} alt="share" className="w-6 h-6" />
      </button>
    </div>
  );
};
