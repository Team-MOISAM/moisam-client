import { Photo, PlaceButton, PlaceInfo, Review } from "@/features/detail/ui";
import { Empty } from "@/features/detail/ui";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ShareModal } from "@/shared/ui";
import { DetailHeader } from "@/widgets/headers";
import { usePlaceInfo } from "@/features/detail/hooks";
import LoadingSpinner from "@/shared/ui/LoadingSpinner";
import Toast from "@/shared/ui/Toast";
import { Helmet } from "react-helmet-async";

const DetailPage = () => {
  const navigate = useNavigate();
  const [isOpenShareModal, setIsOpenShareModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const topMarkerRef = useRef<HTMLDivElement>(null);
  const [toastKey, setToastKey] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting); // 위에 닿아 있지 않으면 스크롤된 상태
      },
      {
        root: scrollRef.current, // 스크롤 기준 대상
        threshold: 0,
      }
    );

    if (topMarkerRef.current) {
      observer.observe(topMarkerRef.current);
    }

    return () => {
      if (topMarkerRef.current) {
        observer.unobserve(topMarkerRef.current);
      }
    };
  }, []);

  const { eventId, placeId } = useParams();
  const [searchParams] = useSearchParams();
  const subwayId = searchParams.get('subwayId');

  if (!placeId || !eventId) return <p>잘못된 접근입니다</p>;

  const { data, isLoading, isError } = usePlaceInfo({ 
    placeId: placeId, 
    eventId: eventId, 
    subwayId: subwayId || undefined 
  });

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center gap-3 h-screen-dvh">
        <LoadingSpinner />
        <p>로딩 중...</p>
      </div>
    );
  if (isError) return <p>유저 정보를 가져오는 데 실패했습니다.</p>;
  if (!data) return <p>데이터 없음</p>;

  const ImageUrl = data.isConfirmed
    ? "https://www.pickspot.co.kr/image/KT4.webp"
    : "https://www.pickspot.co.kr/image/KT3.webp";

  const shareContent = {
    title: data.isConfirmed ? "여기서 만나요!" : "여기 어때요?",
    description: data.name,
    imageUrl: ImageUrl,
    links: [{ label: "모임 장소 보기", url: `https://www.pickspot.co.kr/detail/${eventId}/${placeId}` }],
  };

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <>
      <Helmet>
        <title>장소 상세 | 모이삼</title>
      </Helmet>
      <div className="relative flex flex-col h-screen-dvh">
        <DetailHeader
          backClick={handleClick}
          shareClick={() => setIsOpenShareModal(true)}
          isScrolled={isScrolled}
          name={data.name}
        />
        <div className="flex-1 overflow-y-auto scrollbar-hidden mb-[88px]" ref={scrollRef}>
          <div ref={topMarkerRef} />
          <Photo images={data.images} />
          <PlaceInfo
            placeId={data.kakaoPlaceId}
            distance={data.distance}
            name={data.name}
            averageRating={data.averageRating}
            openTime={data.openTime}
            closeTime={data.closeTime}
          />
          <div className="w-full h-2 bg-gray-5" />
          {data.reviews.length > 0 || data.googleReviews.length > 0 ? (
            <Review
              placeQuietnessResponse={data.placeQuietnessResponse}
              placeScore={data.placeScore}
              reviews={data.reviews}
              googleReviews={data.googleReviews}
            />
          ) : (
            <Empty />
          )}
        </div>
        <PlaceButton
          eventId={eventId}
          placeId={placeId}
          name={data.name}
          isChanged={data.isChanged}
          isConfirmed={data.isConfirmed}
          subwayId={subwayId}
          onComplete={() => setIsOpenShareModal(true)}
        />
        {isOpenShareModal && (
          <ShareModal
            onClose={() => setIsOpenShareModal(false)}
            onCopyComplete={() => setToastKey(Date.now())}
            title={data.isConfirmed ? "모임장소가 정해졌어요!" : "장소 공유하기"}
            description={data.isConfirmed ? "멤버들에게 알려주세요" : undefined}
            shareContent={shareContent}
          />
        )}
        {toastKey && <Toast key={toastKey} message="복사가 완료되었어요" />}
      </div>
    </>
  );
};

export default DetailPage;
