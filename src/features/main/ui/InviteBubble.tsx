import BlueTail from "@/assets/icon/blueTail.svg";
import WhiteTail from "@/assets/icon/whiteTail.svg";

interface InviteBubbleProps {
  text: string;
  isBlue?: boolean;
  className: string;
}

export const InviteBubble = ({ text, className, isBlue = false }: InviteBubbleProps) => {
  return (
    <div
      className={`relative rounded-lg px-3 py-1 text-md font-medium w-fit ${isBlue ? "self-end bg-sub-sub text-white" : "bg-white text-gray-60"} ${className}`}>
      <p>{text}</p>
      <img
        src={isBlue ? BlueTail : WhiteTail}
        alt="tail"
        className={`absolute top-[9px] ${isBlue ? "right-[-7px]" : "left-[-7px]"} w-2 h-2`}
      />
    </div>
  );
};
