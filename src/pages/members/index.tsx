import { GetStaticProps, NextPage } from "next";

import { Meta } from "@/components/feature/meta";
import { Members, MembersProps } from "@/components/page/members";
import { fetchPartialMemberList } from "@/lib/cms/fetchMember";

type Props = MembersProps;

const MembersPage: NextPage<Props> = ({ memberList }) => {
  return (
    <>
      <Meta pageTitle={"メンバー一覧"} />
      <Members memberList={memberList} />
    </>
  );
};

export default MembersPage;

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      memberList: await fetchPartialMemberList(),
    },
  };
};
