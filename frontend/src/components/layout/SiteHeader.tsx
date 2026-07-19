"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { siteConfig } from "@/lib/site-config";
import { CalendlyPopupButton } from "@/components/CalendlyPopupButton";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-cream-dark backdrop-blur transition-all duration-300 motion-reduce:transition-none ${
        scrolled ? "bg-cream/95 shadow-soft" : "bg-cream/90"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-5 transition-all duration-300 motion-reduce:transition-none ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <Link
          href="/"
          className="flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/media/IKC_Logo.jpeg"
            alt="Inclusive Kids Club logo"
            width={40}
            height={40}
            priority
            className="h-9 w-9 rounded-full object-cover sm:h-13 sm:w-13 object-[center_45%]"
          />
          <span className="font-heading text-lg font-bold text-terracotta sm:text-xl">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-ink hover:text-terracotta"
            >
              {item.label}
            </Link>
          ))}
          <CalendlyPopupButton
            text="Book a consultation"
            className="bg-terracotta text-cream hover:bg-terracotta-dark shadow-soft"
          />
        </nav>

        <button
          type="button"
          className="lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            id="mobile-nav"
            className="overflow-hidden border-t border-cream-dark bg-cream px-5 lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <ul className="flex flex-col gap-3 py-4">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block py-1 font-semibold text-ink hover:text-terracotta"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
