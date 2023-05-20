import { FC } from "react";

import {
  ArticleHeader,
  ArticleHeaderProps,
} from "@/components/ui/articleHeader";
import { MarkdownContent } from "@/components/ui/markdownContent";

export type ArticleProps = {
  title: string;
  type: ArticleHeaderProps["type"];
  date?: Date;
  content: string;
};

export const Article: FC<ArticleProps> = ({ title, type, date, content }) => {
  return (
    <article>
      <ArticleHeader type={type} date={date}>
        {title}
      </ArticleHeader>
      <div className={"p-2"}>
        <MarkdownContent markdown={content} />
      </div>
    </article>
  );
};
