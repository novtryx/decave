interface ContactCardProps {
    title: string;
    content: string;
    subtext: string;
}

export default function ContactCard({ title, content, subtext }:ContactCardProps) {
    return (
        <div className="bg-[#0f0f0f] p-4 rounded-2xl flex flex-col gap-4 border border-[#2a2a2a]">
            <h4 className="text-[#b3b3b3]">{title}</h4>

            <p className="text-[#cca33a]">{content}</p>

            <p className="text-[#b3b3b3] text-sm">{subtext}</p>
        </div>
    )
}