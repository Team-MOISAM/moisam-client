import { useEventStore, useUserStore } from "@/shared/stores";
import { useState } from "react";
import { ShareModal } from "@/shared/ui";
import { useNavigate, useParams } from "react-router-dom";
import AddUser from "@/assets/icon/addUser.svg";
import Share from "@/assets/icon/share.svg";
import { LoginModal } from "../..";
import { UserCard } from "./UserCard";
import AddDisabled from "@/assets/icon/addDisabled.svg";
import Toast from "@/shared/ui/Toast";

export const BottomSheetContent = () => {
  const meetingPointData = useEventStore(state => state.meetingPointData);
  const toggleDetail = useEventStore(state => state.toggleDetail);
  const setDetailEventData = useEventStore(state => state.setDetailEventData);

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
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const { id } = useParams();
  const eventData = useEventStore(state => state.eventData);
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

  const shareContent = {
    title: title,
    description: "",
    imageUrl: "https://www.moisam.kr/image/KT2.webp",
    links: [
      { label: "내 출발지 추가", url: `https://www.moisam.kr/find?eventId=${id}` },
      { label: "중간지점 보기", url: `https://www.moisam.kr/mapView/${id}` },
    ],
  };
  const navigate = useNavigate();

  const handleAddMemberClick = () => {
    if (nickname) {
      navigate(`/find?eventId=${id}`);
    } else {
      setIsOpenLoginModal(true);
    }
  };

  const [toastKey, setToastKey] = useState<number | null>(null);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-5">
      <div className="flex flex-row gap-2">
        <button
          disabled={isFull}
          className={`flex flex-row items-center justify-center gap-2 rounded-2xl h-[52px] font-semibold text-lg w-full
    ${isFull ? "bg-gray-10 text-gray-30 cursor-not-allowed" : "bg-sub-sub text-white"}
  `}
          onClick={handleAddMemberClick}>
          <img src={isFull ? AddDisabled : AddUser} alt={isFull ? "addDisabled" : "addUser"} className="w-[27px] h-4" />
          <span>{isFull ? "인원이 다 찼어요" : "출발지 추가하기"}</span>
        </button>
        <button className="flex-shrink-0 flex justify-center items-center w-[52px] h-[52px] rounded-xl border-2 border-gray-10">
          <img src={Share} alt="share" onClick={() => setIsOpen(true)} className="w-6 h-6" />
        </button>
      </div>
      {isOpen && (
        <ShareModal
          onClose={() => setIsOpen(false)}
          onCopyComplete={() => setToastKey(Date.now())}
          title="이벤트 공유하기"
          shareContent={shareContent}
        />
      )}
      {isOpenLoginModal && <LoginModal />}
      {toastKey && <Toast key={toastKey} message="복사가 완료되었어요" />}
    </div>
  );
};
