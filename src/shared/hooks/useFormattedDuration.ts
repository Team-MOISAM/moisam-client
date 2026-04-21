import { useMemo } from "react";

/**
 * 분 → 시간 분
 * @param minutesString 분
 * @returns 시간 분
 */
export const useFormattedDuration = (minutesString: string) => {
  return useMemo(() => {
    const totalMinutes = Number(minutesString);

    if (!Number.isFinite(totalMinutes) || totalMinutes < 0) {
      return "";
    }

    const normalizedMinutes = Math.floor(totalMinutes);

    if (normalizedMinutes < 60) {
      return `${normalizedMinutes}분`;
    }

    const hours = Math.floor(normalizedMinutes / 60);
    const minutes = normalizedMinutes % 60;

    return `${hours}시간 ${minutes}분`;
  }, [minutesString]);
};

/**
 * yyyy-mm-dd → mm월 dd일
 * @param eventDate yyyy-mm-dd
 * @param eventTime hh:mm
 * @returns mm월 dd일 hh:mm
 */
export const formatEventDateTime = (eventDate: string, eventTime: string) => {
  if (!eventDate || !eventTime) {
    return "";
  }

  const [year, month, day] = eventDate.split("-");
  if (!year || !month || !day) {
    return "";
  }

  return `${Number(month)}월 ${Number(day)}일 ${eventTime}`;
};
