import classNames from "classnames";
import { FC } from "react";

import { Icon } from "@/components/ui/icon";
import { paginateWithFrame } from "@/components/ui/paginationNav/paginateWithFrame";
import { PaginationNavButton } from "@/components/ui/paginationNav/PaginationNavButton";

export type PaginationNavProps = {
  minPage: number;
  maxPage: number;
  currentPage: number;
} & (
  | {
      mode: "link";
      pageHref: (page: number) => string;
    }
  | {
      mode: "button";
      onPageClick: (page: number) => void;
    }
);

export const PaginationNav: FC<PaginationNavProps> = ({
  minPage,
  maxPage,
  currentPage,
  ...props
}) => {
  const omissionSymbol = "...";
  const mdPages = paginateWithFrame({
    firstPage: minPage,
    lastPage: maxPage,
    currentPage: currentPage,
    halfFrameSize: 4,
    omissionSymbol: omissionSymbol,
  });

  const smPages = paginateWithFrame({
    firstPage: minPage,
    lastPage: maxPage,
    currentPage: currentPage,
    halfFrameSize: 2,
    omissionSymbol: omissionSymbol,
  });

  const prevPage = currentPage - 1;
  const prevPageHref =
    minPage <= prevPage && props.mode === "link"
      ? props.pageHref(prevPage)
      : undefined;
  const prevPageClick =
    minPage <= prevPage && props.mode === "button"
      ? () => props.onPageClick(prevPage)
      : undefined;

  const nextPage = currentPage + 1;
  const nextPageHref =
    nextPage <= maxPage && props.mode === "link"
      ? props.pageHref(nextPage)
      : undefined;
  const nextPageClick =
    nextPage <= maxPage && props.mode === "button"
      ? () => props.onPageClick(nextPage)
      : undefined;

  //smの場合は表示ページ数を減らす

  return (
    <nav className={classNames("flex justify-center")}>
      <ul className="flex">
        <li className={"w-10 sm:w-12 md:w-24"}>
          <PaginationNavButton
            href={prevPageHref}
            onClick={prevPageClick}
            className={"rounded-l-lg"}
          >
            <Icon
              fontStyle={"solid"}
              name={"chevron-left"}
              aria-label={"Prev page"}
            />
            <span className={"ml-2 hidden md:inline"} aria-hidden={true}>
              Prev
            </span>
          </PaginationNavButton>
        </li>
        {smPages.map((page, i) => {
          const href =
            typeof page === "number" && props.mode === "link"
              ? props.pageHref(page)
              : undefined;
          const current = page === currentPage;
          const handleClick =
            typeof page === "number" && props.mode === "button"
              ? () => props.onPageClick(page)
              : undefined;

          return (
            <li key={`${page}-${i}-sm`} className={"inline w-10 md:hidden"}>
              <PaginationNavButton
                current={current}
                href={href}
                onClick={handleClick}
              >
                {page}
              </PaginationNavButton>
            </li>
          );
        })}
        {mdPages.map((page, i) => {
          const href =
            typeof page === "number" && props.mode === "link"
              ? props.pageHref(page)
              : undefined;
          const current = page === currentPage;
          const handleClick =
            typeof page === "number" && props.mode === "button"
              ? () => props.onPageClick(page)
              : undefined;

          return (
            <li key={`${page}-${i}-md`} className={"hidden w-10 md:inline"}>
              <PaginationNavButton
                current={current}
                href={href}
                onClick={handleClick}
                className={"w-full"}
              >
                {page}
              </PaginationNavButton>
            </li>
          );
        })}
        <li className={"w-10 sm:w-12 md:w-24"}>
          <PaginationNavButton
            href={nextPageHref}
            onClick={nextPageClick}
            className={"w-full rounded-r-lg"}
          >
            <span className={"mr-2 hidden md:inline"} aria-hidden={true}>
              Next
            </span>
            <Icon
              fontStyle={"solid"}
              name={"chevron-right"}
              aria-label={"Next page"}
            />
          </PaginationNavButton>
        </li>
      </ul>
    </nav>
  );
};
