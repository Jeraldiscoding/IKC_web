export const homeCopy = {
  hero: {
    eyebrow: "DISE-Certified (NIE) SPED Educator",
    h1: "Special needs enrichment, in a warm home-based space in Singapore.",
    highlight: "safe, capable and included",
    lede: "Inclusive Kids Club runs small-group enrichment classes, workshops and school holiday programmes — led by a DISE-certified (NIE) SPED educator who believes every child deserves to feel safe, capable and included.",
    primaryCtaLabel: "Enquire on WhatsApp",
    secondaryCtaLabel: "Explore our classes",
  },
  why: {
    eyebrow: "Why Inclusive Kids Club",
    heading: "Every child deserves a place to feel safe, capable and included",
    intro:
      "That belief shapes everything here — from our small class sizes to the calm, home-based environment we teach in.",
    values: [
      {
        title: "Safe",
        body: "A calm, predictable, home-based environment where children can settle, focus and feel at ease.",
      },
      {
        title: "Capable",
        body: "Learning pitched to each child's pace, so progress feels achievable and every small win is celebrated.",
      },
      {
        title: "Included",
        body: "Small groups where every child belongs, is understood, and takes part — never left on the sidelines.",
      },
    ],
    reasons: [
      { title: "A qualified SPED educator", body: "DISE-certified (NIE) — trained specifically in special needs education." },
      { title: "Genuinely small groups", body: "Calm classes with individualised attention, not a crowded room." },
      { title: "A warm, home-based space", body: "Less clinical and less overwhelming than an institutional centre." },
      { title: "Hands-on, joyful learning", body: "Sensory, play-based activities that build real confidence." },
    ],
  },
  educator: {
    heading: "Led by a DISE-certified (NIE) special needs educator",
    body: "Your child learns with a qualified SPED educator, DISE-certified through Singapore's National Institute of Education (NIE). That means lessons are shaped by real training in special needs education — patient, structured and tailored to how your child learns best.",
    ctaLabel: "Meet your educator",
  },
  day: {
    heading: "A hands-on day at Inclusive Kids Club",
    intro:
      "Sessions blend structure with play — so children build skills without the pressure of a traditional classroom.",
    steps: [
      { title: "Settle in", body: "A calm, familiar start that helps every child feel ready to learn." },
      { title: "Skill-building", body: "Short, focused activities across functional skills and academics." },
      { title: "Hands-on play", body: "Sensory and hands-on tasks — baking, crafts, cooperative games." },
      { title: "Wind down", body: "A gentle close that celebrates the day's wins and progress." },
    ],
  },
  faqPreview: {
    heading: "Questions parents often ask",
    intro: "A few of the things families ask us most — see the full list on our FAQ page.",
  },
  guides: {
    heading: "Guides for special needs parents in Singapore",
    intro:
      "Short, practical reads to help you navigate enrichment, functional skills and support options. Full articles are on the way.",
    topics: [
      "How to choose an enrichment programme for a child with special needs",
      "What is functional skills training, and why does it matter?",
      "The benefits of small-group learning for children with special needs",
    ],
  },
  // TODO(real-data): placeholder quotes. The section is deliberately NOT rendered
  // in app/page.tsx. Replace `quote` and `attribution` with REAL parent words and
  // only then uncomment <TestimonialsSection /> there. Never ship an invented quote.
  testimonials: {
    eyebrow: "Parent voices",
    heading: "What families say",
    items: [
      { quote: "[PLACEHOLDER] Real parent quote goes here.", attribution: "[PLACEHOLDER] Parent name, child's age" },
      { quote: "[PLACEHOLDER] Real parent quote goes here.", attribution: "[PLACEHOLDER] Parent name, child's age" },
      { quote: "[PLACEHOLDER] Real parent quote goes here.", attribution: "[PLACEHOLDER] Parent name, child's age" },
    ],
  },
  // TODO(real-data): every value below is a placeholder. Replace with the real
  // ages, days and times before launch. These are rendered in the UI only —
  // they must never be copied into JSON-LD (see the design spec, §3).
  schedule: {
    eyebrow: "Classes & timings",
    heading: "When classes run",
    intro:
      "Small groups, capped so every child gets individual attention. Tell us your child's age and we'll point you to a suitable slot.",
    note: "Indicative timings — please message us to confirm current availability.",
    groups: [
      { ages: "Ages 4–6", times: "Weekdays, 10:00am – 12:00pm" }, // TODO(real-data)
      { ages: "Ages 7–9", times: "Weekdays, 3:00pm – 5:00pm" }, // TODO(real-data)
      { ages: "Ages 10–12", times: "Saturdays, 9:30am – 11:30am" }, // TODO(real-data)
    ],
    ctaLabel: "Ask about a slot on WhatsApp",
  },
  closing: {
    heading: "Ready to find the right class for your child?",
    body: "Tell us a little about your child and we'll help you find a suitable small-group class, workshop or holiday programme.",
    ctaLabel: "Chat with us on WhatsApp",
  },
} as const;
