interface KakaoLoginProps {
  to: string;
  eventId?: string;
}

import { createGtagHandler } from "./gtag";

export const kakaoLogin = ({ to, eventId }: KakaoLoginProps) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const kakaoAuthUrl = `${baseUrl}/oauth2/authorization/kakao?to=${to}&eventId=${eventId}`;

  // gtag: 로그인 진입 이벤트 (기본 파라미터는 createGtagHandler에서 자동 병합)
  try {
    const sendLogIn = createGtagHandler("log_in", {
      prev_page_url: document.referrer || "direct",
    });
    sendLogIn();
  } catch (e) {
    // dev에서만 경고
    if (Boolean(import.meta.env?.DEV)) console.warn("[gtag] log_in 전송 실패:", e);
  }

  // 이벤트 전송 여유 후 리다이렉트
  setTimeout(() => {
  window.location.href = kakaoAuthUrl;
  }, 150);
};
