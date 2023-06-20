import { FC, ReactElement } from "react";

import { WrapImageFill } from "@/components/feature/wrapImage";
import { CardsHeading } from "@/components/ui/cardsHeading";

export type MembersProps = {
  enrolledCardsHeading: string;
  enrolledCards: ReactElement[];
  graduatedCardsHeading: string;
  graduatedCards: ReactElement[];
};

export const Members: FC<MembersProps> = ({
  enrolledCardsHeading,
  enrolledCards,
  graduatedCardsHeading,
  graduatedCards,
}) => {
  const renderCards = (cards: ReactElement[]) => {
    return (
      <div
        className={
          "my-6 grid grid-cols-3 gap-y-2 sm:grid-cols-4 md:grid-cols-6"
        }
      >
        {cards}
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

export const MembersCardImage: FC<{
  src: string;
}> = ({ src }) => {
  return (
    <div className={"aspect-square w-full"}>
      <WrapImageFill
        src={src}
        alt={""}
        sizes={{
          sm: "33vw", // 1/3
          md: "25vw", // 1/4
          base: "16vw", // 1/6
        }}
      />
    </div>
  );
};
