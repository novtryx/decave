// "use client";

// import { use } from "react";
// import ImageSlider from "@/components/events/event/ImageSlider";
// import { FeaturedEventCard } from "@/components/events/ui/FeaturedEventCard";
// import Button from "@/components/layout/Button";
// import CardWithoutImage from "@/components/layout/CardWithoutImage";
// import { CountdownTimer } from "@/components/layout/CountdownTimer";
// import ImageFeatureTimeline from "@/components/layout/ImageFeatureTimeline";
// import SectionHeader from "@/components/layout/sectionHeader";
// import { TicketCard } from "@/components/layout/TicketCard";
// import {
//   afroTicketData,
//   contactData,
//   encouragedItems,
//   entryRequirements,
//   features,
//   notAllowedItems,
//   notToleratedItems,
//   recommendedItems,
//   safetyData,
//   slides,
// } from "@/lib/data";
// import Image from "next/image";
// import { BsStars } from "react-icons/bs";
// import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
// import { LuTicket } from "react-icons/lu";
// import RecommendedList from "@/components/events/event/RecommendList";
// import ContactCard from "@/components/events/event/ContactCard";
// import CallToAction from "@/components/layout/CallToAction";
// import { GoDotFill } from "react-icons/go";
// import { GrLocation } from "react-icons/gr";


// const eventDate = new Date("2026-08-15T00:00:00");

// export default function EventPage({ params }: { params: Promise<{ id: string }> }) {
//    const { id } = use(params);


//    const handleTicketPurchase = (ticket: typeof afroTicketData[0]) => {
//     // Store ticket data in sessionStorage before navigation
//     sessionStorage.setItem('selectedTicket', JSON.stringify({
//       ...ticket,
//       eventId: id, // Now using the unwrapped id
//       eventName: 'AfroSpook 2025',
//       eventDate: eventDate.toISOString(),
//       eventLocation: 'Eko Atlantic City, Lagos - Nigeria'
//     }));
//   };


//   return (
//     <div className="min-h-screen bg-black text-white">
//       {/* Header Section */}
//       <section className="relative px-4 sm:px-6 lg:px-16 w-full pt-24 sm:pt-32 lg:pt-40 flex flex-col gap-4 sm:gap-6 justify-center items-start h-auto min-h-screen overflow-hidden">
//         {/* Background blur effects - adjusted for mobile */}
//         <div className="absolute top-0 left-0 w-60 h-60 sm:w-80 sm:h-80 bg-linear-to-r bg-[#56410C] to-[#001D3D] rounded-full opacity-100 blur-[60px]"></div>
//         <div className="absolute top-[30%] right-0 w-72 h-72 sm:w-96 sm:h-96 bg-linear-to-tl from-[#64a9f2] via-[#80682e] to-[#ddad31] rounded-full opacity-100 blur-[100px] transform -translate-y-1/2"></div>

//         <div className="flex justify-left z-10">
//           <h3 className="text-sm sm:text-base">
//             Events / <span className="text-[#cca33a]">Afrospook 2025</span>
//           </h3>
//         </div>

//         <div className="w-full z-10">
//           <FeaturedEventCard
//             image="/events/afrospook-event-img.png"
//             category="FESTIVAL"
//             title="AfroSpook 2025"
//             eventDate={eventDate}
//             description="A 3-day celebration of African culture, music, and heritage. Experience the fire, water, rave arena and parade zones."
//             dateRange="Aug 15 - 17, 2025"
//             location="Eko Atlantic City, Lagos - Nigeria"
//             onViewDetails={() => console.log("/event/afrospook-2025")}
//           />
//         </div>
//       </section>

//       {/* About the Event Section */}
//       <section className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 px-4 sm:px-6 lg:px-16 bg-[#151515] py-12 sm:py-16 lg:py-20">
//         {/* about event content */}
//         <div>
//           <SectionHeader
//             title="More than an Event"
//             icon={BsStars}
//             label="WHAT AFROSPOOK IS"
//             align="left"
//           />

//           <p className="text-[#b3b3b3] text-sm sm:text-base leading-relaxed">
//             AfroSpook is not just a festival — it's a cultural movement and an
//             identity. A space where African heritage meets contemporary
//             expression. <br />
//             <br />
//             Born from the desire to create immersive experiences that celebrate
//             our roots while embracing innovation, AfroSpook has become a
//             pilgrimage for culture enthusiasts, artists, and free spirits across
//             the continent. <br />
//             <br />
//             Each edition is carefully crafted to push boundaries, challenge
//             norms, and create unforgettable moments that resonate long after the
//             music stops.
//           </p>
//         </div>

//         {/* image */}
//         <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-125">
//           <Image
//             src="/events/afrospook-event-img.png"
//             fill
//             alt="afrospook event image"
//             className="object-cover rounded-lg"
//             priority
//           />
//           <div className="absolute inset-0 bg-linear-to-t from-[#151515] via-transparent to-transparent" />
//         </div>
//       </section>

//       {/* Get your tickets section */}
//       <section className="px-4 sm:px-6 lg:px-16 py-10 sm:py-12 lg:py-16 bg-[#121111]">
//         {/* header and label */}
//         <div className="flex flex-col items-center">
//           <SectionHeader
//             title="Get Your Tickets"
//             icon={LuTicket}
//             label="SECURE YOUR SPOT"
//             description="Select the perfect package for an unforgettable journey into Afro-centric culture"
//           />

//           <div className="mt-6 sm:mt-8 flex flex-col items-center gap-6 sm:gap-8 lg:gap-10">
//             <div>
//               <button className="bg-[#092341] border text-gray-200 border-gray-200 uppercase rounded-full px-4 sm:px-6 py-2 flex items-center gap-2 text-xs sm:text-sm">
//                 <FaRegClock />
//                 Event Starts in
//               </button>
//             </div>
//             <CountdownTimer targetDate={eventDate} />
//           </div>
//         </div>

//         <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 pt-8 sm:pt-10 border-t border-[#2a2a2a] lg:grid-cols-3 gap-4 sm:gap-6">
//           {afroTicketData.map((ticket) => (
//             <TicketCard
//               key={ticket.id}
//               {...ticket}
//               onBuyClick={() => handleTicketPurchase(ticket)}
//               ticketId={ticket.id}
//               eventId={id}
//             />
//           ))}
//         </div>
//       </section>

//       {/* Venue Experience */}
//       <section className="px-4 sm:px-6 lg:px-16 py-10 sm:py-12 lg:py-16 bg-[#121111]">
//         <SectionHeader
//           title={
//             <>
//               Six Zones. One Unforgettable{" "}
//               <span className="text-[#0854a7]">Journey</span>
//             </>
//           }
//           label="Venue Experience"
//           labelColor="#0854a7"
//           description="Every corner of AfroSpook offers a different energy. Move freely between zones, discover new sounds, and curate your own experience."
//         />

//         <div className="mt-10 sm:mt-12 lg:mt-16">
//           <ImageSlider slides={slides} />
//         </div>
//       </section>

//       {/* Dress Code & Vibe */}
//       <section className="bg-[#151515] px-4 sm:px-6 lg:px-16 py-10 sm:py-12 lg:py-16">
//         <SectionHeader
//           label="Dress code & Vibe"
//           labelColor="#0854a7"
//           title={
//             <>
//               Come As You Are.{" "}
//               <span className="text-[#cca33a]">Be Yourself Fully.</span>
//             </>
//           }
//           description="There's no strict dress code at AfrroSpook. We celebrate individuality, creativity, and cultural expression. Dress for comfort, confidence and freedom"
//         />

//         <div className="mt-8 sm:mt-10 lg:mt-12">
//           <ImageFeatureTimeline
//             image="/event/dress-code-img.png"
//             imageAlt="Afrocentric fashion"
//             features={features}
//           />
//         </div>
//       </section>

//       {/* Safety & Security */}
//       <section className="px-4 sm:px-6 lg:px-16 py-10 sm:py-12 lg:py-16 bg-[#151515]">
//         <SectionHeader
//           label="Safety & Security"
//           labelColor="#0854a7"
//           title="Your Safety is Our Priority"
//           description="We want you to experience AfroSpook with complete peace of mind. Our comprehensive safety measures ensure a secure, well-organized event."
//         />

//         <div className="mt-8 sm:mt-10 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 border-b border-[#2a2a2a] pb-8 sm:pb-10">
//           {safetyData.map((item) => (
//             <CardWithoutImage
//               key={item.id}
//               icon={item.icon}
//               title={item.title}
//               description={item.description}
//             />
//           ))}
//         </div>
//       </section>

//       {/* What to Bring */}
//       <section className="px-4 sm:px-6 lg:px-16 bg-[#151515] py-10 sm:py-12 lg:py-16">
//         <SectionHeader title="What to Bring" />

//         <div className="mt-8 sm:mt-10 lg:mt-12 border-b border-[#2a2a2a] pb-8 sm:pb-10">
//           <RecommendedList
//             recommendedItems={recommendedItems}
//             notAllowedItems={notAllowedItems}
//           />
//         </div>

//         <p className="text-[#b3b3b3] text-sm sm:text-base w-full sm:w-[80%] lg:w-[60%] xl:w-[40%] text-center mx-auto pt-8 sm:pt-10 px-4">
//           All attendees and bags are subject to search at entry. Thank you for
//           your cooperation in keeping AfroSpook safe and enjoyable for everyone
//         </p>
//       </section>

//       {/* Community Code of Conduct */}
//       <section className="px-4 sm:px-6 lg:px-16 bg-[#151515] py-10 sm:py-12 lg:py-16">
//         <SectionHeader
//           title="Community Code of Conduct"
//           description="AfroSpook is a space for celebration, respect and unity. We ask all attendees to honor the following principles:"
//         />

//         <div className="mt-8 sm:mt-10 lg:mt-12 border-b border-[#2a2a2a] pb-8 sm:pb-10">
//           <RecommendedList
//             recommendedItems={encouragedItems}
//             notAllowedItems={notToleratedItems}
//             recommendedTitle="WE ENCOURAGE"
//             notAllowedTitle="ZERO TOLERANCE FOR"
//             notAllowedColor="#6f6f6f"
//             notAllowedIconColor="#6f6f6f"
//           />
//         </div>

//         <p className="text-[#b3b3b3] text-sm sm:text-base w-full sm:w-[85%] lg:w-[70%] xl:w-[60%] text-center mx-auto pt-8 sm:pt-10 px-4">
//           Violations of our code of conduct may result in immediate removal from
//           the event without refund. If you witness or experience any concerning
//           behaviour, please report it to security immediately. We're commitedd
//           to maintaining a saafe, inclusive space for everyone
//         </p>
//       </section>

//       {/* Entry Requirements & Emergency Contacts */}
//       <section className="px-4 sm:px-6 lg:px-16 bg-[#151515] py-10 sm:py-12 lg:py-16">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
//           {/* Entry Requirements */}
//           <div className="bg-[#0f0f0f] p-6 sm:p-8 rounded-2xl">
//             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
//               Entry Requirements
//             </h2>
//             <p className="text-[#b3b3b3] text-sm sm:text-base mt-3 sm:mt-4 mb-6 sm:mb-8">
//               To ensure a smooth entry process, please have the following ready:
//             </p>

//             <RecommendedList
//               recommendedItems={entryRequirements}
//               recommendedTitle=" "
//               notAllowedTitle=" "
//               align="left"
//             />

//             <div className="mt-4 pt-4 border-t border-[#2a2a2a]">
//               <p className="text-[#b3b3b3] text-sm sm:text-base">
//                 <b>Note:</b> AfroSpook is an 18+ event. Anyone appearing under
//                 25 may be asked to show ID.
//               </p>
//             </div>
//           </div>
//           {/* Emergency Contacts */}
//           <div className="bg-[#0f0f0f] p-6 sm:p-8 rounded-2xl">
//             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
//               Emergency Contacts
//             </h2>
//             <p className="text-[#b3b3b3] text-sm sm:text-base mt-3 sm:mt-4 mb-6 sm:mb-8">
//               If you need assistance during the event:
//             </p>

//             <div className="mt-4 flex flex-col gap-4 border-b pb-4 border-[#2a2a2a]">
//               {contactData.map((item) => (
//                 <ContactCard
//                   key={item.id}
//                   title={item.title}
//                   content={item.content}
//                   subtext={item.subtext}
//                 />
//               ))}
//             </div>

//             <p className="text-[#b3b3b3] text-sm pt-4 w-full lg:w-[80%]">
//               First aid stations are located in each zone, marked with clear
//               signage. Security personnel can direct you to the nearest station.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Get your tickets section */}
//       <section className="px-4 sm:px-6 lg:px-16 py-10 sm:py-12 lg:py-16 bg-[#0f0f0f]">
//         {/* header and label */}
//         <div className="flex flex-col items-center">
//           <SectionHeader
//             title="Get Your Tickets"
//             icon={LuTicket}
//             label="SECURE YOUR SPOT"
//             description="Select the perfect package for an unforgettable journey into Afro-centric culture"
//           />

//           <div className="mt-6 sm:mt-8 flex flex-col items-center gap-6 sm:gap-8 lg:gap-10">
//             <div>
//               <button className="bg-[#092341] border text-gray-200 border-gray-200 uppercase rounded-full px-4 sm:px-6 py-2 flex items-center gap-2 text-xs sm:text-sm">
//                 <FaRegClock />
//                 Event Starts in
//               </button>
//             </div>
//             <CountdownTimer targetDate={eventDate} />
//           </div>
//         </div>

//         <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 pt-8 sm:pt-10 border-t border-[#2a2a2a] lg:grid-cols-3 gap-4 sm:gap-6">
//           {afroTicketData.map((ticket) => (
//             <TicketCard
//               key={ticket.id}
//               {...ticket}
//               onBuyClick={() => console.log("Buy Ticket")}
//             />
//           ))}
//         </div>
//       </section>

//       {/* Call To Action */}
//       <section className="w-full">
//         <CallToAction
//           backgroundGradient="linear-gradient(90deg, #56410C 0%, #001D3D 35%, #56410C 65%, #001D3D 100%)"
//           overlay="bg-gradient-to-r from-black/30 to-[#2A2A2A]/60"
//           title="Your Presence is the Art"
//           description=" "
//           // height="h-[500px]"
//           containerClassName="w-full p-0"
//         >
//           <div className="flex flex-col items-center gap-4 sm:gap-6 px-4 sm:px-0">
//             {/* date and location */}
//             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center text-sm sm:text-base">
//               <div className="flex items-center gap-2 sm:gap-3">
//                 <FaRegCalendarAlt className="text-[#cca33a] text-base sm:text-lg shrink-0" />
//                 <p className="text-[#b3b3b3]">Aug 15 - 17, 2026</p>
//               </div>

//               <GoDotFill className="text-[#b3b3b3] hidden sm:block" />

//               <div className="flex items-center gap-2 sm:gap-3">
//                 <GrLocation className="text-[#cca33a] text-base sm:text-lg shrink-0" />
//                 <p className="text-[#b3b3b3] text-center sm:text-left">
//                   Eko Atlantic City - Lagos - Nigeria
//                 </p>
//               </div>
//             </div>

//             <Button
//               variant="primary"
//               icon={"arrow"}
//               onClick={() => console.log("clicked")}
//               className="w-fit sm:w-auto mt-2"
//             >
//               Secure your spot now
//             </Button>

//             <p className="text-[#b3b3b3] text-center text-sm sm:text-base px-4 sm:px-0">
//               Prices increase as we get closer to the event
//             </p>
//           </div>
//         </CallToAction>
//       </section>
//     </div>
//   );
// }

// "use client";

// import { use, useEffect, useState } from "react";
// import ImageSlider from "@/components/events/event/ImageSlider";
// import { FeaturedEventCard } from "@/components/events/ui/FeaturedEventCard";
// import Button from "@/components/layout/Button";
// import CardWithoutImage from "@/components/layout/CardWithoutImage";
// import { CountdownTimer } from "@/components/layout/CountdownTimer";
// import SectionHeader from "@/components/layout/sectionHeader";
// import { TicketCard } from "@/components/layout/TicketCard";
// import {
//   safetyData,
//   slides,
//   recommendedItems,
//   notAllowedItems,
// } from "@/lib/data";
// import Image from "next/image";
// import { BsStars } from "react-icons/bs";
// import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
// import { LuTicket } from "react-icons/lu";
// import RecommendedList from "@/components/events/event/RecommendList";
// import ContactCard from "@/components/events/event/ContactCard";
// import CallToAction from "@/components/layout/CallToAction";
// import { GoDotFill } from "react-icons/go";
// import { GrLocation } from "react-icons/gr";
// import { getEventByTitle, type Event } from "@/app/actions/events";
// import { useRouter } from "next/navigation";

// // export default function EventPage({
// //   params,
// // }: {
// //   params: Promise<{ id: string }>;
// // }) {
// export default function EventPage({
//   params,
// }: {
//   params: Promise<{ eventTitle: string }>;
// }) {
//   const { eventTitle } = use(params);

//   const router = useRouter();
//   const [event, setEvent] = useState<Event | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//   async function fetchEvent() {
//     try {
//       setLoading(true);

//       const eventData = await getEventByTitle(eventTitle);

//       if (!eventData) {
//         router.push("/not-found");
//         return;
//       }

//       setEvent(eventData);
//     } catch (error) {
//       console.error("Failed to fetch event:", error);
//       router.push("/events");
//     } finally {
//       setLoading(false);
//     }
//   }

//   fetchEvent();
// }, [eventTitle, router]);


//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-black">
//         <p className="text-white text-xl">Loading event...</p>
//       </div>
//     );
//   }

//   if (!event) {
//     return null;
//   }

//   // Helper functions
//   const eventDate = new Date(event.eventDetails.startDate);
//   const eventEndDate = new Date(event.eventDetails.endDate);

//   const formatDateRange = () => {
//     const start = eventDate;
//     const end = eventEndDate;

//     if (start.toDateString() === end.toDateString()) {
//       return start.toLocaleDateString("en-US", {
//         month: "short",
//         day: "numeric",
//         year: "numeric",
//       });
//     }

//     return `${start.toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//     })} - ${end.toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     })}`;
//   };

//   const handleTicketPurchase = (ticketId: string) => {
//     const ticket = event.tickets.find((t) => t._id === ticketId);
//     if (!ticket) return;

//     sessionStorage.setItem(
//       "selectedTicket",
//       JSON.stringify({
//         ticketId: ticket._id,
//         ticketName: ticket.ticketName,
//         price: ticket.price,
//         currency: ticket.currency,
//         eventId: event.id,
//         eventName: event.eventDetails.eventTitle,
//         eventDate: event.eventDetails.startDate,
//         eventLocation: `${event.eventDetails.venue}, ${event.eventDetails.address}`,
//       })
//     );

//     // Navigate to checkout page
//     router.push(`/checkout?ticket=${ticket._id}`);
//   };

//   return (
//     <div className="min-h-screen bg-black text-white">
//       {/* Header Section */}
//       <section className="relative px-4 sm:px-6 lg:px-16 w-full pt-24 sm:pt-32 lg:pt-40 flex flex-col gap-4 sm:gap-6 justify-center items-start h-auto min-h-screen overflow-hidden">
//         {/* Background blur effects */}
//         {/* <div
//           className="absolute top-0 left-0 w-60 h-60 sm:w-80 sm:h-80 rounded-full opacity-100 blur-[60px]"
//           style={{ backgroundColor: event.eventDetails.brandColor.primaryColor }}
//         ></div>
//         <div
//           className="absolute top-[30%] right-0 w-72 h-72 sm:w-96 sm:h-96 rounded-full opacity-100 blur-[100px] transform -translate-y-1/2"
//           style={{ backgroundColor: event.eventDetails.brandColor.secondaryColor }}
//         ></div> */}
//          <div className="absolute top-0 left-0 w-60 h-60 sm:w-80 sm:h-80 bg-linear-to-r bg-[#56410C] to-[#001D3D] rounded-full opacity-100 blur-[60px]"></div>
//          <div className="absolute top-[30%] right-0 w-72 h-72 sm:w-96 sm:h-96 bg-linear-to-tl from-[#64a9f2] via-[#80682e] to-[#ddad31] rounded-full opacity-100 blur-[100px] transform -translate-y-1/2"></div>

//         <div className="flex justify-left z-10">
//           <h3 className="text-sm font-semibold sm:text-base">
//             Events /{" "}
//             <span style={{ color: event.eventDetails.brandColor.primaryColor }}>
//               {event.eventDetails.eventTitle}
//             </span>
//           </h3>
//         </div>

//         <div className="w-full z-10">
//           <FeaturedEventCard
//             image={event.eventDetails.eventBanner || "/events/afrospook-event-img.png"}
//             category={event.eventDetails.eventType.toUpperCase()}
//             title={event.eventDetails.eventTitle}
//             eventDate={eventDate}
//             description={event.eventDetails.supportingText}
//             dateRange={formatDateRange()}
//             location={`${event.eventDetails.venue}, ${event.eventDetails.address}`}
//             onViewDetails={() => {}}
//           />
//         </div>
//       </section>

//       {/* About the Event Section */}
//       <section className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 px-4 sm:px-6 lg:px-16 bg-[#151515] py-12 sm:py-16 lg:py-20">
//         <div>
//           <SectionHeader
//             title={`About ${event.eventDetails.eventTitle}`}
//             icon={BsStars}
//             label={event.eventDetails.eventTheme.toUpperCase()}
//             align="left"
//           />

//           <p className="text-[#b3b3b3] text-sm sm:text-base leading-relaxed">
//             {event.eventDetails.supportingText}
//           </p>

//           {/* Event Artists */}
//           {event.artistLineUp.length > 0 && (
//             <div className="mt-8">
//               <h3 className="text-xl font-semibold mb-4">Featured Artists</h3>
//               <div className="flex flex-col gap-3">
//                 {event.artistLineUp.map((artist) => (
//                   <div
//                     key={artist._id}
//                     className="flex items-center gap-4 p-3 bg-[#0f0f0f] rounded-lg"
//                   >
//                     <div className="relative w-16 h-16 rounded-full overflow-hidden">
//                       <Image
//                         src={artist.artistImage || "/placeholder-artist.png"}
//                         fill
//                         alt={artist.artistName}
//                         className="object-cover"
//                       />
//                     </div>
//                     <div className="flex-1">
//                       <h4 className="font-semibold">{artist.artistName}</h4>
//                       <p className="text-sm text-[#b3b3b3]">{artist.artistGenre}</p>
//                       {artist.headliner && (
//                         <span className="text-xs bg-[#cca33a] text-black px-2 py-0.5 rounded-full">
//                           Headliner
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-125">
//           <Image
//             src={event.eventDetails.eventBanner || "/events/afrospook-event-img.png"}
//             fill
//             alt={event.eventDetails.eventTitle}
//             className="object-cover rounded-lg"
//             priority
//           />
//           <div className="absolute inset-0 bg-linear-to-t from-[#151515] via-transparent to-transparent" />
//         </div>
//       </section>

//       {/* Get your tickets section */}
//       {event.tickets.length > 0 && (
//         <section id="tickets-section" className="px-4 sm:px-6 lg:px-16 py-10 sm:py-12 lg:py-16 bg-[#121111]">
//           <div className="flex flex-col items-center">
//             <SectionHeader
//               title="Get Your Tickets"
//               icon={LuTicket}
//               label="SECURE YOUR SPOT"
//               description={`Select the perfect package for ${event.eventDetails.eventTitle}`}
//             />

//             <div className="mt-6 sm:mt-8 flex flex-col items-center gap-6 sm:gap-8 lg:gap-10">
//               <div>
//                 <button className="bg-[#092341] border text-gray-200 border-gray-200 uppercase rounded-full px-4 sm:px-6 py-2 flex items-center gap-2 text-xs sm:text-sm">
//                   <FaRegClock />
//                   Event Starts in
//                 </button>
//               </div>
//               <CountdownTimer targetDate={eventDate} />
//             </div>
//           </div>

//           <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 pt-8 sm:pt-10 border-t border-[#2a2a2a] lg:grid-cols-3 gap-4 sm:gap-6">
//             {event.tickets.map((ticket) => {
//               const isSoldOut = ticket.availableQuantity === 0;
//               const soldCount = ticket.initialQuantity - ticket.availableQuantity;

//               return (
//                 <TicketCard
//                   key={ticket._id}
//                   id={ticket._id}
//                   name={ticket.ticketName}
//                   price={`${ticket.currency} ${ticket.price.toLocaleString()}`}
//                   features={ticket.benefits}
//                   badge={isSoldOut ? "SOLD OUT" : `${soldCount} sold`}
//                   popular={ticket.ticketName.toLowerCase().includes("vip")}
//                   onBuyClick={() => handleTicketPurchase(ticket._id)}
//                 />
//               );
//             })}
//           </div>
//         </section>
//       )}

//       {/* Venue Experience */}
//       <section className="px-4 sm:px-6 lg:px-16 py-10 sm:py-12 lg:py-16 bg-[#121111]">
//         <SectionHeader
//           title="Event Experience"
//           label="Venue"
//           labelColor={event.eventDetails.brandColor.primaryColor}
//           description={`Experience ${event.eventDetails.eventTitle} at ${event.eventDetails.venue}`}
//         />

//         <div className="mt-10 sm:mt-12 lg:mt-16">
//           <ImageSlider slides={slides} />
//         </div>
//       </section>

//       {/* Safety & Security */}
//       {event.emergencyContact && (
//         <section className="px-4 sm:px-6 lg:px-16 bg-[#151515] py-10 sm:py-12 lg:py-16">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
//             {/* Safety Info */}
//             <div className="bg-[#0f0f0f] p-6 sm:p-8 rounded-2xl">
//               <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
//                 Safety & Security
//               </h2>
//               <p className="text-[#b3b3b3] text-sm sm:text-base mt-3 sm:mt-4 mb-6 sm:mb-8">
//                 {event.emergencyContact.supportingInfo}
//               </p>

//               <div className="grid grid-cols-1 gap-4">
//                 {safetyData.map((item) => (
//                   <CardWithoutImage
//                     key={item.id}
//                     icon={item.icon}
//                     title={item.title}
//                     description={item.description}
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* Emergency Contacts */}
//             <div className="bg-[#0f0f0f] p-6 sm:p-8 rounded-2xl">
//               <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
//                 Emergency Contacts
//               </h2>
//               <p className="text-[#b3b3b3] text-sm sm:text-base mt-3 sm:mt-4 mb-6 sm:mb-8">
//                 If you need assistance during the event:
//               </p>

//               <div className="mt-4 flex flex-col gap-4 border-b pb-4 border-[#2a2a2a]">
//                 <ContactCard
//                   title="Security"
//                   content={event.emergencyContact.security}
//                   subtext="24/7 Security Support"
//                 />
//                 <ContactCard
//                   title="Medical"
//                   content={event.emergencyContact.medical}
//                   subtext="Emergency Medical Services"
//                 />
//                 <ContactCard
//                   title="Lost & Found"
//                   content={event.emergencyContact.lostButFound}
//                   subtext="Lost Items Assistance"
//                 />
//               </div>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* What to Bring & Code of Conduct */}
//       <section className="px-4 sm:px-6 lg:px-16 bg-[#151515] py-10 sm:py-12 lg:py-16">
//         <SectionHeader title="What to Bring" />
//         <div className="mt-8 sm:mt-10 lg:mt-12 border-b border-[#2a2a2a] pb-8 sm:pb-10">
//           <RecommendedList
//             recommendedItems={recommendedItems}
//             notAllowedItems={notAllowedItems}
//           />
//         </div>
//       </section>

//       {/* Call To Action */}
//       <section className="w-full">
//         <CallToAction
//           backgroundGradient={`linear-gradient(90deg, ${event.eventDetails.brandColor.primaryColor} 0%, ${event.eventDetails.brandColor.secondaryColor} 50%, ${event.eventDetails.brandColor.primaryColor} 100%)`}
//           overlay="bg-gradient-to-r from-black/30 to-[#2A2A2A]/60"
//           title={`Join us at ${event.eventDetails.eventTitle}`}
//           description=" "
//           containerClassName="w-full p-0"
//         >
//           <div className="flex flex-col items-center gap-4 sm:gap-6 px-4 sm:px-0">
//             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center text-sm sm:text-base">
//               <div className="flex items-center gap-2 sm:gap-3">
//                 <FaRegCalendarAlt
//                   className="text-base sm:text-lg shrink-0"
//                   style={{ color: event.eventDetails.brandColor.primaryColor }}
//                 />
//                 <p className="text-[#b3b3b3]">{formatDateRange()}</p>
//               </div>

//               <GoDotFill className="text-[#b3b3b3] hidden sm:block" />

//               <div className="flex items-center gap-2 sm:gap-3">
//                 <GrLocation
//                   className="text-base sm:text-lg shrink-0"
//                   style={{ color: event.eventDetails.brandColor.primaryColor }}
//                 />
//                 <p className="text-[#b3b3b3] text-center sm:text-left">
//                   {event.eventDetails.venue} - {event.eventDetails.address}
//                 </p>
//               </div>
//             </div>

//             <Button
//               variant="primary"
//               icon={"arrow"}
//               onClick={() => {
//                 // Scroll to tickets section
//                 const ticketsSection = document.querySelector("#tickets-section");
//                 ticketsSection?.scrollIntoView({ behavior: "smooth" });
//               }}
//               className="w-fit sm:w-auto mt-2"
//             >
//               Secure your spot now
//             </Button>

//             {event.tickets.length > 0 && (
//               <p className="text-[#b3b3b3] text-center text-sm sm:text-base px-4 sm:px-0">
//                 Limited tickets available
//               </p>
//             )}
//           </div>
//         </CallToAction>
//       </section>
//     </div>
//   );
// }

"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BsStars } from "react-icons/bs";
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import { LuTicket } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { GrLocation } from "react-icons/gr";

import ImageSlider from "@/components/events/event/ImageSlider";
import { FeaturedEventCard } from "@/components/events/ui/FeaturedEventCard";
import SectionHeader from "@/components/layout/sectionHeader";
import Button from "@/components/layout/Button";
import CardWithoutImage from "@/components/layout/CardWithoutImage";
import { CountdownTimer } from "@/components/layout/CountdownTimer";
import { TicketCard } from "@/components/layout/TicketCard";
import RecommendedList from "@/components/events/event/RecommendList";
import ContactCard from "@/components/events/event/ContactCard";
import CallToAction from "@/components/layout/CallToAction";

import { safetyData, slides, recommendedItems, notAllowedItems } from "@/lib/data";
import { getEventByTitle, type Event } from "@/app/actions/events";

export default function EventPage({ params }: { params: Promise<{ eventTitle: string }> }) {
  const { eventTitle } = use(params);
  const decodedTitle = decodeURIComponent(eventTitle);

  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvent() {
      try {
        setLoading(true);
        const eventData = await getEventByTitle(decodedTitle);

        if (!eventData) {
          router.push("/events"); // fallback if event not found
          return;
        }

        setEvent(eventData);
      } catch (error) {
        console.error("Failed to fetch event:", error);
        router.push("/events");
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [decodedTitle, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <p className="text-white text-xl">Loading event...</p>
      </div>
    );
  }

  if (!event) return null;

  // Dates
  const startDate = new Date(event.eventDetails.startDate);
  const endDate = new Date(event.eventDetails.endDate);

  const formatDateRange = () => {
    if (startDate.toDateString() === endDate.toDateString()) {
      return startDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    }
    return `${startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${endDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
  };

  // Ticket purchase
  const handleTicketPurchase = (ticketId: string) => {
    const ticket = event.tickets.find((t) => t._id === ticketId);
    if (!ticket) return;

    sessionStorage.setItem(
      "selectedTicket",
      JSON.stringify({
        ticketId: ticket._id,
        ticketName: ticket.ticketName,
        price: ticket.price,
        currency: ticket.currency,
        eventId: event.id,
        eventName: event.eventDetails.eventTitle,
        eventDate: event.eventDetails.startDate,
        eventLocation: `${event.eventDetails.venue}, ${event.eventDetails.address}`,
      })
    );

    router.push(`/checkout?ticket=${ticket._id}`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="relative px-4 sm:px-6 lg:px-16 pt-24 sm:pt-32 lg:pt-40 flex flex-col gap-4 sm:gap-6 min-h-screen overflow-hidden">
        <div className="absolute top-0 left-0 w-60 h-60 sm:w-80 sm:h-80 bg-linear-to-r bg-[#56410C] to-[#001D3D] rounded-full opacity-100 blur-[60px]" />
        <div className="absolute top-[30%] right-0 w-72 h-72 sm:w-96 sm:h-96 bg-linear-to-tl from-[#64a9f2] via-[#80682e] to-[#ddad31] rounded-full opacity-100 blur-[100px] transform -translate-y-1/2" />

        <h3 className="text-sm font-semibold sm:text-base z-10">
          Events / <span style={{ color: event.eventDetails.brandColor.primaryColor }}>{event.eventDetails.eventTitle}</span>
        </h3>

        <FeaturedEventCard
          image={event.eventDetails.eventBanner || "/events/afrospook-event-img.png"}
          category={event.eventDetails.eventType.toUpperCase()}
          title={event.eventDetails.eventTitle}
          eventDate={startDate}
          description={event.eventDetails.supportingText}
          dateRange={formatDateRange()}
          location={`${event.eventDetails.venue}, ${event.eventDetails.address}`}
          onViewDetails={() => {}}
        />
      </section>

      {/* About */}
      <section className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 px-4 sm:px-6 lg:px-16 bg-[#151515] py-12 sm:py-16 lg:py-20">
        <div>
          <SectionHeader title={`About ${event.eventDetails.eventTitle}`} icon={BsStars} label={event.eventDetails.eventTheme.toUpperCase()} align="left" />
          <p className="text-[#b3b3b3] text-sm sm:text-base leading-relaxed">{event.eventDetails.supportingText}</p>

          {event.artistLineUp.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Featured Artists</h3>
              <div className="flex flex-col gap-3">
                {event.artistLineUp.map((artist) => (
                  <div key={artist._id} className="flex items-center gap-4 p-3 bg-[#0f0f0f] rounded-lg">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                      <Image src={artist.artistImage || "/placeholder-artist.png"} fill alt={artist.artistName} className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{artist.artistName}</h4>
                      <p className="text-sm text-[#b3b3b3]">{artist.artistGenre}</p>
                      {artist.headliner && <span className="text-xs bg-[#cca33a] text-black px-2 py-0.5 rounded-full">Headliner</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-125">
          <Image src={event.eventDetails.eventBanner || "/events/afrospook-event-img.png"} fill alt={event.eventDetails.eventTitle} className="object-cover rounded-lg" priority />
          <div className="absolute inset-0 bg-linear-to-t from-[#151515] via-transparent to-transparent" />
        </div>
      </section>

      {/* Tickets */}
      {event.tickets.length > 0 && (
        <section id="tickets-section" className="px-4 sm:px-6 lg:px-16 py-10 sm:py-12 lg:py-16 bg-[#121111]">
          <div className="flex flex-col items-center">
            <SectionHeader title="Get Your Tickets" icon={LuTicket} label="SECURE YOUR SPOT" description={`Select the perfect package for ${event.eventDetails.eventTitle}`} />
            <div className="mt-6 sm:mt-8 flex flex-col items-center gap-6 sm:gap-8 lg:gap-10">
              <button className="bg-[#092341] border text-gray-200 border-gray-200 uppercase rounded-full px-4 sm:px-6 py-2 flex items-center gap-2 text-xs sm:text-sm">
                <FaRegClock /> Event Starts in
              </button>
              <CountdownTimer targetDate={startDate} />
            </div>
          </div>

          <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 pt-8 sm:pt-10 border-t border-[#2a2a2a] lg:grid-cols-3 gap-4 sm:gap-6">
            {event.tickets.map((ticket) => {
              const soldCount = ticket.initialQuantity - ticket.availableQuantity;
              const isSoldOut = ticket.availableQuantity === 0;

              return (
                <TicketCard
                  key={ticket._id}
                  id={ticket._id}
                  name={ticket.ticketName}
                  price={`${ticket.currency} ${ticket.price.toLocaleString()}`}
                  features={ticket.benefits}
                  badge={isSoldOut ? "SOLD OUT" : `${soldCount} sold`}
                  popular={ticket.ticketName.toLowerCase().includes("vip")}
                  onBuyClick={() => handleTicketPurchase(ticket._id)}
                />
              );
            })}
          </div>
        </section>
      )}

      {/* Venue Experience */}
      <section className="px-4 sm:px-6 lg:px-16 py-10 sm:py-12 lg:py-16 bg-[#121111]">
        <SectionHeader title="Event Experience" label="Venue" labelColor={event.eventDetails.brandColor.primaryColor} description={`Experience ${event.eventDetails.eventTitle} at ${event.eventDetails.venue}`} />
        <div className="mt-10 sm:mt-12 lg:mt-16">
          <ImageSlider slides={slides} />
        </div>
      </section>

      {/* Safety & Contacts */}
      {event.emergencyContact && (
        <section className="px-4 sm:px-6 lg:px-16 bg-[#151515] py-10 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-[#0f0f0f] p-6 sm:p-8 rounded-2xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">Safety & Security</h2>
              <p className="text-[#b3b3b3] text-sm sm:text-base mt-3 sm:mt-4 mb-6 sm:mb-8">{event.emergencyContact.supportingInfo}</p>
              <div className="grid grid-cols-1 gap-4">
                {safetyData.map((item) => <CardWithoutImage key={item.id} icon={item.icon} title={item.title} description={item.description} />)}
              </div>
            </div>

            <div className="bg-[#0f0f0f] p-6 sm:p-8 rounded-2xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">Emergency Contacts</h2>
              <p className="text-[#b3b3b3] text-sm sm:text-base mt-3 sm:mt-4 mb-6 sm:mb-8">If you need assistance during the event:</p>
              <div className="mt-4 flex flex-col gap-4 border-b pb-4 border-[#2a2a2a]">
                <ContactCard title="Security" content={event.emergencyContact.security} subtext="24/7 Security Support" />
                <ContactCard title="Medical" content={event.emergencyContact.medical} subtext="Emergency Medical Services" />
                <ContactCard title="Lost & Found" content={event.emergencyContact.lostButFound} subtext="Lost Items Assistance" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* What to Bring */}
      <section className="px-4 sm:px-6 lg:px-16 bg-[#151515] py-10 sm:py-12 lg:py-16">
        <SectionHeader title="What to Bring" />
        <div className="mt-8 sm:mt-10 lg:mt-12 border-b border-[#2a2a2a] pb-8 sm:pb-10">
          <RecommendedList recommendedItems={recommendedItems} notAllowedItems={notAllowedItems} />
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full">
        <CallToAction
          backgroundGradient={`linear-gradient(90deg, ${event.eventDetails.brandColor.primaryColor} 0%, ${event.eventDetails.brandColor.secondaryColor} 50%, ${event.eventDetails.brandColor.primaryColor} 100%)`}
          overlay="bg-gradient-to-r from-black/30 to-[#2A2A2A]/60"
          title={`Join us at ${event.eventDetails.eventTitle}`}
          description=" "
          containerClassName="w-full p-0"
        >
          <div className="flex flex-col items-center gap-4 sm:gap-6 px-4 sm:px-0">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center text-sm sm:text-base">
              <div className="flex items-center gap-2 sm:gap-3">
                <FaRegCalendarAlt className="text-base sm:text-lg shrink-0" style={{ color: event.eventDetails.brandColor.primaryColor }} />
                <p className="text-[#b3b3b3]">{formatDateRange()}</p>
              </div>

              <GoDotFill className="text-[#b3b3b3] hidden sm:block" />

              <div className="flex items-center gap-2 sm:gap-3">
                <GrLocation className="text-base sm:text-lg shrink-0" style={{ color: event.eventDetails.brandColor.primaryColor }} />
                <p className="text-[#b3b3b3] text-center sm:text-left">{event.eventDetails.venue} - {event.eventDetails.address}</p>
              </div>
            </div>

            <Button
              variant="primary"
              icon="arrow"
              onClick={() => document.querySelector("#tickets-section")?.scrollIntoView({ behavior: "smooth" })}
              className="w-fit sm:w-auto mt-2"
            >
              Secure your spot now
            </Button>

            {event.tickets.length > 0 && <p className="text-[#b3b3b3] text-center text-sm sm:text-base px-4 sm:px-0">Limited tickets available</p>}
          </div>
        </CallToAction>
      </section>
    </div>
  );
}
