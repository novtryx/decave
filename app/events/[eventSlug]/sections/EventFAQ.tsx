import SectionHeader from "@/components/layout/sectionHeader"
import Accordion from "@/components/partners/ui/Accordion"

export default function EventFAQ() {
    const questionData = [
        {
            id: 1,
            question: "What is the name of the event?",
            answer: "DeCave Loud Room"
        },
        {
            id: 2,
            question: "Who are the sponsors of the event",
            answer: "DeCave entertainment in partnership with mavin company"
        }
    ]

    const eventTitle = "DeCave"
    return (
        <div className="px-4 lg:px-16 py-10">
            <SectionHeader 
                align="center"
                title="Questions? We've got you covered"
                titleColor="#cca33a"
                description={`From tickets to venue details, find answers to the most common questions about ${eventTitle}`}
            />

            <div className="flex flex-col gap-4 items-center justify-center w-full mx-auto max-w-3xl">
                {questionData.map((item) => (
                    <Accordion 
                        key={item.id}
                        accordionTitle={item.question}
                        description={item.answer}
                        className="w-full"
                    />
                ))}
            </div>

        </div>
    )
}