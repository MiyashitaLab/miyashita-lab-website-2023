import { useCallback } from "react";

import { ResearchesPageQuery } from "@/components/page/researches/Researches";
import { PartialPaperModel } from "@/models/models";

const researchSortCompare = (sort: "newest" | "oldest") => {
  return (a: PartialPaperModel, b: PartialPaperModel) => {
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
    }
  };
};

export const useResearchesSort = ({
  query,
  setQuery,
}: {
  query: ResearchesPageQuery;
  setQuery: (query: ResearchesPageQuery) => void;
}) => {
  const sort = query.sort ?? "newest";
  const setSort = useCallback(
    (sort: "newest" | "oldest") => {
      // ページはリセットする
      setQuery({
        ...query,
        page: 1,
        sort: sort,
      });
    },
    [query, setQuery]
  );

  const sortCompare = researchSortCompare(sort);

  return {
    sortSelected: sort,
    setSort,
    sortCompare,
  };
};
