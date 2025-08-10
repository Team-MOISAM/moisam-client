"use client"

import * as React from "react"
import calender from "@/assets/icon/calender.svg"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useIsMobile, useResponsiveTranslate } from "@/shared/hooks"

interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const isMobile = useIsMobile()
  const translateX = useResponsiveTranslate()

  // 오늘 날짜를 기준으로 과거 날짜 비활성화
  const today = new Date()
  today.setHours(0, 0, 0, 0) // 시간을 00:00:00으로 설정하여 정확한 날짜 비교

  const disabledDays = {
    before: today
  }

  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 h-[48px] justify-between font-normal bg-gray-5"
          >
            {value.getFullYear()}.{String(value.getMonth() + 1).padStart(2, '0')}.{String(value.getDate()).padStart(2, '0')}
            <img src={calender} alt="calender" />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-auto overflow-hidden p-0"
          style={!isMobile ? { transform: `translateX(${translateX}px)` } : {}}
          align={isMobile ? "center" : "start"}
          side={isMobile ? "top" : "bottom"}
          sideOffset={4} 
          avoidCollisions={true}
        >
          <Calendar
            mode="single"
            selected={value}
            captionLayout="dropdown"
            disabled={disabledDays}
            onSelect={(date) => {
              if (date) {
                onChange(date)
                setOpen(false)
              }
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
