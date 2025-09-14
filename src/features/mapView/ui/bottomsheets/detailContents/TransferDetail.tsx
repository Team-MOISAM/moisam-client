import ArrowLine from "@/assets/icon/rightArrowLine.svg";
import Subway from "@/assets/icon/subway.svg";
import Car from "@/assets/icon/car.svg";
import Setting from "@/assets/icon/setting.svg";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEventStore, useUserStore } from "@/shared/stores";
import { DeleteModal, Dropdown } from "@/shared/ui";
import { useDeleteStartPoint } from "@/features/mapView/hooks";
import { gtagEvent } from "@/shared/utils";

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
  const { mutate } = useDeleteStartPoint();
  const startPointId = useEventStore(state => state.detailEventData?.id);
  const detailEventData = useEventStore(state => state.detailEventData);
  const toggleDetail = useEventStore(state => state.toggleDetail);
  const nickname = useUserStore(state => state.nickname);

  const handleEdit = () => {
    gtagEvent("view_route_edit", {
      editing_member_id: nickname ?? "unknown",
      edited_member_id: detailEventData?.nickname ?? "unknown",
    });

    navigate(`/find?startStep=2&eventId=${id}&isEdit=true`);
  };

  const handleDeleteClick = () => {
    gtagEvent("view_route_delete", {
      deleting_member_id: nickname ?? "unknown",
      deleted_member_id: detailEventData?.nickname ?? "unknown",
    });

    setOpenDeleteModal(true);
  };

  const handleDelete = () => {
    if (!id || !startPointId) return;
    mutate(
      { eventId: id, startPointId },
      {
        onSuccess: () => {
          setOpenDeleteModal(false);
          setIsOpen(false);
          toggleDetail();
        },
      }
    );
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
          className="relative w-6 h-6 flex items-center justify-center"
          onClick={() => {
            setIsOpen(prev => !prev);
          }}>
          <img src={Setting} alt="setting" className="w-[3px] h-[15px]" />
          {isOpen && <Dropdown handleEdit={handleEdit} handleDelete={handleDeleteClick} isDetail={true} />}
        </button>
      </div>
      {openDeleteModal && (
        <DeleteModal
          title={`${endPoint}역`}
          description="출발지를 삭제하시겠어요?"
          onClose={() => setOpenDeleteModal(false)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};
