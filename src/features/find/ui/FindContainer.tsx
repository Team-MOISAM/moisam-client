import { NameStep } from "./NameStep";
import { LocationStep } from "./LocationStep";
import { useState } from "react";
import { StartPointInfo, CreateEventData } from "../model";
import { useUserStore } from "@/shared/stores";
import { useSearchParams } from "react-router-dom";
import { formatName } from "@/shared/utils";
import { EventNameStep } from "./EventNameStep";

export const FindContainer = () => {
  const nickname = useUserStore(state => state.nickname);
  const isLoggedIn = nickname !== "";

  const [searchParams] = useSearchParams();
  const startStepParam = searchParams.get("startStep");

  const [name, setName] = useState(() =>
    isLoggedIn && startStepParam === "1" && nickname ? formatName(nickname) : ""
  );
  const [currentStep, setCurrentStep] = useState(() => {
    // 쿼리로 전달받은 값이 1이면 1부터 시작, 아니면 0부터
    return +(startStepParam === "1");
  });
  const [startPointInfo, setStartPointInfo] = useState<StartPointInfo | null>(null);
  
  // 모임 생성 데이터
  const [eventData, setEventData] = useState<CreateEventData>({
    eventName: "",
    eventDate: "",
    eventTime: "",
    username: "",
    startPoint: "",
    address: "",
    roadAddress: "",
    longitude: 0,
    latitude: 0,
    isTransit: true
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
          setEventName={(eventName) => setEventData(prev => ({ ...prev, eventName }))}
          setEventDate={(eventDate) => setEventData(prev => ({ ...prev, eventDate }))}
          setEventTime={(eventTime) => setEventData(prev => ({ ...prev, eventTime }))}
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
        />
      )}
    </div>
  );
};
