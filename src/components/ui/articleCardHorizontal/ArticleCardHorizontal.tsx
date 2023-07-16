import { FC } from "react";

import { BeautifulBreak } from "@/components/feature/beautifulBreak";
import { WrapImageFill } from "@/components/feature/wrapImage";
import { WrapLink } from "@/components/feature/wrapLink";
import { ArticleCardProps } from "@/components/ui/articleCard";
import { dateToYYYYMMDD } from "@/lib/formatDate";

export type ArticleCardHorizontalProps = ArticleCardProps;

export const ArticleCardHorizontal: FC<ArticleCardHorizontalProps> = ({
  children,
  date,
  label,
  description,
  title,
  href,
}) => {
  return (
    <div
      className={`h-full w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow`}
    >
      <WrapLink href={href}>
        <div className={"grid h-full w-full grid-cols-[min(25%,200px),75%]"}>
          <div className={"m-auto aspect-[1.91/1] w-full"}>{children}</div>
          <div className="p-2">
            <div className={"flex items-center gap-2"}>
              {date && (
                <time className={"text-sm text-gray-600"}>
                  {dateToYYYYMMDD(date)}
                </time>
              )}
              {label && <div className={"flex items-center"}>{label}</div>}
            </div>
            <p>
              <BeautifulBreak>{title}</BeautifulBreak>
            </p>
            {description}
          </div>
        </div>
      </WrapLink>
    </div>
  );
};

export const ArticleCardHorizontalImage: FC<{ src: string }> = ({ src }) => {
  return (
    <WrapImageFill
      src={src}
      alt={""}
      sizes={{
        base: "25vw",
      }}
    />
  );
};
