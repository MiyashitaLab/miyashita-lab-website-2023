import { ComponentProps, FC, ReactNode } from "react";

import { BeautifulBreak } from "@/components/feature/beautifulBreak";
import { WrapLink } from "@/components/feature/wrapLink";
import { dateToYYYYMMDD } from "@/lib/formatDate";

export type ArticleCardProps = {
  className?: ComponentProps<"div">["className"];
  children?: ReactNode;
  date: Date;
  title: string;
  href: string;
};

export const ArticleCard: FC<ArticleCardProps> = ({
  className,
  children,
  date,
  title,
  href,
}) => {
  return (
    <div
      className={`overflow-hidden rounded-lg border border-gray-200 bg-white shadow ${className}`}
    >
      <WrapLink href={href}>
        <div className={"flex justify-center"}>{children}</div>
        <div className="p-2">
          <time className={"text-sm text-gray-600"}>
            {dateToYYYYMMDD(date)}
          </time>
          <p className={"text-lg line-clamp-2"}>
            <BeautifulBreak>{title}</BeautifulBreak>
          </p>
        </div>
      </WrapLink>
    </div>
  );
};
