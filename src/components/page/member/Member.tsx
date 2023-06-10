import { FC } from "react";

import { CMSImage, WrapImage } from "@/components/feature/wrapImage/WrapImage";
import { MarkdownContent } from "@/components/ui/markdownContent";
import { PageLink } from "@/components/ui/pageLink";

export type MemberProps = {
  name: string;
  role: string;
  thumbnail: CMSImage;
  content: string;
  researchesUrl?: string;
};

export const Member: FC<MemberProps> = ({
  name,
  role,
  thumbnail,
  content,
  researchesUrl,
}) => {
  return (
    <div className={"m-4 flex flex-col md:flex-row"}>
      <div className={"mx-auto shrink-0 p-4"}>
        <WrapImage src={thumbnail.src} alt={""} width={200} height={200} />
        {researchesUrl && (
          <PageLink
            href={researchesUrl}
            className={"hidden py-4 text-center text-lg md:block"}
          >
            論文一覧
          </PageLink>
        )}
      </div>
      <div className={"p-4"}>
        <h1 className={"text-3xl font-semibold"}>{name}</h1>
        <p className={"my-2"}>{role}</p>
        {researchesUrl && (
          <PageLink href={researchesUrl} className={"md:hidden"}>
            論文一覧
          </PageLink>
        )}
        <hr className={"my-4"} />
        <MarkdownContent markdown={content} />
      </div>
    </div>
  );
};
