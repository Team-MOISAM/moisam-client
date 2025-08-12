import Logo from "@/assets/icon/logo.svg";
import { kakaoLogin } from "@/shared/utils";

export const LoginHeader = () => {
  const handleClick = () => {
    kakaoLogin({ to: "history" });
  };

  return (
    <header className="flex justify-between items-center py-3 px-5 bg-white w-full z-[101]">
      <img src={Logo} alt="logo" className="w-[72px] h-5" />
      <button onClick={handleClick} className="font-semibold text-gray-80 text-md rounded-full">
        로그인
      </button>
    </header>
  );
};
