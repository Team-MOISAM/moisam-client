import LeftTail from "@/assets/icon/leftTail.svg";
import RightTail from "@/assets/icon/rightTail.svg";

interface BubbleProps {
  text: string;
  isRight?: boolean;
}

export const Bubble = ({ text, isRight = false }: BubbleProps) => {
  return (
    <div
      className={`relative bg-sub-10 rounded-lg px-3 py-1 text-md font-medium text-[#3B8ADF] w-fit ${isRight ? "self-end" : ""}`}>
      <p>{text}</p>
      <img
        src={isRight ? RightTail : LeftTail}
        alt="tail"
        className={`absolute top-[9px] ${isRight ? "right-[-7px]" : "left-[-7px]"} w-2 h-2`}
      />
    </div>
  );
};
