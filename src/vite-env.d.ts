/// <reference types="vite/client" />
interface KakaoStatic {
  init: (key: string) => void;
  isInitialized: () => boolean;
  Link?: unknown;
}

interface Window {
  Kakao: KakaoStatic;
  dataLayer?: unknown[];
  // GA4 gtag 함수 오버로드 (any/unknown 지양)
  gtag?: {
    (command: "js", target: Date): void;
    (command: "config", measurementId: string, params?: Record<string, string | number | boolean | undefined>): void;
    (command: "event", eventName: string, params?: Record<string, string | number | boolean | undefined>): void;
  };
}
