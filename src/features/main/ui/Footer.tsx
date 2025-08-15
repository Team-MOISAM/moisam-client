import FooterImg from "@/assets/image/footer.webp";
import Logo from "@/assets/icon/logoWhite.svg";
import Instagram from "@/assets/icon/instagram.svg";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="relative flex flex-col w-full">
      <img src={FooterImg} alt="footerImg" className="w-full max-h-[300px] h-full" />
      <div className="w-full absolute top-9 left-1/2 -translate-x-1/2 flex flex-col items-center text-xxxl font-bold text-white">
        <p>지금 바로 중간장소를</p>
        <p>찾아보세요!</p>
      </div>
      <div className="pt-8 pb-[116px] flex-col flex bg-gray-80 gap-[26px] px-5">
        <div className="flex justify-between items-center">
          <img src={Logo} alt="logo" className="w-[105px] h-[29px]" />
          <button
            onClick={() =>
              window.open("https://www.instagram.com/moisam.official?igsh=MXg2MWhkMDFoemd2Zg%3D%3D", "_blank")
            }>
            <img src={Instagram} alt="instagram" className="w-6 h-6" />
          </button>
        </div>
        <div>
          <p
            className="text-sm font-medium text-white cursor-pointer"
            onClick={() => window.open("https://forms.gle/Z5FB9f7JwXgKdc6G7", "_blank")}>
            의견 및 불편사항 문의
          </p>
          <button
            className="flex gap-[6px] items-center mt-2 text-sm font-medium text-gray-50"
            onClick={() => {
              navigate("/policy");
            }}>
            <p>개인정보 처리방침</p>
            <p>·</p>
            <p>서비스 이용약관</p>
          </button>
        </div>
      </div>
    </footer>
  );
};
