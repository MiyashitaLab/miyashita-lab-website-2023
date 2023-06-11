import { FC } from "react";

import { CMSImage, WrapImageSized } from "@/components/feature/wrapImage";
import { MarkdownContent } from "@/components/ui/markdownContent";
import { PageLink } from "@/components/ui/pageLink";

export type MemberProps = {
  name: string;
  role: string;
  institution: string;
  thumbnail: CMSImage;
  introductionMarkdownContent: string;
  achievementsMarkdownContent: string;
  researchesUrl?: string;
};

export const Member: FC<MemberProps> = ({
  name,
  role,
  institution,
  thumbnail,
  introductionMarkdownContent,
  achievementsMarkdownContent,
  researchesUrl,
}) => {
  const renderPageLink = () => {
    return researchesUrl && <PageLink href={researchesUrl}>論文一覧</PageLink>;
  };

  const renderImgArea = () => {
    return (
      <div className={"flex flex-col items-center"}>
        <WrapImageSized src={thumbnail.src} alt={""} width={200} height={200} />
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
        <p className={"my-2"}>{role}</p>
        <p className={"my-2"}>{institution}</p>
        <div className={"md:hidden"}>{renderPageLink()}</div>
      </>
    );
  };

  //grid-template-areasめちゃくちゃ使いたい

  return (
    <div
      className={
        "grid grid-cols-[auto_1fr] grid-rows-[auto_auto_auto_auto_1fr] gap-x-8 gap-y-4 p-6"
      }
    >
      <div className={"col-span-2 row-span-1 md:col-span-1 md:row-span-3"}>
        {renderImgArea()}
      </div>
      <div className={"col-span-2 row-span-1 md:col-span-1 md:row-span-1"}>
        {renderIntroductionArea()}
      </div>
      <hr className={"col-span-2 row-span-1 md:col-span-1 md:row-span-1"} />
      <div className={"col-span-2 row-span-1 md:col-span-1 md:row-span-1"}>
        <MarkdownContent markdown={introductionMarkdownContent} />
      </div>
      <hr className={"col-span-2 row-span-1 md:row-span-1"} />
      <div className={"col-span-2 row-span-1 md:row-span-1"}>
        <MarkdownContent markdown={achievementsMarkdownContent} />
      </div>
    </div>
  );
};
