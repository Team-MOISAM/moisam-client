import { gtagEvent } from "@/shared/utils";

interface PointChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isSelect: boolean;
  additionalEventData?: {
    cafeName?: string;
    currentUser?: string;
  };
}

export const PointChip = ({ text, isSelect, onClick, additionalEventData }: PointChipProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const eventData: Record<string, string> = {
      selected_station: text,
      surface: "group_info_bottom_sheet",
    };

    // 추가 데이터가 있으면 포함
    if (additionalEventData?.cafeName) {
      eventData.cafe_name = additionalEventData.cafeName;
    }
    if (additionalEventData?.currentUser) {
      eventData.current_user = additionalEventData.currentUser;
    }

    gtagEvent("click_midpoint_options", eventData);

    // 원래 onClick 핸들러 실행
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className={`px-3 py-1 rounded-[130px] text-sm text-center border ${isSelect ? "bg-gray-90 text-white" : "bg-white text-gray-30 border-gray-10"}`}
      onClick={handleClick}>
      {text}역
    </button>
  );
};
