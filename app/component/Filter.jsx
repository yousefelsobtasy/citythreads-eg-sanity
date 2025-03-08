'use client';

import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Filter = () => {
    const selectors = [
        // {
        //     name: 'type',
        //     options: [
        //         { value: 't-shirt', label: 'T-shirt' },
        //         { value: 'sweetpants', label: 'SweetPants' },
        //     ],
        // },
        {
            name: 'color',
            options: [
                { value: 'red', label: 'Red' },
                { value: 'blue', label: 'Blue' },
                { value: 'green', label: 'Green' },
            ],
        },
        {
            name: 'size',
            options: [
                { value: 'small', label: 'Small' },
                { value: 'medium', label: 'Medium' },
                { value: 'large', label: 'Large' },
            ],
        },
    ];

    const [filterState, setFilterState] = useState({
        type: '',
        color: '',
        size: '',
        min: '',
        max: '',
        sort: '',
    });

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    // const handlePathname = ({ name, value }) => {
    //     const params = new URLSearchParams(searchParams);
    //     if (value) {
    //         params.set(name, value);
    //     } else {
    //         params.delete(name);
    //     }
    //     replace(`${pathname}?${params.toString()}`);
    // }

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilterState((prevState) => ({ ...prevState, [name]: value }));
        console.log(filterState);

        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set(name, value);
        } else {
            params.delete(name);
        }
        replace(`${pathname}?${params.toString()}`);
    };

    const handleMaxAndMinChange = (e) => {
        const { name, value } = e.target;
        setFilterState((prevState) => ({ ...prevState, [name]: value }));
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {/* Dynamic Selectors */}
            {selectors.map((selector) => (
                <div key={selector.name} className="flex flex-col">
                    <label htmlFor={selector.name} className="text-gray-700 font-medium mb-1">
                        {selector.name.charAt(0).toUpperCase() + selector.name.slice(1)}
                    </label>
                    <select
                        id={selector.name}
                        name={selector.name}
                        value={filterState[selector.name]}
                        onChange={handleFilterChange}
                        className="w-full py-2 px-4 rounded-lg text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">{`Select ${selector.name}`}</option>
                        {selector.options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            ))}

            {/* Price Range Inputs */}
            <div className="flex flex-col">
                <label htmlFor="min" className="text-gray-700 font-medium mb-1">Min Price</label>
                <input
                    type="number"
                    id="min"
                    name="min"
                    value={filterState.min}
                    onBlur={handleFilterChange}
                    onChange={handleMaxAndMinChange}
                    placeholder="Min price"
                    inputMode="numeric"
                    className="w-full py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="max" className="text-gray-700 font-medium mb-1">Max Price</label>
                <input
                    type="number"
                    id="max"
                    name="max"
                    value={filterState.max}
                    onBlur={handleFilterChange}
                    onChange={handleMaxAndMinChange}
                    placeholder="Max price" inputMode="numeric"
                    className="w-full py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Sort By */}
            <div className="flex flex-col">
                <label htmlFor="sort" className="text-gray-700 font-medium mb-1">Sort By</label>
                <select
                    id="sort"
                    name="sort"
                    value={filterState.sort}
                    onChange={handleFilterChange}
                    className="w-full py-2 px-4 rounded-lg text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Sort By</option>
                    <option value="asc-price">Price (Low to High)</option>
                    <option value="desc-price">Price (High to Low)</option>
                    <option value="asc-lastUpdated">Newest</option>
                    <option value="desc-lastUpdated">Oldest</option>
                </select>
            </div>
        </div>
    );
};

export default Filter;
