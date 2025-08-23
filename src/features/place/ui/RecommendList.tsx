import PlaceCard from "@/shared/ui/PlaceCard";
import { useNavigate, useParams } from "react-router-dom";
import { PlaceResponse } from "../model";
import placeNoResult from "@/assets/image/placeNoResult.webp";
// import { FilterChips } from ".";

interface RecommendListProps {
  places: PlaceResponse[];
  subwayId: number;
}

export const RecommendList = ({ places, subwayId }: RecommendListProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleNavigate = (placeId: string) => {
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
