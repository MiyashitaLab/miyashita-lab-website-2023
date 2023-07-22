import { StoryObj } from "@storybook/react";

import { MemberDetail } from "./MemberDetail";

import { MemberDefaultImg } from "@/lib/publicImage";
import { Layout } from "src/components/page/layout";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof MemberDetail> = {
  title: "Pages/MemberDetail",
  component: MemberDetail,
};

export default meta;

type Story = StoryObj<typeof MemberDetail>;

const content = `
Homei Miyashita, Ph.D.

Homei Miyashita is a professor in the School of Science and Technology at Meiji University.

Born in Firenze, Italy, in 1976, he received a bachelor’s degree with a major in Image Science from Chiba University in 2001, a master’s degree with a major in Music Composition from Toyama University in 2003, and a Ph.D. degree with a major in Knowledge Science from Japan Advanced Institute of Science and Technology (JAIST) in 2006.

His general research interests include entertainment computing and human-computer interaction.
`;

const achievements = `
- 業績1
- 業績2
- 業績3
`;

export const Primary: Story = {
  args: {
    slug: "#",
    name: "宮下芳明",
    thumbnailImg: MemberDefaultImg,
    displayRole: "教員",
    roleSortOrder: 0,
    active: true,
    author: {
      id: "homei",
      fullName: "宮下芳明",
      familyName: {
        en: "Miyashita",
        ja: "宮下",
      },
      givenName: {
        en: "Homei",
        ja: "芳明",
      },
    },
    institution:
      "明治大学 総合数理学部 先端メディアサイエンス学科 教授 / JST CREST",
    contentMd: content,
    achievementMd: achievements,
  },
  render: (args) => (
    <Layout>
      <MemberDetail {...args} />
    </Layout>
  ),
};
