// import Image from "next/image";


// export default function HeaderSection() {
//     return (
//         <div>
//             <Image
//                 src="/events/hero-img.png"
//                 width={400}
//                 height={400}
//                 alt="hero image"
//             />
//             <h2>Hi</h2>
//         </div>
//     )
// }


import Image from "next/image";

export default function HeaderSection() {
  return (
    <section className="relative w-full h-[70vh]">
      {/* Background Image */}
      <Image
        src="/events/hero-img.png"
        alt="hero image"
        fill
        priority
        className="object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Centered text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-10">
        <div className="bg-white h-0.5 w-46.25"></div>
        <h5>WHAT WE HAVE FOR YOU</h5>
        <h2 className="text-white text-[50px] xl:text-[85px] font-medium">
          Events
        </h2>
        <p className="w-[75%] lg:w-[25%] text-md  text-center">
            Discover immersive experiences hosted by deCave. Culture, music and community - all in one place
        </p>
      </div>
    </section>
  );
}
