import classNames from "classnames";
import { FC, ReactElement } from "react";

import { MarkdownContent } from "@/components/ui/markdownContent";
import { GeneralPageModel } from "@/models/models";
import { Heading } from "src/components/ui/heading";

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
        <Heading level={1}>
          {headingIcon && <span className={"px-2"}>{headingIcon}</span>}
          <span>{title}</span>
        </Heading>
      </div>
      <div className={classNames("p-2", centering && "text-center")}>
        <MarkdownContent markdown={contentMd} />
      </div>
    </div>
  );
};
