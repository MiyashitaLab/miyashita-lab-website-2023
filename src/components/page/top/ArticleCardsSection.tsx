import Image from "next/image";
import { FC, ReactNode } from "react";

import { WrapLink } from "@/components/feature/wrapLink";
import { ReadMoreLink } from "@/components/page/top/ReadMoreLink";
import { ArticleCard } from "@/components/ui/articleCard";
import { CardsHeading } from "@/components/ui/cardsHeading";

//TODO 別の所に移す
type Image = {
  url: string;
  width: number;
  height: number;
};

export type CardProp = {
  detailUrl: string;
  title: string;
  date: Date;
  thumbnail: Image;
};

type ArticleCardsSection = {
  cards: CardProp[];
  href: string;
  headingContent: ReactNode;
};

export const ArticleCardsSection: FC<ArticleCardsSection> = ({
  cards,
  href,
  headingContent,
}) => {
  return (
    <section className={"mx-auto my-8"}>
      <CardsHeading>
        <WrapLink href={href}>{headingContent}</WrapLink>
      </CardsHeading>
      <div
        className={
          "my-6 flex flex-row gap-2 overflow-x-auto lg:grid lg:grid-cols-4"
        }
      >
        {cards.map((card) => (
          <ArticleCard
            key={card.detailUrl}
            className={"relative shrink-0 basis-60 self-stretch"}
            date={card.date}
            title={card.title}
            href={card.detailUrl}
          >
            <Image
              src={card.thumbnail.url}
              alt={""} //サムネイルなので空
              sizes="(max-width: 768px) 15rem, 25vw" //md以下はbasis-60で指定しているので15rem、md以上は横に4つ並べるので25vw
              width={card.thumbnail.width}
              height={card.thumbnail.height}
            />
          </ArticleCard>
        ))}
      </div>
      <ReadMoreLink href={href}>もっと見る</ReadMoreLink>
    </section>
  );
};
