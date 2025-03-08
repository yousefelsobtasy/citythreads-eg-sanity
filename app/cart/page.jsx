'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const Cart = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const DELIVERY_FEE = 75.0;

    // Fetch items from localStorage
    useEffect(() => {
        const fetchCartItems = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const cartItems = Object.keys(localStorage)
                        .filter((key) => localStorage.getItem(key))
                        .map((key) => {
                            const [name, size, price, date] = key.split(' - ');
                            return {
                                name,
                                size,
                                price: parseFloat(price),
                                date,
                                count: parseInt(localStorage.getItem(key), 10),
                            };
                        })
                        .filter((item) => item.count > 0);
                    resolve(cartItems);
                } catch (error) {
                    reject('Failed to load cart items.');
                }
            }, 1500);
        });

        fetchCartItems
            .then((data) => {
                setOrders(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, []);

    // Update the cart count in the #cartCount element
    useEffect(() => {
        const totalItems = orders.reduce((sum, order) => sum + order.count, 0);
        const cartCountElement = document.getElementById('cartCount');
        if (cartCountElement && totalItems > 0) {
            cartCountElement.style.display = 'flex';
            cartCountElement.textContent = totalItems;
        } else if (cartCountElement) {
            cartCountElement.style.display = 'none';
        }
    }, [orders]);

    const updateCount = (order, delta) => {
        const updatedOrders = orders.map((item) => {
            if (item.date === order.date) {
                const newCount = Math.max(0, item.count + delta);
                if (newCount === 0) {
                    localStorage.removeItem(`${item.name} - ${item.size} - ${item.price} - ${item.date}`);
                } else {
                    localStorage.setItem(
                        `${item.name} - ${item.size} - ${item.price} - ${item.date}`,
                        newCount.toString()
                    );
                }
                return { ...item, count: newCount };
            }
            return item;
        }).filter((item) => item.count > 0);

        setOrders(updatedOrders);
    };

    const calculateTotalPrice = () => {
        return orders.reduce((sum, order) => sum + order.price * order.count, 0) + DELIVERY_FEE;
    };

    if (loading) {
        return <div className="text-center text-black font-semibold my-[50vh]">Loading your cart...</div>;
    }

    if (error) {
        return (
            <div className="text-center text-red-500 font-semibold">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 sm:p-6">
            <h1 className="text-xl sm:text-2xl font-bold text-black mb-6 text-center sm:text-left">Your Cart</h1>

            {orders.length > 0 ? (
                <div>
                    {/* Cart Items */}
                    <div className="grid gap-4 sm:gap-6">
                        {orders.map((order) => (
                            <div
                                key={order.date}
                                className="flex flex-col sm:flex-row items-center gap-4 p-4 border border-gray-300 rounded-lg"
                                role="listitem"
                            >
                                {/* Product Image */}
                                <Image
                                    src={
                                        order.name === 'Long Sleeve T-shirt'
                                            ? '/top-3.jpg'
                                            : '/pant-6.jpg'
                                    }
                                    width={80}
                                    height={80}
                                    alt={order.name}
                                    className="object-cover rounded-lg"
                                />

                                {/* Product Details */}
                                <div className="flex flex-col gap-1 flex-1 text-center sm:text-left">
                                    <h2 className="text-lg font-medium text-black">{order.name}</h2>
                                    <p className="text-gray-600">
                                        Size: <span className="font-semibold">{order.size}</span>
                                    </p>
                                    <p className="text-gray-600">
                                        Price: <span className="font-semibold">L.E {order.price.toFixed(2)} EGP</span>
                                    </p>
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex items-center gap-2">
                                    <button
                                        className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:ring-2 focus:ring-gray-500"
                                        aria-label="Decrease quantity"
                                        onClick={() => updateCount(order, -1)}
                                    >
                                        -
                                    </button>
                                    <div
                                        className="text-lg font-semibold text-black"
                                        aria-live="polite"
                                        aria-atomic="true"
                                    >
                                        {order.count}
                                    </div>
                                    <button
                                        className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:ring-2 focus:ring-gray-500"
                                        aria-label="Increase quantity"
                                        onClick={() => updateCount(order, 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Price Summary */}
                    <div className="mt-6 p-4 border border-gray-300 rounded-lg text-center sm:text-left">
                        <p className="text-lg font-semibold text-black">
                            Subtotal: L.E{' '}
                            {orders
                                .reduce((sum, order) => sum + order.price * order.count, 0)
                                .toFixed(2)}{' '}
                            EGP
                        </p>
                        <p className="text-lg font-semibold text-black">
                            Delivery Fee: L.E {DELIVERY_FEE.toFixed(2)} EGP
                        </p>
                        <p className="text-lg font-bold text-black mt-2">
                            Total: L.E {calculateTotalPrice().toFixed(2)} EGP
                        </p>
                    </div>

                    {/* Checkout Button */}
                    <div className="mt-4 sm:mt-6">
                        <a
                            href="/check-out"
                            className="block w-full sm:w-auto text-center py-3 px-4 font-medium text-white bg-black 
                            hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 
                            focus:ring-offset-2 transition-all duration-200 ease-in-out rounded-lg"
                            aria-label="Proceed to checkout"
                        >
                            Proceed to Checkout
                        </a>
                    </div>
                </div>
            ) : (
                <div className="text-center text-gray-600">
                    <p>Your cart is empty.</p>
                </div>
            )}
        </div>
    );
};

export default Cart;
