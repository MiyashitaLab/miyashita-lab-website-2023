import { FC } from "react";

import { Icon } from "@/components/ui/icon";
import { paginateWithFrame } from "@/components/ui/paginationNav/paginateWithFrame";
import { PaginationNavButton } from "@/components/ui/paginationNav/PaginationNavButton";

export type PaginationNavProps = {
  minPage: number;
  maxPage: number;
  currentPage: number;
  pageHref: (page: number) => string;
};

export const PaginationNav: FC<PaginationNavProps> = ({
  minPage,
  maxPage,
  currentPage,
  pageHref,
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
  const prevPageHref = minPage <= prevPage ? pageHref(prevPage) : undefined;

  const nextPage = currentPage + 1;
  const nextPageHref = nextPage <= maxPage ? pageHref(nextPage) : undefined;

  //smの場合は表示ページ数を減らす

  return (
    <nav className={"flex justify-center"}>
      <ul className="flex">
        <li className={"w-12 md:w-24"}>
          <PaginationNavButton href={prevPageHref} className={"rounded-l-lg"}>
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
          const href = typeof page === "number" ? pageHref(page) : undefined;
          const current = page === currentPage;

          return (
            <li key={`${page}-${i}-sm`} className={"inline w-10 md:hidden"}>
              <PaginationNavButton current={current} href={href}>
                {page}
              </PaginationNavButton>
            </li>
          );
        })}
        {mdPages.map((page, i) => {
          const href = typeof page === "number" ? pageHref(page) : undefined;
          const current = page === currentPage;

          return (
            <li key={`${page}-${i}-md`} className={"hidden w-10 md:inline"}>
              <PaginationNavButton
                current={current}
                href={href}
                className={"w-full"}
              >
                {page}
              </PaginationNavButton>
            </li>
          );
        })}
        <li className={"w-12 md:w-24"}>
          <PaginationNavButton
            href={nextPageHref}
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
