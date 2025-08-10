import PlaceImg from "@/assets/image/place.webp";

export const PlaceSection = () => {
  return (
    <section className="pt-12 pb-8 flex flex-col items-center gap-[30px] bg-sub-10">
      <div className="flex flex-col gap-2 items-center">
        <span className="text-xxxl font-bold text-[#003671]">만날 장소까지 추천해드릴게요</span>
        <p className="text-md font-medium text-[rgba(0,54,113,0.6)]">중간 지점 주변의 약속 장소를 추천해드려요</p>
      </div>
      <img src={PlaceImg} alt="PlaceImg" className="max-w-[500px] w-full h-full" />
    </section>
  );
};
