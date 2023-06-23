import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React from "react";

import { General } from "@/components/page/general";
import { fetchPage, fetchPageSlugs } from "@/lib/cms/fetchPages";
import { TypePagesFields } from "@/models/contentful";

type Props = {
  headingText: string;
  contentMd: string;
};

const GeneralPage: NextPage<Props> = ({ headingText, contentMd }) => {
  return <General headingText={headingText} content={contentMd} />;
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
    fallback: false,
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
    props: {
      headingText: pageData.title,
      contentMd: pageData.contentMd,
    },
  };
};
