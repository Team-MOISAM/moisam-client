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
}

export function TimePicker({ value, onChange }: TimePickerProps) {
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

  const handleTimeSelect = (time: string) => {
    onChange(time);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[116px] h-[48px] justify-between font-normal bg-gray-5"
        >
          {value || "00:00"}
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
          {timeOptions.map((time) => (
            <button
              key={time}
              onClick={() => handleTimeSelect(time)}
              className={`w-full px-4 py-2 text-left hover:bg-gray-10 focus:bg-gray-20 focus:outline-none ${
                value === time ? 'bg-gray-10 text-gray-900' : 'text-gray-700'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
} 