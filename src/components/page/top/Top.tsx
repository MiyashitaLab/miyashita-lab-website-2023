import Image from "next/image";
import { FC } from "react";

import { ArticleCardsSection } from "@/components/page/top/ArticleCardsSection";
import { ReadMoreLink } from "@/components/page/top/ReadMoreLink";
import { Icon } from "@/components/ui/icon";

//TODO 別の所に移す
type CMSImage = {
  url: string;
  width: number;
  height: number;
};

type CardProp = {
  detailUrl: string;
  title: string;
  date: Date;
  thumbnail: CMSImage;
};

type ProjectCardProp = {
  detailUrl: string;
  title: string;
  thumbnail: CMSImage;
};

type MemberCardProp = {
  detailUrl: string;
  name: string;
  thumbnail: CMSImage;
  role: string;
};

export type TopProps = {
  headImage: CMSImage;
  news:
    | {
        cards: readonly CardProp[];
        url: string;
      }
    | undefined;
  paper:
    | {
        cards: readonly CardProp[];
        url: string;
      }
    | undefined;
  project:
    | {
        cards: readonly ProjectCardProp[];
        url: string;
      }
    | undefined;
  member:
    | {
        cards: readonly MemberCardProp[];
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
        <Image
          src={headImage.url}
          alt={"Home header"}
          width={headImage.width}
          height={headImage.height}
          sizes={"100vw"}
        />
      </div>
      <div className={"mx-4"}>
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
            headingContent={
              <>
                <Icon fontStyle="solid" name={"newspaper"} className={"px-2"} />
                <span>ニュース</span>
              </>
            }
          />
        )}
        {paper && (
          <ArticleCardsSection
            cards={paper.cards}
            href={paper.url}
            headingContent={
              <>
                <Icon fontStyle="solid" name={"book"} className={"px-2"} />
                <span>論文リポジトリ</span>
              </>
            }
          />
        )}
        {project && (
          <ArticleCardsSection
            cards={project.cards}
            href={project.url}
            headingContent={
              <>
                <Icon
                  fontStyle="solid"
                  name={"diagram-project"}
                  className={"px-2"}
                />
                <span>プロジェクト</span>
              </>
            }
          />
        )}
      </div>
    </>
  );
};
