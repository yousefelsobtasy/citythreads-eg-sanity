'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import emailjs from "emailjs-com";
import useCartStore from "../store/cartStore";

const CheckOut = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        postalCode: '',
        email: '',
    });

    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { cartItems, cartCount, clearCart } = useCartStore();

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

        const productDetails = cartItems
            .map((item) => `\n- ${item.name} (Size: ${item.size}, Color: ${item.color}, Qty: ${item.quantity}, Price per one: L.E ${item.price}, Total: L.E ${(item.price * item.quantity).toFixed(2)})`)
            .join("\n");

        const templateParams = {
            name: formData.name,
            phone: formData.phone,
            address: formData.address,
            postalCode: formData.postalCode,
            email: formData.email,
            paymentMethod: "Cash on Delivery",
            productDetails: productDetails,
            total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2),
        };

        emailjs
            .send(
                'service_n5gkyce',
                'template_z4zfhb9',
                templateParams,
                'J8k4fpnhHH0oX1QQP'
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
                    clearCart();

                    setTimeout(() => {
                        router.push("/");
                    }, 1000)
                },
                (error) => {
                    console.error('FAILED...', error);
                    setStatus('failed');
                }
            )
            .finally(() => setIsSubmitting(false));
    };

    return (
        <div className="container mx-auto p-6 max-w-3xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Checkout</h1>

            {/* Checkout Form */}
            <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 grid gap-4">
                {Object.keys(errors).length > 0 && (
                    <p className="text-red-600 text-center font-semibold">{errors.cart || ''}</p>
                )}

                <div>
                    <label className="block text-gray-700 font-medium">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 border focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        placeholder="01XXXXXXXXX"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-3 border focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Address</label>
                    <textarea
                        name="address"
                        placeholder="Enter your address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full p-3 border focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Postal Code</label>
                    <input
                        type="text"
                        name="postalCode"
                        placeholder="5-digit postal code"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="w-full p-3 border focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                    {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="example@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <button
                    type="submit"
                    className="bg-gray-600 text-white font-semibold p-3 mt-3 hover:bg-gray-700 transition duration-300 disabled:bg-gray-400"
                    disabled={isSubmitting || cartCount === 0}
                >
                    {isSubmitting ? "Submitting..." : "Submit Order"}
                </button>

                {status === 'success' && <p className="text-green-500 text-center">Order submitted successfully!</p>}
                {status === 'failed' && <p className="text-red-500 text-center">Failed to submit order. Please try again.</p>}
            </form>

            {/* Cart Summary Section */}
            <div className="bg-gray-100 p-6 mt-6 shadow-md">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Cart Summary</h2>

                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 border-b last:border-none">
                            {/* Product Image */}
                            <img src={item.imgUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md shadow-md" />

                            {/* Product Details */}
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                <p className="text-sm text-gray-600">Size: <span className="font-medium">{item.size}</span></p>
                                <p className="text-sm text-gray-600">Color: <span className="font-medium">{item.color}</span></p>
                                <p className="text-sm text-gray-600">Quantity: <span className="font-medium">{item.quantity}</span></p>

                                {/* Pricing */}
                                <div className="mt-2">
                                    <span className="text-lg font-bold text-red-600">L.E {(item.price * item.quantity).toFixed(2)}</span>
                                    {item.originalPrice > item.price && (
                                        <span className="text-sm text-gray-500 line-through ml-2">L.E {(item.originalPrice * item.quantity).toFixed(2)}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600 text-center">Your cart is empty.</p>
                )}

                {/* Total Price */}
                {cartItems.length > 0 && (
                    <div className="mt-4 flex justify-between font-semibold text-lg border-t pt-4">
                        <span>Total:</span>
                        <span className="text-red-600">L.E {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckOut;
