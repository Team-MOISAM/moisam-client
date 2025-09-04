import { useValidation } from "@/shared/hooks";
import Button from "@/shared/ui/Button";
import { useEffect, useState } from "react";
import { InputField } from "@/shared/ui";
import { PlainHeader } from "@/widgets/headers";
import { validateEventName } from "@/shared/utils";
import { DatePicker } from "./DatePicker";
import { TimePicker } from "./TimePicker";
import { formatDateWithDash } from "@/features/history/utils";
import { useEditEventName } from "../hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import { gtagEvent } from "@/shared/utils";

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
  isEdit: boolean;
}

export const EventNameStep = ({
  setCurrentStep,
  eventName,
  eventDate,
  eventTime,
  setEventName,
  setEventDate,
  setEventTime,
  isEdit,
}: EventNameStepProps) => {
  const { value, error, handleChange, validateValue, isValid } = useValidation(eventName, validateEventName);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    // 수정 모드이고 eventDate가 있으면 해당 날짜로 설정
    if (isEdit && eventDate) {
      const [year, month, day] = eventDate.split('-').map(Number);
      return new Date(year, month - 1, day); // month는 0-based
    }
    return new Date();
  });
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const eventIdParam = searchParams.get("eventId");
  const { mutate } = useEditEventName();
  const navigate = useNavigate();

  // 날짜 변경 시 과거 시간이 선택되어 있으면 초기화
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);

    // 오늘 날짜인 경우에만 시간 검증
    const today = new Date();
    const dateOnly = new Date(date);
    dateOnly.setHours(0, 0, 0, 0);
    const todayOnly = new Date(today);
    todayOnly.setHours(0, 0, 0, 0);

    if (dateOnly.getTime() === todayOnly.getTime() && eventTime) {
      const [hour, minute] = eventTime.split(":").map(Number);
      const selectedTimeInMinutes = hour * 60 + minute;
      const currentTimeInMinutes = today.getHours() * 60 + today.getMinutes();

      // 선택된 시간이 현재 시간보다 이전이면 초기화
      if (selectedTimeInMinutes <= currentTimeInMinutes) {
        setEventTime("");
      }
    }
  };

  // 시간 선택 여부 확인
  const isTimeSelected = eventTime && eventTime.trim() !== "";

  // 전체 유효성 검사 (이름 + 시간)
  const isFormValid = isValid && isTimeSelected;

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

  const handleEdit = () => {
    if (isSubmitting) return;
    if (!eventIdParam) {
      setIsSubmitting(false);
      return;
    }
    mutate(
      {
        eventId: eventIdParam,
        payload: {
          eventName: value,
          eventDate: formatDateWithDash(selectedDate),
          eventTime: eventTime,
        },
      },
      {
        onSettled: () => {
          setIsSubmitting(false);
        },
        onSuccess: () => {
          navigate(`/mapView/${eventIdParam}`);
        },
      }
    );
  };

  const handleNext = () => {
    // 이벤트명 유효성 검사
    if (!validateValue()) return;

    // 시간 선택 검사
    if (!isTimeSelected) return;

    gtagEvent("enter_meeting_name", {
      previous_page_url: document.referrer || "direct",
      meeting_name: value,
      surface: "find_event_name_step",
    });

    gtagEvent("enter_meeting_time", {
      selected_time: eventTime,
      surface: "find_event_name_step",
    });

    setEventName(value);
    setEventDate(formatDateWithDash(selectedDate));
    setCurrentStep(2);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 px-4">
        <div className="flex flex-col gap-6">
          <PlainHeader
            title={isEdit ? "출발지 수정" : "출발지 추가"}
            onBack={() => setCurrentStep(0)}
            isEdit={isEdit}
          />
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
          <p className="text-gray-90 text-xxl font-bold">언제 모이시나요?</p>
          <div className="flex flex-row gap-[8px]">
            <DatePicker value={selectedDate} onChange={handleDateChange} />
            <TimePicker value={eventTime} onChange={setEventTime} selectedDate={selectedDate} />
          </div>
        </div>
      </div>

      <div
        className="px-4 mb-5 transition-all duration-300"
        style={{
          marginBottom: keyboardHeight > 0 ? `${keyboardHeight + 20}px` : "20px",
        }}>
        <Button onClick={isEdit ? handleEdit : handleNext} disabled={!isFormValid}>
          {isEdit ? "수정하기" : "다음"}
        </Button>
      </div>
    </div>
  );
};
