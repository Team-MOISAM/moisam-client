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
  const isLoggedIn = nickname !== null && nickname !== "";

  const [searchParams] = useSearchParams();
  const startStepParam = searchParams.get("startStep");
  const isEditParam = searchParams.get("isEdit");
  const isEdit = isEditParam === "true";

  // TODO: 카카오톡 유입 로깅 - source 파라미터 추출 후 로깅 API 호출

  //수정 시
  const detailEventData = useEventStore(state => state.detailEventData);
  const eventDataFromStore = useEventStore(state => state.eventData);

  const [name, setName] = useState(() => {
    if (isEdit && detailEventData) return detailEventData.nickname;
    // 로그인된 사용자: startStep=0(모임 생성)이거나 startStep=1(멤버 추가)일 때 자동 이름 설정
    if (isLoggedIn && (startStepParam === "0" || startStepParam === "1") && nickname) {
      return formatName(nickname);
    }
    return "";
  });
  const [currentStep, setCurrentStep] = useState(() => {
    const step = Number(startStepParam);
    // startStep=1이면 NameStep(1)으로, startStep=2이면 LocationStep(2)로 시작
    return [0, 1, 2].includes(step) ? step : 0;
  });
  const [startPointInfo, setStartPointInfo] = useState<StartPointInfo | null>(null);

  // 모임 생성 데이터
  const [eventData, setEventData] = useState<CreateEventData>(() => {
    // 수정 모드이고 eventDataFromStore가 있으면 기존 데이터로 초기화
    if (isEdit && eventDataFromStore) {
      return {
        eventName: eventDataFromStore.eventName ?? "",
        eventDate: eventDataFromStore.eventDate ?? "",
        eventTime: eventDataFromStore.eventTime ?? "",
        username: "",
        startPoint: "",
        address: "",
        roadAddress: "",
        longitude: 0,
        latitude: 0,
        isTransit: true,
      };
    }
    
    return {
      eventName: "",
      eventDate: "",
      eventTime: "",
      username: "",
      startPoint: "",
      address: "",
      roadAddress: "",
      longitude: 0,
      latitude: 0,
      isTransit: true,
    };
  });

  return (
    <div className="flex-1 gap-y-[16px]">
      {currentStep === 0 && (
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
      {currentStep === 1 && <NameStep setCurrentStep={setCurrentStep} setName={setName} name={name} />}
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
