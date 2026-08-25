"use client"

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CardWithoutImage from "@/components/layout/CardWithoutImage";
import SectionHeader from "@/components/layout/sectionHeader";
import { contactCardData } from "@/lib/data";
import { MdOutlineMail, MdOutlineMessage } from "react-icons/md";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import Button from "@/components/layout/Button";
import { LuSend } from "react-icons/lu";
import { submitContactInquiry } from "@/app/actions/contact"; 

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
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);

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
            setSubmitError(null);

            const res = await submitContactInquiry(values);

            setIsSubmitting(false);

            if (!res.success) {
                setSubmitError(res.error);
                return;
            }

            setSubmitted(true);
            formik.resetForm();
        },
    });

    return (
        <section className="px-4 lg:px-16 h-auto w-full">
            <SectionHeader 
                label="SEND US AN INQUIRY"
                title="Get in Touch"
                iconColor="#CCA33A"
                description="Have a question, a partnership idea, or need help with a ticket? Tell us what's on your mind and our team will get back to you within 24 - 48 hours."
                icon={MdOutlineMessage}
            />

            {submitted ? (
                // Confirmation state — replaces the form entirely so it's
                // unmistakable the inquiry actually went through, rather
                // than a form that just quietly resets.
                <div className="bg-[#151515] w-full mx-auto p-8 lg:p-14 rounded-xl max-w-5xl flex flex-col items-center text-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#CCA33A]/10 border border-[#CCA33A] flex items-center justify-center">
                        <IoCheckmarkCircleOutline className="text-[#CCA33A] text-3xl" />
                    </div>
                    <h3 className="text-[#F9F7F4] text-xl font-semibold">Inquiry sent</h3>
                    <p className="text-[#b3b3b3] max-w-md">
                        Thanks for reaching out — we've received your message and a confirmation is on its way to your inbox.
                        Our team will get back to you within 24 - 48 hours.
                    </p>
                    <button
                        onClick={() => setSubmitted(false)}
                        className="text-[#CCA33A] text-sm underline mt-2"
                    >
                        Send another inquiry
                    </button>
                </div>
            ) : (
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
                        disabled={isSubmitting}
                        className={`bg-[#0f0f0f] py-3 px-4 rounded-xl w-full border disabled:opacity-60 ${
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
                        disabled={isSubmitting}
                        className={`bg-[#0f0f0f] py-3 px-4 rounded-xl w-full border disabled:opacity-60 ${
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
                        disabled={isSubmitting}
                        className={`bg-[#0f0f0f] py-3 px-4 rounded-xl w-full border disabled:opacity-60 ${
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
                    <p className="text-md text-[#b3b3b3] mb-2">What's this about?</p>
                    <select
                        name="inquiryType"
                        value={formik.values.inquiryType}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={isSubmitting}
                        className={`bg-[#0f0f0f] py-3 px-4 rounded-xl w-full border disabled:opacity-60 ${
                            formik.touched.inquiryType && formik.errors.inquiryType
                                ? "border-red-500"
                                : "border-[#2a2a2a]"
                        }`}
                    >
                        <option>Select a Category</option>
                        <option>Media Inquiries</option>
                        <option>Sponsorship & Partnerships</option>
                        <option>Ticket Support</option>
                        <option>General</option>
                    </select>
                    {formik.touched.inquiryType && formik.errors.inquiryType && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.inquiryType}</p>
                    )}
                </div>

                {/* Message */}
                <div className="col-span-1 lg:col-span-2">
                    <p className="text-md text-[#b3b3b3] mb-2">Your Message</p>
                    <textarea
                        name="message"
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={isSubmitting}
                        className={`bg-[#0f0f0f] min-h-32 h-auto py-3 px-4 rounded-xl w-full border disabled:opacity-60 ${
                            formik.touched.message && formik.errors.message
                                ? "border-red-500"
                                : "border-[#2a2a2a]"
                        }`}
                        placeholder="Tell us what's going on — the more detail, the faster we can help."
                    />
                    {formik.touched.message && formik.errors.message && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.message}</p>
                    )}
                </div>

                {submitError && (
                    <div className="col-span-1 lg:col-span-2 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                        {submitError}
                    </div>
                )}

                {/* Submit Button */}
                <div className="col-span-1 lg:col-span-2">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        icon={LuSend}
                    >
                        {isSubmitting ? "Sending..." : "Send Inquiry"}
                    </Button>
                </div>
                <p className="text-[#b3b3b3] w-full">By submitting this form, you agree to our Privacy Policy and Terms of Service.</p>
            </form>
            )}

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