import { GetStaticProps, NextPage } from "next";

import { Top } from "@/components/page/top";
import { fetchPartialMemberList } from "@/lib/cms/fetchMember";
import { fetchPartialNewsList } from "@/lib/cms/fetchNews";
import { fetchPartialPaperList } from "@/lib/cms/fetchPaper";
import { fetchPartialProjectList } from "@/lib/cms/fetchProject";
import { fetchTopPage } from "@/lib/cms/fetchTopPage";
import { CardDefaultImg } from "@/lib/publicImage";
import { PartialNewsModel, TopPageModel } from "@/models/models";

type Props = {
  top: TopPageModel;
  newsList: PartialNewsModel[];
};

const Home: NextPage<Props> = ({ top, newsList }) => {
  return (
    <Top
      headImage={top.topImg}
      about={{
        shortDescription: top.description,
        url: "/about",
      }}
      news={{
        cards: newsList.map((news) => ({
          title: news.title,
          date: new Date(news.dateStr),
          detailHref: `/news/${news.slug}`,
          thumbnail: news.thumbnail || {
            src: CardDefaultImg.src,
          },
        })),
        url: "/news",
      }}
      research={{
        cards: [],
        url: "/research",
      }}
      project={{
        cards: [],
        url: "/project",
      }}
      member={{
        cards: [],
        url: "/member",
      }}
    />
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  console.log(await fetchPartialMemberList());
  console.log(await fetchPartialNewsList());
  console.log(await fetchPartialPaperList());
  console.log(await fetchPartialProjectList());
  console.log(await fetchTopPage());

  return {
    props: {
      top: await fetchTopPage(),
      newsList: await fetchPartialNewsList(),
    },
  };
};
