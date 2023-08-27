import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { FC, useRef, useState } from "react";

import { Meta } from "@/components/feature/meta";
import { Researches, ResearchesProps } from "@/components/page/researches";
import {
  Filter,
  FilterType,
  filterTypeOptions,
  ResearchesPageQuery,
} from "@/components/page/researches/Researches";
import { fetchPartialPaperList } from "@/lib/cms/fetchPaper";

type Props = {
  allResearchesList: ResearchesProps["allResearchList"];
};

const validFilterTypes = filterTypeOptions.map((option) => option.value);

const isValidFilterType = (type: string | undefined): type is FilterType => {
  if (!type) return false;
  return (validFilterTypes as string[]).includes(type);
};

const parsePage = (value: string | undefined): number => {
  if (value === undefined) return 1;

  const page = Number(value);
  if (Number.isNaN(page)) return 1;
  return page;
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

const parseSort = (value: string | undefined): ResearchesPageQuery["sort"] => {
  if (value === "newest") return "newest";
  if (value === "oldest") return "oldest";
  return "newest";
};

const stringifyFilter = (filters: Filter[]): string => {
  return filters.map((filter) => `${filter.type}:${filter.value}`).join(",");
};

const toUrlQuery = (query: ResearchesPageQuery) => {
  return {
    page: `${query.page}`,
    filter: stringifyFilter(query.filters),
    sort: query.sort,
  };
};

const ResearchesPageWithKey: FC<
  Props & {
    key: string;
  }
> = ({ allResearchesList }) => {
  const router = useRouter();

  const [query, setQuery] = useState<ResearchesPageQuery>({
    page: parsePage(router.query.page as string),
    filters: parseFilter(router.query.filter as string),
    sort: parseSort(router.query.sort as string),
  });

  const setQueryWithReplace = (query: ResearchesPageQuery) => {
    setQuery(query);

    //入力ごとにreplaceするとカクつくのでdebounceする

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      void router.replace({
        pathname: router.pathname,
        query: toUrlQuery(query),
      });
    }, 200);
  };

  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  return (
    <>
      <Meta pageTitle={"研究一覧"} />
      <Researches
        allResearchList={allResearchesList}
        numPerPage={24}
        query={query}
        setQuery={setQueryWithReplace}
        pageHref={(query) => {
          const searchParams = new URLSearchParams(toUrlQuery(query));
          return `${router.pathname}?${searchParams.toString()}`;
        }}
      />
    </>
  );
};

export const ResearchesPage: NextPage<Props> = ({ allResearchesList }) => {
  const router = useRouter();
  const page = `${router.query.page}`;

  // pageが変わった際はsetQueryWithReplaceを経由しないで、Linkでの遷移になる
  // そのため、ResearchesPageWithKeyのkeyにpageを指定することでqueryStateを初期化する
  return (
    <ResearchesPageWithKey allResearchesList={allResearchesList} key={page} />
  );
};

export default ResearchesPage;

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      allResearchesList: await fetchPartialPaperList(),
    },
  };
};
