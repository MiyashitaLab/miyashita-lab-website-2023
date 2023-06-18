import { Entry } from "contentful";

import { client } from "@/lib/cms/contentfulClient";
import { TypeMemberSkeleton } from "@/models/contentful";
import { PartialMemberModel, MemberModel } from "@/models/models";
import { transformAuthorModel } from "@/models/transformer/transformAuthor";

export const transformPartialMemberModal = (
  member: Entry<TypeMemberSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): PartialMemberModel => {
  const displayModel = "";
  const roleSortOrder = 0;

  return {
    name: member.fields.name,
    slug: member.fields.slug ?? member.fields.name,
    displayRole: displayModel,
    roleSortOrder: roleSortOrder,
  };
};

export const transformMemberModel = (
  member: Entry<TypeMemberSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): MemberModel => {
  return {
    ...transformPartialMemberModal(member),
    author: member.fields.author && transformAuthorModel(member.fields.author),
    institution: member.fields.institution,
    contentMd: member.fields.content,
    achievementMd: member.fields.achievement,
  };
};
