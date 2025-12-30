"use client"

import { useState } from "react";
import { LuFilter } from "react-icons/lu";
import { FeaturedEventCard } from "../ui/FeaturedEventCard";
import { FaRegStar } from "react-icons/fa";

export default function MainSection() {
    const [activeTab, setActiveTab] = useState('all');
    return (
        <div className="">
            {/* Tab Navigation */}
            <div className="pt-14 pb-6 flex gap-3 items-center px-32">
                <LuFilter className="text-[#ad46ff] text-2xl" />

                <div className="h-10 w-px bg-gray-600"></div>

                <div className="flex items-center gap-3">
                    <button onClick={() => setActiveTab("all")} className={`${activeTab === "all" ? "bg-[#0854a7] text-white": "text-[#6f6f6f] border border-gray-200"} tracking-wider py-2.25 px-4 text-lg w-auto min-w-30 cursor-pointer`}>All Events</button>
                    <button onClick={() => setActiveTab("upcoming")} className={`${activeTab === "upcoming" ? "bg-[#0854a7] text-white": "text-[#6f6f6f] border border-gray-200"} tracking-wider py-2.25 px-4 text-lg w-auto min-w-30 cursor-pointer`}>Upcoming</button>
                    <button onClick={() => setActiveTab("past")} className={`${activeTab === "past" ? "bg-[#0854a7] text-white": "text-[#6f6f6f] border border-gray-200"} tracking-wider py-2.25 px-4 text-lg w-auto min-w-30 cursor-pointer`}>Past</button>
                </div>
            </div>

            {/* Event filter count */}
            <p className="text-[#b3b3b3] px-32 text-xl">10 Events found</p>

            {/* Featured Event */}
            <section className="bg-[#0f0f0f] mt-10 px-32 py-14">
                <div className="flex gap-3 items-center mb-8 text-[#0854a7]">
                    <FaRegStar />
                    <h4>FEATURED EVENT</h4>
                </div>

                <FeaturedEventCard 
                    image="/events/afrospook-event-img.png"
                    attendees="10K+"
                    category="FESTIVAL"
                    title="AfroSpook 2025"
                    description="A 3-day celebration of African culture, music, and heritage. Experience the fire, water, rave arena and parade zones."
                    dateRange="Aug 15 - 17, 2025"
                    location="Eko Atlantic City, Lagos - Nigeria"
                    onViewDetails={() => alert("ok")}
                />
            </section>

        </div>
    )
}