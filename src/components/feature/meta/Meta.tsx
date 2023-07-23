import Head from "next/head";
import { useRouter } from "next/router";
import { FC } from "react";

import { CMSImageWithSize } from "@/components/feature/wrapImage";
import {
  NEXT_PUBLIC_SITE_TITLE,
  NEXT_PUBLIC_VERCEL_URL,
} from "@/lib/publicEnvironments";
import { CardDefaultImg } from "@/lib/publicImage";

export type MetaProps = {
  pageTitle?: string;
  pageDescription?: string;
  pageKeywords?: string[];
  cardImage?: CMSImageWithSize;
};

export const Meta: FC<MetaProps> = ({
  pageTitle,
  pageDescription,
  pageKeywords,
  cardImage = CardDefaultImg,
}) => {
  const router = useRouter();

  const title = `${
    pageTitle ? `${pageTitle} | ` : ""
  }${NEXT_PUBLIC_SITE_TITLE}`;
  return (
    <Head>
      <title>{title}</title>
      {pageDescription && <meta name="description" content={title} />}
      {pageKeywords && (
        <meta name="keywords" content={pageKeywords.join(",")} />
      )}
      <meta property={"og:title"} content={title} />
      <meta property={"og:type"} content={"website"} />
      <meta property={"og:image"} content={cardImage.src} />
      <meta property={"og:image:url"} content={cardImage.src} />
      <meta property={"og:image:width"} content={String(cardImage.width)} />
      <meta property={"og:image:height"} content={String(cardImage.height)} />
      <meta
        property={"og:url"}
        content={`https://${NEXT_PUBLIC_VERCEL_URL}/${router.pathname}`}
      />
      <meta property={"og:description"} content={pageDescription} />
      <meta property={"og:locale"} content={"ja_JP"} />
      <meta property={"og:site_name"} content={NEXT_PUBLIC_SITE_TITLE} />

      <meta name={"twitter:card"} content={"summary"} />
      <meta name={"twitter:title"} content={title} />
      <meta name={"twitter:description"} content={pageDescription} />
      <meta name={"twitter:image"} content={cardImage.src} />
    </Head>
  );
};
