import { useEventStore, useUserStore } from "@/shared/stores";
import { useNavigate, useParams } from "react-router-dom";
import Pin from "@/assets/icon/pin_btn.svg";
import { UserCard } from "./UserCard";
import { gtagEvent } from "@/shared/utils";

export const BottomSheetContent = () => {
  const meetingPointData = useEventStore(state => state.meetingPointData);
  const toggleDetail = useEventStore(state => state.toggleDetail);
  const setDetailEventData = useEventStore(state => state.setDetailEventData);
  const nickname = useUserStore(state => state.nickname);

  return (
    <div className="h-full flex flex-col">
      <div className="mx-5 pb-[80px]">
        {meetingPointData?.routeResponse?.map(user => (
          <UserCard
            key={user.id}
            isTransit={user.isTransit}
            name={user.nickname}
            startStation={user.startName}
            totalTime={user.totalTime}
            onClick={() => {
              gtagEvent("view_route", {
                click_member_id: nickname ?? "unknown",
                viewed_member_id: user.id,
              });

              toggleDetail();
              setDetailEventData(user);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export const FixedButtons = () => {
  const { id } = useParams();
  const eventData = useEventStore(state => state.eventData);
  const meetingPointData = useEventStore(state => state.meetingPointData);

  const navigate = useNavigate();

  // 공통 모임 데이터 생성 함수
  const getMeetingEventData = () => {
    if (!eventData || !meetingPointData) return null;

    const participantCount = meetingPointData.routeResponse?.length ?? 0;
    const memberNames = meetingPointData.routeResponse?.map(user => user.nickname).join(", ") ?? "";

    return {
      meeting_name: eventData.eventName,
      meeting_members: memberNames,
      meet_here_button_status: eventData.placeName ? "place_selected" : "no_place_selected",
      meeting_date: eventData.eventDate,
      meeting_time: eventData.eventTime,
      participant_count: participantCount,
      surface: "snap_bottom_sheet_fixed_buttons",
    };
  };

  const handlePlaceViewClick = () => {
    const meetingData = getMeetingEventData();
    if (meetingData) {
      gtagEvent("view_place", {
        meeting_name: meetingData.meeting_name,
        button_state: meetingData.meet_here_button_status,
        meeting_date: meetingData.meeting_date,
        meeting_time: meetingData.meeting_time,
        at_click_members: meetingData.meeting_members,
        at_click_date: meetingData.meeting_date,
        at_click_time: meetingData.meeting_time,
      });
    }

    navigate(`/place/${id}`);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-5">
      <div className="flex flex-row gap-2">
        <button
          className="flex flex-row items-center justify-center gap-2 rounded-2xl h-[52px] font-semibold text-lg w-full bg-sub-sub text-white"
          onClick={handlePlaceViewClick}>
          <img src={Pin} alt="pin" className="w-[27px] h-4" />
          <span>역 근처 장소 보기</span>
        </button>
      </div>
    </div>
  );
};
