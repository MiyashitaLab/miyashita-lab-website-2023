import classNames from "classnames";
import { FC } from "react";

import { BeautifulBreak } from "@/components/feature/beautifulBreak";
import { dateToYYYYMMDD } from "@/lib/formatDate";

export type ArticleHeaderProps = {
  type: "news" | "project";
  children: string;
  date?: Date;
};

export const ArticleHeader: FC<ArticleHeaderProps> = ({
  children,
  type,
  date,
}) => {
  return (
    <header
      className={classNames(
        "w-full px-2 py-4 text-center text-white md:px-4 md:py-6",
        {
          "bg-cyan-700": type === "news",
          "bg-teal-700": type === "project",
        }
      )}
    >
      <h1 className={"text-xl font-bold md:text-2xl"}>
        <BeautifulBreak>{children}</BeautifulBreak>
      </h1>
      {date && (
        <div className={"mt-2 text-sm"}>
          {/* https://developer.mozilla.org/ja/docs/Web/HTML/Element/time#%E5%A6%A5%E5%BD%93%E3%81%AA_datetime_%E5%80%A4 */}
          <time dateTime={dateToYYYYMMDD(date)}>{dateToYYYYMMDD(date)}</time>
        </div>
      )}
    </header>
  );
};
