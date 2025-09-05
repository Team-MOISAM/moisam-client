import Button from "@/shared/ui/Button";
import { useSetPlace } from "../hooks";
import { useState } from "react";
import { PlaceModal } from "./PlaceModal";
import { gtagEvent } from "@/shared/utils";

interface PlaceButtonProps {
  eventId: string;
  placeId: string;
  name: string;
  isChanged: boolean;
  isConfirmed: boolean;
  subwayId?: string | null;
  onComplete?: () => void;
  // GA4 이벤트를 위한 추가 props
  reviews?: Array<{ content: string }>;
  averageRating?: number | null;
  placeScore?: {
    socket?: number;
    seat?: number;
  };
  // 변경 이전 카페 정보 (장소 변경 시 필요)
  previousCafe?: {
    name: string;
    reviews: Array<{ content: string }>;
    averageRating: number | null;
    placeScore?: {
      socket?: number;
      seat?: number;
    };
  };
}

export const PlaceButton = ({ 
  eventId, 
  placeId, 
  name, 
  isChanged, 
  isConfirmed, 
  subwayId, 
  onComplete,
  reviews = [],
  averageRating,
  placeScore,
  previousCafe
}: PlaceButtonProps) => {
  const { mutate, isPending } = useSetPlace();
  const [isChangedOpen, setIsChangedOpen] = useState(false);
  const [isConfirmedOpen, setIsConfirmedOpen] = useState(false);

  const handleModal = () => {
    if (isConfirmed) {
      setIsChangedOpen(true);
    } else {
      setIsConfirmedOpen(true);
    }
  };

  const handleClick = () => {
    // 리뷰 텍스트 수집 (모이삼 자체 리뷰만)
    const reviewTexts = reviews.map(review => review.content).join(" | ");
    
    // 장소 변경인지 처음 선택인지 확인
    const isPlaceChange = isConfirmed && isChanged && previousCafe;
    
    if (isPlaceChange) {
      // 변경 이전 카페 리뷰 텍스트
      const previousReviewTexts = previousCafe.reviews.map(review => review.content).join(" | ");
      
      // 장소 변경 이벤트
      gtagEvent("change_place", {
        // 변경 이전 카페 정보
        previous_cafe_name: previousCafe.name,
        previous_review_count: previousCafe.reviews.length.toString(),
        previous_review_content: previousReviewTexts || "none",
        previous_cafe_rating: previousCafe.averageRating?.toString() ?? "none",
        previous_outlet_status: previousCafe.placeScore?.socket?.toString() ?? "none",
        previous_seat_status: previousCafe.placeScore?.seat?.toString() ?? "none",
        
        // 변경할 카페 정보
        new_cafe_name: name,
        new_review_count: reviews.length.toString(),
        new_review_content: reviewTexts || "none",
        new_cafe_rating: averageRating?.toString() ?? "none",
        new_outlet_status: placeScore?.socket?.toString() ?? "none",
        new_seat_status: placeScore?.seat?.toString() ?? "none",
        
        surface: "detail_place_button",
      });
    } else {
      // 처음 장소 선택 이벤트
      gtagEvent("select_place", {
        cafe_name: name,
        review_count: reviews.length.toString(),
        review_content: reviewTexts || "none",
        cafe_rating: averageRating?.toString() ?? "none",
        outlet_status: placeScore?.socket?.toString() ?? "none",
        seat_status: placeScore?.seat?.toString() ?? "none",
        surface: "detail_place_button",
      });
    }

    mutate(
      { placeId, eventId, subwayId: subwayId || undefined },
      {
        onSuccess: () => {
          setIsConfirmedOpen(false);
          setIsChangedOpen(false);
          onComplete?.();
        },
      }
    );
  };

  return (
    <>
      <div
        className="px-5 pt-4 pb-5 w-full fixed bottom-0 max-w-[600px] z-[100]"
        style={{ background: "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 20%)" }}>
        <Button disabled={(isConfirmed && !isChanged) || isPending} onClick={handleModal}>
          {isConfirmed ? (isChanged ? "모임장소 바꾸기" : "이미 선택한 장소에요") : "여기에서 만나기"}
        </Button>
      </div>
      {isChangedOpen && (
        <PlaceModal type="change" placeName={name} onClose={() => setIsChangedOpen(false)} onClick={handleClick} />
      )}
      {isConfirmedOpen && (
        <PlaceModal type="fix" placeName={name} onClose={() => setIsConfirmedOpen(false)} onClick={handleClick} />
      )}
    </>
  );
};
