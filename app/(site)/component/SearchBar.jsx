'use client';

import { TfiClose } from "react-icons/tfi";
import { IoSearchOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SearchBar = ({ isOpen, setIsOpen }) => {
    const router = useRouter();
    const [searchInput, setSearchInput] = useState("");

    // Auto-focus input when the search bar is opened
    useEffect(() => {
        if ((isOpen === 'search')) {
            document.querySelector('#search').focus();
        }
    }, [(isOpen === 'search')]);

    function handleSearch(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const searchTerm = formData.get('search');

        if (searchTerm) {
            router.push(`/list?search=${searchTerm}`);
            setIsOpen('');
            setSearchInput('');
        }
    }

    return (
        <form
            className={`searchBar ${(isOpen === 'search') ? "active" : ""} w-full h-[68.5px] lg:h-[88.75px] 
            absolute left-0 bg-white flex items-center 
            justify-center gap-5 z-10`}
            role="search"
            onSubmit={handleSearch}
        >
            <label htmlFor="search" className="sr-only">
                Search:
            </label>
            <input
                className="w-[50%] h-[2.5rem] border-[1px] border-gray-700 rounded-[.5rem] px-2"
                type="text"
                id="search"
                name="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search for products (by product's name or part of it)"
                aria-label="Search products"
            />
            <button
                type="submit"
                aria-label="Search"
            >
                <IoSearchOutline className="w-[1.5rem] h-[1.5rem]" />
            </button>
            <button
                type="button"
                className="cursor-pointer"
                onClick={(e) => {
                    e.preventDefault();
                    setIsOpen('');
                }}
                aria-label="Close search bar"
                aria-expanded={(isOpen === 'search')}
            >
                <TfiClose className="w-[1.3rem] h-[1.3rem]" />
            </button>
        </form>
    );
};

export default SearchBar;
