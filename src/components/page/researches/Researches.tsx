import { FC, ReactElement, ReactNode, useState } from "react";

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
import { ROUTES } from "@/lib/routes";
import { PartialPaperModel } from "@/models/models";

const filterTypeOptions = [
  { value: "all", label: "すべて" },
  { value: "title", label: "タイトル" },
  { value: "author", label: "著者" },
  { value: "journal", label: "学会書誌名" },
  { value: "abstract", label: "概要" },
  { value: "keyword", label: "キーワード" },
] as const;

const validFilterTypes = filterTypeOptions.map((option) => option.value);

type FilterType = (typeof filterTypeOptions)[number]["value"];

export type ResearchesProps = {
  allResearchList: PartialPaperModel[];
  queries: Record<string, string>;
  setQueries: (queries: Record<string, string>) => void;
};

type Filter = {
  type: FilterType;
  value: string;
};

const validateFilterType = (type: string): type is FilterType => {
  return (validFilterTypes as string[]).includes(type);
};

const parseFilter = (value: string): Filter[] => {
  const items = value.split(",");
  return items.map((item) => {
    const [type, text] = item.split(":");
    return {
      type: validateFilterType(type) ? type : "all",
      value: text || "",
    };
  });
};

const filterResearch =
  (filters: Filter[]) =>
  (paper: PartialPaperModel): boolean => {
    return filters.every((filter) => {
      const valueLower = filter.value.toLowerCase();
      if (filter.type === "title") return filterTitle(paper, valueLower);
      if (filter.type === "author") return filterAuthor(paper, valueLower);
      if (filter.type === "journal") return filterJournal(paper, valueLower);
      if (filter.type === "abstract") return filterAbstract(paper, valueLower);
      if (filter.type === "keyword") return filterKeyword(paper, valueLower);

      //all
      return filterAll(paper, valueLower);
    });
  };

const filterTitle = (paper: PartialPaperModel, value: string): boolean => {
  return paper.title.toLowerCase().includes(value);
};

const filterAuthor = (paper: PartialPaperModel, value: string): boolean => {
  return paper.authors.some((author) => {
    if (author.fullName.toLowerCase().includes(value)) return true;
    if (author.familyName.en.toLowerCase().includes(value)) return true;
    if (author.lastName.en.toLowerCase().includes(value)) return true;
    if (author.familyName.ja.toLowerCase().includes(value)) return true;
    if (author.lastName.ja.toLowerCase().includes(value)) return true;
    return false;
  });
};

const filterJournal = (paper: PartialPaperModel, value: string): boolean => {
  return paper.journalTitle.toLowerCase().includes(value);
};

const filterAbstract = (paper: PartialPaperModel, value: string): boolean => {
  return paper.abstract.toLowerCase().includes(value);
};

const filterKeyword = (paper: PartialPaperModel, value: string): boolean => {
  return paper.keywords.some((keyword) => {
    return keyword.toLowerCase().includes(value);
  });
};

const filterAll = (paper: PartialPaperModel, value: string): boolean => {
  if (filterTitle(paper, value)) return true;
  if (filterAuthor(paper, value)) return true;
  if (filterJournal(paper, value)) return true;
  if (filterAbstract(paper, value)) return true;
  if (filterKeyword(paper, value)) return true;
  return false;
};

const numPerPage = 24;

type SortOptionValue = "newest" | "oldest";
export const Researches: FC<ResearchesProps> = ({
  allResearchList,
  // queries,
  // setQueries,
}) => {
  const [queries, setQueries] = useState<Record<string, string>>({
    page: "1",
    sort: "newest",
    filter: "all:",
  });

  const page = parseInt(queries.page) || 1;

  const setPage = (page: number) => {
    setQueries({
      ...queries,
      page: page.toString(),
    });
  };

  const sort: SortOptionValue = ["newest", "oldest"].includes(queries.sort)
    ? (queries.sort as SortOptionValue)
    : "newest";
  const setSort = (sort: SortOptionValue) => {
    setQueries({
      ...queries,
      sort: sort,
    });
  };

  const filters = queries.filter ? parseFilter(queries.filter) : [];

  const filterFunc = filterResearch(filters);
  const filteredResearchList = allResearchList.filter(filterFunc);

  filteredResearchList.sort((a, b) => {
    const aValue = Date.parse(a.publishDateStr);
    const bValue = Date.parse(b.publishDateStr);

    if (sort === "newest") {
      return bValue - aValue;
    } else {
      return aValue - bValue;
    }
  });

  const pageNum = Math.ceil(filteredResearchList.length / numPerPage);
  const paginatedResearchList = filteredResearchList.slice(
    (page - 1) * numPerPage,
    page * numPerPage
  );

  const setFilter = (index: number, filter: Filter) => {
    setQueries({
      ...queries,
      filter: filters
        .map((item, i) => {
          if (i === index) {
            return `${filter.type}:${filter.value}`;
          }
          return `${item.type}:${item.value}`;
        })
        .join(","),
    });
  };

  const addFilter = () => {
    const type = "all";
    const value = "";

    setQueries({
      ...queries,
      filter: [...filters, `${type}:${value}`].join(","),
    });
  };

  const removeFilter = (index: number) => {
    setQueries({
      ...queries,
      filter: filters.filter((_, i) => i !== index).join(","),
    });
  };

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
              setFilter(i, {
                ...filterItem,
                type: type,
              });
            };

            const setFilterItemValue = (value: string) => {
              setFilter(i, {
                ...filterItem,
                value: value,
              });
            };

            return (
              <ResearchFilterItem
                key={filterItem.type}
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
                    text: "research.journal",
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
    <div className={"aspect-[1.91/1] w-full"}>
      <WrapImageFill
        src={src}
        alt={"test image"}
        sizes={{
          base: "100vw",
        }}
      />
    </div>
  );
};
