import { FC, ReactElement, ReactNode, useMemo } from "react";

import { WrapLink } from "@/components/feature/wrapLink";
import { ArticleCardDescription } from "@/components/ui/articleCardDescription";
import { ArticleCardHorizontal } from "@/components/ui/articleCardHorizontal";
import { ArticleCardHorizontalImage } from "@/components/ui/articleCardHorizontal/ArticleCardHorizontal";
import { Icon } from "@/components/ui/icon";
import { Label } from "@/components/ui/label";
import { PaginationNav } from "@/components/ui/paginationNav";
import { ResearchFilterItem } from "@/components/ui/researchFilterItem";
import { ResearchFilterPanel } from "@/components/ui/researchFilterPanel";
import { SortSelect } from "@/components/ui/sortSelect";
import { useResearchesFilter } from "@/lib/hook/useResearchesFilter";
import { useResearchesSort } from "@/lib/hook/useResearchesSort";
import { ROUTES } from "@/lib/routes";
import { PartialPaperModel } from "@/models/models";
import { Heading } from "src/components/ui/heading";

export type ResearchesProps = {
  allResearchList: PartialPaperModel[];
  numPerPage: number;
  query: ResearchesPageQuery;
  setQuery: (query: ResearchesPageQuery) => void;
  pageHref: (query: ResearchesPageQuery) => string;
};

export type Filter = {
  type: FilterType;
  value: string;
};

export type FilterType =
  | "all"
  | "title"
  | "author"
  | "journal"
  | "abstract"
  | "keyword";

export const filterTypeOptions = [
  { value: "all", label: "すべて" },
  { value: "title", label: "タイトル" },
  { value: "author", label: "著者" },
  { value: "journal", label: "学会書誌名" },
  { value: "abstract", label: "概要" },
  { value: "keyword", label: "キーワード" },
] as const satisfies readonly { value: FilterType; label: string }[];

export type ResearchesPageQuery = {
  page: number;
  sort: "newest" | "oldest";
  filters: Filter[];
};

export const Researches: FC<ResearchesProps> = ({
  allResearchList,
  numPerPage,
  query,
  setQuery,
  pageHref,
}) => {
  const { isPassFilter, addFilter, removeFilter, updateFilter } =
    useResearchesFilter({ query, setQuery, pageHref });

  const { sortCompare, sortSelected, setSort } = useResearchesSort({
    query,
    setQuery,
  });

  //TODO webworkerに任せるなりdebounceするなりする方が良いかもしれない
  const filteredResearchList = useMemo(() => {
    return allResearchList.filter(isPassFilter).sort(sortCompare);
  }, [allResearchList, isPassFilter, sortCompare]);

  const page = query.page ?? 1;
  const paginatedResearchList = useMemo(() => {
    return filteredResearchList.slice(
      (page - 1) * numPerPage,
      page * numPerPage
    );
  }, [filteredResearchList, numPerPage, page]);
  const pageNum = Math.ceil(filteredResearchList.length / numPerPage);

  return (
    <ResearchesLayout
      href={ROUTES.RESEARCHES}
      headingIcon={<Icon fontStyle="solid" name={"book"} />}
      headingText={"研究"}
      filteredResearchNum={filteredResearchList.length}
      filterPanel={
        <ResearchFilterPanel
          filterItems={query.filters.map((filterItem, i) => {
            const setFilterItemType = (type: FilterType) => {
              updateFilter(i, {
                ...filterItem,
                type: type,
              });
            };

            const setFilterItemValue = (value: string) => {
              updateFilter(i, {
                ...filterItem,
                value: value,
              });
            };

            return (
              <ResearchFilterItem
                key={i}
                typeOptions={filterTypeOptions}
                text={filterItem.value}
                type={filterItem.type}
                onChangeType={(type) => {
                  setFilterItemType(type);
                }}
                onChangeText={(text) => {
                  setFilterItemValue(text);
                }}
                onClickDelete={() => {
                  removeFilter(i);
                }}
              />
            );
          })}
          onClickAppend={() => {
            addFilter();
          }}
        />
      }
      sortSelect={
        <SortSelect
          value={sortSelected}
          onChange={(value) => {
            setSort(value);
          }}
        />
      }
      cards={paginatedResearchList.map((paper) => {
        return (
          <ArticleCardHorizontal
            key={ROUTES.RESEARCH_DETAIL(paper.slug)}
            title={paper.title}
            date={new Date(paper.publishDateStr)}
            href={ROUTES.RESEARCH_DETAIL(paper.slug)}
            label={<Label className={"bg-cyan-700"}>{paper.type.ja}</Label>}
            description={
              <ArticleCardDescription
                items={[
                  {
                    icon: <Icon fontStyle={"solid"} name={"user"} />,
                    text: paper.authors
                      .map((author) => author.fullName)
                      .join(", "),
                  },
                  {
                    icon: <Icon fontStyle={"solid"} name={"book"} />,
                    text: paper.journalTitle,
                  },
                ]}
              />
            }
          >
            <ArticleCardHorizontalImage src={paper.thumbnailImg.src} />
          </ArticleCardHorizontal>
        );
      })}
      pagination={
        <PaginationNav
          minPage={1}
          maxPage={pageNum}
          currentPage={page}
          mode={"link"}
          pageHref={(page) => {
            return pageHref({
              ...query,
              page: page,
            });
          }}
        />
      }
    />
  );
};

type ResearchesLayoutProps = {
  href: string;
  headingIcon: ReactElement;
  headingText: string;
  filteredResearchNum: number;
  filterPanel: ReactElement;
  sortSelect: ReactElement;
  cards: ReactNode;
  pagination: ReactNode;
};

const ResearchesLayout: FC<ResearchesLayoutProps> = ({
  href,
  headingIcon,
  headingText,
  filteredResearchNum,
  filterPanel,
  sortSelect,
  cards,
  pagination,
}) => {
  return (
    <div className={"mx-4 flex flex-col gap-4 py-2 xl:mx-0"}>
      <div className={"py-8"}>
        <Heading level={1}>
          <WrapLink href={href}>
            <span className={"px-2"}>{headingIcon}</span>
            <span>{headingText}</span>
          </WrapLink>
        </Heading>
      </div>
      <div className={"flex justify-center"}>
        <span className={"text-lg"}>{filteredResearchNum}件</span>
      </div>
      <div className={"mx-auto w-full max-w-screen-lg"}>{filterPanel}</div>
      <div className={"flex justify-end"}>{sortSelect}</div>
      <div className={"flex flex-col gap-2"}>{cards}</div>
      <div className={"my-8"}>{pagination}</div>
    </div>
  );
};
