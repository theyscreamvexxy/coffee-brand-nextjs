import "../styles/globals.css";
import {
    Inter,
    Manrope,
    Cormorant_Garamond,
} from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import ScrollProgressBar from "@/components/layout/ScrollProgressBar";
import CustomCursor from "@/components/layout/CustomCursor";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope",
});

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    variable: "--font-cormorant",
});

export const metadata = {
    title: "Forest Farmer Coffee Roasters",
    description: "Premium specialty coffee experience",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${manrope.variable} ${cormorant.variable}`}>
                <ScrollProgressBar />
                <CustomCursor />
                <Navbar />
                <SmoothScrollProvider>
                    {children}
                </SmoothScrollProvider>
            </body>
        </html>
    );
}