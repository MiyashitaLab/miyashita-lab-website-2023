import { FC, ReactElement } from "react";

import { WrapImageFill } from "@/components/feature/wrapImage/WrapImage";
import { WrapLink } from "@/components/feature/wrapLink";
import { Heading } from "src/components/ui/heading";
import { PageLink } from "src/components/ui/pageLink";

export type MemberCardsSectionProps = {
  children: ReactElement[];
  href: string;
  headingIcon: ReactElement;
  headingText: string;
};

export const MemberCardsSection: FC<MemberCardsSectionProps> = ({
  children,
  href,
  headingText,
  headingIcon,
}) => {
  return (
    <section className={"mx-auto my-8"}>
      <Heading level={2}>
        <WrapLink href={href}>
          <span className={"px-2"}>{headingIcon}</span>
          <span>{headingText}</span>
        </WrapLink>
      </Heading>
      <div
        className={
          "my-6 grid grid-cols-3 gap-y-2 sm:grid-cols-4 md:grid-cols-6"
        }
      >
        {children}
      </div>
      <PageLink href={href} className={"text-center"}>
        全てのメンバーを見る
      </PageLink>
    </section>
  );
};

export const MemberCardsSectionImage: FC<{
  src: string;
}> = ({ src }) => {
  return (
    <div className={"aspect-square w-full"}>
      <WrapImageFill
        src={src}
        alt={""}
        sizes={{
          sm: "33vw", // 1/3
          md: "25vw", // 1/4
          base: "16vw", // 1/6
        }}
      />
    </div>
  );
};
