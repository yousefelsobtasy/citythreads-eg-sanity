'use client';

import "./globals.css";
import Navbar from "./component/Navbar";
import Cart from "./component/Cart";
import Footer from "./component/Footer";
import Loading from "./component/Loading";
import useLoadingStore from "./store/useLoadingStore";
import useNewCartStore from "./store/newCartStore";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const isLoading = useLoadingStore((state) => state.isLoading);
  const { initializeCart, isCartOpen } = useNewCartStore();
  const pathname = usePathname();

  useEffect(() => {
    initializeCart();
  }, [initializeCart]);

  return (
    <html lang="en">
      <head>
        {/* Define meta tags and other head elements here */}
        <title>City Threads</title>
        <meta name="description" content="Next Generation of Clothing" />
        <meta http-equiv="X-UA-Compatible" content="IE=EDGE" />
        <link rel="icon" href="/favicon.png" />
      </head>
      <body>
        <Navbar />
        {isCartOpen &&
          <Cart />}
        {isLoading ? (
          <Loading />
        ) : (
          <main className={"" + (!/^\/admin/.test(pathname) && " mt-[68.5px] lg:mt-[88.5px]")}>{children}</main>
        )}
        <Footer />
      </body>
    </html>
  );
}
