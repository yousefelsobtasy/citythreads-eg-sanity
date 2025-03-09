'use client';

import Link from "next/link";
import SearchBar from "./SearchBar";
import { useState, useEffect } from "react";
import { IoCartOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { IoSearchOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import useNewCartStore from "../store/cartStore"

const NavIcons = () => {
    const [isOpen, setIsOpen] = useState('');
    // const [isLoading, setIsLoading] = useState(false);

    const { cartCount, setIsCartOpen } = useNewCartStore()


    useEffect(() => {
        if (isOpen === 'cart') {
            setIsCartOpen(true)
        }
    }, [isOpen])

    return (
        <>
            <div className="w-1/3 flex items-center justify-end gap-4 text-[1.7rem]">
                <button
                    className="flex items-center cursor-pointer"
                    onClick={() => {
                        setIsOpen(isOpen === 'search' ? '' : 'search')
                    }}
                    aria-label="Open search bar"
                >
                    <IoSearchOutline />
                </button>
                {/* <button
                    className="cursor-pointer flex items-center relative"
                    onClick={handleProfile}
                    aria-label="Go to account page"
                >
                    <VscAccount />
                    {(isOpen === 'profile') && (
                        <div className={` absolute 
                    top-[55px] lg:top-[65px] left-[-20px] z-20 text-sm 
                    rounded-md bg-white p-3 shadow-[0_4px_8px_rgba(0,0,0,0.2)] 
                    profilePopup`}>
                            <div
                                className="mt-2 cursor-pointer"
                                onClick={handleLogout}
                            >{isLoading ? 'Logging out' : 'Logout'}</div>
                        </div>
                    )}
                </button> */}
                <div
                    className="cursor-pointer flex items-center relative"
                    onClick={_ => {
                        setIsOpen(isOpen === 'cart' ? '' : 'cart')
                    }}
                    role="button"
                    tabIndex={0}
                >
                    <IoCartOutline />
                    {cartCount > 0 && <div
                        id="cartCount"
                        className={`absolute top-[-.2rem] right-[-.2rem] w-[1rem] h-[1rem] p-[.2rem] text-[.8rem]
                                bg-lama text-white rounded-full flex justify-center items-center`}
                        aria-live="polite"
                    >
                        {cartCount}
                    </div>}
                    {/* {(isOpen === 'cart') &&
                         <CartModal />
                    } */}
                </div>
            </div>
            {/* Search form */}
            <SearchBar
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                onClick={_ => {
                    setIsOpen(isOpen === 'search' ? '' : 'search')
                }}
            />
            {/* Overlay */}
            <div
                className={`${(isOpen === 'search') ? "no-scroll" : "hidden"} absolute top-[68.5px] left-0 w-full h-[calc(100vh-68.5px)]`}
                style={{ backgroundColor: "#12121280" }}
                onClick={() => setIsOpen('')}
                aria-hidden={!(isOpen === 'search')}
            ></div>
        </>
    );
};

export default NavIcons;
