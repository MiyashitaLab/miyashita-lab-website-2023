import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React from "react";

import { General } from "@/components/page/general";
import { fetchPage, fetchPageSlugs } from "@/lib/cms/fetchPages";
import { TypePagesFields } from "@/models/contentful";
import { GeneralPageModel } from "@/models/models";

type Props = GeneralPageModel;

const GeneralPage: NextPage<Props> = (props) => {
  return <General {...props} />;
};

export default GeneralPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await fetchPageSlugs();

  return {
    paths: slugs.map((slug) => ({
      params: {
        slug: slug,
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug;

  const pageData = await fetchPage(
    slug as TypePagesFields["slug"]["values"]
  ).catch(() => {
    return undefined;
  });

  if (pageData === undefined) {
    return {
      notFound: true,
    };
  }

  return {
    props: pageData,
  };
};
