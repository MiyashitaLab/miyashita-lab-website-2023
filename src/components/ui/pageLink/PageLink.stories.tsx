import { StoryObj } from "@storybook/nextjs";

import { PageLink } from "./PageLink";

import type { Meta } from "@storybook/nextjs";

const meta: Meta<typeof PageLink> = {
  title: "PageLink",
  component: PageLink,
};

export default meta;

type Story = StoryObj<typeof PageLink>;

export const ReadMore: Story = {
  args: {
    href: "#",
    children: "もっと見る",
  },
};
