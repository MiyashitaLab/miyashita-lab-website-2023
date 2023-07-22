import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { Meta } from "@/components/feature/meta";
import { fetchNews, fetchPartialNewsList } from "@/lib/cms/fetchNews";
import { NewsModel } from "@/models/models";
import { ArticleDetail } from "src/components/page/articleDetail";

type Props = NewsModel;

const NewsDetailPage: NextPage<Props> = ({ ...props }) => {
  return (
    <>
      <Meta pageTitle={props.title} cardImage={props.thumbnailImg} />
      <ArticleDetail
        type={"news"}
        title={props.title}
        date={new Date(props.dateStr)}
        content={props.contentMd}
      />
    </>
  );
};

export default NewsDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const newsList = await fetchPartialNewsList();
  return {
    paths: newsList.map((news) => ({
      params: {
        slug: news.slug,
      },
    })),
    fallback: "blocking",
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
