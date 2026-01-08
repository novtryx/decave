import HeaderSection from "@/components/events/sections/HeaderSection";
import MainSection from "@/components/events/sections/MainSection";

export default function Events() {
    return (
        <div>
            <HeaderSection 
                title="Events"
                description="Discover immersive experiences hosted by deCave. Culture, music, and community - all in one place"
                label="WHAT WE HAVE FOR YOU"
                backgroundImage="/events/hero-img.jpg"
            />
            <MainSection />
        </div>
    )
}