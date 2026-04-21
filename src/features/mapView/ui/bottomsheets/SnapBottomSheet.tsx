import { SnapBottomSheet } from "@/shared/ui";
import { BottomSheetContent, FixedButtons, GroupInfo } from "./durationBottomsheet";

export const SnapMapBottomSheet = () => {
  return (
    <SnapBottomSheet minHeightVh={35}>
      <SnapBottomSheet.Floating />
      <SnapBottomSheet.Selector />
      <SnapBottomSheet.Header />
      <GroupInfo />
      <SnapBottomSheet.Content>
        <BottomSheetContent />
        <FixedButtons />
      </SnapBottomSheet.Content>
    </SnapBottomSheet>
  );
};
