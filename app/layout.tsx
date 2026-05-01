import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const satoshi = localFont({
    src: "./fonts/Satoshi-Variable.woff2",
    variable: "--font-satoshi",
    display: "swap",
});

const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope",
    display: "swap",
});

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
  title: "ReyX Hub",
  description: "High-quality Roblox scripts",
  other: {
    cryptomus: "fa2d158e",
  },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} ${satoshi.variable} ${manrope.variable} h-full antialiased scroll-smooth`}
        >
            <body className="">


                <main className="">
                    {children}
                </main>
            </body>
        </html>
    );
}