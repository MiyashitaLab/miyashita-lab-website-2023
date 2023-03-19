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
  const pages = paginateWithFrame({
    firstPage: minPage,
    lastPage: maxPage,
    currentPage: currentPage,
    halfFrameSize: 4,
    omissionSymbol: omissionSymbol,
  });

  const prevPage = currentPage - 1;
  const prevPageHref = minPage <= prevPage ? pageHref(prevPage) : undefined;

  const nextPage = currentPage + 1;
  const nextPageHref = nextPage <= maxPage ? pageHref(nextPage) : undefined;

  return (
    <nav>
      <ul className="inline-flex">
        <li>
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
        {pages.map((page, i) => {
          const href = typeof page === "number" ? pageHref(page) : undefined;
          const current = page === currentPage;

          return (
            <li key={`${page}-${i}`}>
              <PaginationNavButton current={current} href={href}>
                {" "}
                {page}
              </PaginationNavButton>
            </li>
          );
        })}
        <li>
          <PaginationNavButton href={nextPageHref} className={"rounded-r-lg"}>
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
