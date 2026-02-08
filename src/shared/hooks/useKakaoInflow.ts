import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { logInflow } from "@/shared/api/inflowApi";

interface UseKakaoInflowProps {
  eventId?: string;
}

/**
 * 카카오 공유하기 링크를 통한 유입을 추적하는 Hook
 * URL에 source=kakao 파라미터가 있을 경우 유입 로그를 서버에 전송합니다.
 */
export const useKakaoInflow = ({ eventId }: UseKakaoInflowProps) => {
  const [searchParams] = useSearchParams();
  const hasLogged = useRef(false);

  useEffect(() => {
    // 이미 로깅했거나 eventId가 없으면 실행하지 않음
    if (hasLogged.current || !eventId) {
      return;
    }

    const source = searchParams.get("source");

    // source=kakao 파라미터가 있을 경우에만 로깅
    if (source === "kakao") {
      hasLogged.current = true;

      logInflow({
        inflowType: "KAKAO",
        eventId,
      });
    }
  }, [eventId, searchParams]);
};
