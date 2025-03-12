'use client'
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import Menu from "./Menu"
import dynamic from "next/dynamic"
import NavIcons from "./NavIcons"
import { usePathname } from "next/navigation"

// const NavIcons = dynamic(() => import('./NavIcons'), { ssr: false })

const Navbar = () => {
    const [lastScrollY, setLastScrollY] = useState(0);
    const [show, setShow] = useState(true);


    // const handleScroll = () => {
    //     const currentScrollY = window.scrollY;
    //     if (currentScrollY > lastScrollY) {
    //         // Hide on scroll down
    //         setShow(false);
    //     } else {
    //         // Show on scroll up
    //         setShow(true);
    //     }
    //     setLastScrollY(currentScrollY);
    // };

    // useEffect(() => {
    //     window.addEventListener("scroll", handleScroll);
    //     return () => window.removeEventListener("scroll", handleScroll);
    // }, [lastScrollY]);

    return (
        <header
            className={`z-50 fixed top-0 left-0 w-full bg-white shadow-md 
                transition-transform duration-300 ${show ? "translate-y-0" : "-translate-y-full"
                }`}>
            <div className="relative px-[1.875rem] md:px-[2rem] py-[10px] lg:py-[20px]
        flex items-center justify-between gap-8">
                {/* RIGHT */}
                <div className="w-1/3">
                    <Menu />
                </div>
                {/* MIDDLE  */}
                <div className="w-1/3 flex justify-center">
                    <h1 className="flex items-center justify-center">
                        <Link href={`/`} className="p-[7.5px] curser-pointer inline-block text-center">
                            <Image src="/logo.png" alt="logo" width={90} height={24} loading="eager"
                                style={{ maxWidth: 'none' }}
                            />
                        </Link>
                    </h1>
                </div>
                {/* LEFT  */}
                <NavIcons />
            </div>
        </header>
    )
}

export default Navbar