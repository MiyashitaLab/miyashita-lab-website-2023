import { ComponentProps, FC, ReactNode } from "react";

import { WrapLink } from "@/components/feature/wrapLink";

export type MemberTileProps = {
  className?: ComponentProps<"div">["className"];
  url: string;
  role: string;
  name: string;
  isLongName?: boolean;
  children?: ReactNode;
};

export const MemberTile: FC<MemberTileProps> = ({
  className,
  url,
  role,
  name,
  children,
  isLongName = false,
}) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <WrapLink href={url}>
        <div className={"group p-2"}>
          <div
            className={
              "flex justify-center overflow-hidden rounded-md shadow-lg transition group-hover:scale-105"
            }
          >
            {children}
          </div>
          <div className={"mt-2 py-2 text-gray-800"}>
            <p className={"text-center text-sm"}>{role}</p>
            <div
              className={`mt-1 text-center text-gray-800 underline underline-offset-4 ${
                isLongName ? "text-sm" : "text-xl"
              }`}
            >
              {name}
            </div>
          </div>
        </div>
      </WrapLink>
    </div>
  );
};
