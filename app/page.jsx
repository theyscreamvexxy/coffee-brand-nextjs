import HeroFrameSequence from "@/components/hero/HeroFrameSequence";
import BrandPhilosophy from "@/components/sections/BrandPhilosophy";
import SignatureCollection from "@/components/sections/SignatureCollection";

export default function Home() {
    return (
        <main>
            <HeroFrameSequence />
            <BrandPhilosophy />
            <SignatureCollection />
        </main>
    );
}