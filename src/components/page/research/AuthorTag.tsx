import { FC } from "react";

import {
  CMSImage,
  WrapImageSized,
} from "@/components/feature/wrapImage/WrapImage";
import { WrapLink } from "@/components/feature/wrapLink";

export type AuthorTagProps = {
  thumbnail: CMSImage;
  name: string;
};

export const AuthorTag: FC<AuthorTagProps> = ({ thumbnail, name }) => {
  return (
    <WrapLink href={"#"}>
      <div className={"inline-block rounded-full bg-cyan-800 text-gray-100"}>
        <WrapImageSized
          className={"inline-block rounded-full border-2 border-cyan-800"}
          src={thumbnail.src}
          width={32}
          height={32}
          alt={""}
        />
        <span className={"pl-1 pr-3 align-middle"}>{name}</span>
      </div>
    </WrapLink>
  );
};
