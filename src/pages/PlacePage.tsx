import { useRecommendedPlaces } from "@/features/place/hooks";
import { RecommendList } from "@/features/place/ui";
import LoadingSpinner from "@/shared/ui/LoadingSpinner";
import { MeetPointCard } from "@/shared/ui/MeetPointCard";
import { PlainHeader } from "@/widgets/headers";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { useEventStore, useUserStore } from "@/shared/stores";
import { PointChip } from "@/shared/ui";
import { useState } from "react";

const PlacePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const eventData = useEventStore(state => state.eventData);
  const meetingPointData = useEventStore(state => state.meetingPointData);
  const setMeetingPointData = useEventStore(state => state.setMeetingPointData);
  const nickname = useUserStore(state => state.nickname);

  // 선택된 지하철역 ID 상태 관리 - meetingPointData에서 초기값 설정
  const [selectedSubwayId, setSelectedSubwayId] = useState<number>(
    meetingPointData?.subwayId ?? eventData?.meetingPointRouteGroups?.[0]?.subwayId ?? 0
  );

  const { data, isLoading, isError } = useRecommendedPlaces(id ?? "", selectedSubwayId);
  // 데이터가 없으면 null 처리
  const confirmedPlace = data?.data.confirmedPlaceResponse ?? null;
  const isConfirmed = confirmedPlace !== null;
  const recommendedPlaces = data?.data.placeResponses ?? [];

  const handleNavigate = (placeId: string) => {
    navigate(`/detail/${id}/${placeId}?subwayId=${selectedSubwayId}`);
  };

  // 지하철역 선택 핸들러
  const handleSubwaySelect = (subwayId: number) => {
    setSelectedSubwayId(subwayId);

    const matchedData = eventData?.meetingPointRouteGroups.find(group => group.subwayId === subwayId);
    if (matchedData) {
      setMeetingPointData(matchedData);
    }
  };

  if (isLoading || !eventData)
    return (
      <div className="flex flex-col items-center justify-center gap-3 h-screen-dvh">
        <LoadingSpinner />
        <p>로딩 중...</p>
      </div>
    );
  if (isError) return <div>데이터를 불러오는데 실패했습니다.</div>;

  return (
    <>
      <Helmet>
        <title>장소 추천 | 모이삼</title>
      </Helmet>
      <div className="flex flex-col h-screen-dvh overflow-hidden">
        <div className="flex-none px-5">
          <PlainHeader title="장소 추천" url={`/mapview/${id}`} />
        </div>
        <div className="flex-none mt-3 px-5 flex justify-center">

          <MeetPointCard
            placeName={isConfirmed ? confirmedPlace.name : undefined}
            isPlace={isConfirmed}
            onClick={isConfirmed ? () => handleNavigate(confirmedPlace.id) : undefined}
          />

        </div>
        {/* 지하철역 선택 칩들 */}
        <div className="flex-none mt-3 px-5 flex gap-2 overflow-x-auto scrollbar-hidden">
          {eventData.meetingPointRouteGroups.map(group => (
            <PointChip
              key={group.subwayId}
              text={group.meetingPoint.endStationName.replace(/역$/, "")}
              isSelect={group.subwayId === selectedSubwayId}
              onClick={() => handleSubwaySelect(group.subwayId)}
              additionalEventData={{
                cafeName: eventData.placeName || undefined,
                currentUser: nickname || "unknown",
              }}
            />
          ))}
        </div>
        <div className="flex-1 mt-3 min-h-0 relative">
          <RecommendList places={recommendedPlaces} subwayId={selectedSubwayId} />
        </div>
      </div>
    </>
  );
};

export default PlacePage;
