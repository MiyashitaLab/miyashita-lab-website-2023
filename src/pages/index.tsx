import { GetStaticProps, NextPage } from "next";

import { Top, TopProps } from "@/components/page/top";
import { fetchPartialMemberList } from "@/lib/cms/fetchMember";
import { fetchLatestPartialNews } from "@/lib/cms/fetchNews";
import { fetchLatestPartialPaperList } from "@/lib/cms/fetchPaper";
import { fetchLatestPartialProjectList } from "@/lib/cms/fetchProject";
import { fetchTopPage } from "@/lib/cms/fetchTopPage";

const Home: NextPage<TopProps> = (props) => {
  return <Top {...props} />;
};

export default Home;

export const getStaticProps: GetStaticProps<TopProps> = async () => {
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
