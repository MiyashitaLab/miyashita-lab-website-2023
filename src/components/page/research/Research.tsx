import classNames from "classnames";
import { FC, useCallback, useEffect, useRef, useState } from "react";

import { BeautifulBreak } from "@/components/feature/beautifulBreak";
import { CMSImage } from "@/components/feature/wrapImage/WrapImage";
import { WrapLink } from "@/components/feature/wrapLink";
import { AuthorTag } from "@/components/page/research/AuthorTag";
import { InfoItem } from "@/components/page/research/InfoItem";
import { Icon } from "@/components/ui/icon";
import { dateToYYYYMMDD } from "@/lib/formatDate";

export type ResearchProps = {
  title: string;
  abstract: string;
  authorList: {
    name: string;
    thumbnail: CMSImage;
  }[];
  paperType: {
    en: string;
    ja: string;
  };
  keywords: string[];
  publicationInfo: {
    publishUrl: string;
    date: Date;
    journalTitle: string;
    volume: string;
    issue: string;
    firstPage: string;
    lastPage: string;
    copyrightHolder: string;
    quotation: string;
  };
  pdfUrl: string;
  // TODO hero
};

export const Research: FC<ResearchProps> = ({
  title,
  abstract,
  authorList,
  paperType,
  keywords,
  publicationInfo,
  pdfUrl,
}) => {
  const [showCite, setShowCite] = useState(false);

  const citeContainerRef = useRef<HTMLDivElement>(null);
  const citeTextareaRef = useRef<HTMLTextAreaElement>(null);
  const citeInfoRef = useRef<HTMLDivElement>(null);

  const toggleCite = useCallback(() => {
    if (showCite) {
      setShowCite(false);
    } else {
      const height = citeInfoRef.current?.getBoundingClientRect().height;
      console.log(height);
      citeContainerRef.current?.style.setProperty(
        "--cite-info-height",
        `${height}px`
      );
      setShowCite(true);
    }
  }, [showCite]);

  useEffect(() => {
    citeTextareaRef.current?.select();
  }, [showCite]);

  return (
    <div>
      {/* TODO HERO */}
      <div className={"mx-4"}>
        <div className={"font-semibold"}>
          <span lang={"ja"}>{paperType.ja}</span>
          <span lang={"en"} className={"pl-2"}>
            {paperType.en}
          </span>
        </div>
        <h1 className={"py-2 text-3xl font-semibold"}>
          <BeautifulBreak segmenter={"word"}>{title}</BeautifulBreak>
        </h1>

        <div className={"flex py-2"}>
          <div className={"flex flex-1 gap-2"}>
            {authorList.map((author) => (
              <AuthorTag
                key={author.name}
                name={author.name}
                thumbnail={author.thumbnail}
              />
            ))}
          </div>
          <div className={"flex flex-none items-start pl-4"}>
            <button className={"h-8 rounded bg-red-700 px-2 text-gray-100"}>
              <Icon className={"p-1"} fontStyle={"solid"} name={"file-lines"} />
              <span className={"px-1"}>PDF</span>
            </button>
          </div>
        </div>

        <hr className={"my-2 border-gray-200"} />

        <div className={"flex"}>
          <div
            ref={citeContainerRef}
            className={classNames("flex-1 h-[--cite-info-height]", {
              hidden: !showCite,
            })}
          >
            <textarea
              ref={citeTextareaRef}
              className={"h-full w-full resize-none border-0 bg-transparent"}
              readOnly
              value={publicationInfo.quotation}
            />
          </div>
          <div
            className={classNames("flex-1", {
              hidden: showCite,
            })}
            ref={citeInfoRef}
          >
            <InfoItem label={"Journal: "}>
              <span>{publicationInfo.journalTitle}</span>
            </InfoItem>
            <div className={"flex flex-col gap-x-4 sm:flex-row sm:flex-wrap"}>
              <InfoItem label={"Volume:"}>{publicationInfo.volume}</InfoItem>
              <InfoItem label={"Issue:"}>{publicationInfo.issue}</InfoItem>
              <InfoItem
                label={"Pages:"}
              >{`${publicationInfo.firstPage}-${publicationInfo.lastPage}`}</InfoItem>
            </div>
            <InfoItem label={"Source URL:"}>
              <WrapLink href={publicationInfo.publishUrl}>
                <span className={"text-blue-800"}>
                  {publicationInfo.publishUrl}
                </span>
              </WrapLink>
            </InfoItem>
          </div>

          <div className={"flex flex-none items-start pl-4"}>
            <button
              onClick={toggleCite}
              className={"h-8 w-8 rounded bg-stone-200"}
            >
              <Icon fontStyle={"solid"} name={"quote-right"} />
            </button>
          </div>
        </div>

        <hr className={"my-2 border-gray-200"} />

        <InfoItem label={"Published:"}>
          <time dateTime={dateToYYYYMMDD(publicationInfo.date)}>
            {dateToYYYYMMDD(publicationInfo.date)}
          </time>
        </InfoItem>

        <hr className={"my-2 border-gray-200"} />

        <InfoItem label={"Keywords:"}>{keywords.join(" / ")}</InfoItem>

        <hr className={"my-2 border-gray-200"} />

        <section>
          <h2 className={"py-2 text-2xl font-semibold"}>Abstract</h2>
          <p>
            <BeautifulBreak segmenter={"sentence"}>{abstract}</BeautifulBreak>
          </p>
        </section>
      </div>
    </div>
  );
};
