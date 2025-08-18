import { useState } from "react";
import { PlaceScore } from "../model";
import { formatReview } from "../utils";
import PlaceChip from "./PlaceChip";
import Star from "@/assets/icon/star.svg";

interface PlaceCardItemProps {
  name: string;
  distance: number;
  image?: string;
  openTime?: string;
  closeTime?: string;
  averageRating?: number | null;
  placeScore?: PlaceScore | null;
  onClick?: () => void;
}

const PlaceCard = ({
  name,
  distance,
  image,
  openTime,
  closeTime,
  averageRating,
  placeScore,
  onClick,
}: PlaceCardItemProps) => {
  const openingHours = openTime && closeTime ? `${openTime} - ${closeTime}` : undefined;
  const [hasImgError, setHasImgError] = useState(false);

  return (
    <div className="flex flex-col gap-3 p-4 rounded-2xl w-full shadow-list bg-white" onClick={onClick}>
      <div className="flex justify-between">
        <div className="flex gap-1 flex-col text-labelXs font-medium">
          <span className="text-md font-semibold text-gray-90">{name}</span>
          {/* openingHours가 있을 때만 영업시간 표시 */}
          {openingHours && (
            <div className="flex gap-[6px] items-center">
              <p className="text-gray-50">영업 시간</p>
              <p className="text-gray-70">{openingHours}</p>
            </div>
          )}
          <p className="text-sub-sub">역에서 {distance}m</p>
        </div>
        {/* image가 있을 때만 이미지 표시 */}
        {image && !hasImgError && (
          <img
            src={image}
            alt="placeImg"
            className="w-[68px] h-[68px] rounded-lg object-cover"
            onError={() => setHasImgError(true)}
            loading="lazy"
          />
        )}
      </div>

      {(averageRating || placeScore) && (
        <div className="flex gap-2">
          {averageRating && (
            <div className="flex gap-[2px] items-center text-sm font-semibold text-gray-90">
              <img src={Star} alt="star" className="w-4 h-4" />
              {averageRating.toFixed(1)}
            </div>
          )}

          {placeScore && (
            <div className="flex gap-2">
              {placeScore.socket > 0 && <PlaceChip label={formatReview(placeScore)[0]} />}
              {placeScore.seat > 0 && <PlaceChip label={formatReview(placeScore)[1]} />}
              {/* quiet(한산함)는 표시하지 않음 */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PlaceCard;
