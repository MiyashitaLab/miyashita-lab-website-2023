import { FC } from "react";

import { ArticlesBase } from "@/components/page/articlesBase";
import { ArticlesCardImage } from "@/components/page/articlesBase/ArticlesBase";
import { ArticleCard } from "@/components/ui/articleCard";
import { Icon } from "@/components/ui/icon";
import { PaginationNav } from "@/components/ui/paginationNav";
import { ROUTES } from "@/lib/routes";
import { PartialNewsModel } from "@/models/models";

export type NewsProps = {
  allNewsList: PartialNewsModel[];
  numPerPage: number;
  currentPage: number;
  pageHref: (page: number) => string;
};

export const News: FC<NewsProps> = ({
  allNewsList,
  numPerPage,
  currentPage,
  pageHref,
}) => {
  const pageNum = Math.ceil(allNewsList.length / numPerPage);

  //currentPageは1スタート
  const pageNewsList = allNewsList.slice(
    (currentPage - 1) * numPerPage,
    currentPage * numPerPage
  );

  return (
    <ArticlesBase
      href={ROUTES.NEWS}
      headingIcon={<Icon fontStyle="solid" name={"newspaper"} />}
      headingText={"ニュース"}
      pagination={
        <PaginationNav
          minPage={1}
          maxPage={pageNum}
          currentPage={currentPage}
          mode={"link"}
          pageHref={pageHref}
        />
      }
    >
      {pageNewsList.map((news) => (
        <ArticleCard
          key={news.slug}
          title={news.title}
          date={new Date(news.dateStr)}
          href={ROUTES.NEWS_DETAIL(news.slug)}
        >
          <ArticlesCardImage src={news.thumbnailImg.src} />
        </ArticleCard>
      ))}
    </ArticlesBase>
  );
};
