import ProductImgs from "../component/ProductImgs";
import ProductText from "./../component/ProductText";
import NotFound from "../component/NotFound";
import { getProductBySlug } from "../../sanity/sanity-utils";

export default async function SinglePage({ params }) {

    const { slug } = await params;

    const product = await getProductBySlug(slug);

    try {

        return (
            <>
                <div className="flex flex-col md:flex-row gap-10 w-full py-[40px] px-[15px] lg:px-[50px] max-w-[1200px] mx-auto">
                    {product &&
                        <>
                            <div className="w-full md:w-1/2">
                                <ProductImgs name={product.title} images={product.images} />
                            </div>
                            <div className="w-full md:w-1/2 ">
                                <ProductText product={product} />
                            </div>
                        </>
                    }
                </div>
            </>
        )
    } catch (e) {
        console.log(e)
        return <NotFound />
    }
}