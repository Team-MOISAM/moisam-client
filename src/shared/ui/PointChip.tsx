interface PointChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isSelect: boolean;
}

export const PointChip = ({ text, isSelect, onClick }: PointChipProps) => {
  return (
    <button
      className={`px-3 py-1 rounded-[130px] text-sm text-center border ${isSelect ? "bg-gray-90 text-white" : "bg-white text-gray-30 border-gray-10"}`}
      onClick={onClick}>
      {text}역
    </button>
  );
};
