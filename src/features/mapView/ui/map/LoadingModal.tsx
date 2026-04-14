import LoadingSpinner from "@/shared/ui/LoadingSpinner";
import { useEffect, useRef, useState } from "react";
import { DefaultMap } from "./DefaultMap";
import Lottie from "lottie-react";
import LoadingAnimation from "@/assets/lottie/loading_spinner.json";

interface LoadingModalProps {
  isFindMeetingPointLoading: boolean;
  onMeetingPointAnimationComplete?: () => void;
}

const meetingPointLoadingContent = ["출발지 좌표 정리 중", "이동 거리 계산 중", "최적의 중간지점 탐색 중"];
const STEP_START_DELAY = 3000;
const STEP_COMPLETE_DELAY = 1500;
const FINAL_TITLE_DELAY = 1500;
const MODAL_CLOSE_DELAY = 1000;
const TITLE_TRANSITION_DURATION = 500;

export const LoadingModal = ({ isFindMeetingPointLoading, onMeetingPointAnimationComplete }: LoadingModalProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [title, setTitle] = useState("중간 지점을 찾고 있어요!");
  const [description, setDescription] = useState("잠시만 기다려주세요");
  const [isTitleVisible, setIsTitleVisible] = useState(true);
  const onMeetingPointAnimationCompleteRef = useRef(onMeetingPointAnimationComplete);

  useEffect(() => {
    onMeetingPointAnimationCompleteRef.current = onMeetingPointAnimationComplete;
  }, [onMeetingPointAnimationComplete]);

  useEffect(() => {
    if (!isFindMeetingPointLoading) {
      setActiveStep(0);
      setCompletedSteps([]);
      setTitle("출발지 추가 중이에요");
      setDescription("잠시만 기다려주세요");
      setIsTitleVisible(true);
      return;
    }

    setActiveStep(0);
    setCompletedSteps([]);
    setTitle("중간 지점을 찾고 있어요!");
    setDescription("잠시만 기다려주세요");
    setIsTitleVisible(true);

    const timers: number[] = meetingPointLoadingContent.flatMap((_, index) => [
      window.setTimeout(() => {
        setActiveStep(index);
      }, index * STEP_START_DELAY),
      window.setTimeout(
        () => {
          setCompletedSteps(prev => (prev.includes(index) ? prev : [...prev, index]));
          if (index === meetingPointLoadingContent.length - 1) {
            setActiveStep(-1);
          }
        },
        index * STEP_START_DELAY + STEP_COMPLETE_DELAY
      ),
    ]);

    const finalStepCompleteAt = (meetingPointLoadingContent.length - 1) * STEP_START_DELAY + STEP_COMPLETE_DELAY;

    timers.push(
      window.setTimeout(() => {
        setIsTitleVisible(false);
      }, finalStepCompleteAt + FINAL_TITLE_DELAY)
    );

    timers.push(
      window.setTimeout(
        () => {
          setTitle("중간 지점 도출 완료!");
          setDescription("");
          setIsTitleVisible(true);
        },
        finalStepCompleteAt + FINAL_TITLE_DELAY + TITLE_TRANSITION_DURATION
      )
    );

    timers.push(
      window.setTimeout(
        () => {
          onMeetingPointAnimationCompleteRef.current?.();
        },
        finalStepCompleteAt + FINAL_TITLE_DELAY + TITLE_TRANSITION_DURATION + MODAL_CLOSE_DELAY
      )
    );

    return () => {
      timers.forEach(timer => window.clearTimeout(timer));
    };
  }, [isFindMeetingPointLoading]);

  const getStepIconColor = (index: number) => {
    if (completedSteps.includes(index)) {
      return "text-sub-sub";
    }

    if (index === activeStep) {
      return "text-gray-30";
    }

    return "text-gray-10";
  };

  const getStepTextColor = (index: number) => {
    if (index === activeStep) {
      return "text-gray-50";
    }

    return "text-gray-10";
  };

  return (
    <>
      <div className="absolute inset-0 overflow-hidden">
        <DefaultMap className="scale-105 blur-[10px]" />
        <div className="absolute inset-0 z-20 bg-white/25 backdrop-blur-[2px]" />
      </div>
      <div className="relative z-[1002] flex h-[calc(100dvh-48px)] items-center justify-center px-6">
        <div className="flex w-full flex-col items-center rounded-[32px] bg-white px-4 py-[38px] shadow-pin01">
          <div className="w-full flex flex-col items-center justify-center gap-[6px] text-center">
            <div
              className={`flex w-full flex-col items-center justify-center gap-[6px] transition-all duration-500 ease-in-out ${
                isTitleVisible ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
              }`}>
              <p className="font-semibold text-md text-gray-90">{title}</p>
              {description ? <p className="font-medium text-sm text-gray-50">{description}</p> : null}
            </div>
          </div>
          <div className="w-full mt-[30px]">
            {isFindMeetingPointLoading && (
              <div className="flex items-center justify-center" style={{ width: "100%", height: 200 }}>
                <Lottie animationData={LoadingAnimation} loop autoplay style={{ width: "100%", height: "100%" }} />
              </div>
            )}
            {isFindMeetingPointLoading ? (
              <div className="relative w-full flex flex-col items-center justify-center gap-[18px] p-[10px]">
                <div className="absolute top-[23px] left-[18px] border border-dashed border-gray-10 w-[1px] h-[65px]" />
                {meetingPointLoadingContent.map((content, index) => (
                  <div key={index} className="z-10 w-full flex items-center justify-start gap-2">
                    <span className={`${getStepIconColor(index)} transition-colors duration-700 ease-in-out`}>
                      <CircleCheckIcon />
                    </span>
                    <p
                      className={`font-medium text-sm transition-colors duration-700 ease-in-out ${getStepTextColor(index)}`}>
                      {content}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <LoadingSpinner />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const CircleCheckIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect width="18" height="18" rx="9" fill="currentColor" />
      <path
        d="M4.5 8.4L7.875 12L13.5 6"
        stroke="white"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
