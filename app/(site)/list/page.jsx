import Image from "next/image";
import { getCollectionBySlug, getAllProducts } from "../../../sanity/sanity-utils";
import ProductList from "../component/ProductList";

export default async function Page({ searchParams }) {
    const { slug } = await searchParams;

    let products = [];
    let collection = null;

    try {
        if (slug) {
            collection = await getCollectionBySlug(slug);
            if (collection?.products?.length) {
                products = collection.products;
            }
        } else {
            products = await getAllProducts();
        }

        return (
            <div className="w-full px-4 sm:px-6 lg:px-12 py-5 md:py-12 bg-gray-50">
                {/* Collection Banner */}
                {collection && collection.collectionImage && (
                    <div className="relative w-full h-[300px] mb-2 md:mb-8 rounded-lg overflow-hidden shadow-lg">
                        <Image
                            src={collection.collectionImage}
                            alt={`${collection.title} Collection`}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg object-center"
                        />
                        <div className="absolute inset-0 bg-black opacity-30"></div>
                        <div className="absolute inset-0 flex items-center justify-center text-white">
                            <h1 className="text-3xl md:text-4xl font-bold capitalize">
                                {collection.title}
                            </h1>
                        </div>
                    </div>
                )}

                {/* Product List Section */}
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <ProductList products={products} />
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No products found.</p>
                )}
            </div>
        );
    } catch (error) {
        console.error("Error fetching data:", error);
        return (
            <div className="w-full h-screen flex items-center justify-center bg-gray-50">
                <p className="text-center text-red-500">Error loading products. Please try again later.</p>
            </div>
        );
    }
}
