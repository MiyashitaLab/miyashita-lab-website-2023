import { FC, ReactNode } from "react";

import { WrapLink } from "@/components/feature/wrapLink";

export type CardsHeadingProps = {
  children: ReactNode;
  href?: string;
  level: 1 | 2 | 3;
};

export const Heading: FC<CardsHeadingProps> = ({ children, href, level }) => {
  const wrapped = (
    <span
      className={
        "space-x-2 border-b-2 border-cyan-500 px-2 py-1 text-3xl font-semibold"
      }
    >
      {children}
    </span>
  );

  const linkWrapped = href ? (
    <WrapLink href={href}>{wrapped}</WrapLink>
  ) : (
    wrapped
  );

  switch (level) {
    case 1:
      return <h1 className={"p-2 text-center"}>{linkWrapped}</h1>;
    case 2:
      return <h2 className={"p-2 text-center"}>{linkWrapped}</h2>;
    case 3:
      return <h3 className={"p-2 text-center"}>{linkWrapped}</h3>;
  }
};
