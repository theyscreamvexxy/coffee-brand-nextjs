"use client";

import Image from "next/image";

export default function LogoLoader() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#7A8D7A]">
            <div className="relative w-[180px] h-[260px]">

                {/* White logo */}
                <Image
                    src="/images/brand/logo.png"
                    alt="Logo"
                    fill
                    className="object-contain"
                    priority
                />

            </div>
        </div>
    );
}