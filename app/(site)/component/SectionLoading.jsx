"use client";
import { motion } from "framer-motion";

const SectionLoading = () => {
    return (
        <div
            className="flex flex-col items-center justify-center w-full py-12 bg-gray-100 rounded-lg shadow"
            aria-live="polite"
        >
            <div className="flex space-x-2">
                {[0, 1, 2].map((index) => (
                    <motion.div
                        key={index}
                        className="w-4 h-4 bg-gray-800 rounded-full"
                        initial={{ y: 0 }}
                        animate={{ y: [-5, 5, -5] }}
                        transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.2,
                        }}
                    />
                ))}
            </div>
            <h2 className="mt-4 text-sm sm:text-lg font-medium text-gray-700">Loading section...</h2>
        </div>
    );
};

export default SectionLoading;
