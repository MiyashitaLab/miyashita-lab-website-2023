import { client } from "@/lib/cms/contentfulClient";
import { fetchAll } from "@/lib/cms/fetchAll";
import { TypeMemberSkeleton } from "@/models/contentful";
import { MemberModel, PartialMemberModel } from "@/models/models";
import {
  transformMemberModel,
  transformPartialMemberModal,
} from "@/models/transformer/transformMember";

export const fetchPartialMemberList = async (): Promise<
  PartialMemberModel[]
> => {
  const members = await fetchAll<TypeMemberSkeleton>({
    content_type: "member",
    select: [
      "fields.name",
      "fields.slug",
      "fields.thumbnail",
      "fields.role",
      "fields.schoolYear",
      "fields.graduatedYear",
      "fields.enrolledYear",
      "fields.status",
    ],
  });

  return members.map(transformPartialMemberModal);
};

export const fetchMember = async (slug: string): Promise<MemberModel> => {
  const member =
    await client.withoutUnresolvableLinks.getEntries<TypeMemberSkeleton>({
      content_type: "member",
      "fields.slug": slug,
    });

  const memberEntry = member.items[0];
  if (memberEntry === undefined) {
    throw new Error("Member not found");
  }

  return transformMemberModel(member.items[0]);
};
