import AddStartPoint from "@/assets/icon/addStartPoint.svg";
import Share from "@/assets/icon/share.svg";
import { useEventStore, useUserStore } from "@/shared/stores";
import { gtagEvent } from "@/shared/utils";
import { useState } from "react";
import { ShareModal } from "../ShareModal";
import { useNavigate, useParams } from "react-router-dom";
import { LoginModal } from "@/features/mapView/ui";
import Toast from "../Toast";
import { Modal } from "../Modal";

export const SnapBottomSheetFloating = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [isOpenFullModal, setIsOpenFullModal] = useState(false);
  const [toastKey, setToastKey] = useState<number | null>(null);

  const eventData = useEventStore(state => state.eventData);
  const meetingPointData = useEventStore(state => state.meetingPointData);
  const nickname = useUserStore(state => state.nickname);

  const peopleCount = eventData?.peopleCount || 0;
  const isFull = peopleCount >= 8;

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

  // 공유하기 버튼 클릭 핸들러
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

    setIsOpen(true);
  };

  // 인원 추가하기 버튼 클릭 핸들러
  const handleAddMemberClick = () => {
    // 인원 초과 모달 안내
    if (isFull) {
      setIsOpenFullModal(true);
      return;
    }

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

  return (
    <div className="absolute -top-[114px] right-5">
      <div className="flex flex-col gap-[7px]">
        <button className="w-11 h-11 p-[10px] rounded-full shadow-bt01 bg-white">
          <img src={Share} alt="share" onClick={handleShareClick} className="w-6 h-6" />
        </button>
        {isOpen && (
          <ShareModal
            onClose={() => setIsOpen(false)}
            onCopyComplete={handleCopyComplete}
            onKakaoComplete={handleKakaoComplete}
            title="이벤트 공유하기"
            shareContent={shareContent}
          />
        )}
        {isOpenLoginModal && <LoginModal />}
        {toastKey && <Toast key={toastKey} message="복사가 완료되었어요" />}

        <button className="w-11 h-11 p-[10px] rounded-full shadow-bt01 bg-white">
          <img src={AddStartPoint} alt="addStartPoint" onClick={handleAddMemberClick} className="w-6 h-6" />
        </button>
        {isOpenFullModal && (
          <Modal onClose={() => setIsOpenFullModal(false)}>
            <div className="relative p-5 flex flex-col gap-4 text-gray-90">
              <p className="text-md font-semibold">인원 초과</p>
              <p className="text-sm font-medium">
                모임에는 <span className="text-sub-sub">최대 8명</span>까지 추가할 수 있어요
              </p>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};
