import { FC } from "react";
import { Document, Page, pdfjs } from "react-pdf";

const cMapUrl = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`;
const pdfJsWorker = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

pdfjs.GlobalWorkerOptions.workerSrc = pdfJsWorker;

export type PdfSlideProps = {
  pdfUrl: string;
};

export const PdfSlide: FC<PdfSlideProps> = ({ pdfUrl }) => {
  return (
    <div>
      <Document
        file={pdfUrl}
        options={{
          cMapUrl: cMapUrl,
          cMapPacked: true,
        }}
      >
        <Page
          pageNumber={2}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
    </div>
  );
};
