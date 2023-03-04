import { ComponentProps, FC, ReactNode } from "react";

import { WrapLink } from "@/components/feature/wrapLink";
import { dateToYYYYMMDD } from "@/lib/formatDate";

export type ArticleCardProps = {
  className?: ComponentProps<"div">["className"];
  children?: ReactNode;
  date: Date;
  title: string;
  url: string;
};

export const ArticleCard: FC<ArticleCardProps> = ({
  className,
  children,
  date,
  title,
  url,
}) => {
  return (
    <div
      className={`overflow-hidden rounded-lg border border-gray-200 bg-white shadow ${className}`}
    >
      <WrapLink href={url}>
        <div className={"flex justify-center"}>{children}</div>
        <div className="p-2">
          <time className={"text-sm text-gray-600"}>
            {dateToYYYYMMDD(date)}
          </time>
          <h3 className={"text-lg"}>{title}</h3>
        </div>
      </WrapLink>
    </div>
  );
};
