import classNames from "classnames";
import { FC } from "react";

import { WrapLink } from "@/components/feature/wrapLink";

export type PageFooterLinkItem = {
  href: string;
  text: string;
};

export type PageFooterProps = {
  className?: string;
  copyright: string;
  links: readonly PageFooterLinkItem[];
};

export const PageFooter: FC<PageFooterProps> = ({
  className,
  copyright,
  links,
}) => {
  return (
    <footer className={classNames(className)}>
      <div className="w-full bg-gray-100 px-4 text-sm text-gray-900">
        <div className="mx-auto grid max-w-screen-xl gap-4 py-4 md:grid-cols-[1fr_auto]">
          <span>{copyright}</span>
          <nav>
            <ul className="flex flex-wrap items-center gap-4 md:justify-end">
              {links.map(({ href, text }) => (
                <li key={href}>
                  <WrapLink
                    href={href}
                    className={"underline-offset-2 hover:underline"}
                  >
                    {text}
                  </WrapLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};
