import classNames from "classnames";
import { FC, useCallback, useEffect, useRef, useState } from "react";

import { BeautifulBreak } from "@/components/feature/beautifulBreak";
import { WrapLink } from "@/components/feature/wrapLink";
import { AuthorTag } from "@/components/page/researchDetail/AuthorTag";
import { InfoItem } from "@/components/page/researchDetail/InfoItem";
import { ResearchHero } from "@/components/page/researchDetail/ResearchHero";
import { HrLayout } from "@/components/ui/hrLayout";
import { Icon } from "@/components/ui/icon";
import { dateToYYYYMMDD } from "@/lib/formatDate";
import { MemberDefaultImg } from "@/lib/publicImage";
import { ROUTES } from "@/lib/routes";
import { PaperModel } from "@/models/models";

export type ResearchProps = PaperModel;

export const ResearchDetail: FC<PaperModel> = ({
  title,
  abstract,
  publishDateStr,
  authors,
  type,
  journalTitle,
  keywords,
  publication,
  pdfUrl,
  hero,
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

  const publishDateYYYYMMDD = dateToYYYYMMDD(new Date(publishDateStr));

  return (
    <div>
      <ResearchHero hero={hero} />
      <div className={"m-4"}>
        <div className={"font-semibold"}>
          <span lang={"ja"}>{type.ja}</span>
          <span lang={"en"} className={"pl-2"}>
            {type.en}
          </span>
        </div>
        <h1 className={"py-2 text-3xl font-semibold"}>
          <BeautifulBreak>{title}</BeautifulBreak>
        </h1>

        <HrLayout hr={<hr className={"my-2 border-gray-200"} />}>
          <div className={"flex py-2"}>
            <div className={"flex flex-1 flex-wrap gap-2"}>
              {authors.map((author) => (
                <AuthorTag
                  key={author.fullName}
                  name={author.fullName}
                  thumbnail={MemberDefaultImg} //TODO 仮
                  href={ROUTES.RESEARCH_AUTHOR_FILTERED(author.fullName)}
                />
              ))}
            </div>
            <div className={"flex flex-none items-start pl-4"}>
              <WrapLink
                href={pdfUrl}
                className={classNames(
                  "flex h-8 items-center rounded bg-red-700 px-2 text-gray-100",
                  {
                    "opacity-50": !pdfUrl,
                  }
                )}
                target={pdfUrl ? "_blank" : undefined}
              >
                <Icon
                  className={"p-1"}
                  fontStyle={"solid"}
                  name={"file-lines"}
                />
                <span className={"px-1"}>PDF</span>
              </WrapLink>
            </div>
          </div>
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
                value={publication.quotation}
              />
            </div>
            <div
              className={classNames("flex-1", {
                hidden: showCite,
              })}
              ref={citeInfoRef}
            >
              <InfoItem label={"Journal: "}>
                <span>{journalTitle}</span>
              </InfoItem>
              <div className={"flex flex-col gap-x-4 sm:flex-row sm:flex-wrap"}>
                {publication.volume && (
                  <InfoItem label={"Volume:"}>{publication.volume}</InfoItem>
                )}
                {publication.issue && (
                  <InfoItem label={"Number:"}>{publication.issue}</InfoItem>
                )}
                {publication.pages && (
                  <InfoItem label={"Pages:"}>{publication.pages}</InfoItem>
                )}
              </div>
              <InfoItem label={"Source URL:"}>
                <WrapLink href={publication.url} className={"break-all"}>
                  <span className={"text-blue-800"}>{publication.url}</span>
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

          {publication.customMetaList.length > 0
            ? publication.customMetaList.map(({ key, value }, i) => {
                return (
                  <InfoItem label={`${key}:`} key={`custom-meta-item-${i}`}>
                    <span>{value}</span>
                  </InfoItem>
                );
              })
            : null}

          <div>
            <div>
              <InfoItem label={"Published:"}>
                <time dateTime={publishDateYYYYMMDD}>
                  {publishDateYYYYMMDD}
                </time>
              </InfoItem>
            </div>
            {publication.publisher && (
              <div>
                <InfoItem label={"Publisher:"}>
                  <span>{publication.publisher}</span>
                </InfoItem>
              </div>
            )}
          </div>

          <InfoItem label={"Keywords:"}>{keywords.join(" / ")}</InfoItem>

          <section>
            <h2 className={"py-2 text-2xl font-semibold"}>Abstract</h2>
            <p>
              <BeautifulBreak>{abstract}</BeautifulBreak>
            </p>
          </section>
        </HrLayout>
      </div>
    </div>
  );
};
