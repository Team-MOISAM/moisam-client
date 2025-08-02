import { useValidation } from "@/shared/hooks";
import Button from "@/shared/ui/Button";
import { useEffect, useState } from "react";
import { InputField } from "@/shared/ui";
import { PlainHeader } from "@/widgets/headers";
import { validateEventName } from "@/shared/utils";
import { DatePicker } from "./DatePicker";
import { TimePicker } from "./TimePicker";

interface EventNameStepProps {
  setCurrentStep: (step: number) => void;
  setName: (name: string) => void;
  name: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  setEventName: (eventName: string) => void;
  setEventDate: (eventDate: string) => void;
  setEventTime: (eventTime: string) => void;
}

export const EventNameStep = ({ 
  setCurrentStep, 
  eventName,
  eventTime, 
  setEventName, 
  setEventDate, 
  setEventTime 
}: EventNameStepProps) => {
  const { value, error, handleChange, validateValue, isValid } = useValidation(eventName, validateEventName);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        const viewportHeight = window.visualViewport.height;
        const windowHeight = window.innerHeight;
        const keyboardHeight = windowHeight - viewportHeight;
        setKeyboardHeight(keyboardHeight > 0 ? keyboardHeight : 0);
      }
    };

    window.visualViewport?.addEventListener("resize", handleResize);
    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNext = () => {
    if (!validateValue()) return;
    setEventName(value);
    
    // 날짜를 "YYYY-MM-DD" 형식으로 변환
    const formattedDate = selectedDate.toISOString().split('T')[0];
    setEventDate(formattedDate);
    
    setCurrentStep(2);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 px-4">
        <div className="flex flex-col gap-6">
          <PlainHeader title="출발지 추가" onBack={() => setCurrentStep(0)} />
          <p className="text-gray-90 text-xxl font-bold">
            <span className="text-sub-sub">어떤 모임인가요?</span>
            <br />
            모임명을 알려주세요
          </p>
          <InputField
            value={value}
            placeholder="모임명을 입력해주세요"
            onChange={handleChange}
            error={error}
            type="name"
          />
        </div>
      </div>
      <div className="flex-1 px-4">
        <div className="flex flex-col gap-6">
          <p className="text-gray-90 text-xxl font-bold">
            언제 모이시나요?
          </p>
          <div className="flex flex-row gap-[8px]">
            <DatePicker value={selectedDate} onChange={setSelectedDate} />
            <TimePicker value={eventTime} onChange={setEventTime} />       
          </div>
        </div>
      </div>


      <div
        className="px-4 mb-5 transition-all duration-300"
        style={{
          marginBottom: keyboardHeight > 0 ? `${keyboardHeight + 20}px` : "20px",
        }}>
        <Button onClick={handleNext} disabled={!isValid}>
          다음
        </Button>
      </div>
    </div>
  );
};
