import { StoryObj } from "@storybook/react";

import { Member } from "./Member";

import { Layout } from "src/components/page/layout";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof Member> = {
  title: "Pages/Member",
  component: Member,
};

export default meta;

type Story = StoryObj<typeof Member>;

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
    name: "宮下芳明",
    role: "教員",
    institution:
      "明治大学 総合数理学部 先端メディアサイエンス学科 教授 / JST CREST",
    thumbnail: {
      src: "./member-default.png",
    },
    introductionMarkdownContent: content,
    achievementsMarkdownContent: achievements,
    researchesUrl: "#",
  },
  render: (args) => (
    <Layout>
      <Member {...args} />
    </Layout>
  ),
};
