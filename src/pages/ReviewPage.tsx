import PlaceCard from "@/shared/ui/PlaceCard";
import { useParams } from "react-router-dom";
import { SmallButton, Title } from "@/features/review/ui";
import { CloseHeader } from "@/widgets/headers";
import { useReviewPlace } from "@/features/review/hooks";
import LoadingSpinner from "@/shared/ui/LoadingSpinner";
import { Helmet } from "react-helmet-async";

const ReviewPage = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useReviewPlace(id!);
  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center gap-3 h-screen-dvh">
        <LoadingSpinner />
        <p>로딩 중...</p>
      </div>
    );
  if (isError || !data) return <p className="p-5">데이터를 불러오는 데 실패했어요.</p>;

  const { confirmedPlaceResponse } = data;
  const placeId = confirmedPlaceResponse.id;

  return (
    <>
      <Helmet>
        <title>장소 리뷰 | 모이삼</title>
      </Helmet>
      <div className="flex flex-col h-screen-dvh">
        <CloseHeader url="/history" />
        <div className="flex flex-col justify-between h-full p-5 pt-4">
          <div className="flex flex-col gap-8">
            <Title title={confirmedPlaceResponse.name} />
            <div className="flex flex-col gap-3 items-center">
              <PlaceCard
                name={confirmedPlaceResponse.name}
                distance={confirmedPlaceResponse.distance}
                image={confirmedPlaceResponse.image}
                openTime={confirmedPlaceResponse.openTime}
                closeTime={confirmedPlaceResponse.closeTime}
                averageRating={confirmedPlaceResponse.averageRating}
                placeScore={confirmedPlaceResponse.placeScore}
              />
              <p className="text-sm font-semibold text-gray-30">실제로 가신 곳인지 확인해주세요.</p>
            </div>
          </div>
          <div className="w-full flex gap-2">
            <SmallButton isVisit={false} eventId={id!} placeId={placeId}>
              다른 곳에 갔어요
            </SmallButton>
            <SmallButton isVisit={true} eventId={id!} placeId={placeId}>
              갔어요
            </SmallButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewPage;
