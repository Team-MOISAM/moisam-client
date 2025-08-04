import { SnapBottomSheet } from "@/shared/ui";
import { BottomSheetContent, FixedButtons, GroupInfo } from "./durationBottomsheet";
import { useNavigate, useParams } from "react-router-dom";

export const SnapMapBottomSheet = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/place/${id}`);
  };

  return (
    <SnapBottomSheet minHeightVh={35}>
      <div className="relative">
        <SnapBottomSheet.Header />
        <button
          className="absolute -top-14 left-1/2 -translate-x-1/2 bg-gray-80 text-white font-semibold text-md px-[24px] py-[12px] rounded-3xl shadow-pin02"
          onClick={handleNavigate}>
          역 주변 둘러보기
        </button>
      </div>
      <GroupInfo id={id ?? null} />
      <SnapBottomSheet.Content>
        <BottomSheetContent />
        <FixedButtons />
      </SnapBottomSheet.Content>
    </SnapBottomSheet>
  );
};
