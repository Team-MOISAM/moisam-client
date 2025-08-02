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
import { useIsMobile } from "@/shared/hooks"

export function DatePicker() {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date>(new Date())
  const isMobile = useIsMobile()

  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 h-[48px] justify-between font-normal bg-gray-5"
          >
            {date.getFullYear()}.{String(date.getMonth() + 1).padStart(2, '0')}.{String(date.getDate()).padStart(2, '0')}
            <img src={calender} alt="calender" />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className={`w-auto overflow-hidden p-0 ${!isMobile ? 'translate-x-[365px]' : ''}`}
          align={isMobile ? "center" : "start"}
          side={isMobile ? "top" : "bottom"}
          sideOffset={4} 
          avoidCollisions={true}
        >
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              if (date) {
                setDate(date)
                setOpen(false)
              }
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
