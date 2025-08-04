import { useRecommendedPlaces } from "@/features/place/hooks";
import { ConfirmedCard, RecommendCard, RecommendList } from "@/features/place/ui";
import LoadingSpinner from "@/shared/ui/LoadingSpinner";
import { PlainHeader } from "@/widgets/headers";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";

const PlacePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, isError } = useRecommendedPlaces(id ?? "");
  // 데이터가 없으면 null 처리
  const confirmedPlace = data?.data.confirmedPlaceResponse ?? null;
  const isConfirmed = confirmedPlace !== null;
  const recommendedPlaces = data?.data.placeResponses ?? [];

  const handleNavigate = (placeId: string) => {
    navigate(`/detail/${id}/${placeId}`);
  };

  if (isLoading)
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
        <div className="flex-none mt-3 px-5">
          {!isConfirmed && <RecommendCard place={data!.data.middlePointName} />}
          {isConfirmed && (
            <ConfirmedCard
              name={confirmedPlace.name}
              distance={confirmedPlace.distance}
              image={confirmedPlace.image}
              openTime={confirmedPlace.openTime}
              closeTime={confirmedPlace.closeTime}
              averageRating={confirmedPlace.averageRating}
              placeScore={confirmedPlace.placeScore}
              onClick={() => handleNavigate(confirmedPlace.id)}
            />
          )}
        </div>
        <div className="flex-1 mt-3 min-h-0 relative">
          <RecommendList places={recommendedPlaces} />
        </div>
      </div>
    </>
  );
};

export default PlacePage;
