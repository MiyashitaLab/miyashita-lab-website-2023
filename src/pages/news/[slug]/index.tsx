import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { fetchNews, fetchPartialNewsList } from "@/lib/cms/fetchNews";
import { NewsModel } from "@/models/models";
import { ArticleDetail } from "src/components/page/articleDetail";

type Props = NewsModel;

const NewsPage: NextPage<Props> = ({ ...props }) => {
  return (
    <ArticleDetail
      type={"news"}
      title={props.title}
      date={new Date(props.dateStr)}
      content={props.contentMd}
    />
  );
};

export default NewsPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const newsList = await fetchPartialNewsList();
  return {
    paths: newsList.map((news) => ({
      params: {
        slug: news.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug;

  const news = await fetchNews(slug as string).catch(() => {
    return undefined;
  });

  if (news === undefined) {
    return {
      notFound: true,
    };
  }

  return {
    props: news,
  };
};
