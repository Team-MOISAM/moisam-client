import Button from "@/shared/ui/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useUserStore } from "@/shared/stores";
import { LoginHeader } from "@/widgets/headers";
import { Footer, IntroSection, InviteSection, MeetPointSection, PathSection, PlaceSection } from "@/features/main/ui";
import { AnimatedSection } from "@/shared/ui";
import { useScrollAnimation } from "@/shared/hooks/useScrollAnimation";

const MainPage = () => {
  const navigate = useNavigate();
  const email = useUserStore(state => state.email);
  const { registerSection, isVisible } = useScrollAnimation();

  // 각 섹션의 ref를 저장할 배열
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleClick = () => {
    navigate("/find");
  };

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
<<<<<<< HEAD
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
=======
    <div className="relative bg-[#E5EFF7] h-screen-dvh flex flex-col justify-end">
      <div
        className="flex flex-col gap-3 items-center pb-5 h-fit px-5 pt-32 z-10"
        style={{ background: "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 30%)" }}>
        <span className="text-md font-medium text-gray-60">모두를 위한 하나의 SPOT</span>
        <img src={Logo} alt="logo" className="mb-[38px] w-[173px] h-12" />
        <Button onClick={handleClick}>중간장소 찾기</Button>
        <KakaoLogin />
>>>>>>> 94b7afe ([fix] #SPOT-159 : main 버튼 라이팅 수정)
      </div>
    </div>
  );
};

export default MainPage;
