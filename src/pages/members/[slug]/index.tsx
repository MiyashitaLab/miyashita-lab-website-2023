import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { fetchMember, fetchPartialMemberList } from "@/lib/cms/fetchMember";
import { MemberDetail, MemberProps } from "src/components/page/memberDetail";

type Props = MemberProps;

const MemberPage: NextPage<Props> = ({ ...props }) => {
  return <MemberDetail {...props} />;
};

export default MemberPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const members = await fetchPartialMemberList();
  return {
    paths: members.map((member) => ({
      params: {
        slug: member.slug,
      },
    })),
    fallback: false,
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
