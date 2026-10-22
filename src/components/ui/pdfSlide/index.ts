import dynamic from "next/dynamic";

// PDF.js requires browser APIs (for example DOMMatrix); do not evaluate it on the server.
export const PdfSlide = dynamic(
  () => import("./PdfSlide").then((module) => module.PdfSlide),
  { ssr: false }
);
export type { PdfSlideProps } from "./PdfSlide";
