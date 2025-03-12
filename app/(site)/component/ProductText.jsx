'use client';

import { useEffect, useState } from 'react';
import ProductSpecs from './ProductSpecs';
import { FiChevronRight, FiChevronDown } from 'react-icons/fi';
import useCartStore from '../store/cartStore';

const ProductText = ({ product }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [productQuantity, setProductQuantity] = useState(1)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const variantsAmount =
        (product.variants?.reduce((a, item) => a + (item.amount || 0), 0) || 0)

    const isAvailable = variantsAmount || product.amount

    const { addToCart } = useCartStore();

    const handleAddToCart = () => {
        if (!isAvailable || !selectedVariant) {
            console.error("No variant selected!");
            return;
        }

        console.log("Adding to cart:", selectedVariant); // Debugging
        console.log("Adding to cart:", product); // Debugging

        setIsButtonDisabled(true);
        setShowMessage(true);

        addToCart({
            id: selectedVariant._key,
            name: product.name,
            size: selectedVariant.size,
            color: selectedVariant.color,
            price: selectedVariant.variantPrice - selectedVariant.variantDiscountPrice,
            originalPrice: selectedVariant.variantPrice,
            quantity: productQuantity,
            imgUrl: selectedVariant.images?.length > 0 ? selectedVariant.images[0]?.imgUrl : product.images[0]?.imgUrl,
        });

        // Re-enable button after 1.5s
        setTimeout(() => {
            setIsButtonDisabled(false);
            setShowMessage(false);
        }, 1500);
    };

    useEffect(() => {
        if (isAvailable) {
            setShowPopup(true);
        }
    }, [isAvailable]);

    return (
        <div className="flex flex-col gap-8 p-6 border border-gray-300 rounded-lg bg-white shadow-md relative">

            {showPopup && (
                <div
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 p-5 z-20 rounded-lg"
                    onClick={() => setShowPopup(false)}
                >
                    <div
                        className="bg-white p-6 rounded-lg shadow-lg space-y-4 text-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <p className="text-gray-700 mb-2">
                            Try clicking on <strong>every Size</strong> to explore its unique <strong>color options</strong>!
                            <p>( click on ever option )</p>
                        </p>
                        <button
                            id="close-popup-btn"
                            className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 transition-all"
                            onClick={() => setShowPopup(false)}
                            aria-label="Close popup"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <div className="flex flex-col">
                {selectedVariant?.variantDiscountPrice ? (
                    <div className="flex items-baseline gap-2">
                        <span className="text-gray-500 line-through text-lg">
                            L.E {selectedVariant.variantPrice}
                        </span>
                        <span className="text-red-600 text-2xl font-semibold">
                            L.E {selectedVariant.variantPrice - selectedVariant.variantDiscountPrice}
                        </span>
                    </div>
                ) : selectedVariant?.variantPrice ? (
                    <span className="text-xl font-medium text-gray-800">
                        L.E {selectedVariant.variantPrice}
                    </span>
                ) : product.discountPrice ? (
                    <div className="flex items-baseline gap-2">
                        <span className="text-gray-500 line-through text-lg">
                            L.E {product.defaultPrice}
                        </span>
                        <span className="text-red-600 text-2xl font-semibold">
                            L.E {product.defaultPrice - product.discountPrice}
                        </span>
                    </div>
                ) : (
                    <span className="text-xl font-medium text-gray-800">
                        L.E {product.defaultPrice}
                    </span>
                )}

            </div>

            {variantsAmount ? (
                <ProductSpecs
                    product={product}
                    variantsAmount={variantsAmount}
                    productQuantity={productQuantity}
                    setProductQuantity={setProductQuantity}
                    setSelectedVariant={setSelectedVariant}
                />
            ) : (
                <p className="text-gray-500 mt-4">
                    No options for this product available for now.
                </p>
            )}

            {product.description && <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Description
                </h3>
                <p>
                    {product.description}
                </p>
            </div>}

            {/* Add to Cart Button */}
            <button
                onClick={handleAddToCart}
                className={`w-full py-3 mt-6 font-medium text-center rounded-md ${(isAvailable && selectedVariant && !isButtonDisabled)
                    ? 'bg-black text-white hover:bg-gray-800'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    } transition-all duration-200 ease-in-out`}
                disabled={!isAvailable || !selectedVariant || isButtonDisabled}
            >
                {!isAvailable || !selectedVariant
                    ? 'Out of Stock'
                    : isButtonDisabled
                        ? 'Adding...'
                        : 'Add to Cart'}
            </button>

            {/* Message when item is added */}
            {showMessage && (
                <div className="mt-4 text-center text-green-600">
                    Item has been added to the cart!
                </div>
            )}
        </div>
    );
};

export default ProductText;