'use client'
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { SlMenu } from "react-icons/sl";
import { TfiClose } from "react-icons/tfi";
const Menu = () => {
    const headHeight = '68.5px'
    const [open, setOpen] = useState(false)
    const links = [
        {
            id: 1,
            name: 'Home',
            href: '/'
        },
        {
            id: 2,
            name: 'All Products',
            href: '/list'
        },
        {
            id: 3,
            name: 'Contact',
            href: '/contact'
        }
    ]
    return (
        <div>
            {open ? <TfiClose
                className="cursor-pointer w-[1.3rem] h-[1.3rem]"
                onClick={() => setOpen(prev => !prev)}
            />
                :
                <SlMenu
                    className="cursor-pointer w-[1.3rem] h-[1.3rem]"
                    onClick={() => setOpen(prev => !prev)}
                />}

            <nav className={`absolute top-[var(--headHeight)]
            bg-white w-full md:w-[399px] h-[calc(100vh-var(--headHeight))] 
            py-[1rem] flex flex-col gap-[.2rem] z-10 text-xl links` + (open ? ' active no-scroll' : '')}
                style={{ '--headHeight': headHeight }}
            >
                {
                    links.map(link => (
                        <div className="link-hover">
                            <Link
                                key={link.id}
                                className={`flex items-center py-[.5rem] 
                            px-[2rem] text-[1.2rem]`}
                                href={link.href}
                                onClick={() => setOpen(false)}
                            >
                                {link.name}
                            </Link>
                        </div>
                    ))
                }
                {/* <div className="link-hover md:hidden">
                    <Link
                        className={`flex items-center py-[.5rem] px-[2rem] text-[1.2rem]`}
                        href={`/`}>
                        {'Login'}
                    </Link>
                </div> */}
            </nav>
            {
                open && (
                    <>
                        <div
                            key={'menuBackground'}
                            className={`hidden md:block absolute 
                                left-0 top-[var(--headHeight)] 
                                w-full h-[calc(100vh-var(--headHeight))] z-9`}
                            style={{ backgroundColor: '#12121280' }}
                            onClick={() => setOpen(false)}
                        ></div>
                    </>
                )
            }
        </div >
    )
}

export default Menu

