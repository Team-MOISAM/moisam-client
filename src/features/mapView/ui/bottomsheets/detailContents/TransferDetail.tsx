import ArrowLine from "@/assets/icon/rightArrowLine.svg";
import Subway from "@/assets/icon/subway.svg";
import Car from "@/assets/icon/car.svg";
import Setting from "@/assets/icon/setting.svg";
import Edit from "@/assets/icon/editGray.svg";
import Delete from "@/assets/icon/delete.svg";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import { useNavigate, useParams } from "react-router-dom";

interface TransferDetailProps {
  type: boolean;
  totalTime: number;
  startPoint: string;
  endPoint: string;
  isMe: boolean;
}

export const TransferDetail = ({ type, totalTime, startPoint, endPoint }: TransferDetailProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { id } = useParams();

  const handleEdit = () => {
    navigate(`/find?startStep=2&eventId=${id}&isEdit=true`);
  };

  return (
    <div className="flex flex-col px-5 py-4 gap-1">
      <div className="flex items-center gap-[6px]">
        <img src={type ? Subway : Car} alt="transfer" className="w-6 h-6" />
        <span className="text-xl font-bold text-gray-90">{totalTime}분</span>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-1 items-center text-md font-semibold text-gray-60">
          {startPoint}
          <img src={ArrowLine} alt="arrow" className="w-4 h-4" />
          {endPoint}
        </div>
        <button
          className="relative"
          onClick={() => {
            setIsOpen(prev => !prev);
          }}>
          <img src={Setting} alt="setting" className="w-[3px] h-[15px]" />
          {isOpen && (
            <div className="absolute top-[33px] right-0 w-[175px] h-[98px] rounded-[20px] bg-white shadow-box cursor-pointer">
              <div className="px-5 py-[14px] flex gap-[26px] items-center" onClick={handleEdit}>
                <p className="text-sm font-medium text-gray-80">출발지 수정하기</p>
                <img src={Edit} alt="edit" className="w-5 h-5" />
              </div>
              <div
                className="px-5 py-[14px] flex gap-[26px] items-center border-t border-t-gray-5 cursor-pointer"
                onClick={() => {
                  setOpenDeleteModal(true);
                }}>
                <p className="text-sm font-medium text-gray-80">출발지 삭제하기</p>
                <img src={Delete} alt="delete" className="w-5 h-5" />
              </div>
            </div>
          )}
        </button>
      </div>
      {openDeleteModal && <DeleteModal endPoint={endPoint} onClose={() => setOpenDeleteModal(false)} />}
    </div>
  );
};
