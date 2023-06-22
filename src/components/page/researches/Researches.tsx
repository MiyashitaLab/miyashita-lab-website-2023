import { FC, ReactElement, ReactNode, useMemo } from "react";

import { WrapImageFill } from "@/components/feature/wrapImage";
import { WrapLink } from "@/components/feature/wrapLink";
import { ArticleCardDescription } from "@/components/ui/articleCardDescription";
import { ArticleCardHorizontal } from "@/components/ui/articleCardHorizontal";
import { CardsHeading } from "@/components/ui/cardsHeading";
import { Icon } from "@/components/ui/icon";
import { Label } from "@/components/ui/label";
import { PaginationNav } from "@/components/ui/paginationNav";
import { ResearchFilterItem } from "@/components/ui/researchFilterItem";
import { ResearchFilterPanel } from "@/components/ui/researchFilterPanel";
import { SortSelect } from "@/components/ui/sortSelect";
import {
  FilterType,
  filterTypeOptions,
  useResearchesFilter,
} from "@/lib/hook/useResearchesFilter";
import { ROUTES } from "@/lib/routes";
import { PartialPaperModel } from "@/models/models";

export type ResearchesProps = {
  allResearchList: PartialPaperModel[];
  query: Record<string, string>;
  setQuery: (queries: Record<string, string>) => void;
};
const numPerPage = 24;

export const Researches: FC<ResearchesProps> = ({
  allResearchList,
  query,
  setQuery,
}) => {
  const {
    page,
    setPage,
    sort,
    setSort,
    filters,
    updateFilter,
    addFilter,
    removeFilter,
    isPassFilter,
  } = useResearchesFilter(query, setQuery);

  const filteredResearchList = useMemo(() => {
    return allResearchList
      .filter((paper) => isPassFilter(paper))
      .sort((a, b) => {
        switch (sort) {
          case "newest":
            return (
              new Date(b.publishDateStr).getTime() -
              new Date(a.publishDateStr).getTime()
            );
          case "oldest":
            return (
              new Date(a.publishDateStr).getTime() -
              new Date(b.publishDateStr).getTime()
            );
          default:
            return 0;
        }
      });
  }, [allResearchList, isPassFilter, sort]);

  const paginatedResearchList = useMemo(() => {
    return filteredResearchList.slice(
      (page - 1) * numPerPage,
      page * numPerPage
    );
  }, [filteredResearchList, page]);

  const pageNum = Math.ceil(filteredResearchList.length / numPerPage);

  return (
    <ResearchesLayout
      href={ROUTES.RESEARCHES}
      headingIcon={<Icon fontStyle="solid" name={"book"} />}
      headingText={"研究"}
      filteredResearchNum={filteredResearchList.length}
      filterPanel={
        <ResearchFilterPanel
          filterItems={filters.map((filterItem, i) => {
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
          value={sort}
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
            <ResearchCardImage src={paper.thumbnailImg.src} />
          </ArticleCardHorizontal>
        );
      })}
      pagination={
        <PaginationNav
          minPage={1}
          maxPage={pageNum}
          currentPage={page}
          mode={"button"}
          onPageClick={(page) => {
            setPage(page);
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
    <div className={"mx-4 flex flex-col gap-4 xl:mx-0"}>
      <CardsHeading>
        <WrapLink href={href}>
          <span className={"px-2"}>{headingIcon}</span>
          <span>{headingText}</span>
        </WrapLink>
      </CardsHeading>
      <div className={"flex justify-center"}>
        <span className={"text-lg"}>{filteredResearchNum}件</span>
      </div>
      <div className={"mx-auto w-full max-w-screen-lg"}>{filterPanel}</div>
      <div className={"flex justify-end"}>{sortSelect}</div>
      <div className={"grid auto-rows-auto gap-2"}>{cards}</div>
      <div className={"my-8"}>{pagination}</div>
    </div>
  );
};

const ResearchCardImage: FC<{ src: string }> = ({ src }) => {
  return (
    <WrapImageFill
      src={src}
      alt={"test image"}
      sizes={{
        base: "100vw",
      }}
    />
  );
};
