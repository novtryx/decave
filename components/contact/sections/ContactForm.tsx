

"use client"

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CardWithoutImage from "@/components/layout/CardWithoutImage";
import SectionHeader from "@/components/layout/sectionHeader";
import { contactCardData } from "@/lib/data";
import { MdOutlineMail, MdOutlineMessage } from "react-icons/md";
import Button from "@/components/layout/Button";
import { LuSend } from "react-icons/lu";

// Validation Schema
const validationSchema = Yup.object({
    fullName: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .required("Full name is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    phoneNumber: Yup.string()
        .matches(/^[0-9]{11}$/, "Phone number must be 11 digits")
        .required("Phone number is required"),
    inquiryType: Yup.string()
        .notOneOf(["Select a Category"], "Please select an inquiry type")
        .required("Inquiry type is required"),
    message: Yup.string()
        .min(10, "Message must be at least 10 characters")
        .required("Message is required"),
});

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            phoneNumber: "",
            inquiryType: "Select a Category",
            message: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsSubmitting(true);
            
            // Console log the values
            console.log("Form Submitted:", values);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setIsSubmitting(false);
            
            // Optional: Reset form after submission
            // formik.resetForm();
        },
    });

    return (
        <section className="px-4 lg:px-16 h-auto w-full">
            <SectionHeader 
                label="SEND US A MESSAGE"
                title="Contact Form"
                iconColor="#0854a7"
                description="Fill out the form and we'll get back to you within 24 - 48 hours."
                icon={MdOutlineMessage}
            />
            
            <form 
                onSubmit={formik.handleSubmit}
                className="bg-[#151515] grid grid-cols-1 lg:grid-cols-2 gap-4 w-full mx-auto p-4 lg:p-10 rounded-xl max-w-5xl"
            >
                {/* name */}
                <div className="">
                    <p className="text-md text-[#b3b3b3] mb-2">Full Name</p>
                    <input 
                        type="text"
                        name="fullName"
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`bg-[#0f0f0f] py-3 px-4 rounded-xl w-full border ${
                            formik.touched.fullName && formik.errors.fullName
                                ? "border-red-500"
                                : "border-[#2a2a2a]"
                        }`}
                        placeholder="e.g John Doe"
                    />
                    {formik.touched.fullName && formik.errors.fullName && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.fullName}</p>
                    )}
                </div>

                {/* email */}
                <div className="">
                    <p className="text-md text-[#b3b3b3] mb-2">Email Address</p>
                    <input 
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`bg-[#0f0f0f] py-3 px-4 rounded-xl w-full border ${
                            formik.touched.email && formik.errors.email
                                ? "border-red-500"
                                : "border-[#2a2a2a]"
                        }`}
                        placeholder="e.g John@gmail.com"
                    />
                    {formik.touched.email && formik.errors.email && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                    )}
                </div>

                {/* phone number */}
                <div className="">
                    <p className="text-lg text-[#b3b3b3] mb-2">Phone Number</p>
                    <input 
                        type="text"
                        name="phoneNumber"
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`bg-[#0f0f0f] py-3 px-4 rounded-xl w-full border ${
                            formik.touched.phoneNumber && formik.errors.phoneNumber
                                ? "border-red-500"
                                : "border-[#2a2a2a]"
                        }`}
                        placeholder="e.g 09030203546"
                    />
                    {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.phoneNumber}</p>
                    )}
                </div>

                {/* inquiry type */}
                <div className="">
                    <p className="text-md text-[#b3b3b3] mb-2">Inquiry Type</p>
                    <select
                        name="inquiryType"
                        value={formik.values.inquiryType}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`bg-[#0f0f0f] py-3 px-4 rounded-xl w-full border ${
                            formik.touched.inquiryType && formik.errors.inquiryType
                                ? "border-red-500"
                                : "border-[#2a2a2a]"
                        }`}
                    >
                        <option>Select a Category</option>
                        <option>Media Inquiries</option>
                        <option>Sponsorship & Partnerships</option>
                        <option>Ticket Support</option>
                    </select>
                    {formik.touched.inquiryType && formik.errors.inquiryType && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.inquiryType}</p>
                    )}
                </div>

                {/* Message */}
                <div className="col-span-1 lg:col-span-2">
                    <p className="text-md text-[#b3b3b3] mb-2">Message</p>
                    <textarea
                        name="message"
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`bg-[#0f0f0f] min-h-32 h-auto py-3 px-4 rounded-xl w-full border ${
                            formik.touched.message && formik.errors.message
                                ? "border-red-500"
                                : "border-[#2a2a2a]"
                        }`}
                        placeholder="Tell us more about your inquiry"
                    />
                    {formik.touched.message && formik.errors.message && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="col-span-1 lg:col-span-2">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        icon={LuSend}
                    >
                        Send Message
                    </Button>
                </div>
                <p className="text-[#b3b3b3] w-full">By submitting this form, you agree to our Privacy Policy and Terms of Service.</p>
            </form>

            {/* Contact Cards */}
            <div className="border-t border-[#2a2a2a] py-10 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-3">
                {contactCardData.map((item) => (
                    <CardWithoutImage 
                        key={item.id}
                        icon={item.icon}
                        title={item.title}
                        description={item.description}
                        titleColor='#F9F7F4'
                    >
                        <div className="flex gap-2">
                            <MdOutlineMail className="text-[#cca33a]" size={20} />
                            <span className="text-sm text-[#cca33a]">{item.email}</span>
                        </div>
                    </CardWithoutImage>
                ))}
            </div>
        </section>
    )
}