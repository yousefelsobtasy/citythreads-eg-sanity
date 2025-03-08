'use client';

import { useState } from 'react';
import emailjs from 'emailjs-com';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({ name: '', email: '', subject: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Clear errors as the user types
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Clear previous messages
        setSuccess(false);
        setLoading(true);

        // Validate the form fields
        const newErrors = {};
        if (!formData.name) {
            newErrors.name = 'Name is required.';
        }
        if (!formData.email.match(/^\S+@\S+\.\S+$/)) {
            newErrors.email = 'Invalid email address.';
        }
        if (!formData.subject) {
            newErrors.subject = 'Subject is required.';
        }
        if (!formData.message) {
            newErrors.message = 'Message cannot be empty.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        // EmailJS integration
        emailjs
            .send(
                'service_r4ina0h', // Replace with your EmailJS service ID
                'template_0j7nrfy', // Replace with your EmailJS template ID
                formData,
                't5nEgCzBU4CpX3is5' // Replace with your EmailJS public key
            )
            .then(
                () => {
                    setSuccess(true);
                    setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
                },
                (err) => {
                    console.error('EmailJS Error:', err);
                }
            )
            .finally(() => setLoading(false));
    };

    return (
        <div className="container mx-auto p-4 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-black mb-4 text-center">
                Contact Us
            </h1>
            <p className="text-gray-600 text-center mb-6">
                Let us know your questions or feedback. We'll respond as soon as possible!
            </p>

            <form
                onSubmit={handleSubmit}
                className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
                aria-labelledby="contact-form-heading"
            >
                <div id="contact-form-heading" className="sr-only">
                    Contact form to send questions or feedback via Email.
                </div>

                {/* Name Input */}
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-gray-800 font-semibold mb-2"
                    >
                        Your Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-gray-600'
                            }`}
                        required
                        aria-required="true"
                        aria-label="Your full name"
                    />
                    {errors.name && (
                        <p
                            className="text-red-500 text-sm mt-1"
                            role="alert"
                            aria-live="assertive"
                        >
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Email Input */}
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-gray-800 font-semibold mb-2"
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-gray-600'
                            }`}
                        required
                        aria-required="true"
                        aria-label="Your email address"
                    />
                    {errors.email && (
                        <p
                            className="text-red-500 text-sm mt-1"
                            role="alert"
                            aria-live="assertive"
                        >
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Subject Input */}
                <div className="mb-4">
                    <label
                        htmlFor="subject"
                        className="block text-gray-800 font-semibold mb-2"
                    >
                        Subject
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${errors.subject ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-gray-600'
                            }`}
                        required
                        aria-required="true"
                        aria-label="The subject of your message"
                    />
                    {errors.subject && (
                        <p
                            className="text-red-500 text-sm mt-1"
                            role="alert"
                            aria-live="assertive"
                        >
                            {errors.subject}
                        </p>
                    )}
                </div>

                {/* Message Input */}
                <div className="mb-4">
                    <label
                        htmlFor="message"
                        className="block text-gray-800 font-semibold mb-2"
                    >
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                        required
                        aria-required="true"
                        aria-label="Your message or question"
                    ></textarea>
                </div>

                {/* Submit Button */}
                <div className="mb-4">
                    <button
                        type="submit"
                        className={`w-full py-3 bg-black text-white font-medium rounded hover:bg-gray-800 transition duration-200 
                        ${loading ? 'opacity-75' : ''}`}
                        disabled={loading}
                        aria-label={loading ? 'Sending your message...' : 'Send your message'}
                    >
                        {loading ? 'Sending...' : 'Send Message'}
                    </button>
                </div>

                {/* Success Message */}
                {success && (
                    <p
                        className="text-green-600 text-center font-semibold"
                        role="status"
                        aria-live="polite"
                    >
                        Your message has been sent successfully!
                    </p>
                )}
            </form>
        </div>
    );
};

export default Contact;
