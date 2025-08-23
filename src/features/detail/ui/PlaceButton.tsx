import Button from "@/shared/ui/Button";
import { useSetPlace } from "../hooks";
import { useState } from "react";
import { PlaceModal } from "./PlaceModal";

interface PlaceButtonProps {
  eventId: string;
  placeId: string;
  name: string;
  isChanged: boolean;
  isConfirmed: boolean;
  subwayId?: string | null;
  onComplete?: () => void;
}
export const PlaceButton = ({ eventId, placeId, name, isChanged, isConfirmed, subwayId, onComplete }: PlaceButtonProps) => {
  const { mutate, isPending } = useSetPlace();
  const [isChangedOpen, setIsChangedOpen] = useState(false);
  const [isConfirmedOpen, setIsConfirmedOpen] = useState(false);

  const handleModal = () => {
    if (isConfirmed) {
      setIsChangedOpen(true);
    } else {
      setIsConfirmedOpen(true);
    }
  };

  const handleClick = () => {
    mutate(
      { placeId, eventId, subwayId: subwayId || undefined },
      {
        onSuccess: () => {
          setIsConfirmedOpen(false);
          setIsChangedOpen(false);
          onComplete?.();
        },
      }
    );
  };

  return (
    <>
      <div
        className="px-5 pt-4 pb-5 w-full fixed bottom-0 max-w-[600px] z-[100]"
        style={{ background: "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 20%)" }}>
        <Button disabled={(isConfirmed && !isChanged) || isPending} onClick={handleModal}>
          {isConfirmed ? (isChanged ? "모임장소 바꾸기" : "이미 선택한 장소에요") : "여기에서 만나기"}
        </Button>
      </div>
      {isChangedOpen && (
        <PlaceModal type="change" placeName={name} onClose={() => setIsChangedOpen(false)} onClick={handleClick} />
      )}
      {isConfirmedOpen && (
        <PlaceModal type="fix" placeName={name} onClose={() => setIsConfirmedOpen(false)} onClick={handleClick} />
      )}
    </>
  );
};
