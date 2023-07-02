import { FC, useMemo } from "react";

import { WrapImageFill } from "@/components/feature/wrapImage";
import { MemberCardsSectionImage } from "@/components/page/top/MemberCardsSection";
import { MemberCard } from "@/components/ui/memberCard";
import { ROUTES } from "@/lib/routes";
import { PartialMemberModel } from "@/models/models";
import { Heading } from "src/components/ui/heading";

export type MembersProps = {
  memberList: PartialMemberModel[];
};

export const Members: FC<MembersProps> = ({ memberList }) => {
  const renderCards = (members: PartialMemberModel[]) => {
    return (
      <div
        className={
          "my-6 grid grid-cols-3 gap-y-2 sm:grid-cols-4 md:grid-cols-6"
        }
      >
        {members.map((member) => (
          <MemberCard
            key={member.slug}
            href={ROUTES.MEMBER_DETAIL(member.slug)}
            role={member.displayRole}
            name={member.name}
          >
            <MemberCardsSectionImage src={member.thumbnailImg.src} />
          </MemberCard>
        ))}
      </div>
    );
  };

  const activeMembers = memberList.filter((member) => member.active);
  const activeMembersSorted = useMemo(() => {
    return [...activeMembers].sort((a, b) => b.roleSortOrder - a.roleSortOrder);
  }, [activeMembers]);
  const graduatedMembers = memberList.filter((member) => !member.active);
  const graduatedMembersSorted = useMemo(() => {
    return [...graduatedMembers].sort(
      (a, b) => b.roleSortOrder - a.roleSortOrder
    );
  }, [graduatedMembers]);

  return (
    <div className={"mx-auto my-8 text-center"}>
      <section className={"mx-auto my-8"}>
        <Heading level={2}>現役メンバー</Heading>
        {renderCards(activeMembersSorted)}
      </section>
      <section className={"mx-auto my-8"}>
        <Heading level={2}>歴代メンバー</Heading>
        {renderCards(graduatedMembersSorted)}
      </section>
    </div>
  );
};

export const MembersCardImage: FC<{
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
