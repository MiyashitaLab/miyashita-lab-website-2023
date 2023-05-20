import { StoryObj } from "@storybook/react";

import { Article } from "./Article";

import { Layout } from "@/components/ui/layout";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof Article> = {
  title: "Pages/Article",
  component: Article,
};

export default meta;

type Story = StoryObj<typeof Article>;

export const Primary: Story = {
  args: {
    content: `2023年3月1日～3日にで開催されたインタラクション2023に参加しました！

宮下研からは4件の発表が行われました（B3デモx1、B4デモx1、M1登壇x1、M2デモx1）`,
    type: "news",
    date: new Date("2023-03-28"),
    title: "インタラクション2023に参加しました",
  },
  render: (args) => (
    <Layout>
      <Article {...args} />
    </Layout>
  ),
};
