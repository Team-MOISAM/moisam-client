import { Modal } from "@/shared/ui";

interface DeleteModalProps {
  title: string;
  description: string;
  onClose: () => void;
  onDelete: () => void;
}

export const DeleteModal = ({ title, description, onClose, onDelete }: DeleteModalProps) => {
  return (
    <Modal onClose={onClose}>
      <div className="px-5 py-[28px] flex flex-col gap-1 items-center">
        <span className="text-sub-sub text-md font-semibold">{title}</span>
        <p className="text-gray-90 text-md font-semibold">{description}</p>
      </div>
      <div className="flex w-full">
        <div
          className="w-1/2 flex justify-center items-center py-3 text-gray-40 text-sm font-medium border-t border-t-gray-5 cursor-pointer"
          onClick={onClose}>
          돌아가기
        </div>
        <div
          className="w-1/2 flex justify-center items-center py-3 text-white text-sm font-semibold border-t bg-gray-90 rounded-br-[20px] cursor-pointer"
          onClick={onDelete}>
          삭제하기
        </div>
      </div>
    </Modal>
  );
};
