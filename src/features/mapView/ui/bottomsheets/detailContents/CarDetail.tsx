import Parking from "@/assets/icon/parking.svg";

interface CarDetailProps {
  driveDistance: number;
  toll: number;
  taxiToll: number;
  parking?: { name: string; distance: number };
}

export const CarDetail = ({ driveDistance, toll, taxiToll, parking }: CarDetailProps) => {
  return (
    <section className="flex flex-col gap-4 px-5 mb-[84px]">
      <div className="flex flex-col gap-[2px] text-md font-medium text-gray-40">
        <span className="text-lg font-bold text-gray-90">
          {driveDistance >= 1000 ? `${(driveDistance / 1000).toFixed(1)}km` : `${driveDistance}m`}
        </span>
        <p>통행료 약 {toll.toLocaleString()}원~</p>
        <p>택시비 약 {taxiToll.toLocaleString()}원~</p>
      </div>
      {parking && (
        <div className="flex gap-1 rounded-2xl bg-sub-10 py-3 px-4 items-start">
          <img src={Parking} alt="parking" className="mt-[2px] w-5 h-5" />
          <div className="flex flex-col gap-[2px] text-md font-bold text-gray-60">
            <p>{parking.name}</p>
            <p className="text-sm font-medium">역에서 {parking.distance.toFixed()}m</p>
          </div>
        </div>
      )}
    </section>
  );
};
