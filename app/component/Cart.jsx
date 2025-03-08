'use client';
import { useEffect, useState } from "react";
import useNewCartStore from "../store/newCartStore";
import { motion as m, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image"; // Import the Image component from Next.js

const Cart = () => {
    const { cartItems, cartCount, removeFromCart, clearCart, isCartOpen, setIsCartOpen } = useNewCartStore();
    const [localCartItems, setLocalCartItems] = useState([]); // Local state for cart items
    const [totalPrice, setTotalPrice] = useState(0); // Local state for total price

    // Sync localCartItems with cartItems from the store
    useEffect(() => {
        setLocalCartItems(cartItems);
        setTotalPrice(cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2));
    }, [cartItems]);

    return (
        <div className="w-screen h-screen pt-[68.5px] lg:pt-[88.5px] z-50 no-scroll fixed top-0 left-0">
            <AnimatePresence>
                {/* Overlay */}
                {isCartOpen && (
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-full bg-[rgba(0,0,0,0.5)] z-10 fixed top-0 left-0"
                        onClick={() => setIsCartOpen(false)}
                    />
                )}

                {/* Cart Panel */}
                {isCartOpen && (
                    <m.div
                        initial={{ x: "100%" }}
                        animate={{ x: isCartOpen ? 0 : "100%" }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 20, stiffness: 100 }}
                        className="w-80 h-full bg-white z-20 fixed top-0 right-0 shadow-lg overflow-y-auto"
                    >
                        {/* Cart Header */}
                        <div className="p-6 border-b">
                            <h2 className="text-2xl font-bold">Your Cart</h2>
                            <p className="text-gray-500">{cartCount} {cartCount === 1 ? "item" : "items"}</p>
                        </div>

                        {/* Cart Items */}
                        <div className="p-6">
                            {localCartItems.length === 0 ? (
                                <p className="text-gray-500">Your cart is empty.</p>
                            ) : (
                                <ul>
                                    {localCartItems.map((item, index) => (
                                        <m.li
                                            key={item.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 20 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex justify-between items-center mb-4"
                                        >
                                            {/* Item Image */}
                                            <div className="relative w-16 h-16 flex-shrink-0">
                                                <Image
                                                    src={item.imgUrl} // Use the imgUrl from the item
                                                    alt={item.name} // Use the item name as alt text
                                                    fill // Fill the container
                                                    className="object-cover rounded"
                                                    sizes="(max-width: 64px) 100vw, 64px" // Optimize for performance
                                                />
                                            </div>

                                            {/* Item Details */}
                                            <div className="ml-4 flex-1">
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-gray-500">Size: {item.size}</p>
                                                <p className="text-gray-500">Color: {item.color}</p>
                                                <p className="text-gray-500">Quantity: {item.quantity}</p>
                                                <p className="text-gray-500">Price: {item.price}</p>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => {
                                                    removeFromCart(item); // Remove item from the store
                                                    // setLocalCartItems((prev) => prev.filter((i) => i.id !== item.id)); // Update local state
                                                }}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Remove
                                            </button>
                                        </m.li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Cart Footer */}
                        <div className="p-6 border-t">
                            <div className="flex justify-between mb-4">
                                <p className="font-bold">Total:</p>
                                <p className="font-bold">L.E {totalPrice}</p>
                            </div>
                            <Link href="/check-out">
                                <m.button
                                    whileHover={cartCount !== 0 ? { scale: 1.05 } : undefined}
                                    whileTap={cartCount !== 0 ? { scale: 0.95 } : undefined}
                                    className={`w-full bg-black text-white py-3 rounded-lg font-medium transition-colors ${cartCount === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-900"
                                        }`}
                                    disabled={cartCount === 0}
                                    onClick={() => setIsCartOpen(false)}
                                >
                                    Checkout
                                </m.button>
                            </Link>
                            <button
                                onClick={() => {
                                    clearCart();
                                    setLocalCartItems([]);
                                }}
                                className="w-full mt-2 text-red-500 hover:text-red-700 disabled:text-gray-400 disabled:hover:text-gray-400"
                                disabled={cartCount === 0}
                            >
                                Clear Cart
                            </button>
                        </div>
                    </m.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Cart;