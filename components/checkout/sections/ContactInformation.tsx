// "use client";

// import SectionHeader from "@/components/layout/sectionHeader";
// import { useFormik } from "formik";
// import { useState } from "react";
// import * as Yup from "yup";
// import { ContactInfo } from "@/app/checkout/page";

// interface ContactInformationProps {
//   contactInfo: ContactInfo;
//   setContactInfo: (info: ContactInfo) => void;
//   isProcessing?: boolean;
//   title?: string;
//   description?: string;
// }

// // Validation Schema
// const validationSchema = Yup.object({
//   firstName: Yup.string()
//     .min(2, "Name must be at least 2 characters")
//     .required("First name is required"),
//   lastName: Yup.string()
//     .min(2, "Name must be at least 2 characters")
//     .required("Last name is required"),
//   email: Yup.string()
//     .email("Invalid email address")
//     .required("Email is required"),
//   phoneNumber: Yup.string()
//     .matches(/^[0-9]{11}$/, "Phone number must be 11 digits")
//     .required("Phone number is required"),
// });

// export default function ContactInformation({ 
//   contactInfo, 
//   setContactInfo,
//   isProcessing = false,
//   title = "Contact Information",
//   description = "Fill-out the details of the recipient of this ticket"
// }: ContactInformationProps) {
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const formik = useFormik({
//     initialValues: contactInfo,
//     validationSchema,
//     onSubmit: async (values) => {
//       setIsSubmitting(true);
//       setContactInfo(values);
//       await new Promise((resolve) => setTimeout(resolve, 500));
//       setIsSubmitting(false);
//     },
//     enableReinitialize: true, // Update form when parent state changes
//   });

//   // Sync Formik values to parent state on every change
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     formik.handleChange(e);
//     const { name, value } = e.target;
//     setContactInfo({ ...contactInfo, [name]: value });
//   };

//   // Show validation errors on blur
//   const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
//     formik.handleBlur(e);
//     const { name } = e.target;
//     if (formik.errors[name as keyof typeof formik.errors]) {
//       // You could show these errors in a more user-friendly way
//       console.log(`Validation error for ${name}:`, formik.errors[name as keyof typeof formik.errors]);
//     }
//   };

//   return (
//     <section className="bg-[#151515] px-4 py-6 rounded-2xl">
//       <SectionHeader
//         title={title}
//         description={description}
//         align="left"
//       />
      
//       <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full rounded-xl">
//         <div>
//           <div className="flex justify-between items-center mb-2">
//             <p className="text-md text-[#b3b3b3]">First Name</p>
//             {formik.touched.firstName && formik.errors.firstName && (
//               <span className="text-red-500 text-sm">{formik.errors.firstName}</span>
//             )}
//           </div>
//           <input
//             type="text"
//             name="firstName"
//             value={formik.values.firstName}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             placeholder="e.g John"
//             disabled={isProcessing}
//             className={`bg-[#0f0f0f] py-3 px-4 rounded-xl w-full border ${
//               formik.touched.firstName && formik.errors.firstName 
//                 ? 'border-red-500' 
//                 : 'border-[#2a2a2a]'
//             } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
//           />
//         </div>

//         <div>
//           <div className="flex justify-between items-center mb-2">
//             <p className="text-md text-[#b3b3b3]">Last Name</p>
//             {formik.touched.lastName && formik.errors.lastName && (
//               <span className="text-red-500 text-sm">{formik.errors.lastName}</span>
//             )}
//           </div>
//           <input
//             type="text"
//             name="lastName"
//             value={formik.values.lastName}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             placeholder="e.g Doe"
//             disabled={isProcessing}
//             className={`bg-[#0f0f0f] py-3 px-4 rounded-xl w-full border ${
//               formik.touched.lastName && formik.errors.lastName 
//                 ? 'border-red-500' 
//                 : 'border-[#2a2a2a]'
//             } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
//           />
//         </div>

//         <div className="col-span-1 lg:col-span-2">
//           <div className="flex justify-between items-center mb-2">
//             <p className="text-md text-[#b3b3b3]">Email Address</p>
//             {formik.touched.email && formik.errors.email && (
//               <span className="text-red-500 text-sm">{formik.errors.email}</span>
//             )}
//           </div>
//           <input
//             type="email"
//             name="email"
//             value={formik.values.email}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             placeholder="e.g john@gmail.com"
//             disabled={isProcessing}
//             className={`bg-[#0f0f0f] py-3 px-4 rounded-xl w-full border ${
//               formik.touched.email && formik.errors.email 
//                 ? 'border-red-500' 
//                 : 'border-[#2a2a2a]'
//             } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
//           />
//         </div>

//         <div className="col-span-1 lg:col-span-2">
//           <div className="flex justify-between items-center mb-2">
//             <p className="text-lg text-[#b3b3b3]">Phone Number</p>
//             {formik.touched.phoneNumber && formik.errors.phoneNumber && (
//               <span className="text-red-500 text-sm">{formik.errors.phoneNumber}</span>
//             )}
//           </div>
//           <input
//             type="tel"
//             name="phoneNumber"
//             value={formik.values.phoneNumber}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             placeholder="e.g 09030203546"
//             disabled={isProcessing}
//             className={`bg-[#0f0f0f] py-3 px-4 rounded-xl w-full border ${
//               formik.touched.phoneNumber && formik.errors.phoneNumber 
//                 ? 'border-red-500' 
//                 : 'border-[#2a2a2a]'
//             } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
//           />
//           <p className="text-sm text-[#666] mt-2">Must be 11 digits (no spaces or dashes)</p>
//         </div>
//       </form>
//     </section>
//   );
// }


"use client";

import SectionHeader from "@/components/layout/sectionHeader";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { ContactInfo } from "@/app/checkout/page";

interface ContactInformationProps {
  contactInfo: ContactInfo;
  setContactInfo: (info: ContactInfo) => void;
  isProcessing?: boolean;
  title?: string;
  description?: string;
}

// Country codes list
const countryCodes = [
  { code: "+234", country: "Nigeria", flag: "🇳🇬" },
  { code: "+233", country: "Ghana", flag: "🇬🇭" },
  { code: "+254", country: "Kenya", flag: "🇰🇪" },
  { code: "+27", country: "South Africa", flag: "🇿🇦" },
  { code: "+256", country: "Uganda", flag: "🇺🇬" },
  { code: "+255", country: "Tanzania", flag: "🇹🇿" },
  { code: "+225", country: "Ivory Coast", flag: "🇨🇮" },
  { code: "+221", country: "Senegal", flag: "🇸🇳" },
  { code: "+251", country: "Ethiopia", flag: "🇪🇹" },
  { code: "+20", country: "Egypt", flag: "🇪🇬" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+1", country: "USA", flag: "🇺🇸" },
  { code: "+39", country: "Italy", flag: "🇮🇹" },
];

// Validation Schema - simplified for phone
const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required"),
});

export default function ContactInformation({ 
  contactInfo, 
  setContactInfo,
  isProcessing = false,
  title = "Contact Information",
  description = "Fill-out the details of the recipient of this ticket"
}: ContactInformationProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [city, setCity] = useState(""); 
  const [countryCode, setCountryCode] = useState("+234"); // Default to Nigeria

  const formik = useFormik({
    initialValues: contactInfo,
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setContactInfo(values);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsSubmitting(false);
    },
    enableReinitialize: true,
  });

  // Sync Formik values to parent state on every change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    const { name, value } = e.target;
    setContactInfo({ ...contactInfo, [name]: value });
  };

  // Handle phone number - NO restrictions, NO stripping
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Update formik and parent state
    formik.setFieldValue('phoneNumber', value);
    setContactInfo({ ...contactInfo, phoneNumber: value });
  };

  // Show validation errors on blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    formik.handleBlur(e);
    const { name } = e.target;
    if (formik.errors[name as keyof typeof formik.errors]) {
      console.log(`Validation error for ${name}:`, formik.errors[name as keyof typeof formik.errors]);
    }
  };

  return (
    <section className="bg-[#151515] px-4 py-6 rounded-2xl">
      <SectionHeader
        title={title}
        description={description}
        align="left"
      />
      
      <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full rounded-xl">
        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-md text-[#b3b3b3]">First Name</p>
            {formik.touched.firstName && formik.errors.firstName && (
              <span className="text-red-500 text-sm">{formik.errors.firstName}</span>
            )}
          </div>
          <input
            type="text"
            name="firstName"
            value={formik.values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g John"
            disabled={isProcessing}
            className={`bg-[#0f0f0f] py-3 px-4 rounded-xl w-full border ${
              formik.touched.firstName && formik.errors.firstName 
                ? 'border-red-500' 
                : 'border-[#2a2a2a]'
            } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-md text-[#b3b3b3]">Last Name</p>
            {formik.touched.lastName && formik.errors.lastName && (
              <span className="text-red-500 text-sm">{formik.errors.lastName}</span>
            )}
          </div>
          <input
            type="text"
            name="lastName"
            value={formik.values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g Doe"
            disabled={isProcessing}
            className={`bg-[#0f0f0f] py-3 px-4 rounded-xl w-full border ${
              formik.touched.lastName && formik.errors.lastName 
                ? 'border-red-500' 
                : 'border-[#2a2a2a]'
            } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
        </div>

        <div className="col-span-1 lg:col-span-2">
          <div className="flex justify-between items-center mb-2">
            <p className="text-md text-[#b3b3b3]">Email Address</p>
            {formik.touched.email && formik.errors.email && (
              <span className="text-red-500 text-sm">{formik.errors.email}</span>
            )}
          </div>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g john@gmail.com"
            disabled={isProcessing}
            className={`bg-[#0f0f0f] py-3 px-4 rounded-xl w-full border ${
              formik.touched.email && formik.errors.email 
                ? 'border-red-500' 
                : 'border-[#2a2a2a]'
            } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
        </div>

        {/* City Field - Dummy (not submitted to backend) */}
        <div className="col-span-1 lg:col-span-2">
          <div className="flex justify-between items-center mb-2">
            <p className="text-md text-[#b3b3b3]">City</p>
          </div>
          <input
            type="text"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g Lagos"
            disabled={isProcessing}
            className={`bg-[#0f0f0f] py-3 px-4 rounded-xl w-full border border-[#2a2a2a] ${
              isProcessing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          />
        </div>

        {/* Phone Number with Country Code Dropdown */}
        <div className="col-span-1 lg:col-span-2">
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg text-[#b3b3b3]">Phone Number</p>
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <span className="text-red-500 text-sm">{formik.errors.phoneNumber}</span>
            )}
          </div>
          <div className="flex gap-2">
            {/* Country Code Dropdown */}
            <div className="relative">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                disabled={isProcessing}
                className="bg-[#cca33a] text-black font-semibold py-3 px-3 pr-8 rounded-xl border border-[#2a2a2a] appearance-none cursor-pointer h-full"
                style={{ minWidth: "100px" }}
              >
                {countryCodes.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.code}
                  </option>
                ))}
              </select>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Phone Number Input */}
            <input
              type="tel"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={handlePhoneChange}
              onBlur={handleBlur}
              placeholder="0908021860"
              disabled={isProcessing}
              className={`bg-[#0f0f0f] py-3 px-4 rounded-xl flex-1 border ${
                formik.touched.phoneNumber && formik.errors.phoneNumber 
                  ? 'border-red-500' 
                  : 'border-[#2a2a2a]'
              } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
          </div>
          <p className="text-sm text-[#666] mt-2">Selected country code: {countryCode}</p>
        </div>
      </form>
    </section>
  );
}