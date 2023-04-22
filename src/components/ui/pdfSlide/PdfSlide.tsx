import classNames from "classnames";
import {
  createRef,
  FC,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Document, Page, pdfjs } from "react-pdf";

import { SlideControlBar } from "@/components/ui/pdfSlide/SlideControlBar";

// /publicに置いても良いけどめんどかったので
const cMapUrl = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`;
const pdfJsWorker = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

pdfjs.GlobalWorkerOptions.workerSrc = pdfJsWorker;

export type PdfSlideProps = {
  pdfUrl: string;
  width: number;
  height: number;
};

export const PdfSlide: FC<PdfSlideProps> = ({ pdfUrl, height, width }) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [numPages, setNumPages] = useState<number>(0);
  const [initialPageLoaded, setInitialPageLoaded] = useState<boolean>(false);

  const pageRefs = useRef<RefObject<HTMLCanvasElement>[]>([]);
  Array.from(new Array(numPages), (_, i) => i).forEach((i) => {
    pageRefs.current[i] = createRef<HTMLCanvasElement>();
  });

  const turnToPrevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  }, []);

  const turnToNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, numPages - 1));
  }, [numPages]);

  const turnToFirstPage = useCallback(() => {
    setCurrentPage(0);
  }, []);

  const turnToLastPage = useCallback(() => {
    setCurrentPage(numPages - 1);
  }, [numPages]);

  //canvasがロードされてからじゃないとrefが取れない
  useEffect(() => {
    if (!initialPageLoaded) return;
    const canvas = pageRefs.current[currentPage]?.current;

    const calcCursorArea = (
      e: MouseEvent
    ): "left" | "right" | "center" | "out" => {
      const rect = canvas?.getBoundingClientRect();
      if (!rect) return "out";
      if (e.clientX - rect.left < rect.width / 3) {
        return "left";
      }
      if ((rect.width / 3) * 2 < e.clientX - rect.left) {
        return "right";
      }
      return "center";
    };

    const handleClick = (e: MouseEvent) => {
      const area = calcCursorArea(e);
      if (area === "left") {
        turnToPrevPage();
      }
      if (area === "right") {
        turnToNextPage();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (canvas === null) return;
      const area = calcCursorArea(e);
      if (area === "left" || area === "right") {
        canvas.style.cursor = "pointer";
      } else {
        canvas.style.cursor = "default";
      }
    };

    canvas?.addEventListener("click", handleClick);
    canvas?.addEventListener("mousemove", handleMouseMove);
    // ページ切り替え後にもポインタを変えたいのでmouseenterでやる
    canvas?.addEventListener("mouseenter", handleMouseMove);
    return () => {
      canvas?.removeEventListener("click", handleClick);
      canvas?.removeEventListener("mousemove", handleMouseMove);
      canvas?.removeEventListener("mouseenter", handleMouseMove);
    };
  }, [
    initialPageLoaded,
    pageRefs,
    currentPage,
    turnToNextPage,
    turnToPrevPage,
  ]);

  return (
    <div className={"max-w-lg"}>
      <Document
        file={pdfUrl}
        options={{
          cMapUrl: cMapUrl,
          cMapPacked: true,
        }}
        onLoadSuccess={({ numPages }) => {
          console.log("numPages", numPages);
          setNumPages(numPages);
        }}
      >
        {Array.from(new Array(numPages), (_, index) => {
          // 2ページ以上離れている場合は非表示にする
          // 全ページ見たら結局変わらないが、初回ロード時のメモリ節約にはなるはず
          if (2 < Math.abs(currentPage - index)) return undefined;
          const width = 512;
          return (
            <Page
              key={index}
              className={classNames({
                hidden: index !== currentPage,
              })}
              canvasRef={pageRefs.current[index]}
              width={width}
              pageIndex={index}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              onRenderSuccess={() => {
                setInitialPageLoaded(true);
              }}
            />
          );
        })}
      </Document>
      <SlideControlBar
        currentPage={currentPage}
        numPages={numPages}
        turnToPrevPage={turnToPrevPage}
        turnToNextPage={turnToNextPage}
        turnToFirstPage={turnToFirstPage}
        turnToLastPage={turnToLastPage}
        pdfDownloadUrl={pdfUrl}
      />
    </div>
  );
};
