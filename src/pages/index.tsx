import { GetStaticProps, NextPage } from "next";

import { Top } from "@/components/page/top";
import { fetchPartialMemberList } from "@/lib/cms/fetchMember";
import { fetchLatestPartialNews } from "@/lib/cms/fetchNews";
import { fetchLatestPartialPaperList } from "@/lib/cms/fetchPaper";
import { fetchLatestPartialProjectList } from "@/lib/cms/fetchProject";
import { fetchTopPage } from "@/lib/cms/fetchTopPage";
import { ROUTES } from "@/lib/routes";
import {
  PartialMemberModel,
  PartialNewsModel,
  PartialPaperModel,
  PartialProjectModel,
  TopPageModel,
} from "@/models/models";

type Props = {
  top: TopPageModel;
  newsList: PartialNewsModel[];
  researchList: PartialPaperModel[];
  projectList: PartialProjectModel[];
  memberList: PartialMemberModel[];
};

const Home: NextPage<Props> = ({
  top,
  newsList,
  researchList,
  projectList,
  memberList,
}) => {
  return (
    <Top
      headImage={top.topImg}
      about={{
        shortDescription: top.description,
        url: ROUTES.ABOUT,
      }}
      news={{
        cards: newsList.map((news) => ({
          title: news.title,
          date: new Date(news.dateStr),
          detailHref: ROUTES.NEWS_DETAIL(news.slug),
          thumbnail: news.thumbnail,
        })),
        url: ROUTES.NEWS,
      }}
      research={{
        cards: researchList.map((research) => ({
          title: research.title,
          date: new Date(research.publishDateStr),
          detailHref: ROUTES.RESEARCH_DETAIL(research.slug),
          thumbnail: research.thumbnailImg,
        })),
        url: ROUTES.RESEARCHES,
      }}
      project={{
        cards: projectList.map((project) => ({
          title: project.title,
          detailHref: ROUTES.PROJECT_DETAIL(project.slug),
          thumbnail: project.thumbnail,
        })),
        url: ROUTES.PROJECTS,
      }}
      member={{
        cards: memberList.map((member) => ({
          name: member.name,
          role: member.displayRole,
          detailHref: ROUTES.MEMBER_DETAIL(member.slug),
          thumbnail: member.thumbnail,
        })),
        url: ROUTES.MEMBERS,
      }}
    />
  );
};

export default Home;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const memberList = await fetchPartialMemberList();
  const activeMemberList = memberList.filter((member) => member.active);
  activeMemberList.sort((a, b) => a.roleSortOrder - b.roleSortOrder);

  return {
    props: {
      top: await fetchTopPage(),
      newsList: await fetchLatestPartialNews(12),
      researchList: await fetchLatestPartialPaperList(12),
      projectList: await fetchLatestPartialProjectList(12),
      memberList: activeMemberList,
    },
  };
};
