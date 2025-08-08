import { NameStep } from "./NameStep";
import { LocationStep } from "./LocationStep";
import { useState } from "react";
import { StartPointInfo, CreateEventData } from "../model";
import { useEventStore, useUserStore } from "@/shared/stores";
import { useSearchParams } from "react-router-dom";
import { formatName } from "@/shared/utils";
import { EventNameStep } from "./EventNameStep";

export const FindContainer = () => {
  const nickname = useUserStore(state => state.nickname);
  const isLoggedIn = nickname !== "";

  const [searchParams] = useSearchParams();
  const startStepParam = searchParams.get("startStep");
  const eventIdParam = searchParams.get("eventId");
  const isEditParam = searchParams.get("isEdit");
  const isEdit = isEditParam === "true";

  //수정 시
  const detailEventData = useEventStore(state => state.detailEventData);

  const [name, setName] = useState(() => {
    if (isEdit && detailEventData) return detailEventData.nickname;
    // eventId가 있으면 로그인된 사용자 이름 사용
    if (eventIdParam && isLoggedIn && nickname) {
      return formatName(nickname);
    }
    // 기존 로직
    return isLoggedIn && startStepParam === "1" && nickname ? formatName(nickname) : "";
  });
  const [currentStep, setCurrentStep] = useState(() => {
    const step = Number(startStepParam);
    return [0, 1, 2].includes(step) ? step : 0;
  });
  const [startPointInfo, setStartPointInfo] = useState<StartPointInfo | null>(null);

  // 모임 생성 데이터
  const [eventData, setEventData] = useState<CreateEventData>({
    eventName: "",
    eventDate: "",
    eventTime: "00:00",
    username: "",
    startPoint: "",
    address: "",
    roadAddress: "",
    longitude: 0,
    latitude: 0,
    isTransit: true,
  });

  return (
    <div className="flex-1 gap-y-[16px]">
      {currentStep === 0 && <NameStep setCurrentStep={setCurrentStep} setName={setName} name={name} />}
      {currentStep === 1 && (
        <EventNameStep
          setCurrentStep={setCurrentStep}
          setName={setName}
          name={name}
          eventName={eventData.eventName}
          eventDate={eventData.eventDate}
          eventTime={eventData.eventTime}
          setEventName={eventName => setEventData(prev => ({ ...prev, eventName }))}
          setEventDate={eventDate => setEventData(prev => ({ ...prev, eventDate }))}
          setEventTime={eventTime => setEventData(prev => ({ ...prev, eventTime }))}
          isEdit={isEdit}
        />
      )}
      {currentStep === 2 && (
        <LocationStep
          setCurrentStep={setCurrentStep}
          startPointInfo={startPointInfo}
          setStartPointInfo={setStartPointInfo}
          name={name}
          eventName={eventData.eventName}
          eventDate={eventData.eventDate}
          eventTime={eventData.eventTime}
          isEdit={isEdit}
        />
      )}
    </div>
  );
};
