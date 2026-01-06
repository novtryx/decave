import ContactForm from "@/components/contact/sections/ContactForm";
import HeaderSection from "@/components/events/sections/HeaderSection";

export default function Contact() {
    return (
        <div>
            <HeaderSection 
                backgroundImage="/events/hero-img.png"
                label="GET IN TOUCH"
                title="We're Here to Help"
                description="Whether you're a journalist, potential partner, or attendee, we'd love to hear from you."
            />
            {/* Contact Form */}
            <ContactForm />
        </div>
    )
}