import { GetStaticProps, NextPage } from "next";

import { ResearchDetail } from "@/components/page/researchDetail";
import { fetchPaper, fetchPartialPaperList } from "@/lib/cms/fetchPaper";
import { PaperModel } from "@/models/models";

type Props = PaperModel;

const ResearchPage: NextPage<Props> = ({ ...props }) => {
  return <ResearchDetail {...props} />;
};

export default ResearchPage;

export const getStaticPaths = async () => {
  const researchList = await fetchPartialPaperList();
  return {
    paths: researchList.map((research) => ({
      params: {
        slug: research.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug;

  const research = await fetchPaper(slug as string).catch((e) => {
    console.error(e);
    return undefined;
  });

  console.log("research", research);

  if (research === undefined) {
    return {
      notFound: true,
    };
  }

  return {
    props: research,
  };
};
