import SectionHeader from "@/components/layout/sectionHeader"
import Accordion from "@/components/partners/ui/Accordion"


interface faqDataType{
    _id: string;
    question: string;
    answer: string;
}
export default function EventFAQ({faqData }: {faqData: faqDataType[] }) {
    

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
                {faqData?.length > 0 ? (
                    faqData.map((item) => (
                        <Accordion 
                            key={item._id}
                            accordionTitle={item.question}
                            description={item.answer}
                            className="w-full"
                        />
                    ))
                ) : (
                    <div className="text-center py-12 px-4">
                        <p className="text-gray-500 text-lg">
                            No FAQs available at the moment. Check back soon!
                        </p>
                    </div>
                )}
            </div>

        </div>
    )
}