import { Modal } from "@/shared/ui";

interface PlaceModalProps {
  onClose: () => void;
  placeName: string;
  type: "fix" | "change" | "cancel";
  onClick: () => void;
}

export const PlaceModal = ({ onClose, placeName, type, onClick }: PlaceModalProps) => {
  return (
    <Modal onClose={onClose}>
      <div className="px-5 py-7 flex flex-col gap-1 items-center">
        <span className="text-md font-semibold text-gray-90">
          {type === "fix" ? "여기에서 만날까요?" : type === "change" ? "모임장소를 바꿀까요?" : "확정을 취소하시겠어요?"}
        </span>
        {type !== "cancel" && (
          <p className="text-sm font-medium text-gray-40">{placeName}</p>
        )}
      </div>
      <div className="flex w-full text-sm">
        <button
          className="w-1/2 py-3 rounded-bl-[20px] font-medium text-gray-40 border-t border-t-gray-5"
          onClick={onClose}>
          {type === "cancel" ? "유지하기" : "아니요"}
        </button>
        <button
          className="w-1/2 py-3 bg-gray-90 rounded-br-[20px] font-semibold text-white border-t border-t-gray-90"
          onClick={onClick}>
          {type === "fix" ? "선택하기" : type === "change" ? "바꾸기" : "취소하기"}
        </button>
      </div>
    </Modal>
  );
};
