import Link from "next/link";
import { Mail, MapPin, Clock, AtSign } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-cream-dark bg-cream-dark/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="font-heading text-lg font-bold text-terracotta">
            {siteConfig.name}
          </p>
          <p className="mt-2 text-sm text-ink-muted">{siteConfig.tagline}</p>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-ink">Explore</h4>
          <ul className="mt-3 space-y-2">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-ink-muted hover:text-terracotta">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-ink">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-terracotta" aria-hidden />
              <span>{siteConfig.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-terracotta" aria-hidden />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-terracotta">
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-terracotta" aria-hidden />
              <span>{siteConfig.hours}</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-ink">Follow</h4>
          <a
            href={siteConfig.instagram}
            className="mt-3 inline-flex items-center gap-2 text-sm text-ink-muted hover:text-terracotta"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AtSign className="h-4 w-4 text-terracotta" aria-hidden />
            Instagram
          </a>
        </div>
      </div>

      <div className="border-t border-cream-dark px-5 py-4">
        <p className="mx-auto max-w-6xl text-xs text-ink-muted">
          © {new Date().getFullYear()} {siteConfig.name}. A registered business in Singapore.
        </p>
      </div>
    </footer>
  );
}
