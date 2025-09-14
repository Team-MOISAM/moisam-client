import PlaceCard from "@/shared/ui/PlaceCard";
import { useNavigate, useParams } from "react-router-dom";
import { PlaceResponse } from "../model";
import placeNoResult from "@/assets/image/placeNoResult.webp";
import { useEventStore } from "@/shared/stores";
import { gtagEvent } from "@/shared/utils";

interface RecommendListProps {
  places: PlaceResponse[];
  subwayId: number;
}

export const RecommendList = ({ places, subwayId }: RecommendListProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const eventData = useEventStore(state => state.eventData);

  const handleNavigate = (placeId: string) => {
    // 클릭된 장소 정보 찾기
    const clickedPlace = places.find(place => place.id === placeId);
    
    // 현재 선택된 중간지점 역 정보 찾기
    const currentMeetingPoint = eventData?.meetingPointRouteGroups?.find(
      group => group.subwayId === subwayId
    );

    if (clickedPlace) {
      gtagEvent("view_cafe_info", {
        cafe_name: clickedPlace.name,
        cafe_station: currentMeetingPoint?.meetingPoint?.endStationName ?? "unknown",
        cafe_distance: clickedPlace.distance.toString(),
        cafe_rating: clickedPlace.averageRating?.toString() ?? "none",
        cafe_outlet_number: clickedPlace.placeScore?.socket?.toString() ?? "none",
        cafe_seat_number: clickedPlace.placeScore?.seat?.toString() ?? "none",
      });
    }

    navigate(`/detail/${id}/${placeId}?subwayId=${subwayId}`);
  };

  return (
    <div className="h-full flex flex-col bg-gray-5 ">
      <div className="flex-1 overflow-y-auto px-5 p-3 scrollbar-hidden">
        {places.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <img 
              src={placeNoResult} 
              alt="장소 없음" 
              className="w-[140px] h-[110px] mb-4"
            />
            <p className="text-gray-40 text-sm font-medium">
              장소가 추가될 예정이에요
            </p>
          </div>
        ) : (
          // 장소 목록
          <div className="flex flex-col gap-3">
            {places.map(place => (
              <PlaceCard
                key={place.id}
                name={place.name}
                distance={place.distance}
                openTime={place.openTime}
                closeTime={place.closeTime}
                image={place.image}
                averageRating={place.averageRating}
                placeScore={place.placeScore}
                onClick={() => handleNavigate(place.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
