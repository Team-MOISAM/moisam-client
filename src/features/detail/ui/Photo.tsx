interface PhotoProps {
  images: string[];
}

export const Photo = ({ images }: PhotoProps) => {
  const length = images.length;

  if (length < 1) return null;
  if (length > 5) images = images.slice(0, 5);

  if (length === 1) {
    return <img src={images[0]} className="w-full h-[180px] object-cover" alt="image1" />;
  }

  if (length === 2) {
    return (
      <div className="flex w-full h-[180px]">
        <img src={images[0]} className="w-1/2 border-r border-r-white object-cover" alt="image1" />
        <img src={images[1]} className="w-1/2 object-cover" alt="image2" />
      </div>
    );
  }

  if (length === 3) {
    return (
      <div className="flex w-full h-[180px]">
        <img src={images[0]} className="w-1/2 h-full object-cover border-r border-white" alt="image1" />
        <div className="flex flex-col w-1/2 h-full">
          <img src={images[1]} className="w-full h-1/2 object-cover border-b border-white" alt="image2" />
          <img src={images[2]} className="w-full h-1/2 object-cover" alt="image3" />
        </div>
      </div>
    );
  }

  if (length === 4) {
    return (
      <div className="flex w-full h-[180px]">
        <img src={images[0]} className="w-1/2 h-full object-cover border-r border-white" alt="image1" />
        <div className="flex flex-col w-1/2 h-full">
          <img src={images[1]} className="w-full h-1/2 object-cover border-b border-white" alt="image2" />
          <div className="flex h-full">
            <img src={images[2]} className="w-full h-1/2 object-cover border-r border-white" alt="image3" />
            <img src={images[3]} className="w-full h-1/2 object-cover" alt="image4" />
          </div>
        </div>
      </div>
    );
  }

  if (length === 5) {
    return (
      <div className="flex w-full h-[180px]">
        <img src={images[0]} className="w-1/2 h-full object-cover border-r border-white" alt="image1" />
        <div className="flex flex-col w-1/2 h-ful">
          <div className="flex h-1/2 border-b-white border-b">
            <img src={images[1]} className="w-full h-full object-cover border-r border-white" alt="image2" />
            <img src={images[2]} className="w-full h-full object-cover" alt="image3" />
          </div>
          <div className="flex h-1/2">
            <img src={images[3]} className="w-full h-full object-cover border-r border-white" alt="image4" />
            <img src={images[4]} className="w-full h-full object-cover" alt="image5" />
          </div>
        </div>
      </div>
    );
  }
};
