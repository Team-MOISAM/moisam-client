import map from "@/assets/image/map.webp";

interface DefaultMapProps {
  className?: string;
}

export const DefaultMap = ({ className = "" }: DefaultMapProps) => {
  return <img src={map} alt="map" className={`absolute top-0 left-0 w-full h-full object-cover z-10 ${className}`} />;
};
