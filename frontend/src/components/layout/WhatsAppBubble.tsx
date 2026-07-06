"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { waLink } from "@/lib/site-config";

export function WhatsAppBubble() {
  return (
    <motion.a
      href={waLink("Hi IKC, I need some help — I'd like to ask about your classes.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Need help? Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-heading font-semibold text-white shadow-soft-lg"
      animate={{ scale: [1, 1.06, 1] }}
      transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle className="h-5 w-5" aria-hidden />
      <span className="hidden sm:inline">Need help? Chat with us</span>
    </motion.a>
  );
}
