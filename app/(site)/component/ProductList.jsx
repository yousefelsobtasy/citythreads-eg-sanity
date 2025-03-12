import Link from "next/link";
import Image from "next/image";

const ProductList = ({ products }) => {
    const variantsAmount = products.reduce((ac, product) => ac + (product.variants?.reduce((a, item) => a + (item.amount || 0), 0) || 0), 0)

    return (
        <>
            {products.map((product) => (
                <div key={product._id} className="col-span-1 row-span-1 px-1 max-h-max relative">
                    {(product.amount <= 0 || !(product.variants?.length > 0) || !variantsAmount) && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded z-20">
                            Out of Stock
                        </div>
                    )}
                    <Link href={`/${product.slug}`} className="h-full flex flex-col justify-between productCard">
                        <div className="productImgContainer">
                            <Image
                                className="productImg rounded-md"
                                src={product.images?.[0]?.imgUrl || "/product.jpg"}
                                alt={product.title}
                                width={500}
                                height={500}
                            />
                            <Image
                                className="productImgHover rounded-md"
                                src={product.images?.[1]?.imgUrl || product.images?.[0]?.imgUrl || "/product.jpg"}
                                alt={product.title}
                                width={500}
                                height={500}
                            />
                            {product.discountPrice && product.discountPrice < product.defaultPrice && (
                                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded z-20">
                                    {Math.round((product.discountPrice / product.defaultPrice) * 100)}% OFF
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col justify-between gap-2 my-2">
                            <p className="text-lg">{product.title}</p>
                            <div className="mt-1 relative">
                                {product.discountPrice && product.discountPrice < product.defaultPrice && (
                                    <p className="absolute top-0 left-0 text-sm text-gray-400 line-through">
                                        L.E {product.defaultPrice}
                                    </p>
                                )}
                                <h3 className="font-bold mt-5">
                                    L.E {product.discountPrice ? product.defaultPrice - product.discountPrice : product.defaultPrice}
                                </h3>
                            </div>
                            <button className="w-full border-[1px] border-stone-950 text-center p-3 rounded-md">
                                Choose Options
                            </button>
                        </div>
                    </Link>
                </div>
            ))}
        </>
    );
};

export default ProductList;
