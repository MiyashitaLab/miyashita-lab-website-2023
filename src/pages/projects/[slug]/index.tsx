import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { fetchPartialProjectList, fetchProject } from "@/lib/cms/fetchProject";
import { ProjectModel } from "@/models/models";
import { ArticleDetail } from "src/components/page/articleDetail";

type Props = ProjectModel;

const ProjectDetailPage: NextPage<Props> = ({ ...props }) => {
  return (
    <ArticleDetail
      type={"project"}
      title={props.title}
      content={props.contentMd}
    />
  );
};

export default ProjectDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const projectsList = await fetchPartialProjectList();
  return {
    paths: projectsList.map((project) => ({
      params: {
        slug: project.slug,
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug;

  const project = await fetchProject(slug as string).catch(() => {
    return undefined;
  });

  if (project === undefined) {
    return {
      notFound: true,
    };
  }

  return {
    props: project,
  };
};
