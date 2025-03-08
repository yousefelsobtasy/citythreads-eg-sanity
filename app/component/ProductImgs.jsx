"use client";

import Image from "next/image";
import { useState } from "react";

const ProductImgs = ({ name, images = [] }) => {

    const [mainProductImg, setMainProductImg] = useState(
        images.length > 0
            ? { src: images[0].imgUrl, alt: name }
            : { src: "", alt: "No Image Available" }
    );

    return (
        <div className="flex flex-col items-center">

            {/* Main Product Image */}
            {mainProductImg.src ? (
                <Image
                    className="w-full max-w-md rounded-lg shadow-lg"
                    src={mainProductImg.src}
                    alt={mainProductImg.alt}
                    width={500}
                    height={500}
                    priority // For performance
                />
            ) : (
                <p className="text-gray-500">No image available.</p>
            )}

            {/* Rest Images */}
            <div className="mt-4 flex gap-3 items-center flex-wrap justify-center">
                {images.length > 1 ? (
                    images.map((img, index) => (
                        <Image
                            key={img._key}
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
