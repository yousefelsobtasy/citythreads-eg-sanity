import ProductList from "./ProductList";

const HomeProductList = ({ products }) => {
    return (
        <>
            {products?.length > 0 ? (
                <div className="w-full py-8 px-6 bg-gray-50">
                    <div className="max-w-screen-xl mx-auto">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Newest Collection</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                            <ProductList products={products} />
                        </div>
                    </div>
                </div>
            ) : <></>}
        </>
    );
};

export default HomeProductList;
