import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

import { Researches, ResearchesProps } from "@/components/page/researches";
import { fetchPartialPaperList } from "@/lib/cms/fetchPaper";

type Props = {
  allResearchesList: ResearchesProps["allResearchList"];
};

export const ResearchesPage: NextPage<Props> = ({ allResearchesList }) => {
  const router = useRouter();

  const [query, setQuery] = useState<Record<string, string> | undefined>(
    undefined
  );
  const queryValue = query ?? (router.query as Record<string, string>);

  const setQueryWithReplace = (query: Record<string, string>) => {
    setQuery(query);

    //入力ごとにreplaceするとカクつくのでdebounceする

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      void router.replace({
        pathname: router.pathname,
        query: query,
      });
    }, 200);
  };

  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  return (
    <Researches
      allResearchList={allResearchesList}
      query={queryValue}
      setQuery={setQueryWithReplace}
    />
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
