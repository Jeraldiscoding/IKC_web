import Image from "next/image";
import type { Educator } from "@/content/educators";

export function EducatorCard({ educator }: { educator: Educator }) {
  return (
    <article className="grid gap-6 rounded-3xl border border-cream-dark bg-white p-8 shadow-soft sm:grid-cols-[auto_1fr] sm:gap-8">
      <div className="flex justify-center">
        {educator.photo ? (
          <div className="relative h-28 w-28 overflow-hidden rounded-full border border-cream-dark">
            <Image
              src={educator.photo}
              alt={`Portrait of ${educator.name}, ${educator.title}`}
              fill
              sizes="112px"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-terracotta/10">
            <span className="font-heading text-2xl font-bold text-terracotta">
              {educator.initials}
            </span>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-2xl">{educator.name}</h3>
        <p className="mt-1 font-semibold text-terracotta">{educator.title}</p>
        {educator.bio.map((para, i) => (
          <p key={i} className="mt-3 text-sm">
            {para}
          </p>
        ))}
        <ul className="mt-5 flex flex-wrap gap-2">
          {educator.specialties.map((s) => (
            <li
              key={s}
              className="rounded-full bg-cream-dark px-3 py-1 text-xs font-semibold text-ink"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
