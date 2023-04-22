import { FC } from "react";

import { Icon } from "@/components/ui/icon";

type SlideControlBarProps = {
  currentPage: number;
  numPages: number;
  turnToNextPage: () => void;
  turnToPrevPage: () => void;
  turnToFirstPage: () => void;
  turnToLastPage: () => void;
  pdfDownloadUrl: string;
};

export const SlideControlBar: FC<SlideControlBarProps> = ({
  currentPage,
  numPages,
  turnToPrevPage,
  turnToNextPage,
  turnToFirstPage,
  turnToLastPage,
  pdfDownloadUrl,
}) => {
  const percentage = (currentPage / (numPages - 1)) * 100;
  return (
    <div className={" w-full "}>
      <div className={"h-2 bg-gray-200"}>
        <div
          className={"h-2 bg-cyan-700"}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div
        className={"relative flex items-center justify-center bg-gray-100 p-1"}
      >
        <button
          className={"mx-2"}
          onClick={turnToFirstPage}
          title={"turn to first page"}
        >
          <Icon fontStyle={"solid"} name={"angles-left"} />
        </button>
        <button
          className={"mx-2"}
          onClick={turnToPrevPage}
          title={"turn to previous page"}
        >
          <Icon fontStyle={"solid"} name={"angle-left"} />
        </button>
        <span
          className={"mx-2 inline-block w-12 whitespace-nowrap text-center"}
        >{`${currentPage + 1} / ${numPages}`}</span>
        <button
          className={"mx-2"}
          onClick={turnToNextPage}
          title={"turn to next page"}
        >
          <Icon fontStyle={"solid"} name={"angle-right"} />
        </button>
        <button
          className={"mx-2"}
          onClick={turnToLastPage}
          title={"turn to last page"}
        >
          <Icon fontStyle={"solid"} name={"angles-right"} />
        </button>
        <a
          className={"absolute right-0 mx-2"}
          href={pdfDownloadUrl}
          download
          target={"_blank"}
          title={"download pdf file"}
        >
          <Icon fontStyle={"solid"} name={"file-arrow-down"} />
        </a>
      </div>
    </div>
  );
};
