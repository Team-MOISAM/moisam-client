import Button from "@/shared/ui/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useUserStore } from "@/shared/stores";
import { LoginHeader } from "@/widgets/headers";
import { Footer, IntroSection, InviteSection, MeetPointSection, PathSection, PlaceSection } from "@/features/main/ui";
import { AnimatedSection } from "@/shared/ui";
import { useScrollAnimation } from "@/shared/hooks/useScrollAnimation";
import { createGtagHandler } from "@/shared/utils";

const MainPage = () => {
  const navigate = useNavigate();
  const email = useUserStore(state => state.email);
  const { registerSection, isVisible } = useScrollAnimation();

  // 각 섹션의 ref를 저장할 배열
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleClick = createGtagHandler("find_midpoint_guest", { surface: "landing_cta" }, () => {
    navigate("/find");
  });

  useEffect(() => {
    if (email) {
      navigate("/history");
    }
  }, [email]);

  // 각 섹션을 등록
  useEffect(() => {
    sectionRefs.current.forEach((ref, index) => {
      if (ref) {
        registerSection(index, ref);
      }
    });
  }, [registerSection]);

  return (
    <div className="relative h-screen-dvh flex flex-col items-center">
      <LoginHeader />
      <div className="overflow-auto scrollbar-hidden w-full">
        <AnimatedSection
          ref={el => {
            sectionRefs.current[0] = el;
          }}
          isVisible={isVisible(0)}
          index={0}>
          <IntroSection />
        </AnimatedSection>
        <AnimatedSection
          ref={el => {
            sectionRefs.current[1] = el;
          }}
          isVisible={isVisible(1)}
          index={1}>
          <MeetPointSection />
        </AnimatedSection>
        <AnimatedSection
          ref={el => {
            sectionRefs.current[2] = el;
          }}
          isVisible={isVisible(2)}
          index={2}>
          <InviteSection />
        </AnimatedSection>
        <div
          ref={el => {
            sectionRefs.current[3] = el;
          }}
          data-index={3}
          className="w-full">
          <PlaceSection isVisible={isVisible(3)} />
        </div>
        <AnimatedSection
          ref={el => {
            sectionRefs.current[4] = el;
          }}
          isVisible={isVisible(4)}
          index={4}>
          <PathSection />
        </AnimatedSection>
        <Footer />
      </div>
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] px-5 py-3 bg-[rgba(255,255,255,0.05)] backdrop-blur-md ">
        <Button onClick={handleClick}>중간장소 찾기</Button>
      </div>
    </div>
  );
};

export default MainPage;
