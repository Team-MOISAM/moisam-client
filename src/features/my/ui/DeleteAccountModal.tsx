import { Modal } from "@/shared/ui";
import { createGtagHandler } from "@/shared/utils";
import { useUserStore } from "@/shared/stores";

interface DeleteAccountModalProps {
  onClose: () => void;
  onDelete: () => void;
}

export const DeleteAccountModal = ({ onClose, onDelete }: DeleteAccountModalProps) => {
  const { nickname, email, personalInfoAgreement } = useUserStore();

  const handleDelete = createGtagHandler(
    "delete_account",
    {
      user_id: nickname || "unknown",
      user_email: email || "unknown", 
      personal_info_agreement: personalInfoAgreement,
    },
    onDelete
  );

  return (
    <Modal>
      <div className="px-5 py-[28px] flex flex-col gap-1 items-center">
        <span className="text-gray-90 text-md font-semibold">정말로 탈퇴하시겠어요?</span>
        <p className="text-gray-40 text-sm font-medium">탈퇴 시 계정 정보가 모두 삭제돼요</p>
      </div>
      <div className="flex w-full">
        <button
          className="w-1/2 flex justify-center items-center py-3 text-gray-40 text-sm font-medium border-t border-t-gray-5 cursor-pointer"
          onClick={onClose}>
          더 써볼래요
        </button>
        <button
          className="w-1/2 flex justify-center items-center py-3 text-white text-sm font-semibold border-t bg-gray-90 rounded-br-[20px] cursor-pointer"
          onClick={handleDelete}>
          떠날래요
        </button>
      </div>
    </Modal>
  );
};
