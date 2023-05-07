import { FC, ReactNode } from "react";

import { WrapLink } from "@/components/feature/wrapLink";

export type CardsHeadingProps = {
  children: ReactNode;
  href?: string;
};

export const CardsHeading: FC<CardsHeadingProps> = ({ children, href }) => {
  const wrapped = (
    <span
      className={
        "space-x-2 border-b-2 border-cyan-500 px-2 py-1 text-3xl font-semibold"
      }
    >
      {children}
    </span>
  );

  return (
    <header>
      <h2 className={"p-2 text-center"}>
        {href ? <WrapLink href={href}>{wrapped}</WrapLink> : wrapped}
      </h2>
    </header>
  );
};
