import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useIsMobile, useResponsiveTranslate } from "@/shared/hooks"

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
  selectedDate?: Date; // 선택된 날짜를 받아서 현재 시간과 비교
}

export function TimePicker({ value, onChange, selectedDate }: TimePickerProps) {
  const [open, setOpen] = React.useState(false)
  const isMobile = useIsMobile()
  const translateX = useResponsiveTranslate()

  // 30분 단위로 시간 생성
  const timeOptions = React.useMemo(() => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        times.push(timeString);
      }
    }
    return times;
  }, []);

  // 과거 시간인지 확인하는 함수
  const isPastTime = React.useMemo(() => {
    if (!selectedDate) return () => false;

    const today = new Date();
    const selectedDateOnly = new Date(selectedDate);
    selectedDateOnly.setHours(0, 0, 0, 0);
    const todayOnly = new Date(today);
    todayOnly.setHours(0, 0, 0, 0);

    // 선택된 날짜가 오늘이 아니면 모든 시간 사용 가능
    if (selectedDateOnly.getTime() !== todayOnly.getTime()) {
      return () => false;
    }

    // 오늘 날짜인 경우, 현재 시간 이전인지 확인
    const currentHour = today.getHours();
    const currentMinute = today.getMinutes();
    
    return (time: string) => {
      const [hour, minute] = time.split(':').map(Number);
      const timeInMinutes = hour * 60 + minute;
      const currentTimeInMinutes = currentHour * 60 + currentMinute;
      
      // 현재 시간 이전이면 과거 시간
      return timeInMinutes <= currentTimeInMinutes;
    };
  }, [selectedDate]);

  const handleTimeSelect = (time: string) => {
    // 과거 시간이면 선택 불가
    if (isPastTime(time)) return;
    
    onChange(time);
    setOpen(false);
  };

  // 시간이 선택되었는지 확인
  const isTimeSelected = value && value.trim() !== '';

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`w-[116px] h-[48px] justify-between font-normal bg-gray-5 border-none shadow-none text-md ${
            isTimeSelected ? 'text-gray-90' : 'text-gray-40'
          }`}
        >
          {value || "시간 선택"}
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[116px] p-0"
        style={!isMobile ? { transform: `translateX(${translateX}px)` } : {}}
        align={isMobile ? "center" : "start"}
        side="bottom" 
        sideOffset={4}
        avoidCollisions={false}
      >
        <div className="max-h-60 overflow-y-auto">
          {timeOptions.map((time) => {
            const isDisabled = isPastTime(time);
            return (
              <button
                key={time}
                onClick={() => handleTimeSelect(time)}
                disabled={isDisabled}
                className={`w-full px-4 py-2 text-left focus:outline-none ${
                  isDisabled 
                    ? 'text-gray-40 cursor-not-allowed'
                    : value === time 
                      ? 'bg-gray-10 text-gray-90' 
                      : 'text-gray-700 hover:bg-gray-10 focus:bg-gray-20'
                }`}
              >
                {time}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
} 