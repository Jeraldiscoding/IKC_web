export type GalleryItem =
  | { kind: "photo"; src: string; alt: string; aspect: string }
  | { kind: "video"; src: string; label: string; aspect: string };

// Aspect ratios are deliberately mixed so the rail reads as a gallery rather
// than a table. `aspect` is a full Tailwind class — never interpolate it.
export const galleryItems: GalleryItem[] = [
  {
    kind: "photo",
    src: "/media/IKC_Photo2.jpeg",
    alt: "A child playing on a numbers-and-roads floor mat in the warm, home-based Inclusive Kids Club learning room",
    aspect: "aspect-[3/4]",
  },
  {
    kind: "photo",
    src: "/media/IKC_Photo1.jpeg",
    alt: "Children exploring colour together in a small-group finger-painting activity at Inclusive Kids Club",
    aspect: "aspect-[4/3]",
  },
  {
    kind: "video",
    src: "/media/IKC_Vid2.mp4",
    label: "A child playing an interactive learning game on the big screen at Inclusive Kids Club",
    aspect: "aspect-[3/4]",
  },
  {
    kind: "photo",
    src: "/media/IKC_Photo3.png",
    alt: "A child working through an addition activity on a large interactive touchscreen at Inclusive Kids Club",
    aspect: "aspect-[4/3]",
  },
];
