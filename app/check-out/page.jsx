'use client';

import { useEffect, useState } from 'react';
import emailjs from 'emailjs-com';
import useNewCartStore from "../store/newCartStore";

const CheckOut = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        postalCode: '',
        email: '',
    });

    // const [cartItems, setCartItems] = useState([]);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { cartItems, cartCount, clearCart } = useNewCartStore();


    useEffect(() => {
        // // Fetch cart items from localStorage (or global state if used)
        // const items = Object.keys(localStorage)
        //     .filter((key) => localStorage.getItem(key))
        //     .map((key) => {
        //         const [name, size, price, date] = key.split(' - ');
        //         return {
        //             name,
        //             size,
        //             price: parseFloat(price),
        //             date,
        //             quantity: parseInt(localStorage.getItem(key), 10),
        //         };
        //     })
        //     .filter((item) => item.quantity > 0);
        // setCartItems(items);
    }, []);

    const clearCountDiv = () => {
        const cartCount = document.querySelector('#cartCount')
        if (cartCount) {
            cartCount.style.display = 'none'
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required.';
        if (!formData.phone.match(/^01[0-9]{9}$/))
            newErrors.phone = 'Phone number must be a valid Egyptian number (01XXXXXXXXX).';
        if (!formData.address) newErrors.address = 'Address is required.';
        if (!formData.postalCode.match(/^\d{5}$/))
            newErrors.postalCode = 'Postal code must be exactly 5 digits.';
        if (!formData.email.match(/^\S+@\S+\.\S+$/))
            newErrors.email = 'Email must be a valid format (example@example.com).';

        if (cartCount === 0) {
            newErrors.cart = 'Cart is empty';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        setStatus(null);

        // Format product details
        const productDetails = cartItems
            .map((item) => `
            - ${item.name} (Size: ${item.size},Color: ${item.color}, Qty: ${item.quantity}, Price per one: L.E ${item.price}, Total: L.E ${(item.price * item.quantity).toFixed(2)})`)
            .join('\n');

        // Prepare data for EmailJS
        const templateParams = {
            name: formData.name,
            phone: formData.phone,
            address: formData.address,
            postalCode: formData.postalCode,
            email: formData.email,
            paymentMethod: 'Cash on Delivery',
            productDetails: productDetails,
            total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2),
        };

        emailjs
            .send(
                'service_n5gkyce',
                'template_z4zfhb9', // Replace with your EmailJS template ID
                templateParams,
                'J8k4fpnhHH0oX1QQP' // Replace with your EmailJS public key
            )
            .then(
                (response) => {
                    console.log('SUCCESS!', response.status, response.text);
                    setStatus('success');
                    setFormData({
                        name: '',
                        phone: '',
                        address: '',
                        postalCode: '',
                        email: '',
                    });
                    // localStorage.clear(); // Clear cart after successful order
                    // clearCountDiv()
                    // setCartItems([]);
                    clearCart()
                },
                (error) => {
                    console.error('FAILED...', error);
                    setStatus('failed');
                }
            )
            .finally(() => setIsSubmitting(false));
    };

    return (
        <div className="container mx-auto p-6" role="main">
            <h1 className="text-2xl font-bold text-black mb-6">Last Step</h1>
            <form onSubmit={handleSubmit} className="grid gap-6" aria-labelledby="checkout-form">
                <div>
                    <label htmlFor="name" className="block font-medium text-black mb-1">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2"
                        aria-invalid={!!errors.name}
                        aria-describedby="nameError"
                        required
                    />
                    {errors.name && <p id="nameError" className="text-red-500">{errors.name}</p>}
                </div>

                <div>
                    <label htmlFor="phone" className="block font-medium text-black mb-1">
                        Phone Number (Egypt only)
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2"
                        aria-invalid={!!errors.phone}
                        aria-describedby="phoneError"
                        required
                        placeholder="01XXXXXXXXX"
                    />
                    {errors.phone && <p id="phoneError" className="text-red-500">{errors.phone}</p>}
                </div>

                <div>
                    <label htmlFor="address" className="block font-medium text-black mb-1">
                        Address
                    </label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2"
                        aria-invalid={!!errors.address}
                        aria-describedby="addressError"
                        required
                    ></textarea>
                    {errors.address && <p id="addressError" className="text-red-500">{errors.address}</p>}
                </div>

                <div>
                    <label htmlFor="postalCode" className="block font-medium text-black mb-1">
                        Postal Code
                    </label>
                    <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2"
                        aria-invalid={!!errors.postalCode}
                        aria-describedby="postalCodeError"
                        required
                        placeholder="12345"
                    />
                    {errors.postalCode && <p id="postalCodeError" className="text-red-500">{errors.postalCode}</p>}
                </div>

                <div>
                    <label htmlFor="email" className="block font-medium text-black mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2"
                        aria-invalid={!!errors.email}
                        aria-describedby="emailError"
                        required
                        placeholder="example@example.com"
                    />
                    {errors.email && <p id="emailError" className="text-red-500">{errors.email}</p>}
                </div>
                <button
                    type="submit"
                    className={`w-full text-center py-3 mt-4 font-medium text-white bg-black transition-all ${isSubmitting || cartCount === 0
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
                        }`}
                    disabled={isSubmitting || cartCount === 0} // Disable when submitting or cart is empty
                >
                    {isSubmitting ? "Submitting..." : cartCount === 0 ? "Cart is Empty" : "Submit Order"}
                </button>
            </form>

            {status === 'success' && (
                <p className="text-green-500 mt-4" role="alert">Order submitted successfully! We will contact with you soon</p>
            )}
            {status === 'failed' && (
                <p className="text-red-500 mt-4" role="alert">Failed to submit order. Please try again.</p>
            )}

            {/* Cart Summary */}
            <div className="mt-6">
                <h2 className="text-xl font-bold text-black mb-4">Cart Summary</h2>
                {cartItems.map((item, index) => (
                    <div key={index} className="mb-2">
                        <p className="text-black">
                            {item.name} (Size: {item.size}, Color: {item.color}, Qty: {item.quantity}) - L.E{' '}
                            {(item.price * item.quantity).toFixed(2)}
                        </p>
                    </div>
                ))}
                <p className="text-black font-bold">
                    Total: L.E{' '}
                    {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                </p>
            </div>
        </div>
    );
};

export default CheckOut;
