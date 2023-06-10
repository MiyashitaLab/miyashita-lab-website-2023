import { FC, ReactElement, ReactNode } from "react";

import { WrapLink } from "@/components/feature/wrapLink";
import { CardsHeading } from "@/components/ui/cardsHeading";

export type ResearchesProps = {
  href: string;
  headingIcon: ReactElement;
  headingText: string;
  filteredResearchNum: number;
  filterPanel: ReactElement;
  sortSelect: ReactElement;
  cards: ReactNode;
  pagination: ReactNode;
};

export const Researches: FC<ResearchesProps> = ({
  href,
  headingIcon,
  headingText,
  filteredResearchNum,
  filterPanel,
  sortSelect,
  cards,
  pagination,
}) => {
  return (
    <div className={"mx-4 flex flex-col gap-4 xl:mx-0"}>
      <CardsHeading>
        <WrapLink href={href}>
          <span className={"px-2"}>{headingIcon}</span>
          <span>{headingText}</span>
        </WrapLink>
      </CardsHeading>
      <div className={"flex justify-center"}>
        <span className={"text-lg"}>{filteredResearchNum}件</span>
      </div>
      <div className={"mx-auto w-full max-w-screen-lg"}>{filterPanel}</div>
      <div className={"flex justify-end"}>{sortSelect}</div>
      <div className={"grid auto-rows-auto"}>{cards}</div>
      <div className={"my-8"}>{pagination}</div>
    </div>
  );
};
