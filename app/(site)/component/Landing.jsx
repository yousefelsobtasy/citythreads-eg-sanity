import HomeProductList from "./HomeProductList";
import CollectionList from "./CollectionList";
import SectionLoading from "./SectionLoading";
import Hero from "./Hero";
import { Suspense } from "react";
import Link from "next/link";
import { getCollectionBySlug, getProductById } from "../../../sanity/sanity-utils";

export const dynamic = "force-dynamic"
export default async function Landing() {
    try {
        const selectedCollection = await getCollectionBySlug("landing");

        let products

        if (selectedCollection?.products?.length > 0) {

            products = await Promise.all(selectedCollection.products.map(
                async (product) => {
                    const productData = await getProductById(product._ref);
                    return productData;
                }
            ));

        }


        return (
            <>
                <Suspense fallback={<SectionLoading />}>
                    <Hero selectedCollection={selectedCollection} />
                </Suspense>

                <section className="bg-black text-white">
                    <CollectionList />
                </section>

                <section>
                    <Suspense fallback={<SectionLoading />}>
                        <HomeProductList products={products} />
                    </Suspense>
                </section>

                <div className="flex justify-center pt-5 pb-10 bg-[#f9fafb]">
                    <Link href="/list" className="px-6 py-3 bg-black text-white rounded-md hover:opacity-65">
                        View All Products
                    </Link>
                </div>
            </>
        );
    } catch (error) {
        console.error("Error loading collection or products:", error);
        return (
            <div className="w-full h-screen flex items-center justify-center bg-gray-50">
                <p className="text-center text-red-500">Error loading collection or products. Please try again later.</p>
            </div>
        );
    }
}
