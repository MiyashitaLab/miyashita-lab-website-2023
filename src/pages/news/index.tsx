import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";

import { News, NewsProps } from "@/components/page/news";
import { fetchPartialNewsList } from "@/lib/cms/fetchNews";
import { ROUTES } from "@/lib/routes";

type Props = {
  allNewsList: NewsProps["allNewsList"];
};

const NewsRoute: NextPage<Props> = (props) => {
  const router = useRouter();

  const currentPage = Number(router.query.page) || 1;

  return (
    <News
      allNewsList={props.allNewsList}
      numPerPage={24}
      currentPage={currentPage}
      pageHref={(page) => `${ROUTES.NEWS}?page=${page}`}
    />
  );
};

export default NewsRoute;

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      allNewsList: await fetchPartialNewsList(),
    },
  };
};
