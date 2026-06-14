import HeroFrameSequence from "@/components/hero/HeroFrameSequence";
import BrandPhilosophy from "@/components/sections/BrandPhilosophy";
import SignatureCollection from "@/components/sections/SignatureCollection";
import JourneySection from "@/components/sections/JourneySection";
import OriginStory from "@/components/sections/OriginStory";

export default function Home() {
    return (
        <main>
            <HeroFrameSequence />
            <BrandPhilosophy />
            <SignatureCollection />
            <JourneySection />
            <OriginStory />
        </main>
    );
}