import { useNavigate } from "react-router-dom";
import Logo from "@/assets/icon/logo.svg";
import DefaultImg from "@/assets/icon/default-profile.svg";

interface HeaderProps {
  profileImg: string | null;
}

export const Header = ({ profileImg }: HeaderProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/my");
  };

  return (
    <header className="flex justify-between items-center py-3">
      <img src={Logo} alt="logo" className="w-[86px] h-5" />
      <button onClick={handleClick}>
        <img src={profileImg ?? DefaultImg} alt="profileImg" className="w-8 h-8 rounded-full" />
      </button>
    </header>
  );
};
