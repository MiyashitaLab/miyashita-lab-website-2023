import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";

import { Projects, ProjectsProps } from "@/components/page/projects";
import { fetchPartialProjectList } from "@/lib/cms/fetchProject";
import { ROUTES } from "@/lib/routes";

type Props = {
  allProjectsList: ProjectsProps["allProjectList"];
};

const NewsPage: NextPage<Props> = (props) => {
  const router = useRouter();

  const currentPage = Number(router.query.page) || 1;

  return (
    <Projects
      allProjectList={props.allProjectsList}
      numPerPage={24}
      currentPage={currentPage}
      pageHref={(page) => `${ROUTES.PROJECTS}?page=${page}`}
    />
  );
};

export default NewsPage;

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      allProjectsList: await fetchPartialProjectList(),
    },
  };
};
