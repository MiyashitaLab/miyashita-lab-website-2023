import { FC } from "react";

import { WrapImage } from "@/components/feature/wrapImage";
import { MemberCardData } from "@/components/page/top/MemberCardsSection";
import { CardsHeading } from "@/components/ui/cardsHeading";
import { MemberCard } from "@/components/ui/memberCard";

export type MembersProps = {
  enrolledCardsHeading: string;
  enrolledCards: readonly MemberCardData[];
  graduatedCardsHeading: string;
  graduatedCards: readonly MemberCardData[];
};

export const Members: FC<MembersProps> = ({
  enrolledCardsHeading,
  enrolledCards,
  graduatedCardsHeading,
  graduatedCards,
}) => {
  const renderCards = (cards: readonly MemberCardData[]) => {
    return (
      <div className={"my-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6"}>
        {cards.map((card) => (
          <MemberCard
            key={card.detailHref}
            className={"my-2"}
            href={card.detailHref}
            name={card.name}
            role={card.role}
          >
            <WrapImage
              src={card.thumbnail.src}
              originalWidth={card.thumbnail.originalWidth}
              originalHeight={card.thumbnail.originalHeight}
              alt={""}
              sizes={{
                sm: "33vw", // 1/3
                md: "25vw", // 1/4
                base: "16vw", // 1/6
              }}
            />
          </MemberCard>
        ))}
      </div>
    );
  };

  return (
    <div className={"mx-auto my-6 text-center"}>
      <section className={"mx-auto my-8"}>
        <CardsHeading>{enrolledCardsHeading}</CardsHeading>
        {renderCards(enrolledCards)}
      </section>
      <section className={"mx-auto my-8"}>
        <CardsHeading>{graduatedCardsHeading}</CardsHeading>
        {renderCards(graduatedCards)}
      </section>
    </div>
  );
};
