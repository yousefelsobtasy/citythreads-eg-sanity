

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <title>City Threads</title>
                <link rel="icon" href="/favicon.png" />
            </head>
            <body>
                <main >{children}</main>
            </body>
        </html>
    );
}
