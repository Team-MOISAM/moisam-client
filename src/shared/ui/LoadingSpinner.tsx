import LoadingSpinnerImage from "@/assets/image/loading_spinner.webp";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <img src={LoadingSpinnerImage} alt="LoadingSpinner" className="w-[70px] h-[70px] object-cover animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
