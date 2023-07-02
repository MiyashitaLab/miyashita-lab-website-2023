import { FC, useMemo } from "react";

import { BeautifulBreak } from "@/components/feature/beautifulBreak";
import { WrapImageSized } from "@/components/feature/wrapImage/WrapImage";
import {
  ArticleCardsSection,
  ArticleCardsSectionImage,
} from "@/components/page/top/ArticleCardsSection";
import {
  MemberCardsSection,
  MemberCardsSectionImage,
} from "@/components/page/top/MemberCardsSection";
import { ArticleCard } from "@/components/ui/articleCard";
import { ArticleCardDescription } from "@/components/ui/articleCardDescription";
import { Icon } from "@/components/ui/icon";
import { Label } from "@/components/ui/label";
import { MemberCard } from "@/components/ui/memberCard";
import { ROUTES } from "@/lib/routes";
import {
  PartialMemberModel,
  PartialNewsModel,
  PartialPaperModel,
  PartialProjectModel,
  TopPageModel,
} from "@/models/models";
import { PageLink } from "src/components/ui/pageLink";

export type TopProps = {
  top: TopPageModel;
  newsList: PartialNewsModel[];
  researchList: PartialPaperModel[];
  projectList: PartialProjectModel[];
  memberList: PartialMemberModel[];
};

export const Top: FC<TopProps> = ({
  top,
  newsList,
  researchList,
  projectList,
  memberList,
}) => {
  const sortedMemberList = useMemo(
    () => [...memberList].sort((a, b) => b.roleSortOrder - a.roleSortOrder),
    [memberList]
  );

  return (
    <>
      <div className={"flex w-full justify-center"}>
        <WrapImageSized {...top.topImg} alt={"Home header"} priority />
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
              {top.description}
            </BeautifulBreak>
          </p>
          <PageLink href={ROUTES.ABOUT}>研究室について</PageLink>
        </section>
        <NewsSection newsList={newsList} />
        <ResearchSection researchList={researchList} />
        <ProjectSection projectList={projectList} />
        <MemberSection memberList={sortedMemberList} />
      </div>
    </>
  );
};

const NewsSection: FC<{
  newsList: PartialNewsModel[];
}> = ({ newsList }) => {
  if (newsList.length <= 0) {
    return <></>;
  }

  return (
    <ArticleCardsSection
      href={ROUTES.NEWS}
      headingIcon={<Icon fontStyle="solid" name={"newspaper"} />}
      headingText={"ニュース"}
    >
      {newsList.map((news) => (
        <ArticleCard
          key={ROUTES.NEWS_DETAIL(news.slug)}
          title={news.title}
          date={new Date(news.dateStr)}
          href={ROUTES.NEWS_DETAIL(news.slug)}
        >
          <ArticleCardsSectionImage src={news.thumbnailImg.src} />
        </ArticleCard>
      ))}
    </ArticleCardsSection>
  );
};

const ResearchSection: FC<{
  researchList: PartialPaperModel[];
}> = ({ researchList }) => {
  if (researchList.length <= 0) {
    return <></>;
  }

  return (
    <ArticleCardsSection
      href={ROUTES.RESEARCHES}
      headingIcon={<Icon fontStyle="solid" name={"book"} />}
      headingText={"研究"}
    >
      {researchList.map((research) => (
        <ArticleCard
          key={ROUTES.RESEARCH_DETAIL(research.slug)}
          title={research.title}
          date={new Date(research.publishDateStr)}
          href={ROUTES.RESEARCH_DETAIL(research.slug)}
          label={<Label className={"bg-cyan-700"}>{research.type.ja}</Label>}
          description={
            <ArticleCardDescription
              items={[
                {
                  icon: <Icon fontStyle={"solid"} name={"user"} />,
                  text: research.authors
                    .map((author) => author.fullName)
                    .join(", "),
                },
                {
                  icon: <Icon fontStyle={"solid"} name={"book"} />,
                  text: research.journalTitle,
                },
              ]}
            />
          }
        >
          <ArticleCardsSectionImage src={research.thumbnailImg.src} />
        </ArticleCard>
      ))}
    </ArticleCardsSection>
  );
};

const ProjectSection: FC<{
  projectList: PartialProjectModel[];
}> = ({ projectList }) => {
  if (projectList.length <= 0) {
    return <></>;
  }

  return (
    <ArticleCardsSection
      href={ROUTES.PROJECTS}
      headingIcon={<Icon fontStyle="solid" name={"diagram-project"} />}
      headingText={"プロジェクト"}
    >
      {projectList.map((project) => (
        <ArticleCard
          key={ROUTES.PROJECT_DETAIL(project.slug)}
          title={project.title}
          href={ROUTES.PROJECT_DETAIL(project.slug)}
        >
          <ArticleCardsSectionImage src={project.thumbnailImg.src} />
        </ArticleCard>
      ))}
    </ArticleCardsSection>
  );
};

const MemberSection: FC<{
  memberList: PartialMemberModel[];
}> = ({ memberList }) => {
  if (memberList.length <= 0) {
    return <></>;
  }

  return (
    <MemberCardsSection
      href={ROUTES.MEMBERS}
      headingIcon={<Icon fontStyle="solid" name={"user"} />}
      headingText={"メンバー"}
    >
      {memberList.map((member) => (
        <MemberCard
          key={ROUTES.MEMBER_DETAIL(member.slug)}
          name={member.name}
          role={member.displayRole}
          href={ROUTES.MEMBER_DETAIL(member.slug)}
        >
          <MemberCardsSectionImage src={member.thumbnailImg.src} />
        </MemberCard>
      ))}
    </MemberCardsSection>
  );
};
