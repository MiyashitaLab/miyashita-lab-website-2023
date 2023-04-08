import classNames from "classnames";
import { ComponentProps, FC } from "react";

import { BeautifulBreak } from "@/components/feature/beautifulBreak";
import { dateToYYYYMMDD } from "@/lib/formatDate";

export type ArticleHeaderProps = {
  className?: ComponentProps<"div">["className"];
  type: "news" | "project";
  children: string;
  date: Date;
};

export const ArticleHeader: FC<ArticleHeaderProps> = ({
  className,
  children,
  type,
  date,
}) => {
  return (
    <div
      className={classNames(
        "w-full px-2 py-4 text-center text-white md:px-4 md:py-6",
        {
          "bg-cyan-700": type === "news",
          "bg-teal-700": type === "project",
        },
        className
      )}
    >
      <h1 className={"text-xl font-bold md:text-2xl"}>
        <BeautifulBreak>{children}</BeautifulBreak>
      </h1>
      <div className={"mt-2 text-sm"}>
        <time>{dateToYYYYMMDD(date)}</time>
      </div>
    </div>
  );
};
