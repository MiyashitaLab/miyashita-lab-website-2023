import { useCallback } from "react";

import { PartialPaperModel } from "@/models/models";

export const useResearchesFilter = (
  query: Record<string, string>,
  setQuery: (value: Record<string, string>) => void
) => {
  const page = parseInt(query.page) || 1;

  const setPage = useCallback(
    (page: number) => {
      setQuery({
        ...query,
        page: page.toString(),
      });
    },
    [query, setQuery]
  );

  const sort: SortOptionValue = isValidSortOption(query.sort)
    ? query.sort
    : "newest";
  const setSort = useCallback(
    (sort: SortOptionValue) => {
      setQuery({
        ...query,
        sort,
      });
    },
    [query, setQuery]
  );

  const filters = parseFilter(query.filter);
  const updateFilter = useCallback(
    (index: number, value: Filter) => {
      const newFilters = filters.map((filter, i) =>
        i === index ? value : filter
      );
      setQuery({
        ...query,
        filter: stringifyFilter(newFilters),
      });
    },
    [filters, query, setQuery]
  );

  const addFilter = useCallback(() => {
    const type = "all";
    const value = "";

    const newFilters: Filter[] = [...filters, { type, value }];
    setQuery({
      ...query,
      filter: stringifyFilter(newFilters),
    });
  }, [filters, query, setQuery]);

  const removeFilter = useCallback(
    (index: number) => {
      const newFilters = filters.filter((_, i) => i !== index);
      setQuery({
        ...query,
        filter: stringifyFilter(newFilters),
      });
    },
    [filters, query, setQuery]
  );

  const isPassFilter = filterResearch(filters);

  return {
    page,
    setPage,
    sort,
    setSort,
    filters,
    updateFilter,
    addFilter,
    removeFilter,
    isPassFilter,
  };
};

const sortOptions = ["newest", "oldest"] as const;
type SortOptionValue = (typeof sortOptions)[number];

const isValidSortOption = (
  sort: string | undefined
): sort is SortOptionValue => {
  if (!sort) return false;
  return sortOptions.includes(sort as SortOptionValue);
};

export const filterTypeOptions = [
  { value: "all", label: "すべて" },
  { value: "title", label: "タイトル" },
  { value: "author", label: "著者" },
  { value: "journal", label: "学会書誌名" },
  { value: "abstract", label: "概要" },
  { value: "keyword", label: "キーワード" },
] as const;

const validFilterTypes = filterTypeOptions.map((option) => option.value);

export type FilterType = (typeof filterTypeOptions)[number]["value"];

export type Filter = {
  type: FilterType;
  value: string;
};

const isValidFilterType = (type: string | undefined): type is FilterType => {
  if (!type) return false;
  return (validFilterTypes as string[]).includes(type);
};

const parseFilter = (value: string | undefined): Filter[] => {
  const items = (value ?? "").split(",");
  return items.map((item) => {
    const [type, text] = item.split(":");
    return {
      type: isValidFilterType(type) ? type : "all",
      value: text || "",
    };
  });
};

const stringifyFilter = (filters: Filter[]): string => {
  return filters.map((filter) => `${filter.type}:${filter.value}`).join(",");
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

//idも検索対象にした方がいいかも
const filterAuthor = (paper: PartialPaperModel, value: string): boolean => {
  return paper.authors.some((author) => {
    if (author.fullName.toLowerCase().includes(value)) return true;
    if (author.familyName.en.toLowerCase().includes(value)) return true;
    if (author.lastName.en.toLowerCase().includes(value)) return true;
    if (author.familyName.ja.toLowerCase().includes(value)) return true;
    return author.lastName.ja.toLowerCase().includes(value);
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
  return filterKeyword(paper, value);
};
