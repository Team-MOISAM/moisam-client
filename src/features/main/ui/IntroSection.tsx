import IntroImg from "@/assets/image/intro.webp";
import { Title } from "./Title";
import { Bubble } from "./Bubble";

export const IntroSection = () => {
  return (
    <section className="py-8 px-5 flex flex-col gap-10 w-full items-center">
      <div className="flex flex-col gap-[6px] items-center">
        <p className="text-xl font-medium text-gray-40">약속 장소,</p>
        <Title>매번 고민하고 계신가요?</Title>
      </div>
      <div className="flex flex-col pt-6 pb-[26px] w-[300px] gap-[18px]">
        <Bubble text="어디서 만나지?" />
        <Bubble text="그냥 강남에서 볼까?" isRight={true} />
        <Bubble text="너무 먼 곳은 싫은데.." />
      </div>
      <img src={IntroImg} alt="IntroImg" className="w-full h-full" />
    </section>
  );
};
