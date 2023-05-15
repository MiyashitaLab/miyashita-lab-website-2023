import { FC, ReactElement, ReactNode } from "react";

import { WrapImage } from "@/components/feature/wrapImage";
import { WrapLink } from "@/components/feature/wrapLink";
import { ArticleCardData } from "@/components/page/top/ArticleCardsSection";
import { ArticleCard } from "@/components/ui/articleCard";
import { CardsHeading } from "@/components/ui/cardsHeading";

export type ArticlesProps = {
  cards: readonly ArticleCardData[];
  href: string;
  headingIcon: ReactElement;
  headingText: string;
  pagination: ReactNode;
};

export const Articles: FC<ArticlesProps> = ({
  cards,
  href,
  headingIcon,
  headingText,
  pagination,
}) => {
  return (
    <div className={"mx-4 xl:mx-0"}>
      <CardsHeading>
        <WrapLink href={href}>
          <span className={"px-2"}>{headingIcon}</span>
          <span>{headingText}</span>
        </WrapLink>
      </CardsHeading>
      <div
        className={
          "my-6 grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        }
      >
        {cards.map((card) => (
          <ArticleCard
            key={card.detailHref}
            className={"relative shrink-0 basis-60 self-stretch"}
            date={card.date}
            title={card.title}
            href={card.detailHref}
          >
            <WrapImage
              src={card.thumbnail.src}
              originalWidth={card.thumbnail.originalWidth}
              originalHeight={card.thumbnail.originalHeight}
              sizes={{
                base: "100vw",
                sm: "50vw",
                md: "33vw",
                lg: "25vw",
              }}
              alt={""}
              container
              className={"aspect-[1.91/1] w-full"}
            />
          </ArticleCard>
        ))}
      </div>
      <div className={"my-8"}>{pagination}</div>
    </div>
  );
};
