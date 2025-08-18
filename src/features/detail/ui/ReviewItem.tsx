import { ReviewType } from "../model";
import DefaultImg from "@/assets/icon/default-profile.svg";

interface ReviewProps extends ReviewType {
  isGoogle?: boolean;
}

export const ReviewItem = ({ nickname, profileImage, date, day, content, isGoogle }: ReviewProps) => {
  return (
    <div className="p-5 pl-6 flex flex-col gap-2 border-t border-t-gray-5">
      <div className="flex items-center gap-1 text-sm font-medium">
        <img src={profileImage ?? DefaultImg} alt="profileImg" className="mr-[2px] rounded-full w-5 h-5 object-cover" />
        <p className="text-gray-90">{nickname ?? "(알 수 없음)"}</p>
        <p className="text-gray-40">·</p>
        <p className="text-gray-40">
          {date} {day}
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-md font-medium text-gray-70">{content}.</p>
        {isGoogle && <p className="text-sm text-gray-30">Google 제공</p>}
      </div>
    </div>
  );
};
