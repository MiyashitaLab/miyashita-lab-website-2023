import { FC } from "react";

import { CMSImage, WrapImage } from "@/components/feature/wrapImage/WrapImage";
import {
  ArticleCardData,
  ArticleCardsSection,
} from "@/components/page/top/ArticleCardsSection";
import {
  MemberCardData,
  MemberCardsSection,
} from "@/components/page/top/MemberCardsSection";
import { ReadMoreLink } from "@/components/page/top/ReadMoreLink";
import { Icon } from "@/components/ui/icon";

export type TopProps = {
  headImage: CMSImage;
  news:
    | {
        cards: readonly ArticleCardData[];
        url: string;
      }
    | undefined;
  paper:
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
  news,
  paper,
  project,
  member,
}) => {
  return (
    <>
      <div>
        <WrapImage
          {...headImage}
          alt={"Home header"}
          sizes={{
            base: "100vw",
          }}
        />
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
            宮下研究室では、音楽・映像・3DCGアニメーション、3Dプリンタ、ゲームやVR、プログラミングも味覚も全て「表現」であると捉え、人間の表現能力を拡張する「インストゥルメント」として、コンピュータのあり方を考えています。
          </p>
          <ReadMoreLink href={"/about"}>研究室について</ReadMoreLink>
        </section>
        {news && (
          <ArticleCardsSection
            cards={news.cards}
            href={news.url}
            headingIcon={<Icon fontStyle="solid" name={"newspaper"} />}
            headingText={"ニュース"}
          />
        )}
        {paper && (
          <ArticleCardsSection
            cards={paper.cards}
            href={paper.url}
            headingIcon={<Icon fontStyle="solid" name={"book"} />}
            headingText={"論文リポジトリ"}
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
