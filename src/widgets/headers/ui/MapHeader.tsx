import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEventStore, useUserStore } from "@/shared/stores";
import { gtagEvent, kakaoLogin } from "@/shared/utils";
import { formatEventDateTime } from "@/shared/hooks";
import { useClickOutside } from "@/shared/hooks/useClickOutSide";
import Logo from "@/assets/icon/logo.svg";
import PolygonGray from "@/assets/icon/polygon_gray.svg";
import Menu from "@/assets/icon/menu.svg";
import Close from "@/assets/icon/close.svg";
import DefaultProfile from "@/assets/icon/default-profile.svg";
import EditGray from "@/assets/icon/editGray.svg";
import Delete from "@/assets/icon/delete.svg";
import PinEmpty from "@/assets/icon/pin_empty.svg";
import RightArrowGray from "@/assets/icon/rightArrowGray.svg";
import { DeleteModal } from "@/shared/ui";

export const MapHeader = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const titleRef = useRef<HTMLButtonElement>(null);
  const [isOpenEventTimeToggle, setIsOpenEventTimeToggle] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const profileImg = useUserStore(state => state.profileImageUrl);
  const nickname = useUserStore(state => state.nickname);
  const eventData = useEventStore(state => state.eventData);
  const meetingPointData = useEventStore(state => state.meetingPointData);
  const clearEventData = useEventStore(state => state.clearEventData);
  const clearMeetingPointData = useEventStore(state => state.clearMeetingPointData);
  const clearSelectedPointType = useEventStore(state => state.clearSelectedPointType);

  // 로고 클릭 시 이벤트 핸들러
  const handleLogoClick = () => {
    clearEventData();
    clearMeetingPointData();
    clearSelectedPointType();

    if (profileImg) {
      navigate("/history");
    } else {
      navigate("/");
    }
  };

  // 모임 이름 클릭 시 이벤트 핸들러
  const handleEventNameClick = () => {
    setIsOpenEventTimeToggle(!isOpenEventTimeToggle);
  };
  useClickOutside(titleRef, () => setIsOpenEventTimeToggle(false));

  // 메뉴 클릭 시 이벤트 핸들러
  const handleMenuClick = () => {
    setIsSideBarOpen(true);
  };

  // 프로필 클릭 시 이벤트 핸들러
  const handleProfileClick = () => {
    if (!id) return;

    if (profileImg) {
      navigate("/my");
    } else {
      kakaoLogin({ to: "mapView", eventId: id });
    }
  };

  // 모임 수정 클릭 시 이벤트 핸들러
  const handleEdit = () => {
    if (!eventData) return;

    // GA4 이벤트 전송
    gtagEvent("click_overflow_edit", {
      meeting_name: eventData.eventName,
      meeting_date: eventData.eventDate,
      meeting_time: eventData.eventTime,
    });

    navigate(`/find?startStep=0&eventId=${id}&isEdit=true`);
  };

  // 모임 삭제 클릭 시 이벤트 핸들러
  const handleDeleteClick = () => {
    if (!eventData) return;

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

  return (
    <>
      <header className="flex items-center py-3 px-5 bg-white w-full z-[1001] relative">
        <button onClick={handleLogoClick}>
          <img src={Logo} alt="logo" className="w-[68px] h-4" />
        </button>

        <div className="relative flex-1 min-w-0 flex justify-center px-3">
          <button ref={titleRef} onClick={handleEventNameClick} className="max-w-full">
            <p className="font-semibold text-md text-gray-80 truncate max-w-full">{eventData?.eventName ?? ""}</p>
          </button>
          {isOpenEventTimeToggle && (
            <div className="absolute -bottom-9 left-1/2 -translate-x-1/2">
              <div className="relative py-[7px] px-3 rounded-lg bg-gray-80 flex items-center justify-center w-[100px]">
                <img
                  src={PolygonGray}
                  alt="polygon"
                  className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-[18px] h-[18px]"
                />
                <p className="z-10 font-medium text-xs text-gray-10 text-center whitespace-nowrap">
                  {formatEventDateTime(eventData?.eventDate ?? "", eventData?.eventTime ?? "")}
                </p>
              </div>
            </div>
          )}
        </div>

        <button onClick={handleMenuClick} className="flex items-center justify-end w-6 h-6">
          <img src={Menu} alt="menu" className="w-6 h-6" />
        </button>
      </header>

      {isSideBarOpen && (
        <div className="fixed inset-0 z-[1100]">
          <button
            className="absolute inset-0 bg-black/10"
            onClick={() => setIsSideBarOpen(false)}
            aria-label="사이드 메뉴 닫기"
          />

          <aside className="absolute right-0 top-0 h-full w-[234px] bg-white shadow-sideBar">
            <div className="px-5 py-3 flex items-center justify-end mb-2">
              <button onClick={() => setIsSideBarOpen(false)} aria-label="닫기">
                <img src={Close} alt="close" className="w-6 h-6" />
              </button>
            </div>

            <button
              className="w-full p-5 flex items-center justify-between border-b-[6px] border-b-gray-5"
              onClick={handleProfileClick}>
              <div className="flex items-center gap-[10px]">
                <img src={profileImg ?? DefaultProfile} alt="profile" className="w-8 h-8 rounded-full object-cover" />
                <div className="flex items-center gap-[6px]">
                  <p className="font-semibold text-md text-gray-80">{profileImg ? `${nickname}` : "로그인하러가기"}</p>
                  <img src={RightArrowGray} alt="arrow" className="w-4 h-4" />
                </div>
              </div>
            </button>

            <div className="pt-[22px] space-y-2">
              <button className="w-full h-12 flex items-center gap-2 text-gray-80 p-5" onClick={handleEdit}>
                <img src={EditGray} alt="edit" className="w-5 h-5" />
                <p className="font-medium text-md text-gray-80">현재 모임 수정</p>
              </button>

              <button
                className="w-full h-12 flex items-center gap-2 text-gray-80 p-5"
                onClick={() => {
                  setOpenDeleteModal(true);
                  setIsSideBarOpen(false);
                }}>
                <img src={Delete} alt="delete" className="w-5 h-5" />
                <p className="font-medium text-md text-gray-80">현재 모임 삭제</p>
              </button>

              {profileImg && (
                <button
                  className="w-full h-12 flex items-center gap-2 text-gray-80 p-5"
                  onClick={() => {
                    clearMeetingPointData();
                    clearSelectedPointType();
                    navigate("/history");
                  }}>
                  <img src={PinEmpty} alt="pin" className="w-5 h-5" />
                  <p className="font-medium text-md text-gray-80">나의 모임</p>
                </button>
              )}
            </div>
          </aside>
        </div>
      )}

      {openDeleteModal && (
        <DeleteModal
          title={eventData?.eventName ?? ""}
          description="모임을 삭제하시겠어요?"
          onClose={() => {
            setOpenDeleteModal(false);
          }}
          onDelete={handleDeleteClick}
        />
      )}
    </>
  );
};
