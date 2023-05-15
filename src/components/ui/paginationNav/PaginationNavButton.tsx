import classNames from "classnames";
import { ComponentProps, ReactNode } from "react";

import { WrapLink } from "@/components/feature/wrapLink";

export type PaginationNavButtonProps = {
  href?: string;
  children: ReactNode;
  current?: boolean;
  className?: ComponentProps<"div">["className"];
};

export const PaginationNavButton = ({
  href,
  children,
  current = false,
  className,
}: PaginationNavButtonProps) => {
  return (
    <WrapLink
      href={href}
      aria-current={current ? "page" : undefined}
      className={classNames(
        "block w-full text-center border border-gray-300 px-1 py-2 leading-tight ",
        className,
        {
          "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700":
            !current && href !== undefined,
          "text-cyan-700 bg-cyan-50 hover:text-cyan-800 hover:bg-cyan-100":
            current,
        }
      )}
    >
      {children}
    </WrapLink>
  );
};
