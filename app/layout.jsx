import "../styles/globals.css";
import { Inter, Manrope } from "next/font/google";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope",
});

export const metadata = {
    title: "Forest Farmer Coffee Roasters",
    description: "Premium specialty coffee experience",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${manrope.variable}`}>
                <Navbar />
                {children}
            </body>
        </html>
    );
}