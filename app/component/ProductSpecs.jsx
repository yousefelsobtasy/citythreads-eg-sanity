'use client';
import { useState, useEffect } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';

const ProductSpecs = ({
    product,
    variantsAmount,
    setSelectedVariant
}) => {
    const [selectedOptions, setSelectedOptions] = useState({});
    const [countInStock, setCountInStock] = useState(0);
    const [productQuantity, setProductQuantity] = useState(1)

    const productOptions = product.variants.map(item => {
        return {
            size: {
                name: 'size',
                value: item.size,
            },
            color: {
                name: 'color',
                value: item.color,
            },
        }
    })
    const handleOptionsChange = (name, value) => {
        const newOptions = {
            ...selectedOptions,
            [name]: value,
        };
        setSelectedOptions(newOptions); // Update state
    };

    const isVariantInStock = (choices) => {
        return product.variants.some((variant) => {
            const variantChoices = {
                size: variant.size,
                color: variant.color
            }
            return Object.entries(choices).every(([key, value]) => variantChoices[key] === value)
                && variant.amount
        });
    };


    // Trigger when selectedOptions changes
    // useEffect(() => {
    //     if (Object.keys(selectedOptions).length === 0) {
    //         const firstVisibleChoice = variants.find(
    //             (variant) =>
    //                 variant.variant?.visible &&
    //                 variant.stock?.inStock &&
    //                 variant.stock?.quantity > 0 &&
    //                 variant._id !== "00000000-0000-0000-0000-000000000000"
    //         )?.choices;
    //         if (firstVisibleChoice) {
    //             setSelectedOptions(firstVisibleChoice);
    //         }
    //     }

    //     const variant = findVariantInStock();
    //     setSelectedVariant(_ => variant);
    //     setCountInStock(variant?.stock?.quantity || 0);
    //     if (variant) {
    //         setProductQuantity(1)
    //         // console.log(selectedVariant)
    //     }
    // }, [variants, selectedOptions]);

    useEffect(() => {
        if (variantsAmount <= 0) return

        setCountInStock(variantsAmount || product.amount)

        const firstVisibleChoice = productOptions[0]
        if (firstVisibleChoice) {
            setSelectedOptions({
                size: firstVisibleChoice.size.value,
                color: firstVisibleChoice.color.value,
            })
        }

    }, [])

    useEffect(() => {
        setSelectedVariant(() => {
            return product.variants.filter(item =>
                item.size === selectedOptions?.size
                && item.color === selectedOptions?.color
            )
        })
    }, [selectedOptions])

    return (
        <div className="space-y-8">

            {/* Size Options */}
            <div className="mb-6">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">
                    Choose Size
                </h4>
                <ul className="flex flex-wrap gap-3">
                    {productOptions.map((option, index) => {
                        const [name, value] = [option.size.name, option.size.value]

                        const disabled = !isVariantInStock({
                            ...selectedOptions,
                            [name]: value,
                        });
                        const selected =
                            selectedOptions[name] === value;

                        return (
                            <li
                                key={index}
                                onClick={() => handleOptionsChange(name, value)}
                                className={`px-4 py-2 border rounded-lg cursor-pointer transition-all duration-200 ease-in-out 
                                        ${selected
                                        ? 'bg-black text-white border-black'
                                        : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'
                                    } 
                                        ${disabled
                                        ? 'opacity-50 text-gray-400 border-gray-200 line-through'
                                        : ''
                                    }`}
                            >
                                {value}
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Color Options */}
            <div className="mb-6">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">
                    Choose Color
                </h4>
                <ul className="flex flex-wrap gap-3">
                    {productOptions.map((option, index) => {
                        const [name, value] = [option.color.name, option.color.value]

                        const disabled = !isVariantInStock({
                            ...selectedOptions,
                            [name]: value,
                        });
                        const selected =
                            selectedOptions[name] === value

                        return (
                            <li
                                key={index}
                                onClick={() => handleOptionsChange(name, value)}
                                className={`px-4 py-2 border rounded-lg cursor-pointer transition-all duration-200 ease-in-out 
                                        ${selected
                                        ? 'bg-black text-white border-black'
                                        : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'
                                    } 
                                        ${disabled
                                        ? 'opacity-50 text-gray-400 border-gray-200 line-through'
                                        : ''
                                    }`}
                            >
                                {value}
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Quantity Selector */}
            <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">
                    Choose Quantity
                </h4>
                <div className="flex items-center gap-6">
                    <div className="flex items-center space-x-8 md:space-x-12 bg-gray-100 border rounded-full px-4 py-2">
                        <button
                            className="text-xl font-semibold text-gray-700 hover:text-black"
                            onClick={() => setProductQuantity((prev) => (prev >= 2 ? prev - 1 : prev))}
                            aria-label="Decrease Quantity"
                        >
                            <FiMinus className="w-6 h-6" />
                        </button>
                        <span className="text-lg font-medium">{countInStock ? productQuantity : 0}</span>
                        <button
                            className="text-xl font-semibold text-gray-700 hover:text-black"
                            onClick={() => setProductQuantity((prev) => prev < countInStock ? prev + 1 : prev)}
                            aria-label="Increase Quantity"
                        >
                            <FiPlus className="w-6 h-6" />
                        </button>
                    </div>
                    <p className="text-sm text-gray-600">
                        Only <span className="font-bold text-orange-400">{countInStock} items</span> left!
                        <br />
                        Don't miss out.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductSpecs;
