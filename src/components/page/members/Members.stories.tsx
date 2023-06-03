import { StoryObj } from "@storybook/react";

import { Members } from "./Members";

import { Primary as TopPrimary } from "@/components/page/top/Top.stories";
import { Layout } from "src/components/page/layout";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof Members> = {
  title: "Pages/Members",
  component: Members,
};

export default meta;

type Story = StoryObj<typeof Members>;

export const Primary: Story = {
  args: {
    enrolledCardsHeading: "現役メンバー",
    enrolledCards: TopPrimary.args.member.cards,
    graduatedCardsHeading: "歴代メンバー",
    graduatedCards: TopPrimary.args.member.cards,
  },
  render: (args) => (
    <Layout>
      <Members {...args} />
    </Layout>
  ),
};
