import PlaceImg from "@/assets/image/place.webp";
import { motion } from "framer-motion";

interface PlaceSectionProps {
  isVisible?: boolean;
}

export const PlaceSection = ({ isVisible = false }: PlaceSectionProps) => {
  return (
    <section className="pt-12 pb-8 bg-sub-10">
      <motion.div
        className="flex flex-col items-center gap-[30px]"
        initial={{
          opacity: 0,
          y: 80,
          scale: 0.96,
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : 80,
          scale: isVisible ? 1 : 0.96,
        }}
        transition={{
          duration: 1.2,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: isVisible ? 0.2 : 0,
        }}>
        <div className="flex flex-col gap-2 items-center">
          <span className="text-xxxl font-bold text-[#003671]">만날 장소까지 추천해드릴게요</span>
          <p className="text-md font-medium text-[rgba(0,54,113,0.6)]">중간 지점 주변의 약속 장소를 추천해드려요</p>
        </div>
        <img src={PlaceImg} alt="PlaceImg" className="max-w-[500px] w-full h-full" />
      </motion.div>
    </section>
  );
};
