import { FC, ReactNode } from "react";

import { WrapLink } from "@/components/feature/wrapLink";
import { Icon } from "@/components/ui/icon";

export type MemberCardProps = {
  href: string;
  role: string;
  name: string;
  children?: ReactNode;
};

export const MemberCard: FC<MemberCardProps> = ({
  href,
  role,
  name,
  children,
}) => {
  return (
    <WrapLink href={href}>
      <div className={"group"}>
        <div
          className={
            "mx-2 flex justify-center overflow-hidden rounded-md shadow-lg transition group-hover:scale-105"
          }
        >
          {children}
        </div>
        <div className={"mt-1 py-1 text-center text-gray-800 md:mt-2 "}>
          <p className={"text-xs md:text-sm"}>{role}</p>
          <p className={"mt-0.5 text-xs sm:text-base md:mt-1"}>
            <span className={"border-b border-gray-400 "}>
              <span>{name}</span>
              <Icon
                fontStyle={"solid"}
                name={"angle-right"}
                size={"xs"}
                className={"px-1"}
              />
            </span>
          </p>
        </div>
      </div>
    </WrapLink>
  );
};
