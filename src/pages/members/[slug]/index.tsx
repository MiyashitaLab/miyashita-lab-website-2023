import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { Meta } from "@/components/feature/meta";
import { fetchMember, fetchPartialMemberList } from "@/lib/cms/fetchMember";
import { MemberModel } from "@/models/models";
import { MemberDetail } from "src/components/page/memberDetail";

type Props = MemberModel;

const MemberDetailPage: NextPage<Props> = ({ ...props }) => {
  return (
    <>
      <Meta pageTitle={props.name} />
      <MemberDetail {...props} />
    </>
  );
};

export default MemberDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const members = await fetchPartialMemberList();
  return {
    paths: members.map((member) => ({
      params: {
        slug: member.slug,
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug;

  const memberData = await fetchMember(slug as string).catch(() => {
    return undefined;
  });
  if (memberData === undefined) {
    return {
      notFound: true,
    };
  }

  return {
    props: memberData,
  };
};
