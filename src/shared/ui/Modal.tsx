import { useEffect, useRef } from "react";
import { Portal } from "./Portal";

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void;
  overlayClassName?: string;
  contentClassName?: string;
}

const defaultOverlayClassName =
  "fixed top-0 left-1/2 -translate-x-1/2 max-w-[600px] w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-[1001]";
const defaultContentClassName = "w-[264px] bg-white shadow-pin01 rounded-[20px]";

export const Modal = ({ children, onClose, overlayClassName, contentClassName }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <Portal>
      <div className={overlayClassName ?? defaultOverlayClassName}>
        <div ref={modalRef} className={contentClassName ?? defaultContentClassName}>
          {children}
        </div>
      </div>
    </Portal>
  );
};
