import { useDeleteEvent } from "@/features/mapView/hooks";
import { useEventStore } from "@/shared/stores";
import { DeleteModal, Dropdown, PointChip } from "@/shared/ui";
import { useState } from "react";
import Setting from "@/assets/icon/setting.svg";
import { useNavigate } from "react-router-dom";
import { gtagEvent } from "@/shared/utils";

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
    // GA4 이벤트 전송
    gtagEvent("click_overflow_edit", {
      meeting_name: eventData.eventName,
      meeting_date: eventData.eventDate,
      meeting_time: eventData.eventTime,
    });

    navigate(`/find?startStep=1&eventId=${id}&isEdit=true`);
  };

  const handleDeleteClick = () => {
    // 현재 선택된 중간지점의 참가자 정보 가져오기
    const currentParticipants = meetingPointData?.routeResponse ?? [];
    const participantNames = currentParticipants.map(user => user.nickname).join(", ");
    const participantCount = currentParticipants.length;

    gtagEvent("click_overflow_delete", {
      meeting_name: eventData.eventName,
      member_count: participantCount,
      member_id: participantNames,
      midpoint_station: meetingPointData?.meetingPoint?.endStationName ?? "unknown",
      place_name: eventData.placeName ?? "none",
    });

    setOpenDeleteModal(true);
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
          {isOpen && <Dropdown handleEdit={handleEdit} handleDelete={handleDeleteClick} />}
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
