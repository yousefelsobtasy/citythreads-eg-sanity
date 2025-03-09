"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import useVariantImgsStore from "../store/variantImgsStore";

const ProductImgs = ({ name, images = [] }) => {
    const [imagesSrc, setImagesSrc] = useState(images);
    const variantImgsSrc = useVariantImgsStore((state) => state.variantImgsSrc);
    const [mainProductImg, setMainProductImg] = useState(
        imagesSrc.length > 0
            ? { src: imagesSrc[0].imgUrl, alt: name }
            : { src: "", alt: "No Image Available" }
    );

    useEffect(() => {
        const newImages = variantImgsSrc?.length ? variantImgsSrc : images;
        setImagesSrc(newImages);

        if (newImages.length > 0) {
            setMainProductImg({ src: newImages[0].imgUrl, alt: name });
        } else {
            setMainProductImg({ src: "", alt: "No Image Available" });
        }
    }, [variantImgsSrc, images]);

    return (
        <div className="flex flex-col items-center">
            {/* Main Product Image */}
            {mainProductImg?.src ? (
                <Image
                    className="w-full max-w-md rounded-lg shadow-lg"
                    src={mainProductImg.src}
                    alt={mainProductImg.alt}
                    width={500}
                    height={500}
                    priority
                />
            ) : (
                <p className="text-gray-500">No image available.</p>
            )}

            {/* Rest images */}
            <div className="mt-4 flex gap-3 items-center flex-wrap justify-center">
                {imagesSrc.length > 1 ? (
                    imagesSrc.map((img, index) => (
                        <Image
                            key={img._key || index}
                            src={img.imgUrl}
                            alt={`${name} image ${index + 1}`}
                            width={50}
                            height={50}
                            className="w-12 h-12 object-cover rounded cursor-pointer hover:ring-2 hover:ring-blue-500"
                            onClick={() =>
                                setMainProductImg({
                                    src: img.imgUrl,
                                    alt: `${name} image ${index + 1}`,
                                })
                            }
                        />
                    ))
                ) : (
                    <p className="text-gray-500">No additional images available.</p>
                )}
            </div>
        </div>
    );
};

export default ProductImgs;
