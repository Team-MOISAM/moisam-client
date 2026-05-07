import { useEventStore, useUserStore } from "@/shared/stores";
import { useNavigate, useParams } from "react-router-dom";
import { UserCard } from "./UserCard";
import { gtagEvent } from "@/shared/utils";
import { useState } from "react";
import { LoginModal } from "../../common";
import Pin from "@/assets/icon/pin_btn.svg";
import AddUser from "@/assets/icon/addUser.svg";
import Share from "@/assets/icon/share.svg";
import { ShareModal } from "@/shared/ui";
import Toast from "@/shared/ui/Toast";

export const BottomSheetContent = () => {
  const nickname = useUserStore(state => state.nickname);
  const meetingPointData = useEventStore(state => state.meetingPointData);
  const toggleDetail = useEventStore(state => state.toggleDetail);
  const setDetailEventData = useEventStore(state => state.setDetailEventData);

  return (
    <div className="h-full flex flex-col">
      <div className="mx-5 pb-[80px]">
        {meetingPointData?.routeResponse?.map(user => (
          <UserCard
            key={user.id}
            startPointId={user.id}
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

  const [isOpenShareModal, setIsOpenShareModal] = useState(false);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [toastKey, setToastKey] = useState<number | null>(null);

  const nickname = useUserStore(state => state.nickname);
  const eventData = useEventStore(state => state.eventData);
  const meetingPointData = useEventStore(state => state.meetingPointData);

  const navigate = useNavigate();

  let title = "";
  if (!eventData?.eventMaker && !nickname) {
    title = "모임을 생성했어요";
  } else if (!eventData?.eventMaker) {
    title = `${nickname}님이 모임을 생성했어요`;
  } else {
    title = `${eventData?.eventMaker}님이 모임을 생성했어요`;
  }

  let myStaryPointTargetUrl = `${import.meta.env.VITE_REDIRECT_URL}find?eventId=${id}&startStep=1&source=kakao`;
  let middlePointTargetUrl = `${import.meta.env.VITE_REDIRECT_URL}mapView/${id}?source=kakao`;

  const shareContent = {
    title: title,
    description: "",
    imageUrl: "https://www.moisam.kr/image/KT2.webp",
    links: [
      { label: "내 출발지 추가", url: myStaryPointTargetUrl },
      { label: "중간지점 보기", url: middlePointTargetUrl },
    ],
  };

  // 공통 ga 이벤트 데이터 생성 함수
  const getShareEventData = () => {
    const meetingData = getMeetingEventData();
    if (!meetingData) return null;

    return {
      meeting_name: meetingData.meeting_name,
      meeting_date: meetingData.meeting_date,
      meeting_time: meetingData.meeting_time,
      meeting_members: meetingData.meeting_members,
      surface: "share_modal",
    };
  };

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

    navigate(`/place/${id}?subwayId=${meetingPointData?.subwayId}`);
  };

  const handleAddMemberClick = () => {
    const meetingData = getMeetingEventData();
    if (meetingData) {
      gtagEvent("add_startpoint", {
        meeting_name: meetingData.meeting_name,
        button_state: meetingData.meet_here_button_status,
        meeting_date: meetingData.meeting_date,
        meeting_time: meetingData.meeting_time,
        at_click_members: meetingData.meeting_members,
        at_click_date: meetingData.meeting_date,
        at_click_time: meetingData.meeting_time,
      });
    }

    if (nickname) {
      // 로그인된 사용자가 멤버 추가 시 NameStep(1)로 시작
      navigate(`/find?eventId=${id}&startStep=1`);
    } else {
      setIsOpenLoginModal(true);
    }
  };

  const handleShareClick = () => {
    const meetingData = getMeetingEventData();
    if (meetingData) {
      gtagEvent("share_meeting", {
        meeting_name: meetingData.meeting_name,
        member_id: nickname ?? "unknown",
        button_state: meetingData.meet_here_button_status,
        meeting_date: meetingData.meeting_date,
        meeting_time: meetingData.meeting_time,
        at_click_members: meetingData.meeting_members,
        at_click_date: meetingData.meeting_date,
        at_click_time: meetingData.meeting_time,
      });
    }

    setIsOpenShareModal(true);
  };

  const handleCopyComplete = () => {
    const shareData = getShareEventData();
    if (shareData) {
      gtagEvent("share_meeting_copylink", {
        meeting_name: shareData.meeting_name,
        meeting_date: shareData.meeting_date,
        meeting_time: shareData.meeting_time,
        member_id: nickname ?? "unknown",
      });
    }

    setToastKey(Date.now());
  };

  const handleKakaoComplete = () => {
    const shareData = getShareEventData();
    if (shareData) {
      gtagEvent("share_meeting_kakao", {
        meeting_name: shareData.meeting_name,
        meeting_date: shareData.meeting_date,
        meeting_time: shareData.meeting_time,
        member_id: nickname ?? "unknown",
      });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-5">
      <div className="flex flex-row gap-2">
        {eventData ? (
          <button
            className="flex flex-row items-center justify-center gap-[6px] rounded-2xl h-[52px] font-semibold text-lg w-full bg-sub-sub text-white"
            onClick={handlePlaceViewClick}>
            <img src={Pin} alt="pin" className="w-[18px] h-[18px]" />
            <span>역 근처 장소 보기</span>
          </button>
        ) : (
          <>
            <button
              className="flex flex-row items-center justify-center gap-2 rounded-2xl h-[52px] font-semibold text-lg w-full bg-sub-sub text-white"
              onClick={handleAddMemberClick}>
              <img src={AddUser} alt="addUser" className="w-[27px] h-4" />
              <span>출발지 추가하기</span>
            </button>
            <button className="flex-shrink-0 flex justify-center items-center w-[52px] h-[52px] rounded-xl border-2 border-gray-10">
              <img src={Share} alt="share" onClick={handleShareClick} className="w-6 h-6" />
            </button>
            {isOpenShareModal && (
              <ShareModal
                onClose={() => setIsOpenShareModal(false)}
                onCopyComplete={handleCopyComplete}
                onKakaoComplete={handleKakaoComplete}
                title="이벤트 공유하기"
                shareContent={shareContent}
              />
            )}
            {isOpenLoginModal && <LoginModal />}
            {toastKey && <Toast key={toastKey} message="복사가 완료되었어요" />}
          </>
        )}
      </div>
    </div>
  );
};
