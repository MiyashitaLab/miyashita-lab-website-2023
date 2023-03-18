import { FC } from "react";

import { WrapLink } from "@/components/feature/wrapLink";

export type PageFooterProps = {
  copyright: string;
  links: {
    href: string;
    text: string;
  }[];
};

export const PageFooter: FC<PageFooterProps> = ({ copyright, links }) => {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto w-full max-w-screen-xl p-4 text-sm text-gray-900 md:flex md:items-center md:justify-between">
        <span>{copyright}</span>
        <ul className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 md:mt-0">
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
      </div>
    </footer>
  );
};
