// import Button from "@/components/layout/Button";
// import SectionHeader from "@/components/layout/sectionHeader";
// import { useFormik } from "formik";
// import { useState } from "react";
// import * as Yup from "yup";

// // Validation Schema
// const validationSchema = Yup.object({
//     firstName: Yup.string()
//         .min(2, "Name must be at least 2 characters")
//         .required("First name is required"),
//     lastName: Yup.string()
//         .min(2, "Name must be at least 2 characters")
//         .required("last name is required"),
//     email: Yup.string()
//         .email("Invalid email address")
//         .required("Email is required"),
//     phoneNumber: Yup.string()
//         .matches(/^[0-9]{11}$/, "Phone number must be 11 digits")
//         .required("Phone number is required"),
// });

// export default function ContactInformation() {

//      const [isSubmitting, setIsSubmitting] = useState(false);
    
//         const formik = useFormik({
//             initialValues: {
//                 firstName: "",
//                 lastName: "",
//                 email: "",
//                 phoneNumber: "",
//             },
//             validationSchema,
//             onSubmit: async (values) => {
//                 setIsSubmitting(true);
                
//                 // Console log the values
//                 console.log("Form Submitted:", values);
                
//                 // Simulate API call
//                 await new Promise(resolve => setTimeout(resolve, 1000));
                
//                 setIsSubmitting(false);
                
//             },
//         });
    
//     return (
//         <section className="bg-[#151515] px-4 py-2 rounded-2xl">
//             <SectionHeader
//                 title="Contact Information"
//                 description="Fill-out the details of the recipient of this ticket"
//                 align="left"
//             />

//             <form 
//                 onSubmit={formik.handleSubmit}
//                 className="bg-[#151515] grid grid-cols-1 lg:grid-cols-2 gap-6 w-full rounded-xl "
//             >
//                 {/* first name */}
//                 <div className="">
//                     <p className="text-md text-[#b3b3b3] mb-2">First Name</p>
//                     <input 
//                         type="text"
//                         name="firstName"
//                         value={formik.values.firstName}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         className={`bg-[#0f0f0f] py-3 px-4 rounded-xl w-full border ${
//                             formik.touched.firstName && formik.errors.firstName
//                                 ? "border-red-500"
//                                 : "border-[#2a2a2a]"
//                         }`}
//                         placeholder="e.g Doe"
//                     />
//                     {formik.touched.firstName && formik.errors.firstName && (
//                         <p className="text-red-500 text-sm mt-1">{formik.errors.firstName}</p>
//                     )}
//                 </div>

//                 {/* first name */}
//                 <div className="">
//                     <p className="text-md text-[#b3b3b3] mb-2">Last Name</p>
//                     <input 
//                         type="text"
//                         name="lastName"
//                         value={formik.values.lastName}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         className={`bg-[#0f0f0f] py-3 px-4 rounded-xl w-full border ${
//                             formik.touched.lastName && formik.errors.lastName
//                                 ? "border-red-500"
//                                 : "border-[#2a2a2a]"
//                         }`}
//                         placeholder="e.g John"
//                     />
//                     {formik.touched.lastName && formik.errors.lastName && (
//                         <p className="text-red-500 text-sm mt-1">{formik.errors.lastName}</p>
//                     )}
//                 </div>

//                 {/* email */}
//                 <div className="col-span-1 lg:col-span-2">
//                     <p className="text-md text-[#b3b3b3] mb-2">Email Address</p>
//                     <input 
//                         type="email"
//                         name="email"
//                         value={formik.values.email}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         className={`bg-[#0f0f0f] py-3 px-4 rounded-xl w-full border ${
//                             formik.touched.email && formik.errors.email
//                                 ? "border-red-500"
//                                 : "border-[#2a2a2a]"
//                         }`}
//                         placeholder="e.g John@gmail.com"
//                     />
//                     {formik.touched.email && formik.errors.email && (
//                         <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
//                     )}
//                     <p className="mt-2 text-[#b3b3b3] text-sm">Your ticket will be sent to this email</p>
//                 </div>

//                 {/* phone number */}
//                 <div className="col-span-1 lg:col-span-2">
//                     <p className="text-lg text-[#b3b3b3] mb-2">Phone Number</p>
//                     <input 
//                         type="text"
//                         name="phoneNumber"
//                         value={formik.values.phoneNumber}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         className={`bg-[#0f0f0f] py-3 px-4 rounded-xl w-full border ${
//                             formik.touched.phoneNumber && formik.errors.phoneNumber
//                                 ? "border-red-500"
//                                 : "border-[#2a2a2a]"
//                         }`}
//                         placeholder="e.g 09030203546"
//                     />
//                     {formik.touched.phoneNumber && formik.errors.phoneNumber && (
//                         <p className="text-red-500 text-sm mt-1">{formik.errors.phoneNumber}</p>
//                     )}
//                 </div>
//                 {/* Submit Button
//                 <div className="col-span-1 lg:col-span-2">
//                     <Button
//                         type="submit"
//                         disabled={isSubmitting}
//                         icon={LuSend}
//                     >
//                         Send Message
//                     </Button>
//                 </div> */}
//                 <div className="col-span-1 lg:col-span-2 w-full border-t border-[#2a2a2a] py-6">
//                     <p className="text-[#b3b3b3] text-lg w-full lg:w-[65%]">By proceeding payment, you agree to the <span className="text-[#cca33a]">Terms & Conditions</span> and <span className="text-[#cca33a]">Privacy  Policy.</span></p>
//                 </div>
//             </form>
//         </section>
//     )
// }


// import SectionHeader from "@/components/layout/sectionHeader";
// import { useFormik } from "formik";
// import { useState } from "react";
// import * as Yup from "yup";
// import { ContactInfo } from "@/app/checkout/page";

// interface ContactInformationProps {
//   contactInfo: ContactInfo;
//   setContactInfo: (info: ContactInfo) => void;
// }



// Validation Schema
// const validationSchema = Yup.object({
//     firstName: Yup.string()
//         .min(2, "Name must be at least 2 characters")
//         .required("First name is required"),
//     lastName: Yup.string()
//         .min(2, "Name must be at least 2 characters")
//         .required("last name is required"),
//     email: Yup.string()
//         .email("Invalid email address")
//         .required("Email is required"),
//     phoneNumber: Yup.string()
//         .matches(/^[0-9]{11}$/, "Phone number must be 11 digits")
//         .required("Phone number is required"),
// });

// export default function ContactInformation({ contactInfo, setContactInfo }: ContactInformationProps) {

//      const [isSubmitting, setIsSubmitting] = useState(false);
    
//         const formik = useFormik({
//             initialValues: contactInfo,
//             validationSchema,
//             onSubmit: async (values) => {
//                 setIsSubmitting(true);

                
//                 // Update parent state
//                 setContactInfo(values);
                
//                 // Console log the values
//                 console.log("Form Submitted:", values);
                
//                 // Simulate API call
//                 await new Promise(resolve => setTimeout(resolve, 1000));
                
//                 setIsSubmitting(false);
                
//             },
//         });
    
//     return (
//         <section className="bg-[#151515] px-4 py-2 rounded-2xl">
//             <SectionHeader
//                 title="Contact Information"
//                 description="Fill-out the details of the recipient of this ticket"
//                 align="left"
//             />

//             <form 
//                 onSubmit={formik.handleSubmit}
//                 className="bg-[#151515] grid grid-cols-1 lg:grid-cols-2 gap-6 w-full rounded-xl "
//             >
//                 {/* first name */}
//                 <div className="">
//                     <p className="text-md text-[#b3b3b3] mb-2">First Name</p>
//                     <input 
//                         type="text"
//                         name="firstName"
//                         value={formik.values.firstName}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         className={`bg-[#0f0f0f] py-3 px-4 rounded-xl w-full border ${
//                             formik.touched.firstName && formik.errors.firstName
//                                 ? "border-red-500"
//                                 : "border-[#2a2a2a]"
//                         }`}
//                         placeholder="e.g Doe"
//                     />
//                     {formik.touched.firstName && formik.errors.firstName && (
//                         <p className="text-red-500 text-sm mt-1">{formik.errors.firstName}</p>
//                     )}
//                 </div>

//                 {/* first name */}
//                 <div className="">
//                     <p className="text-md text-[#b3b3b3] mb-2">Last Name</p>
//                     <input 
//                         type="text"
//                         name="lastName"
//                         value={formik.values.lastName}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         className={`bg-[#0f0f0f] py-3 px-4 rounded-xl w-full border ${
//                             formik.touched.lastName && formik.errors.lastName
//                                 ? "border-red-500"
//                                 : "border-[#2a2a2a]"
//                         }`}
//                         placeholder="e.g John"
//                     />
//                     {formik.touched.lastName && formik.errors.lastName && (
//                         <p className="text-red-500 text-sm mt-1">{formik.errors.lastName}</p>
//                     )}
//                 </div>

//                 {/* email */}
//                 <div className="col-span-1 lg:col-span-2">
//                     <p className="text-md text-[#b3b3b3] mb-2">Email Address</p>
//                     <input 
//                         type="email"
//                         name="email"
//                         value={formik.values.email}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         className={`bg-[#0f0f0f] py-3 px-4 rounded-xl w-full border ${
//                             formik.touched.email && formik.errors.email
//                                 ? "border-red-500"
//                                 : "border-[#2a2a2a]"
//                         }`}
//                         placeholder="e.g John@gmail.com"
//                     />
//                     {formik.touched.email && formik.errors.email && (
//                         <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
//                     )}
//                     <p className="mt-2 text-[#b3b3b3] text-sm">Your ticket will be sent to this email</p>
//                 </div>

//                 {/* phone number */}
//                 <div className="col-span-1 lg:col-span-2">
//                     <p className="text-lg text-[#b3b3b3] mb-2">Phone Number</p>
//                     <input 
//                         type="text"
//                         name="phoneNumber"
//                         value={formik.values.phoneNumber}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         className={`bg-[#0f0f0f] py-3 px-4 rounded-xl w-full border ${
//                             formik.touched.phoneNumber && formik.errors.phoneNumber
//                                 ? "border-red-500"
//                                 : "border-[#2a2a2a]"
//                         }`}
//                         placeholder="e.g 09030203546"
//                     />
//                     {formik.touched.phoneNumber && formik.errors.phoneNumber && (
//                         <p className="text-red-500 text-sm mt-1">{formik.errors.phoneNumber}</p>
//                     )}
//                 </div>
//                 {/* Submit Button
//                 <div className="col-span-1 lg:col-span-2">
//                     <Button
//                         type="submit"
//                         disabled={isSubmitting}
//                         icon={LuSend}
//                     >
//                         Send Message
//                     </Button>
//                 </div> */}
//                 <div className="col-span-1 lg:col-span-2 w-full border-t border-[#2a2a2a] py-6">
//                     <p className="text-[#b3b3b3] text-lg w-full lg:w-[65%]">By proceeding payment, you agree to the <span className="text-[#cca33a]">Terms & Conditions</span> and <span className="text-[#cca33a]">Privacy  Policy.</span></p>
//                 </div>
//             </form>
//         </section>
//     )
// }

"use client";

import SectionHeader from "@/components/layout/sectionHeader";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { ContactInfo } from "@/app/checkout/page";

interface ContactInformationProps {
  contactInfo: ContactInfo;
  setContactInfo: (info: ContactInfo) => void;
  isProcessing?: boolean;
}

// Validation Schema
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
    .matches(/^[0-9]{11}$/, "Phone number must be 11 digits")
    .required("Phone number is required"),
});

export default function ContactInformation({ 
  contactInfo, 
  setContactInfo,
  isProcessing = false 
}: ContactInformationProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: contactInfo,
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setContactInfo(values);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsSubmitting(false);
    },
    enableReinitialize: true, // Update form when parent state changes
  });

  // Sync Formik values to parent state on every change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    const { name, value } = e.target;
    setContactInfo({ ...contactInfo, [name]: value });
  };

  // Show validation errors on blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    formik.handleBlur(e);
    const { name } = e.target;
    if (formik.errors[name as keyof typeof formik.errors]) {
      // You could show these errors in a more user-friendly way
      console.log(`Validation error for ${name}:`, formik.errors[name as keyof typeof formik.errors]);
    }
  };

  return (
    <section className="bg-[#151515] px-4 py-6 rounded-2xl">
      <SectionHeader
        title="Contact Information"
        description="Fill-out the details of the recipient of this ticket"
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

        <div className="col-span-1 lg:col-span-2">
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg text-[#b3b3b3]">Phone Number</p>
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <span className="text-red-500 text-sm">{formik.errors.phoneNumber}</span>
            )}
          </div>
          <input
            type="tel"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g 09030203546"
            disabled={isProcessing}
            className={`bg-[#0f0f0f] py-3 px-4 rounded-xl w-full border ${
              formik.touched.phoneNumber && formik.errors.phoneNumber 
                ? 'border-red-500' 
                : 'border-[#2a2a2a]'
            } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
          <p className="text-sm text-[#666] mt-2">Must be 11 digits (no spaces or dashes)</p>
        </div>
      </form>
    </section>
  );
}