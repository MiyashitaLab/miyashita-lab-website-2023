import Head from "next/head";
import { FC } from "react";
import { dateToYYYYMMDD } from "@/lib/formatDate";
import { ROUTES, toPublicUrl } from "@/lib/routes";
import { AuthorModel, PaperModel } from "@/models/models";

export type MetaCitationProps = {
  paper: PaperModel;
};

export const MetaCitation: FC<MetaCitationProps> = ({ paper }) => {
  const publishDate = new Date(paper.publishDateStr);
  const date = dateToYYYYMMDD(publishDate, "/");

  const lang = {
    english: "en",
    japanese: "ja",
  }[paper.language];

  return (
    <Head>
      <meta name="citation_title" content={paper.title} />
      {paper.authors.map((author) => (
        <meta
          name="citation_author"
          key={author.id}
          content={getAuthorMetaName(paper.language, author)}
        />
      ))}
      <meta name={"citation_date"} content={date} />
      <meta name="citation_publication_date" content={date} />
      <meta name="citation_year" content={`${publishDate.getFullYear()}`} />
      {paper.publication.firstPage && (
        <meta name="firstpage" content={paper.publication.firstPage} />
      )}
      {paper.publication.lastPage && (
        <meta name="lastpage" content={paper.publication.lastPage} />
      )}
      <meta
        name={"citation_abstract_html_url"}
        content={toPublicUrl(ROUTES.RESEARCH_DETAIL(paper.slug))}
      />
      <meta name="citation_language" content={lang} />
      <meta name="citation_journal_title" content={paper.journalTitle} />
      {paper.publication.volume && (
        <meta name="citation_volume" content={paper.publication.volume} />
      )}
      {paper.publication.issue && (
        <meta name="citation_issue" content={paper.publication.issue} />
      )}
      {paper.publication.publisher && (
        <meta name="citation_publisher" content={paper.publication.publisher} />
      )}
      {paper.pdfUrl && (
        <meta name="citation_pdf_url" content={toPublicUrl(paper.pdfUrl)} />
      )}
      <meta name="citation_keywords" content={paper.keywords.length > 0 ? paper.keywords.join("; ") + "." : ""} />
    </Head>
  );
};

const getAuthorMetaName = (
  lang: PaperModel["language"],
  author: AuthorModel
) => {
  switch (lang) {
    case "japanese":
      return `${author.familyName.ja}, ${author.givenName.ja}`;
    case "english":
      return `${author.givenName.en} ${author.familyName.en}`;
    default:
      throw new Error("Invalid language");
  }
};
