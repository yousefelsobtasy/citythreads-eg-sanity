import Link from 'next/link'
const Footer = () => {
    return (
        <footer className='pt-[30px] pb-[27px] md:pt-[40px] md:pb-[36px] border-t-[1px] border-grey'>
            <div className='footerContentTop pb-[30px] px-[40px] md:p-[50px] md:pt-0 border-b-[1px] border-grey'>
                <h2 className='arial text-[1.5rem] mb-[20px]'>
                    Quick Links
                </h2>
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/list">All Collections</Link>
                    </li>
                    <li>
                        <Link href="/contact">Contact</Link>
                    </li>
                </ul>
            </div>
            <div className='footerContentBottom flex items-center justify-center px-[15px] pt-[27px] md:px-[40px] md:pt-[40px]'>
                <p className='uppercase text-[.8rem] '>© 2023 City Threads | All rights reserved</p>
            </div>
        </footer>
    )
}

export default Footer