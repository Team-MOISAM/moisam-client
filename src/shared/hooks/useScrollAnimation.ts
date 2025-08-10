import { useEffect, useState, useRef, useCallback } from "react";

export const useScrollAnimation = () => {
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const registerSection = useCallback((index: number, element: HTMLElement | null) => {
    sectionRefs.current[index] = element;

    // 요소가 등록되면 즉시 관찰 시작
    if (element && observerRef.current) {
      observerRef.current.observe(element);
    }
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const index = parseInt(entry.target.getAttribute("data-index") || "0");

          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, index]));
          }
        });
      },
      {
        threshold: 0.15, // 15%만 보여도 트리거
      }
    );

    // 이미 등록된 섹션들을 관찰
    sectionRefs.current.forEach(ref => {
      if (ref && observerRef.current) {
        observerRef.current.observe(ref);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const isVisible = useCallback((index: number) => visibleSections.has(index), [visibleSections]);

  return {
    registerSection,
    isVisible,
  };
};
