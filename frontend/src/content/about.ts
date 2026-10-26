export const aboutCopy = {
  intro: {
    eyebrow: "Who we are",
    heading: "About Inclusive Kids Club",
    lede: "Inclusive Kids Club is a home based enrichment centre in Singapore for children with learning differences, built on a simple belief: Every child deserves a space where they feel safe, capable and included.",
  },
  // Name appears in the educator photo alt text elsewhere; surfaced here for the
  // About hero badge. TODO: confirm the exact name/role wording with the centre.
  founder: {
    name: "Venetia",
    role: "Founder & Lead Educator",
  },
  story: {
    heading: "Why Inclusive Kids Club exists",
    // A pull-quote drawn from the story below — pull-quotes repeat body copy by
    // convention, lifting the single line that matters most.
    pullQuote: "We see each child's potential and support how they learn.",
    // TODO: personalise — replace with the educator's own story and voice.
    paragraphs: [
      "Many families searching for enrichment that supports learning differences in Singapore are met with long waiting lists, large classes, or clinical, institutional settings that can feel overwhelming for a child who learns differently.",
      "Inclusive Kids Club was founded to offer something warmer: small group enrichment in a calm, home based space, led by a qualified educator who sees each child's potential and supports how they learn.",
      "Classes are kept small on purpose, so no child is left on the sidelines, and every session is shaped around how that child learns best. At their own pace, with plenty of patience and encouragement.",
    ],
  },
  different: {
    heading: "What makes Inclusive Kids Club different",
    points: [
      {
        title: "A qualified educator",
        body: "Your child learns with a DISE certified educator trained to adapt lessons for children with a range of learning differences.",
      },
      {
        title: "Genuinely small groups",
        body: "We cap class sizes deliberately so every child gets individualised attention in a calm, unhurried environment.",
      },
      {
        title: "A warm, home based setting",
        body: "Learning happens in a welcoming home based space. Less clinical and less overwhelming than a large institutional centre.",
      },
      {
        title: "Shaped around your child",
        body: "Functional skills, academics and hands on learning are pitched to each child's pace, never one size fits all.",
      },
    ],
  },
  credentials: {
    heading: "What “DISE certified (NIE)” actually means",
    intro:
      "Teaching qualifications can be confusing. Here is what they mean for your child, in plain language.",
    items: [
      {
        term: "DISE: Diploma in Special Education",
        body: "A professional qualification in planning, adapting and delivering lessons for children with a range of learning differences and support needs.",
        takeaway: "Lessons built for how your child actually learns.",
      },
      {
        term: "NIE: National Institute of Education",
        body: "Singapore's national teacher training institute. A qualification earned here meets a recognised national standard.",
        takeaway: "Training you can trust, rigorous and reputable.",
      },
      {
        term: "SPED educator",
        body: "A special education professional trained to understand learning differences and adapt teaching to each child's needs.",
        takeaway: "A specialist in your child's way of learning.",
      },
    ],
  },
  cta: {
    heading: "Come see if we’re the right fit for your child",
    body: "The best way to know is a quick, no pressure chat. Tell us a little about your child and we’ll be honest about whether we can help.",
    ctaLabel: "Chat with us on WhatsApp",
    message: "Hi IKC, I read your About page and I'd like to find out more.",
  },
} as const;
