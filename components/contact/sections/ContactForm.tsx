import SectionHeader from "@/components/layout/sectionHeader";
import { MdOutlineMessage } from "react-icons/md";

export default function ContactForm() {
    return (
        <section>
            <SectionHeader 
                label="SEND US A MESSAGE"
                title="Contact Form"
                description="Fill out the form and we'll get back to you within 24 - 48 hours."
                icon={MdOutlineMessage}
            />
        </section>
    )
}