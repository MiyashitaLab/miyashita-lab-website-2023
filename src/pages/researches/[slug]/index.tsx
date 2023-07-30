import { GetStaticProps } from "next";

import { Meta } from "@/components/feature/meta";
import { MetaCitation } from "@/components/feature/metaCitation";
import { Layout } from "@/components/page/layout";
import { ResearchDetail } from "@/components/page/researchDetail";
import { fetchPaper, fetchPartialPaperList } from "@/lib/cms/fetchPaper";
import { PaperModel } from "@/models/models";
import { NextPageWithLayout } from "@/pages/_app";

type Props = PaperModel;

const ResearchPage: NextPageWithLayout<Props> = ({ ...props }) => {
  return (
    <>
      <Meta
        pageTitle={props.title}
        pageDescription={props.abstract ?? undefined}
        cardImage={props.thumbnailImg}
        pageKeywords={props.keywords}
      />
      <MetaCitation paper={props} />
      <ResearchDetail {...props} />
    </>
  );
};

ResearchPage.getLayout = (page, pageProps) => {
  return (
    <Layout copyrightText={pageProps.publication.copyrightHolder ?? undefined}>
      {page}
    </Layout>
  );
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
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug;

  const research = await fetchPaper(slug as string).catch((e) => {
    console.error(e);
    return undefined;
  });

  if (research === undefined) {
    return {
      notFound: true,
    };
  }

  return {
    props: research,
  };
};
