import { usePostVisitedReview } from "@/features/visited/hooks";
import { VisitedTimeType } from "@/features/visited/model";
import FirstStep from "@/features/visited/ui/FirstStep";
import SecondStep from "@/features/visited/ui/SecondStep";
import { ReviewModal } from "@/shared/ui";
import Button from "@/shared/ui/Button";
import StepIndicator from "@/shared/ui/StepIndicator";
import { BackHeader } from "@/widgets/headers";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";

const VisitedPage = () => {
  const navigate = useNavigate();
  const { eventId, placeId } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTime, setSelectedTime] = useState<VisitedTimeType | "">("");
  const [secondData, setSecondData] = useState({
    plugScore: null as number | null,
    seatScore: null as number | null,
    crowdedScore: null as number | null,
    review: "",
  });
  const [isModalOpen, setModalOpen] = useState(false);

  const { mutate: postReview, isPending } = usePostVisitedReview(eventId!, placeId!);

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else {
      navigate(-1);
    }
  };

  const handleFirstStep = () => {
    setCurrentStep(2);
  };

  const handleSecondStep = () => {
    if (!placeId) return;

    const reviewData = {
      visitedTime: selectedTime as VisitedTimeType,
      socket: secondData.plugScore || 0,
      seat: secondData.seatScore || 0,
      quiet: secondData.crowdedScore || 0,
      ...(secondData.review && { content: secondData.review }),
    };

    postReview(reviewData, {
      onSuccess: () => {
        setModalOpen(true);
      },
      onError: error => {
        console.error("리뷰 작성 실패:", error);
      },
    });
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
        <BackHeader onClick={handleBack} />
        <div className="flex flex-col justify-between h-full p-5 pt-2">
          <div>
            <StepIndicator step={currentStep} />
            <span className="mt-2 text-lg font-bold text-gray-70">
              {currentStep === 1 ? "언제 가셨나요?" : "이 장소는 어떠셨나요?"}
            </span>
            <p className="text-md font-medium text-gray-40">
              {currentStep === 1 ? "방문한 시간을 알려주세요." : "느낌을 간단하게 알려주세요."}
            </p>
            <div className="flex-1 overflow-y-auto max-h-[calc(100vh-220px)] scrollbar-hidden overflow-touch">
              {currentStep === 1 && <FirstStep selectedTime={selectedTime} setSelectedTime={setSelectedTime} />}
              {currentStep === 2 && <SecondStep secondData={secondData} setSecondData={setSecondData} />}
            </div>
          </div>
        </div>
        <div
          className="px-5 pt-4 pb-5 w-full fixed bottom-0 max-w-[600px] z-50"
          style={{ background: "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 20%)" }}>
          <Button
            onClick={currentStep === 1 ? handleFirstStep : handleSecondStep}
            disabled={
              (currentStep === 1 && !selectedTime) ||
              (currentStep === 2 &&
                (secondData.plugScore === null || secondData.seatScore === null || secondData.crowdedScore === null)) ||
              isPending
            }>
            {currentStep === 1 ? "다음으로" : "완료하기"}
          </Button>
        </div>
        {isModalOpen && <ReviewModal isOpen={isModalOpen} onClose={handleModalClose} />}
      </div>
    </>
  );
};

export default VisitedPage;
