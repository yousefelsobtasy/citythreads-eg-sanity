import Image from "next/image";

const Hero = ({ selectedCollection }) => {
  const collectionImageSrc = selectedCollection?.collectionImage || "/landing.png";

  return (
    <div className="w-full relative">
      <Image
        src={collectionImageSrc}
        alt={selectedCollection?.title || "Landing Collection"}
        width={1600}
        height={400}
        layout="responsive"
        objectFit="cover"
        className="rounded-lg shadow-lg"
      />
    </div>
  );
};

export default Hero;
