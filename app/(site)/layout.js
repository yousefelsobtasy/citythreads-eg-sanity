import "./globals.css";
import Navbar from "./component/Navbar";
import Cart from "./component/Cart";
import Footer from "./component/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>City Threads</title>
        <meta name="description" content="Next Generation of Clothing" />
        <link rel="icon" href="/favicon.png" />
      </head>
      <body>
        <Navbar />
        <Cart />
        <main className="mt-[68.5px] lg:mt-[88.5px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
