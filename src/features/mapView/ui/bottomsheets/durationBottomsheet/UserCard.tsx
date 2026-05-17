import Arrow from "@/assets/icon/rightArrowGray.svg";
import Edit from "@/assets/icon/editGray.svg";
import Subway from "@/assets/icon/subway.svg";
import Car from "@/assets/icon/car.svg";
import Warning from "@/assets/icon/warning.svg";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteStartPoint } from "@/features/mapView/hooks";
import { useEventStore, useUserStore } from "@/shared/stores";
import { DeleteModal, Dropdown } from "@/shared/ui";
import { gtagEvent } from "@/shared/utils";
import { useClickOutside } from "@/shared/hooks/useClickOutSide";

interface UserCardProps {
  startPointId: string;
  isTransit: boolean;
  name: string;
  startStation: string;
  totalTime: number;
  onClick?: () => void;
}

export const UserCard = ({ startPointId, isTransit, name, startStation, totalTime, onClick }: UserCardProps) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const editDropdownRef = useRef<HTMLDivElement>(null);

  const { mutate } = useDeleteStartPoint();
  const nickname = useUserStore(state => state.nickname);
  const isDetail = useEventStore(state => state.isDetail);
  const setDetailEventData = useEventStore(state => state.setDetailEventData);
  const clearDetailEventData = useEventStore(state => state.clearDetailEventData);
  const setIsDetail = useEventStore(state => state.setIsDetail);
  const detailEventData = useEventStore(state => state.detailEventData);
  const meetingPointData = useEventStore(state => state.meetingPointData);

  const selectedUser = meetingPointData?.routeResponse?.find(user => user.id === startPointId);

  useClickOutside(editDropdownRef, () => setIsDropdownOpen(false));

  const handleEdit = () => {
    if (!selectedUser || !id) {
      return;
    }

    gtagEvent("view_route_edit", {
      editing_member_id: nickname ?? "unknown",
      edited_member_id: selectedUser.nickname ?? "unknown",
    });

    setDetailEventData(selectedUser);
    setIsDropdownOpen(false);
    navigate(`/find?startStep=2&eventId=${id}&isEdit=true`);
  };

  const handleDeleteClick = () => {
    gtagEvent("view_route_delete", {
      deleting_member_id: nickname ?? "unknown",
      deleted_member_id: name ?? "unknown",
    });

    setIsDropdownOpen(false);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (!id) {
      return;
    }

    mutate(
      { eventId: id, startPointId },
      {
        onSuccess: () => {
          if (isDetail && detailEventData?.id === startPointId) {
            clearDetailEventData();
            setIsDetail(false);
          }

          setIsDeleteModalOpen(false);
        },
      }
    );
  };

  return (
    <div className="flex justify-between items-center">
      <div className="py-[8px] cursor-pointer">
        <div className="flex gap-1 text-lg font-bold text-gray-70 items-center">
          {totalTime > 0 ? (
            <>
              <img src={isTransit ? Subway : Car} alt="transfer" className="w-5 h-5" />
              <span>
                {totalTime >= 60 ? `${Math.floor(totalTime / 60)}시간 ${totalTime % 60}분` : `${totalTime}분`}
              </span>
            </>
          ) : (
            <>
              <img src={Warning} alt="warning" className="w-5 h-5" />
              <span>지금 경로를 확인할 수 없어요</span>
            </>
          )}
        </div>
        <p className="text-gray-40 text-sm">
          {name} · {startStation}
        </p>
      </div>
      <div className="relative flex items-center" ref={editDropdownRef}>
        <button
          className="w-10 h-10 flex items-center justify-end py-3 pl-6 cursor-pointer"
          onClick={e => {
            e.stopPropagation();
            setIsDropdownOpen(prev => !prev);
          }}>
          <img src={Edit} alt="edit" className="w-[18px] h-[18px]" />
        </button>
        {isDropdownOpen && <Dropdown handleEdit={handleEdit} handleDelete={handleDeleteClick} isDetail={true} />}
        <button
          className="w-10 h-10 flex items-center justify-end py-3 pl-6 cursor-pointer"
          onClick={e => {
            e.stopPropagation();
            onClick?.();
          }}>
          <img src={Arrow} alt="arrow" className="w-4 h-4" />
        </button>
      </div>
      {isDeleteModalOpen && (
        <DeleteModal
          title={`${startStation}역`}
          description="출발지를 삭제하시겠어요?"
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};
