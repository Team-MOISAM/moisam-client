import Plug from "@/assets/icon/plug.svg";
import Seat from "@/assets/icon/seat.svg";

interface PlaceChipProps {
  label: string;
}

// 아이콘 매핑: 키워드로만!
const iconMap: Record<string, string> = {
  콘센트: Plug,
  좌석: Seat,
};

const PlaceChip = ({ label }: PlaceChipProps) => {
  const match = label.match(/^(콘센트|좌석)\s(.+)$/);
  if (!match) return null;

  const [, prefix, emphasis] = match;
  const icon = iconMap[prefix];
  if (!icon) return null;

  return (
    <div className="flex gap-[1px] py-[3px] px-[6px] bg-gray-5 rounded-[6px] items-center font-semibold text-labelXs">
      <img src={icon} alt={label} className="w-4 h-4 mr-[2px]" />
      <span className="text-gray-70">{prefix}</span>
      <span className="text-gray-90 ml-[1px]">{emphasis}</span>
    </div>
  );
};

export default PlaceChip;
