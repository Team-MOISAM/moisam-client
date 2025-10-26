import Search from "@/assets/icon/search.svg";
import XIcon from "@/assets/icon/xIcon.svg";
import { useRef } from "react";

interface InputFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
  type: string;
}

export const InputField = ({ value, onChange, placeholder, error, type }: InputFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    if (inputRef.current) {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )?.set;

      if (nativeInputValueSetter) {
        nativeInputValueSetter.call(inputRef.current, "");
        const event = new Event("change", { bubbles: true });
        inputRef.current.dispatchEvent(event);
      }
    }
  };

  // startPoint는 값이 있으면 X, 없으면 돋보기
  // name은 값이 있으면 X만 표시
  const showClearIcon = value.trim() !== "";
  const showSearchIcon = type === "startPoint" && !showClearIcon;

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full py-[8px] my-[16px] border-b border-gray-20 placeholder:text-gray-20 focus:border-gray-80 focus:placeholder-transparent placeholder:text-lg focus:outline-none focus:text-gray-90 pr-8 rounded-none"
      />
      {showSearchIcon && (
        <img src={Search} alt="search" className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5" />
      )}
      {showClearIcon && (
        <button
          onClick={handleClear}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 p-0 bg-none border-none cursor-pointer flex items-center justify-center"
          aria-label="Clear input">
          <img src={XIcon} alt="clear" className="w-5 h-5" />
        </button>
      )}
      {error && <p className="text-error text-labelXs">{error}</p>}
    </div>
  );
};
