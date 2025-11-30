import Button from "@/shared/ui/Button";
import { useState } from "react";
import { MapModal } from "./MapModal";

export const FixedButton = ({ disabled }: { disabled?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="flex px-5 py-4 fixed bottom-0 left-0 w-full z-[1001]"
        style={{ background: "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 20%)" }}>
        <Button onClick={() => setIsOpen(true)} disabled={disabled}>
          지도에서 보기
        </Button>
      </div>
      {isOpen && <MapModal onClose={() => setIsOpen(false)} />}
    </>
  );
};
