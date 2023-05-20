import { FC } from "react";

import { WrapLink } from "@/components/feature/wrapLink";
import { Icon } from "@/components/ui/icon";

export type PageLinkProps = {
  children: string;
  href: string;
};

export const PageLink: FC<PageLinkProps> = ({ children, href }) => {
  return (
    <div className={"text-center"}>
      <WrapLink
        href={href}
        className={"underline-offset-4 hover:text-gray-600 hover:underline"}
      >
        <span>{children}</span>
        <Icon
          fontStyle={"solid"}
          name={"angle-right"}
          size={"xs"}
          className={"p-2"}
        />
      </WrapLink>
    </div>
  );
};
