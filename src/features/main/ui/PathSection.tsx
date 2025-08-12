import { Title } from "./Title";
import Subway from "@/assets/icon/subway.svg";
import Car from "@/assets/icon/car.svg";
import TransferImg from "@/assets/image/transfer.webp";
import CarImg from "@/assets/image/car.webp";

export const PathSection = () => {
  return (
    <section className="py-12 flex flex-col items-center">
      <div className="flex flex-col items-center gap-2">
        <Title>경로까지 확인해보세요</Title>
        <p className="text-md font-medium text-gray-40">모임 장소까지 가는 방법을 확인할 수 있어요</p>
      </div>
      <div className="flex flex-col items-center mt-10">
        <div className="flex items-center w-fit gap-2 px-3 py-[6px] bg-[#DFF9E8] rounded-[30px]">
          <img src={Subway} alt="transfer" className="w-6 h-6" />
          <p className="text-lg font-semibold text-[#048C35]">대중교통</p>
        </div>
        <img src={TransferImg} alt="TransferImg" className="max-w-[500px] w-full h-full" />
      </div>
      <div className="flex flex-col items-center">
        <div className="flex items-center w-fit gap-2 px-3 py-[6px] bg-[#DFEEFF] rounded-[30px]">
          <img src={Car} alt="car" className="w-6 h-6" />
          <p className="text-lg font-semibold text-[#0967CD]">자가용</p>
        </div>
        <img src={CarImg} alt="CarImg" className="max-w-[500px] w-full h-full" />
      </div>
    </section>
  );
};
