import Link from "next/link";
import Image from "next/image";
export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10">
            <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
                <div className="h-24 flex items-center justify-between">

                    {/* Logo */}
                    <div className="flex items-center">
                        <Image
                            src="/images/brand/logo.png"
                            alt="Forest Farmer Coffee Roasters"
                            width={70}
                            height={70}
                            priority
                        />
                    </div>

                    {/* Navigation */}
                    <div className="hidden md:flex items-center gap-10 text-sm tracking-wide">
                        <Link href="/journal">Journal</Link>
                        <Link href="/gallery">Gallery</Link>
                        <Link href="/visit">Visit</Link>
                    </div>

                </div>
            </div>
        </nav>
    );
}