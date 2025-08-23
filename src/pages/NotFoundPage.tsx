import NotFound from "@/assets/icon/notFound.svg";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen-dvh">
      <div className="flex flex-col items-center">
        <img src={NotFound} alt="notFound" className="w-[143px] h-[143px]" />
        <span className="mt-[18px] text-xl font-bold text-gray-80">삭제된 모임이에요</span>
        <p className="text-center mt-[9px] text-md font-medium text-gray-40">
          모임을 새로 만들거나, <br />
          다른 모임을 찾아보세요
        </p>
      </div>
      <button
        onClick={handleClick}
        className="fixed bottom-[21px] left-1/2 -translate-x-1/2 px-[119px] py-[14px] whitespace-nowrap bg-sub-sub rounded-2xl text-white text-lg font-semibold">
        내 모임 보기
      </button>
    </div>
  );
};

export default NotFoundPage;
