
import transfer from "@/assets/icon/transfer.svg"
import subwayGray from "@/assets/icon/subwayGray.svg"
import carBlue from "@/assets/icon/carBlue.svg"
import carGray from "@/assets/icon/carGray.svg"

interface TransportToggleProps {
  value: boolean; // true: 대중교통, false: 자가용
  onChange: (value: boolean) => void;
}

export function TransportToggle({ value, onChange }: TransportToggleProps) {
  return (
    <div className="flex bg-gray-5 rounded-xl">
      <button
        onClick={() => onChange(true)}
        className={`flex-1 py-[12px] px-[34px] rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2 ${
          value 
            ? 'bg-gray-80 text-white shadow-sm' 
            : 'bg-gray-5 text-gray-40'
        }`}
      >
        <img 
          src={value ? transfer : subwayGray} 
          alt="대중교통" 
          className="w-[24px] h-[24px]" 
        />
        대중교통
      </button>
      <button
        onClick={() => onChange(false)}
        className={`flex-1 py-[12px] px-[34px] rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2 ${
          !value 
            ? 'bg-gray-80 text-white shadow-sm' 
            : 'bg-gray-5 text-gray-40'
        }`}
      >
        <img 
          src={!value ? carBlue : carGray} 
          alt="자가용" 
          className="w-[24px] h-[24px]" 
        />
        자가용
      </button>
    </div>
  )
} 