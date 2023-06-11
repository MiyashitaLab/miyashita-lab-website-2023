import { FC, ReactElement, ReactNode } from "react";

import { BeautifulBreak } from "@/components/feature/beautifulBreak";
import { WrapLink } from "@/components/feature/wrapLink";
import { dateToYYYYMMDD } from "@/lib/formatDate";

export type ArticleCardProps = {
  children?: ReactNode;
  date?: Date;
  label?: ReactElement;
  title: string;
  description?: ReactElement;
  href: string;
};

export const ArticleCard: FC<ArticleCardProps> = ({
  children,
  date,
  label,
  description,
  title,
  href,
}) => {
  return (
    <div
      className={`h-full w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow`}
    >
      <WrapLink href={href}>
        <div className={"flex justify-center"}>{children}</div>
        <div className="p-2">
          <div className={"flex items-center gap-2"}>
            {date && (
              <time className={"text-sm text-gray-600"}>
                {dateToYYYYMMDD(date)}
              </time>
            )}
            {label && <div className={"flex items-center"}>{label}</div>}
          </div>
          <p className={"line-clamp-2 text-lg"}>
            <BeautifulBreak>{title}</BeautifulBreak>
          </p>
          {description}
        </div>
      </WrapLink>
    </div>
  );
};
