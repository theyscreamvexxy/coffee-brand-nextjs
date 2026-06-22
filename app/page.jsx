import HeroFrameSequence from "@/components/hero/HeroFrameSequence";
import BrandPhilosophy from "@/components/sections/BrandPhilosophy";
import SignatureCollection from "@/components/sections/SignatureCollection";
import JourneySection from "@/components/sections/JourneySection";
import OriginStory from "@/components/sections/OriginStory";
import Testimonials from "@/components/sections/Testimonials";
import VisualJournal from "@/components/sections/VisualJournal";

export default function Home() {
    return (
        <main>
            <HeroFrameSequence />
            <BrandPhilosophy />
            <SignatureCollection />
            <JourneySection />
            <OriginStory />
            <Testimonials />
            <VisualJournal />
        </main>
    );
}