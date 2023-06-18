import { client } from "@/lib/cms/contentfulClient";
import { TypeMemberSkeleton } from "@/models/contentful";
import { MemberModel } from "@/models/models";
import { transformMemberModel } from "@/models/transformer/transformMember";

export const fetchPartialMemberList = async (): Promise<MemberModel[]> => {
  const members =
    await client.withoutUnresolvableLinks.getEntries<TypeMemberSkeleton>({
      content_type: "member",
      // select: ["fields.name", "fields.slug", "fields.author"],
    });

  return members.items.map(transformMemberModel);
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
