import { FC, ReactElement } from "react";

import { CardsHeading } from "@/components/ui/cardsHeading";
import { MarkdownContent } from "@/components/ui/markdownContent";

export type GeneralProps = {
  headingIcon?: ReactElement;
  headingText: string;
  content: string;
};

export const General: FC<GeneralProps> = ({
  headingIcon,
  headingText,
  content,
}) => {
  return (
    <div className={"mx-4"}>
      <div className={"py-8"}>
        <CardsHeading>
          {headingIcon && <span className={"px-2"}>{headingIcon}</span>}
          <span>{headingText}</span>
        </CardsHeading>
      </div>
      <div className={"max-w-lg p-2"}>
        <MarkdownContent markdown={content} />
      </div>
    </div>
  );
};
