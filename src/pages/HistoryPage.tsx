import { useUserEvents } from "@/features/history/hooks";
import { Empty, Header, GroupCard } from "@/features/history/ui";
import { useUserStore } from "@/shared/stores";
import { PolicyBottomSheet } from "@/shared/ui";
import Button from "@/shared/ui/Button";
import LoadingSpinner from "@/shared/ui/LoadingSpinner";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const HistoryPage = () => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useUserEvents();
  const email = useUserStore(state => state.email);

  const personalInfoAgreement = useUserStore(state => state.personalInfoAgreement);
  const profileImageUrl = useUserStore(state => state.profileImageUrl);
  const setPersonalInfoAgreement = useUserStore(state => state.setPersonalInfoAgreement);
  const navigate = useNavigate();
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  const allUserEvents = data?.pages.flatMap(page => page.userEventHistoryResponses) ?? [];
  const scrollRef = useRef<HTMLDivElement>(null);

  const onClose = () => {
    setIsPolicyOpen(false);
    setPersonalInfoAgreement(true);
  };

  const handleClick = () => {
    // 로그인된 사용자가 새 모임을 만들 때는 EventNameStep(0)부터 시작
    navigate("/find?startStep=0");
  };

  useEffect(() => {
    setIsPolicyOpen(!personalInfoAgreement);

    // 만약 이메일이 없으면 메인 페이지로 리다이렉트
    if (!email) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (!scrollRef.current || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchNextPage();
      }
    });

    observer.observe(scrollRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center gap-3 h-screen-dvh">
        <LoadingSpinner />
        <p>로딩 중...</p>
      </div>
    );
  if (isError) return <p>유저 정보를 가져오는 데 실패했습니다.</p>;

  return (
    <>
      <Helmet>
        <title>나의 모임 | 모이삼</title>
      </Helmet>
      <div className="relative flex flex-col h-screen-dvh">
        <div className="flex flex-col px-5">
          <Header profileImg={profileImageUrl} />
          <span className="pt-3 pb-2 text-xl font-bold">나의 모임</span>
        </div>
        {allUserEvents.length > 0 ? (
          <div className="flex flex-col overflow-y-scroll scrollbar-hidden mb-24">
            {allUserEvents.map(data => (
              <GroupCard key={data.eventId} {...data} />
            ))}
            <div ref={scrollRef} className="h-1" />
          </div>
        ) : (
          <Empty />
        )}
        <div className="px-5 pt-4 pb-5 w-full fixed bottom-0 max-w-[600px] z-[100] bg-white">
          <Button onClick={handleClick} isBlue={true}>
            모임 만들기
          </Button>
        </div>
        {isPolicyOpen && <PolicyBottomSheet onClose={onClose} />}
      </div>
    </>
  );
};

export default HistoryPage;
