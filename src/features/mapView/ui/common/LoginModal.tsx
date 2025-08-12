import { Modal } from "@/shared/ui";
import { kakaoLogin } from "@/shared/utils";
import { useNavigate, useParams } from "react-router-dom";

export const LoginModal = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleNextTime = () => {
    navigate(`/find?eventId=${id}`);
  };

  const handleKakaoClick = () => {
    if (id) {
      kakaoLogin({ to: "find", eventId: id });
    }
  };

  return (
    <Modal>
      <div>
        <div className="flex flex-col items-center gap-1 py-7 px-5 text-center">
          <h1 className="text-md font-semibold text-gray-90">로그인 하시겠어요?</h1>
          <p className="text-labelXs text-gray-50 font-semibold">
            로그인하지 않으면 <br />
            모임을 저장할 수 없어요
          </p>
        </div>
        <div className="flex flex-row w-full text-sm font-semibold">
          <button className="w-1/2 border-t border-gray-5 py-3 text-gray-40" onClick={handleNextTime}>
            다음에 하기
          </button>
          <button className="w-1/2 bg-gray-90 text-white rounded-br-2xl" onClick={handleKakaoClick}>
            로그인
          </button>
        </div>
      </div>
    </Modal>
  );
};
