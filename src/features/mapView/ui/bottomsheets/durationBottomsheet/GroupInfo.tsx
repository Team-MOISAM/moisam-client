import { useDeleteEvent } from "@/features/mapView/hooks";
import { useEventStore } from "@/shared/stores";
import { DeleteModal, Dropdown, PointChip } from "@/shared/ui";
import { useState } from "react";
import Setting from "@/assets/icon/setting.svg";
import { useNavigate } from "react-router-dom";

interface GroupInfoProps {
  id: string | null;
}

export const GroupInfo = ({ id }: GroupInfoProps) => {
  const eventData = useEventStore(state => state.eventData);
  const meetingPointData = useEventStore(state => state.meetingPointData);
  const setMeetingPointData = useEventStore(state => state.setMeetingPointData);
  const { mutate } = useDeleteEvent();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  if (!eventData) return null;
  const [year, month, day] = eventData.eventDate.split("-");

  const handleEdit = () => {
    navigate(`/find?startStep=1&eventId=${id}&isEdit=true`);
  };

  const handleDelete = () => {
    if (!id) return;
    mutate(id, {
      onSuccess: () => {
        setOpenDeleteModal(false);
        setIsOpen(false);
      },
    });
  };

  return (
    <div className="mx-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-80 text-lg font-bold pb-[2px]">{eventData.eventName}</h1>
          <p className="text-gray-40 text-sm">
            {year}년 {parseInt(month)}월 {parseInt(day)}일, {eventData.eventTime}
          </p>
        </div>
        <button className="relative w-6 h-6 flex items-center justify-center" onClick={() => setIsOpen(prev => !prev)}>
          <img src={Setting} alt="setting" className="w-[3px] h-[15px]" />
          {isOpen && <Dropdown handleEdit={handleEdit} handleDelete={() => setOpenDeleteModal(true)} />}
        </button>
      </div>
      <div className="pb-3 flex gap-[6px]">
        {eventData.meetingPointRouteGroups.map(item => (
          <PointChip
            key={item.subwayId}
            text={item.meetingPoint.endStationName}
            isSelect={item === meetingPointData}
            onClick={() => {
              setMeetingPointData(item);
            }}
          />
        ))}
      </div>
      {openDeleteModal && (
        <DeleteModal
          title={eventData.eventName}
          description="모임을 삭제하시겠어요?"
          onClose={() => setOpenDeleteModal(false)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};
