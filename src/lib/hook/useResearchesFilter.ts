import { useCallback } from "react";

import {
  Filter,
  ResearchesPageQuery,
} from "@/components/page/researches/Researches";
import { PartialPaperModel } from "@/models/models";

export const useResearchesFilter = ({
  query,
  setQuery,
}: {
  query: ResearchesPageQuery;
  setQuery: (query: ResearchesPageQuery) => void;
  pageHref: (query: ResearchesPageQuery) => string;
}) => {
  const updateFilter = useCallback(
    (index: number, filterItem: Filter) => {
      // ページはリセットする
      setQuery({
        ...query,
        page: 1,
        filters: query.filters.map((f, i) => {
          if (i === index) return filterItem;
          return f;
        }),
      });
    },
    [query, setQuery]
  );

  const addFilter = useCallback(() => {
    // ページはリセットしない
    setQuery({
      ...query,
      filters: [...query.filters, { type: "all", value: "" }],
    });
  }, [query, setQuery]);

  const removeFilter = useCallback(
    (index: number) => {
      // ページはリセットする
      setQuery({
        ...query,
        page: 1,
        filters: query.filters.filter((_, i) => i !== index),
      });
    },
    [query, setQuery]
  );

  const isPassFilter = filterResearch(query.filters);

  return {
    isPassFilter,
    addFilter,
    removeFilter,
    updateFilter,
  };
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
    if (author.givenName.en.toLowerCase().includes(value)) return true;
    if (author.familyName.ja.toLowerCase().includes(value)) return true;
    return author.givenName.ja.toLowerCase().includes(value);
  });
};

const filterJournal = (paper: PartialPaperModel, value: string): boolean => {
  return paper.journalTitle.toLowerCase().includes(value);
};

const filterAbstract = (paper: PartialPaperModel, value: string): boolean => {
  if (!paper.abstract) return false;
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
