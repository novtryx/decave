// "use client";

// import SectionHeader from "@/components/layout/sectionHeader";
// import { useFormik } from "formik";
// import { useState, useEffect } from "react";
// import * as Yup from "yup";
// import { ContactInfo } from "@/app/checkout/page";

// interface ContactInformationProps {
//   contactInfo: ContactInfo;
//   setContactInfo: (info: ContactInfo) => void;
//   isProcessing?: boolean;
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
//   isProcessing = false 
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
//         title="Contact Information"
//         description="Fill-out the details of the recipient of this ticket"
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
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { ContactInfo } from "@/app/checkout/page";

interface ContactInformationProps {
  contactInfo: ContactInfo;
  setContactInfo: (info: ContactInfo) => void;
  isProcessing?: boolean;
  title?: string;
  description?: string;
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
  isProcessing = false,
  title = "Contact Information",
  description = "Fill-out the details of the recipient of this ticket"
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