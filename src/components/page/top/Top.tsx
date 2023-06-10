import { FC } from "react";

import { BeautifulBreak } from "@/components/feature/beautifulBreak";
import {
  CMSImageWithSize,
  WrapImageSized,
} from "@/components/feature/wrapImage/WrapImage";
import {
  ArticleCardData,
  ArticleCardsSection,
} from "@/components/page/top/ArticleCardsSection";
import {
  MemberCardData,
  MemberCardsSection,
} from "@/components/page/top/MemberCardsSection";
import { Icon } from "@/components/ui/icon";
import { PageLink } from "src/components/ui/pageLink";

export type TopProps = {
  headImage: CMSImageWithSize;
  about: {
    shortDescription: string;
    url: string;
  };
  news:
    | {
        cards: readonly ArticleCardData[];
        url: string;
      }
    | undefined;
  research:
    | {
        cards: readonly ArticleCardData[];
        url: string;
      }
    | undefined;
  project:
    | {
        cards: readonly ArticleCardData[];
        url: string;
      }
    | undefined;
  member:
    | {
        cards: readonly MemberCardData[];
        url: string;
      }
    | undefined;
};

export const Top: FC<TopProps> = ({
  headImage,
  about,
  news,
  research,
  project,
  member,
}) => {
  return (
    <>
      <div className={"w-full"}>
        <WrapImageSized {...headImage} alt={"Home header"} priority />
      </div>
      <div className={"mx-4 xl:mx-0"}>
        <section className={"mx-auto my-6 max-w-screen-lg text-center"}>
          <h1 className={"my-2 break-keep text-2xl"}>
            明治大学 <wbr />
            総合数理学部 <wbr />
            先端メディアサイエンス学科 <wbr />
            宮下研究室
          </h1>
          <p className={"my-2"}>
            <BeautifulBreak segmenter={"sentence"}>
              {about.shortDescription}
            </BeautifulBreak>
          </p>
          <PageLink href={about.url}>研究室について</PageLink>
        </section>
        {news && (
          <ArticleCardsSection
            cards={news.cards}
            href={news.url}
            headingIcon={<Icon fontStyle="solid" name={"newspaper"} />}
            headingText={"ニュース"}
          />
        )}
        {research && (
          <ArticleCardsSection
            cards={research.cards}
            href={research.url}
            headingIcon={<Icon fontStyle="solid" name={"book"} />}
            headingText={"研究"}
          />
        )}
        {project && (
          <ArticleCardsSection
            cards={project.cards}
            href={project.url}
            headingIcon={<Icon fontStyle="solid" name={"diagram-project"} />}
            headingText={"プロジェクト"}
          />
        )}
        {member && (
          <MemberCardsSection
            cards={member.cards}
            href={member.url}
            headingIcon={<Icon fontStyle="solid" name={"users"} />}
            headingText={"メンバー"}
          />
        )}
      </div>
    </>
  );
};
