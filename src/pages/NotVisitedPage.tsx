import { NonVisitedReasonCategory, VisitedPlaceProps } from "@/features/notVisited/model";
import { OtherPlaceForm, PlaceSearch } from "@/features/notVisited/ui";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { usePostNonVisitedReview } from "@/features/notVisited/hooks";
import { ReviewModal } from "@/shared/ui";
import { Helmet } from "react-helmet-async";
import { gtagEvent } from "@/shared/utils";

const NotVisitedPage = () => {
  const { eventId, placeId } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedReasons, setSelectedReasons] = useState<NonVisitedReasonCategory[]>([]);
  const [etcReason, setEtcReason] = useState("");
  const [directInput, setDirectInput] = useState("");
  const [visitedPlace, setVisitedPlace] = useState<VisitedPlaceProps | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const { mutate: postReview, isPending } = usePostNonVisitedReview();

  const handleLocationStep = () => {
    setCurrentStep(2);
  };

  const handleSubmit = (directReason?: string) => {
    if (!eventId || !placeId || !visitedPlace) return;

    gtagEvent("no_visit_pick", {
      surface: "not_visited_page",
    });

    // 텍스트를 직접 입력한 경우 no_visit_text 이벤트 전송
    const customText = directReason || etcReason;
    if (customText && customText.trim() !== "") {
      gtagEvent("no_visit_text", {
        custom_reason_text: customText,
        surface: "not_visited_page",
      });
    }

    // 방문한 다른 장소를 입력한 경우 another_place 이벤트 전송
    if (visitedPlace && visitedPlace.name && visitedPlace.name.trim() !== "") {
      gtagEvent("another_place", {
        surface: "not_visited_page",
      });
    }

    gtagEvent("complete_no_visit", {
      surface: "not_visited_page",
    });

    const reviewData = {
      categories: selectedReasons,
      etcReason: directReason || etcReason,
      placeName: visitedPlace.name,
      address: visitedPlace.regionName,
      roadAddress: visitedPlace.roadAddress,
      longitude: visitedPlace.longitude,
      latitude: visitedPlace.latitude,
    };

    postReview(
      { eventId, placeId, data: reviewData },
      {
        onSuccess: () => {
          setModalOpen(true);
        },
        onError: error => {
          console.error("리뷰 작성 실패:", error);
        },
      }
    );
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>장소 리뷰 | 모이삼</title>
      </Helmet>
      <div className="relative flex flex-col h-screen">
        {currentStep === 1 && (
          <OtherPlaceForm
            selectedReasons={selectedReasons}
            setSelectedReasons={setSelectedReasons}
            handleLocationStep={handleLocationStep}
            selectedPlace={visitedPlace}
            setEtcReason={setEtcReason}
            onSubmit={handleSubmit}
            isSubmitting={isPending}
            directInput={directInput}
            setDirectInput={setDirectInput}
          />
        )}
        {currentStep === 2 && (
          <PlaceSearch
            setCurrentStep={() => setCurrentStep(1)}
            visitedPlace={visitedPlace || { name: "", latitude: 0, longitude: 0, roadAddress: "", regionName: "" }}
            setVisitedPlace={setVisitedPlace}
          />
        )}
        {isModalOpen && <ReviewModal isOpen={isModalOpen} onClose={handleModalClose} />}
      </div>
    </>
  );
};

export default NotVisitedPage;
