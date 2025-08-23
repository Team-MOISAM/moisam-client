import Search from "@/assets/icon/search.svg";

interface InputFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
  type: string;
}

export const InputField = ({ value, onChange, placeholder, error, type }: InputFieldProps) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full py-[8px] my-[16px] border-b border-gray-20 placeholder:text-gray-20 focus:border-gray-80 focus:placeholder-transparent placeholder:text-lg focus:outline-none focus:text-gray-90 pr-8 rounded-none"
      />
      {type === "startPoint" && (
        <img src={Search} alt="search" className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5" />
      )}
      {error && <p className="text-error text-labelXs">{error}</p>}
    </div>
  );
};
