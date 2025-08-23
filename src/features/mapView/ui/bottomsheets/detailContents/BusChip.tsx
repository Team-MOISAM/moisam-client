interface BusChipProps {
  busNumber: string;
}

export const BusChip = ({ busNumber }: BusChipProps) => {
  return <div className="text-labelXs font-semibold text-gray-50 px-[6px] bg-gray-10 rounded-[4px]">{busNumber}</div>;
};
