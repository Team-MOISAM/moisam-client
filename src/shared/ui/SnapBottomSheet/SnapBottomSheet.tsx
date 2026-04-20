import { useEffect, useRef, useState } from "react";
import { SnapWrapper } from "./SnapWrapper";
import { SnapHeader } from "./SnapHeader";
import { SnapContent } from "./SnapContent";
import { SnapBottomSheetFloating } from "./SnapBottomSheetFloating";
import { useSnapPointDrag } from "@/shared/hooks";

interface BottomSheetProps {
  children: React.ReactNode;
  snapPoints?: number[];
  defaultSnap?: number;
  minHeightVh: number;
}

export const SnapBottomSheet = ({
  children,
  snapPoints = [30, 50, 80],
  defaultSnap = 0,
  minHeightVh,
}: BottomSheetProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [dynamicSnapPoints, setDynamicSnapPoints] = useState(snapPoints);

  // ResizeObserver를 사용하여 콘텐츠 높이 측정
  useEffect(() => {
    if (!contentRef.current) return;

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const contentHeight = entry.contentRect.height;
        const viewportHeight = window.innerHeight;

        // 콘텐츠 높이를 기반으로 동적 snap points 계산
        const small = minHeightVh; // 지도에 맞춰진 최소 높이
        const middle = Math.min(50, (contentHeight / viewportHeight) * 100);
        const large = Math.min(80, (contentHeight / viewportHeight) * 100);
        setDynamicSnapPoints([small, middle, large]);
      }
    });

    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

  const { height, isDragging, handlers, bindDragEvents } = useSnapPointDrag({
    snapPoints: dynamicSnapPoints,
    defaultSnap,
  });

  // 바인딩 이벤트 설정
  useEffect(() => {
    const cleanup = bindDragEvents();
    return () => cleanup();
  }, [bindDragEvents]);

  return (
    <SnapWrapper
      style={{
        height: `${height}px`,
        transition: isDragging ? "none" : "height 0.3s ease",
      }}
      {...handlers}>
      {children}
      <div ref={contentRef} className="absolute opacity-0 pointer-events-none">
        {children}
      </div>
    </SnapWrapper>
  );
};

SnapBottomSheet.Header = SnapHeader;
SnapBottomSheet.Content = SnapContent;
SnapBottomSheet.Floating = SnapBottomSheetFloating;
