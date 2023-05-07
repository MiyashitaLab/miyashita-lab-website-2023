import { FC, ReactElement } from "react";

import { CMSImage, WrapImage } from "@/components/feature/wrapImage/WrapImage";
import { WrapLink } from "@/components/feature/wrapLink";
import { ReadMoreLink } from "@/components/page/top/ReadMoreLink";
import { CardsHeading } from "@/components/ui/cardsHeading";
import { MemberCard } from "@/components/ui/memberCard";

export type MemberCardData = {
  detailHref: string;
  role: string;
  name: string;
  thumbnail: CMSImage;
};

export type MemberCardsSectionProps = {
  href: string;
  cards: readonly MemberCardData[];
  headingIcon: ReactElement;
  headingText: string;
};

export const MemberCardsSection: FC<MemberCardsSectionProps> = ({
  href,
  cards,
  headingText,
  headingIcon,
}) => {
  return (
    <section className={"mx-auto my-8"}>
      <CardsHeading>
        <WrapLink href={href}>
          <span className={"px-2"}>{headingIcon}</span>
          <span>{headingText}</span>
        </WrapLink>
      </CardsHeading>
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
      <ReadMoreLink href={href}>歴代メンバー</ReadMoreLink>
    </section>
  );
};
