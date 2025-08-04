import { SnapBottomSheet } from "@/shared/ui";
import { BottomSheetContent, FixedButtons, GroupInfo } from "./durationBottomsheet";
import { useParams } from "react-router-dom";

export const SnapMapBottomSheet = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <SnapBottomSheet minHeightVh={35}>
      <SnapBottomSheet.Header />
      <GroupInfo id={id ?? null} />
      <SnapBottomSheet.Content>
        <BottomSheetContent />
        <FixedButtons />
      </SnapBottomSheet.Content>
    </SnapBottomSheet>
  );
};
