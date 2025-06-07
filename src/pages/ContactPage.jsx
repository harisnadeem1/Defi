import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

const ContactForm = () => {
  const form = useRef();
  const { toast } = useToast();

  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast({
        title: "✅ Message Sent",
        description: "Thank you! We'll get back to you shortly.",
        duration: 4000,
      });

      form.current.reset();
    } catch (error) {
      console.error("Email sending failed:", error);
      toast({
        title: "❌ Sending Failed",
        description: "Please try again later or check your internet connection.",
        variant: "destructive",
        duration: 4000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl p-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-white mb-2 text-center">Contact Us</h2>
        <p className="text-sm text-center mb-6 text-gray-300">
          Have questions or feedback? We’d love to hear from you.
        </p>

        <form ref={form} onSubmit={sendEmail} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Your Name</label>
            <input
              name="from_name"
              required
              className="w-full px-4 py-2 rounded-md border border-white/10 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-primary"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
            <input
              name="reply_to"
              type="email"
              required
              className="w-full px-4 py-2 rounded-md border border-white/10 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-primary"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Your Message</label>
            <textarea
              name="message"
              rows="5"
              required
              className="w-full px-4 py-2 rounded-md border border-white/10 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-primary"
              placeholder="Type your message here..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 rounded-lg transition"
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactForm;
