import { KakaoLogin } from "@/features/main/ui";
import Button from "@/shared/ui/Button";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/icon/logo.svg";
import MainImg from "@/assets/image/main.webp";
import { useEffect } from "react";
import { useUserStore } from "@/shared/stores";

const MainPage = () => {
  const navigate = useNavigate();
  const email = useUserStore(state => state.email);

  const handleClick = () => {
    navigate("/find");
  };

  useEffect(() => {
    if (email) {
      navigate("/history");
    }
  }, [email]);

  return (
    <div className="relative bg-[#E5EFF7] h-screen-dvh flex flex-col justify-end">
      <div
        className="flex flex-col gap-3 items-center pb-5 h-fit px-5 pt-32 z-10"
        style={{ background: "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 30%)" }}>
        <span className="text-md font-medium text-gray-60">모두를 위한 하나의 SPOT</span>
        <img src={Logo} alt="logo" className="mb-[38px] w-[173px] h-12" />
        <Button onClick={handleClick}>중간지점 찾기</Button>
        <KakaoLogin />
      </div>
      <img src={MainImg} alt="main" className="absolute top-16 right-0 w-[600px] h-auto" />
    </div>
  );
};

export default MainPage;
