import { client } from "@/lib/cms/contentfulClient";
import { fetchAllEntries } from "@/lib/cms/fetchAllEntries";
import { TypeMemberSkeleton } from "@/models/contentful";
import { MemberModel, PartialMemberModel } from "@/models/models";
import {
  transformMemberModel,
  transformPartialMemberModal,
} from "@/models/transformer/transformMember";

export const fetchPartialMemberList = async (): Promise<
  PartialMemberModel[]
> => {
  const members = await fetchAllEntries<TypeMemberSkeleton>({
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

export const fetchMemberSlugByAuthor = async (
  authorId: string
): Promise<string> => {
  const member = await client.getEntries<TypeMemberSkeleton>({
    content_type: "member",
    select: ["fields.slug", "fields.author"],
    "fields.author.sys.id": authorId,
  });

  const memberEntry = member.items[0];
  if (memberEntry === undefined || memberEntry.fields.slug === undefined) {
    throw new Error("Member not found");
  }

  return memberEntry.fields.slug;
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
