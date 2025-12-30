"use client"

import { useState } from "react";
import { LuFilter } from "react-icons/lu";
import { FeaturedEventCard } from "../ui/FeaturedEventCard";
import { FaRegStar } from "react-icons/fa";
import { pastEventsData, upcomingEventsData } from "@/lib/data";
import ImageCard from "@/components/layout/ImageCard";
import { GoPeople } from 'react-icons/go'
import ViewMoreButton from "@/components/layout/ViewMoreButton";
import SectionHeader from "@/components/layout/sectionHeader";
import EventCallToAction from "../ui/EventCallToActionCard";

export default function MainSection() {
    const [activeTab, setActiveTab] = useState('all');
    return (
        <div className="">
            {/* Tab Navigation */}
            <div className="pt-14 pb-6 flex gap-3 items-center px-6 lg:px-32">
                <LuFilter className="text-[#ad46ff] text-2xl" />

                <div className="h-10 w-px bg-gray-600"></div>

                <div className="flex items-center gap-3">
                    <button onClick={() => setActiveTab("all")} className={`${activeTab === "all" ? "bg-[#0854a7] text-white": "text-[#6f6f6f] border border-gray-200"} tracking-wider py-2.25 px-4 text-lg w-auto min-w-30 cursor-pointer`}>All Events</button>
                    <button onClick={() => setActiveTab("upcoming")} className={`${activeTab === "upcoming" ? "bg-[#0854a7] text-white": "text-[#6f6f6f] border border-gray-200"} tracking-wider py-2.25 px-4 text-lg w-auto min-w-30 cursor-pointer`}>Upcoming</button>
                    <button onClick={() => setActiveTab("past")} className={`${activeTab === "past" ? "bg-[#0854a7] text-white": "text-[#6f6f6f] border border-gray-200"} tracking-wider py-2.25 px-4 text-lg w-auto min-w-30 cursor-pointer`}>Past</button>
                </div>
            </div>

            {/* Event filter count */}
            <p className="text-[#b3b3b3] px-6 lg:px-32 text-xl">10 Events found</p>

            {/* Featured Event */}
            <section className="bg-[#0f0f0f] mt-10 px-6 lg:px-32 py-14">
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

            {/* Upcoming events */}
            <section className="bg-[#0f0f0f] mt-0 border-t border-[#656161] px-6 lg:px-32 py-14">
                

                <SectionHeader 
                    title="Upcoming Events"
                    description="Don't miss out these upcoming experiences"
                />

                <div className="my-14 grid grid-cols 1 lg:grid-cols-3 gap-6">
                    {upcomingEventsData.map((item) => (
                        <ImageCard 
                            key={item.id}
                            image={item.image}
                            title="Afro Pulse Sessions"
                            badge={{ text: item.category, bgColor: item.category === "SOLD OUT" ? "#ef4444" : "#EEF6FFCC", textColor: item.category === "SOLD OUT" ? "#fff" :  "#001D3D"}}
                            peopleCount={item.peopleCount}
                            icon={GoPeople}
                            date={item.date}
                            location={item.location}
                            buttonText={item.buttonText}
                            buttonVariant="outline"
                            onButtonClick={() => console.log('View event')}
                        />
                    ))}
                </div>


            {/* View All Events */}
            <ViewMoreButton 
                text="View All Events"
            />
            </section>

         {/* Past events */}
            <section className="bg-[#0f0f0f] mt-0 border-t border-[#656161] px-6 lg:px-32 py-14">
                <SectionHeader 
                    title="Past Events"
                    description="Relive the moments from our previous experiences"
                />

                <div className="my-14 grid grid-cols 1 lg:grid-cols-3 gap-6">
                    {pastEventsData.map((item) => (
                        <ImageCard 
                            key={item.id}
                            image={item.image}
                            title="Afro Pulse Sessions"
                            badge={{ text: item.category, bgColor: item.category === "SOLD OUT" ? "#ef4444" : "#EEF6FFCC", textColor: item.category === "SOLD OUT" ? "#fff" :  "#001D3D"}}
                            peopleCount={item.peopleCount}
                            icon={GoPeople}
                            date={item.date}
                            location={item.location}
                            buttonText={item.buttonText}
                            buttonVariant="outline"
                            onButtonClick={() => console.log('View event')}
                        />
                    ))}
                </div>


                {/* View All Events */}
                <ViewMoreButton 
                    text="View All Events"
                />
            </section>

            {/* Call To Action */}
            {/* <section>
                <EventCallToAction
                    title="Want to host your event with deCave?"
                    description="Partner with us to create unforgettable cultural experiences"
                    buttonText="Partner With Us"
                />
            </section> */}

        </div>
    )
}