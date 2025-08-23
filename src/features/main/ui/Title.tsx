interface TitleProps {
  children: React.ReactNode;
}

export const Title = ({ children }: TitleProps) => {
  return <span className="text-xxxl font-bold text-gray-80">{children}</span>;
};
