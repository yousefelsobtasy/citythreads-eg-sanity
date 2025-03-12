"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllCollections } from "../../../sanity/sanity-utils";
import { motion } from "framer-motion";

const CollectionList = () => {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const data = await getAllCollections();
                setCollections(data);
            } catch (err) {
                console.error("Error fetching collections:", err);
                setError("Unable to load collections at this time.");
            } finally {
                setLoading(false);
            }
        };

        fetchCollections();
    }, []);

    if (loading) {
        return (
            <div className="w-full h-40 flex items-center justify-center bg-gray-50">
                <p className="text-gray-500 animate-pulse">Loading collections...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-40 flex items-center justify-center bg-gray-50">
                <p className="text-center text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="w-full border-b border-gray-200 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
                    Explore Our Collections
                </h2>
                <div className="flex overflow-x-auto space-x-4 sm:space-x-6 p-2">
                    {collections.filter((collection) => collection.slug !== 'landing').map((collection) => (
                        <Link
                            key={collection._id}
                            href={`/list?coll=${collection.slug}`}
                            className="flex-shrink-0 text-center group w-32 sm:w-40"
                        >
                            <motion.div
                                className="w-full h-32 sm:h-40 relative rounded-lg overflow-hidden shadow-lg bg-white"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Image
                                    src={collection.collectionImage || "/collection-default.png"}
                                    alt={collection.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="group-hover:opacity-90 transition-opacity duration-300"
                                />
                            </motion.div>

                            <p className="mt-2 sm:mt-4 text-sm sm:text-md font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                                {collection.title}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CollectionList;
