import { FC } from "react";

import { WrapImageSized } from "@/components/feature/wrapImage";
import { MarkdownContent } from "@/components/ui/markdownContent";
import { PageLink } from "@/components/ui/pageLink";
import { ROUTES } from "@/lib/routes";
import { MemberModel } from "@/models/models";

export const MemberDetail: FC<MemberModel> = ({
  name,
  thumbnailImg,
  displayRole,
  author,
  institution,
  contentMd,
  achievementMd,
}) => {
  const renderPageLink = () => {
    const href = author && ROUTES.RESEARCH_AUTHOR_FILTERED(author.fullName);

    return href && <PageLink href={href}>論文一覧</PageLink>;
  };

  const renderImgArea = () => {
    return (
      <div className={"flex flex-col items-center"}>
        <WrapImageSized
          src={thumbnailImg.src}
          alt={""}
          width={200}
          height={200}
        />
        <div className={"hidden py-4 text-center text-lg md:block"}>
          {renderPageLink()}
        </div>
      </div>
    );
  };

  const renderIntroductionArea = () => {
    return (
      <>
        <h1 className={"text-3xl font-semibold"}>{name}</h1>
        <p className={"my-2"}>{displayRole}</p>
        <p className={"my-2"}>{institution}</p>
        <div className={"md:hidden"}>{renderPageLink()}</div>
      </>
    );
  };

  //grid-template-areasめちゃくちゃ使いたい

  return (
    <div
      className={"grid auto-rows-auto grid-cols-[auto_1fr] gap-x-8 gap-y-4 p-6"}
    >
      <div className={"col-span-2 row-span-1 md:col-span-1 md:row-span-3"}>
        {renderImgArea()}
      </div>
      <div className={"col-span-2 row-span-1 md:col-span-1 md:row-span-1"}>
        {renderIntroductionArea()}
      </div>
      <hr className={"col-span-2 row-span-1 md:col-span-1 md:row-span-1"} />
      <div className={"col-span-2 row-span-1 md:col-span-1 md:row-span-1"}>
        <MarkdownContent markdown={contentMd} />
      </div>
      <hr className={"col-span-2 row-span-1 md:row-span-1"} />
      <div className={"col-span-2 row-span-1 md:row-span-1"}>
        <MarkdownContent markdown={achievementMd} />
      </div>
    </div>
  );
};
