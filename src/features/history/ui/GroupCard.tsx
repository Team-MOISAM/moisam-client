import { useNavigate } from "react-router-dom";
import { Chip } from "./Chip";
import Pin from "@/assets/icon/pin.svg";
import DefaultProfile from "@/assets/icon/default-profile.svg";
import { UserEventHistoryResponses } from "../model";
import { formatDate } from "../utils";
import { createGtagHandler } from "@/shared/utils";

export const GroupCard = ({
  eventId,
  eventDate,
  eventTime,
  eventName,
  middlePointName,
  placeName,
  participatedPeopleCount,
  userProfileImageUrls,
  isReviewed,
}: UserEventHistoryResponses) => {
  const navigate = useNavigate();

  const maxToShow = 3;

  // 참여 인원 수만큼 순회, 최대 3명 제한
  const displayImages = Array.from({ length: Math.min(participatedPeopleCount, maxToShow) }, (_, i) => {
    return userProfileImageUrls[i] || DefaultProfile;
  });

  const handleClick = createGtagHandler("click_existing_meeting", { 
    meeting_name: eventName,
    meeting_date: eventDate,
    meeting_time: eventTime,
    member_count: participatedPeopleCount,
    member_id: eventId,
    place_name: placeName || "none"
  }, () => {
    navigate(`/mapView/${eventId}`);
  });

  return (
    <section className="flex flex-col px-5 pb-5 pt-4 gap-1 border-b border-b-gray-5">
      <div className="cursor-pointer" onClick={handleClick}>
        <span className="text-md font-semibold text-gray-90 overflow-hidden text-ellipsis whitespace-nowrap">
          {eventName}
        </span>
        <div className="flex gap-1 items-center text-sm font-medium text-gray-40 overflow-hidden text-ellipsis whitespace-nowrap">
          <>
            <img src={Pin} alt="pin" className="w-4 h-4" />
            <p>{middlePointName}역</p>
          </>
        </div>
      </div>
      <div className="flex gap-1 text-labelXs font-medium items-center">
        {/* 이미지 영역 */}
        <div className="flex items-center">
          {displayImages.map((src, index) => {
            const zIndex = 30 - index * 10;
            const marginClass = index === 0 ? "" : "-ml-[7px]";
            return (
              <img
                key={index}
                src={src}
                alt="profileImg"
                className={`w-[21px] h-[21px] rounded-full border border-white ${marginClass}`}
                style={{ zIndex }}
              />
            );
          })}
        </div>
        <p className="text-gray-90">{participatedPeopleCount}명</p>
      </div>
      <div className="flex mt-1 items-center justify-between">
        <p className="text-sm font-medium text-gray-40">{`${formatDate(eventDate)} ${eventTime}`}</p>
        {placeName && (
          <Chip 
            isComplete={isReviewed} 
            id={eventId}
            meetingName={eventName}
            meetingDate={eventDate}
            meetingTime={eventTime}
            memberCount={participatedPeopleCount}
            placeName={placeName}
          />
        )}
      </div>
    </section>
  );
};
