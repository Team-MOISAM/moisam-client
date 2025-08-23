import { useUserInfo } from "@/features/history/hooks";
import { useUserStore } from "@/shared/stores";
import LoadingSpinner from "@/shared/ui/LoadingSpinner";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const KakaoCallbackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { data, isLoading, isError } = useUserInfo();

  useEffect(() => {
    if (!data) return;

    useUserStore.setState({
      nickname: data.nickname,
      profileImageUrl: data.profileImageUrl,
      email: data.email,
      personalInfoAgreement: data.personalInfoAgreement,
    });

    const to = searchParams.get("to");
    const eventId = searchParams.get("eventId");

    const isInvalidEventId = !eventId || eventId === "undefined";

    if (isInvalidEventId) {
      navigate(`/${to}`);
    } else if (to && to.startsWith("find")) {
      // find로 시작하는 경우 (find 또는 find?eventId=xxx 같은 경우)
      // 로그인 후 멤버 추가 시 step2(출발지 입력)로 바로 이동
      navigate(`/find?eventId=${eventId}&startStep=2`);
    } else {
      navigate(`/${to}/${eventId}`);
    }
  }, [data, navigate, searchParams]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 h-screen-dvh">
        <LoadingSpinner />
        <p>로딩 중...</p>
      </div>
    );
  }

  if (isError) {
    return <p>로그인 중 문제가 발생했습니다. 다시 시도해주세요.</p>;
  }

  return null;
};

export default KakaoCallbackPage;
