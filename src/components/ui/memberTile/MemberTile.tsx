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
    <div
      className={`overflow-hidden rounded-md border-2 border-transparent p-2 hover:border-gray-200 hover:shadow ${className}`}
    >
      <WrapLink href={url}>
        <div
          className={"flex justify-center overflow-hidden rounded-md shadow-lg"}
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
      </WrapLink>
    </div>
  );
};
