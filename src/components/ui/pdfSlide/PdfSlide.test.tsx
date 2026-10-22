import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { pdfjs } from "react-pdf";
import { describe, expect, it, vi } from "vitest";

import { PdfSlide } from "./PdfSlide";

const documentProps: Array<Record<string, unknown>> = [];
vi.mock("react-pdf", () => ({
  pdfjs: { version: "5.4.296", GlobalWorkerOptions: { workerSrc: "" } },
  Document: (props: Record<string, unknown>) => {
    documentProps.push(props);
    return null;
  },
  Page: () => null,
}));

describe("PdfSlide security configuration", () => {
  it("disables PDF evaluation and pins all assets to the PDF.js version", () => {
    renderToStaticMarkup(
      createElement(PdfSlide, { pdfUrl: "/fixture.pdf", width: "full", height: 384 })
    );
    const options = documentProps[documentProps.length - 1].options;
    expect(options).toEqual({
      isEvalSupported: false,
      cMapPacked: true,
      cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
      standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
      wasmUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/wasm/`,
    });
    expect(pdfjs.GlobalWorkerOptions.workerSrc).toBe(
      `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`
    );
  });
});
