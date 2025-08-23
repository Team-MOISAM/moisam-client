import { Title } from "./Title";
import MeetPointImg from "@/assets/image/meetPoint.webp";

export const MeetPointSection = () => {
  return (
    <section className="flex flex-col items-center pb-12 gap-10 px-5">
      <div className="flex flex-col items-center">
        <Title>중간 장소를 편하게 찾아드려요</Title>
        <p className="text-md font-medium text-gray-40 mt-2">모두의 거리와 시간을 고려한</p>
        <p className="text-md font-medium text-gray-40">최적의 중간 장소를 추천해 드릴게요</p>
      </div>
      <img src={MeetPointImg} alt="MeetPointImg" className="w-[350px] h-full" />
    </section>
  );
};
