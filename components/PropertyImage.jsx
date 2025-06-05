import Image from "next/image";
const PropertyImage = ({ images }) => {
  const imageSrcPath = (img) => {
    return img.startsWith("https") ? img : `/images/properties/${img}`;
  };
  const renderImages = () => {
    if (images.length === 1) {
      return (
        <Image
          src={imageSrcPath(images[0])}
          alt="Property Image"
          className="object-cover h-[400px] w-full rounded-xl"
          width={0}
          height={0}
          sizes="100vw"
        />
      );
    } else {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => {
            return (
              <div key={index} className="col-span-1">
                <Image
                  src={imageSrcPath(image)}
                  alt={`Property Image ${index + 1}`}
                  className="object-cover h-[400px] w-full rounded-xl"
                  width={0}
                  height={0}
                  sizes="100vw"
                />
              </div>
            );
          })}
        </div>
      );
    }
  };

  return (
    <section className="bg-blue-50 p-4">
      <div className="container-xl m-auto">{renderImages()}</div>
    </section>
  );
};

export default PropertyImage;
