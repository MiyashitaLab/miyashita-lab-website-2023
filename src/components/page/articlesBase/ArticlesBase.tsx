import { FC, ReactElement, ReactNode } from "react";

import { WrapImageFill } from "@/components/feature/wrapImage";
import { WrapLink } from "@/components/feature/wrapLink";
import { CardsHeading } from "@/components/ui/cardsHeading";

export type ArticlesProps = {
  children: ReactElement[];
  href: string;
  headingIcon: ReactElement;
  headingText: string;
  pagination: ReactNode;
};

export const ArticlesBase: FC<ArticlesProps> = ({
  children,
  href,
  headingIcon,
  headingText,
  pagination,
}) => {
  return (
    <div className={"mx-4 xl:mx-0"}>
      <div className={"py-8"}>
        <CardsHeading>
          <WrapLink href={href}>
            <span className={"px-2"}>{headingIcon}</span>
            <span>{headingText}</span>
          </WrapLink>
        </CardsHeading>
      </div>
      <div
        className={
          "my-6 grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        }
      >
        {children}
      </div>
      <div className={"my-8"}>{pagination}</div>
    </div>
  );
};

export const ArticlesCardImage: FC<{
  src: string;
}> = ({ src }) => {
  return (
    <div className={"aspect-[1.91/1] w-full"}>
      <WrapImageFill
        src={src}
        sizes={{
          base: "100vw",
          sm: "50vw",
          md: "33vw",
          lg: "25vw",
        }}
        alt={""}
      />
    </div>
  );
};
