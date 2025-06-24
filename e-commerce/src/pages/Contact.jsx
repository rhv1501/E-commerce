import React, { useState, useContext, useRef } from "react";
import Navbar from "../components/Navbar/Navbar";
import { UIContext } from "../context/UI Context/UIContext";
import emailjs from "@emailjs/browser";

// EMAILJS SETUP INSTRUCTIONS:
// 1. Create an account at https://www.emailjs.com/
// 2. Create a new Email Service (Gmail, Outlook, etc.)
// 3. Create an email template with template variables: {{user_name}}, {{user_email}}, {{subject}}, {{message}}
// 4. Get your Service ID, Template ID, and Public Key from the EmailJS dashboard
// 5. Replace the placeholder values in the sendForm method below

const Contact = () => {
  const { darkMode } = useContext(UIContext);
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name === "user_name"
        ? "name"
        : e.target.name === "user_email"
        ? "email"
        : e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // EmailJS send form
    // Replace these with your actual EmailJS service, template, and user IDs from your EmailJS dashboard
    emailjs
      .sendForm(
        "YOUR_SERVICE_ID", // Replace with your Service ID
        "YOUR_TEMPLATE_ID", // Replace with your Template ID
        formRef.current,
        "YOUR_PUBLIC_KEY" // Replace with your Public Key
      )
      .then((result) => {
        console.log("Email successfully sent!", result.text);
        setSubmitted(true);
        setLoading(false);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      })
      .catch((error) => {
        console.error("Failed to send email:", error.text);
        setError("Failed to send your message. Please try again later.");
        setLoading(false);
      });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-28 pb-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-500 mb-6 animate-pulse">
              Contact <span className="text-[#94bbe9]">PKG IT</span>
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              Have questions or feedback? We're here to help and would love to
              hear from you.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Contact Information */}
            <div className="lg:w-1/3">
              <div
                className={`${
                  darkMode
                    ? "bg-black/30"
                    : "bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]"
                } p-8 rounded-3xl shadow-2xl shadow-[#94bbe9] h-full`}
              >
                <h2 className="text-3xl font-bold text-white mb-8">
                  Get In Touch
                </h2>

                <div className="space-y-6">
                  <ContactInfo
                    icon="📍"
                    title="Our Location"
                    detail="123 Commerce Way, Tech Park, Silicon Valley, CA 94000"
                  />

                  <ContactInfo
                    icon="📞"
                    title="Phone Number"
                    detail="+1 (555) 123-4567"
                  />

                  <ContactInfo
                    icon="✉️"
                    title="Email Address"
                    detail="support@pkgit.com"
                  />

                  <ContactInfo
                    icon="🕒"
                    title="Operating Hours"
                    detail="Monday - Friday: 9AM - 6PM PST"
                  />
                </div>

                {/* Social Media */}
                <div className="mt-10">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Connect With Us
                  </h3>
                  <div className="flex gap-4">
                    <SocialButton icon="facebook" />
                    <SocialButton icon="twitter" />
                    <SocialButton icon="instagram" />
                    <SocialButton icon="linkedin" />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form with EmailJS integration */}
            <div className="lg:w-2/3">
              <div
                className={`${
                  darkMode
                    ? "bg-black/30"
                    : "bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]"
                } p-8 rounded-3xl shadow-2xl shadow-[#94bbe9]`}
              >
                <h2 className="text-3xl font-bold text-white mb-6">
                  Send Us a Message
                </h2>

                {submitted ? (
                  <div className="bg-green-600/20 p-8 rounded-xl border border-green-500 text-center">
                    <div className="text-6xl mb-4">✅</div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Thank You!
                    </h3>
                    <p className="text-gray-300 mb-6">
                      Your message has been received. We'll get back to you as
                      soon as possible.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/50 hover:bg-indigo-700 transition-all duration-300"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-white mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="user_name" // This name must match your EmailJS template variable
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-gray-100/10 border border-gray-700 focus:border-[#94bbe9] focus:ring-2 focus:ring-[#94bbe9] outline-none transition-colors text-white"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-white mb-2"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="user_email" // This name must match your EmailJS template variable
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-gray-100/10 border border-gray-700 focus:border-[#94bbe9] focus:ring-2 focus:ring-[#94bbe9] outline-none transition-colors text-white"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-white mb-2"
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject" // This name must match your EmailJS template variable
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-gray-100/10 border border-gray-700 focus:border-[#94bbe9] focus:ring-2 focus:ring-[#94bbe9] outline-none transition-colors text-white"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-white mb-2"
                      >
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message" // This name must match your EmailJS template variable
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg bg-gray-100/10 border border-gray-700 focus:border-[#94bbe9] focus:ring-2 focus:ring-[#94bbe9] outline-none transition-colors text-white resize-none"
                        placeholder="Please describe your question or concern in detail..."
                      />
                    </div>

                    {/* Error message display */}
                    {error && (
                      <div className="bg-red-600/20 p-4 rounded-xl border border-red-500 text-white">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/50 hover:bg-indigo-700 transition-all duration-300 disabled:bg-indigo-400 disabled:cursor-not-allowed flex justify-center items-center"
                    >
                      {loading ? (
                        <>
                          <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></span>
                          Sending...
                        </>
                      ) : (
                        "Submit Message"
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-16">
            <div
              className={`${
                darkMode
                  ? "bg-black/30"
                  : "bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]"
              } p-8 rounded-3xl shadow-2xl shadow-[#94bbe9]`}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Find Us</h2>
              <div className="aspect-[16/9] w-full rounded-xl overflow-hidden">
                <div className="w-full h-full bg-gray-800/50 flex items-center justify-center">
                  <p className="text-gray-400 text-center px-4">
                    [Map Placeholder] - In a real implementation, you would
                    embed a Google Maps iframe or other map service here
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <div
              className={`${
                darkMode
                  ? "bg-black/30"
                  : "bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]"
              } p-8 rounded-3xl shadow-2xl shadow-[#94bbe9]`}
            >
              <h2 className="text-3xl font-bold text-white mb-10 text-center">
                Frequently Asked Questions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FaqItem
                  question="How long does shipping take?"
                  answer="Standard shipping typically takes 3-5 business days within the US. International shipping can take 7-14 business days depending on the destination."
                />
                <FaqItem
                  question="What is your return policy?"
                  answer="We offer a 30-day satisfaction guarantee. If you're not completely satisfied, you can return items in their original condition for a full refund."
                />
                <FaqItem
                  question="Do you ship internationally?"
                  answer="Yes, we ship to over 90 countries worldwide. Shipping costs and delivery times vary depending on location."
                />
                <FaqItem
                  question="How can I track my order?"
                  answer="Once your order ships, you'll receive a tracking number via email that you can use to monitor your package's journey."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Contact Information Item Component
const ContactInfo = ({ icon, title, detail }) => {
  return (
    <div className="flex gap-4">
      <div className="text-3xl">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-gray-300">{detail}</p>
      </div>
    </div>
  );
};

// Social Media Button Component
const SocialButton = ({ icon }) => {
  const iconMap = {
    facebook: "📘",
    twitter: "📙",
    instagram: "📸",
    linkedin: "📊",
  };

  return (
    <button className="w-12 h-12 rounded-full bg-indigo-600/30 flex items-center justify-center text-white hover:bg-indigo-500 transition-colors duration-300">
      {iconMap[icon]}
    </button>
  );
};

// FAQ Item Component
const FaqItem = ({ question, answer }) => {
  return (
    <div className="p-6 bg-black/20 rounded-xl hover:shadow-md hover:shadow-[#94bbe9] transition-all duration-300">
      <h3 className="text-xl font-bold text-white mb-3">{question}</h3>
      <p className="text-gray-300">{answer}</p>
    </div>
  );
};

export default Contact;
