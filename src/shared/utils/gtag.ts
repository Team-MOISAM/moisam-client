export type GtagParamValue = string | number | boolean | undefined;
export type GtagParams = Record<string, GtagParamValue>;

// Vite 빌드 환경에서 DEV 여부 (개발 환경) 판단
const isDev = Boolean(import.meta.env?.DEV);

// window.gtag 참조 헬퍼
const getGtag = () => (window as Window).gtag;

// 공통으로 붙일 GA 기본 파라미터 (createGtagHandler에서만 자동 병합)
const baseParams = () => ({
  page_location: window.location.href,
  page_path: window.location.pathname,
});

// 원시 GA4 이벤트 전송 함수 (기본 파라미터 병합 없음)
export const gtagEvent = (eventName: string, params: GtagParams = {}) => {
  try {
    const gtag = getGtag();
    if (!gtag) {
      if (isDev) console.warn("[gtag] gtag가 정의되어 있지 않습니다:", { eventName, params });
      return;
    }
    gtag("event", eventName, params);
  } catch (e) {
    if (isDev) console.warn("[gtag] 이벤트 전송 중 오류가 발생했습니다:", e);
  }
};

// 프롭(onClick 등)에 바로 전달 가능한 핸들러 생성기
// 여기서만 기본 파라미터(page_location, page_path)를 자동 병합합니다
export const createGtagHandler = <T extends unknown[]>(
  eventName: string,
  paramsOrFactory?: GtagParams | ((...args: T) => GtagParams),
  next?: (...args: T) => void
) => {
  return (...args: T) => {
    const params =
      typeof paramsOrFactory === "function"
        ? (paramsOrFactory as (...a: T) => GtagParams)(...args)
        : paramsOrFactory || {};
    gtagEvent(eventName, { ...baseParams(), ...params });
    next?.(...args);
  };
}; 