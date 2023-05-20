import { FC } from "react";

import { CMSImage, WrapImage } from "@/components/feature/wrapImage/WrapImage";
import { MarkdownContent } from "@/components/ui/markdownContent";

export type MemberProps = {
  name: string;
  role: string;
  thumbnail: CMSImage;
  content: string;
};

export const Member: FC<MemberProps> = ({ name, role, thumbnail, content }) => {
  return (
    <div className={"m-4 flex flex-col md:flex-row"}>
      <div className={"mx-auto shrink-0 p-4"}>
        <WrapImage
          src={thumbnail.src}
          originalWidth={thumbnail.originalWidth}
          originalHeight={thumbnail.originalHeight}
          alt={""}
          maxWidth={200}
          maxHeight={200}
        />
      </div>
      <div className={"p-4"}>
        <h1 className={"text-3xl font-semibold"}>{name}</h1>
        <p className={"my-2"}>{role}</p>
        <hr className={"my-4"} />
        <MarkdownContent markdown={content} />
      </div>
    </div>
  );
};
