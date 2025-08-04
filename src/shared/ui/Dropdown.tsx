import Edit from "@/assets/icon/editGray.svg";
import Delete from "@/assets/icon/delete.svg";

interface DropdownProps {
  handleEdit: () => void;
  handleDelete: () => void;
  top: number;
  isDetail?: boolean;
}

export const Dropdown = ({ handleEdit, handleDelete, top, isDetail }: DropdownProps) => {
  return (
    <div
      className={`absolute top-[${top}px] right-0 min-w-[163px] max-w-[200px] w-max h-[98px] rounded-[20px] bg-white shadow-box cursor-pointer`}>
      <div className="px-5 py-[14px] flex gap-[26px] items-center" onClick={handleEdit}>
        <p className="text-sm font-medium text-gray-80">{isDetail ? "출발지" : "모임"} 수정하기</p>
        <img src={Edit} alt="edit" className="w-5 h-5" />
      </div>
      <div
        className="px-5 py-[14px] flex gap-[26px] items-center border-t border-t-gray-5 cursor-pointer"
        onClick={handleDelete}>
        <p className="text-sm font-medium text-gray-80">{isDetail ? "출발지" : "모임"} 삭제하기</p>
        <img src={Delete} alt="delete" className="w-5 h-5" />
      </div>
    </div>
  );
};
