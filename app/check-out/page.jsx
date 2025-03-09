'use client';

import { useEffect, useState } from 'react';
import emailjs from 'emailjs-com';
import cartStore from "../store/cartStore";

const CheckOut = () => {
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
    const { cartItems, cartCount, clearCart } = cartStore();

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
            .join('\n');

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
                },
                (error) => {
                    console.error('FAILED...', error);
                    setStatus('failed');
                }
            )
            .finally(() => setIsSubmitting(false));
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold text-black mb-6">Last Step</h1>
            <form onSubmit={handleSubmit} className="grid gap-6">
                <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
                <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
                {errors.phone && <p className="text-red-500">{errors.phone}</p>}
                <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} required></textarea>
                {errors.address && <p className="text-red-500">{errors.address}</p>}
                <input type="text" name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} required />
                {errors.postalCode && <p className="text-red-500">{errors.postalCode}</p>}
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
                <button type="submit" className="bg-black text-white p-3" disabled={isSubmitting || cartCount === 0}>{isSubmitting ? "Submitting..." : "Submit Order"}</button>
            </form>
            {status === 'success' && <p className="text-green-500">Order submitted successfully!</p>}
            {status === 'failed' && <p className="text-red-500">Failed to submit order. Please try again.</p>}
            <h2>Cart Summary</h2>
            {cartItems.map((item, index) => (
                <p key={index}>{item.name} - L.E {(item.price * item.quantity).toFixed(2)}</p>
            ))}
            <p>Total: L.E {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</p>
        </div>
    );
};

export default CheckOut;
