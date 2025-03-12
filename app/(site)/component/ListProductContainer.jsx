import ProductList from "./ProductList";

const ListProductContainer = async ({ productResponse, collectionName, searchParams }) => {
    return (
        <>
            <h2 className="text-xl sm:text-2xl md:text-3xl my-6 sm:my-8 px-4 font-bold tracking-wider capitalize">
                {collectionName === 'All Products' ? 'All Collections' : `${collectionName} Collection`}
            </h2>
            <div className="w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-12 max-w-screen-xl mx-auto">
                <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6`}>
                    <ProductList productResponse={productResponse} searchParams={searchParams} />
                </div>
            </div>
        </>
    );
};

export default ListProductContainer;
