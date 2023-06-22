import { FC } from "react";

import { ArticlesBase } from "@/components/page/articlesBase";
import { ArticlesCardImage } from "@/components/page/articlesBase/ArticlesBase";
import { ArticleCard } from "@/components/ui/articleCard";
import { Icon } from "@/components/ui/icon";
import { PaginationNav } from "@/components/ui/paginationNav";
import { ROUTES } from "@/lib/routes";
import { PartialProjectModel } from "@/models/models";

export type ProjectsProps = {
  allProjectList: PartialProjectModel[];
  numPerPage: number;
  currentPage: number;
  pageHref: (page: number) => string;
};

export const Projects: FC<ProjectsProps> = ({
  allProjectList,
  numPerPage,
  currentPage,
  pageHref,
}) => {
  const pageNum = Math.ceil(allProjectList.length / numPerPage);
  const pageProjectsList = allProjectList.slice(
    currentPage * numPerPage,
    (currentPage + 1) * numPerPage
  );

  return (
    <ArticlesBase
      href={ROUTES.PROJECTS}
      headingIcon={<Icon fontStyle="solid" name={"diagram-project"} />}
      headingText={"プロジェクト"}
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
      {pageProjectsList.map((project) => (
        <ArticleCard
          key={project.slug}
          title={project.title}
          href={ROUTES.PROJECT_DETAIL(project.slug)}
        >
          <ArticlesCardImage src={project.thumbnailImg.src} />
        </ArticleCard>
      ))}
    </ArticlesBase>
  );
};
