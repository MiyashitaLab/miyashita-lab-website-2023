import classNames from "classnames";
import { FC, ReactElement } from "react";

import { CardsHeading } from "@/components/ui/cardsHeading";
import { MarkdownContent } from "@/components/ui/markdownContent";
import { GeneralPageModel } from "@/models/models";

export type GeneralProps = {
  headingIcon?: ReactElement;
} & GeneralPageModel;

export const General: FC<GeneralProps> = ({
  headingIcon,
  title,
  contentMd,
  centering,
}) => {
  return (
    <div className={"mx-4"}>
      <div className={"py-8"}>
        <CardsHeading>
          {headingIcon && <span className={"px-2"}>{headingIcon}</span>}
          <span>{title}</span>
        </CardsHeading>
      </div>
      <div className={classNames("p-2", centering && "text-center")}>
        <MarkdownContent markdown={contentMd} />
      </div>
    </div>
  );
};
