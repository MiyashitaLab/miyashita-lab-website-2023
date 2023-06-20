import { FC, ReactElement } from "react";

import { WrapImageFill } from "@/components/feature/wrapImage/WrapImage";
import { WrapLink } from "@/components/feature/wrapLink";
import { CardsHeading } from "@/components/ui/cardsHeading";
import { PageLink } from "@/components/ui/pageLink/";

export type ArticleCardsSectionProps = {
  children: ReactElement[];
  href: string;
  headingIcon: ReactElement;
  headingText: string;
};

export const ArticleCardsSection: FC<ArticleCardsSectionProps> = ({
  children,
  href,
  headingIcon,
  headingText,
}) => {
  return (
    <section className={"mx-auto my-8"}>
      <CardsHeading>
        <WrapLink href={href}>
          <span className={"px-2"}>{headingIcon}</span>
          <span>{headingText}</span>
        </WrapLink>
      </CardsHeading>
      <div
        className={
          "my-6 flex flex-row gap-2 overflow-x-auto lg:grid lg:grid-cols-4"
        }
      >
        {children.map((child) => (
          <div key={child.key} className={"shrink-0 basis-60"}>
            {child}
          </div>
        ))}
      </div>
      <PageLink href={href} className={"text-center"}>
        もっと見る
      </PageLink>
    </section>
  );
};

export const ArticleCardsSectionImage: FC<{
  src: string;
}> = ({ src }) => {
  return (
    <div className={"aspect-[1.91/1] w-full"}>
      <WrapImageFill
        src={src}
        sizes={{
          base: "25vw", // 1/4
          md: "15rem", // basis-60
        }}
        alt={""}
      />
    </div>
  );
};
