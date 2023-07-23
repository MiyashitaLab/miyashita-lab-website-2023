import { GetStaticProps, NextPage } from "next";

import { Meta } from "@/components/feature/meta";
import { Top, TopProps } from "@/components/page/top";
import { fetchPartialMemberList } from "@/lib/cms/fetchMember";
import { fetchLatestPartialNews } from "@/lib/cms/fetchNews";
import { fetchLatestPartialPaperList } from "@/lib/cms/fetchPaper";
import { fetchLatestPartialProjectList } from "@/lib/cms/fetchProject";
import { fetchTopPage } from "@/lib/cms/fetchTopPage";
import { CardDefaultImg } from "@/lib/publicImage";

const Home: NextPage<TopProps> = (props) => {
  return (
    <>
      <Meta
        pageDescription={props.top.description}
        cardImage={CardDefaultImg}
      />
      <Top {...props} />
    </>
  );
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
