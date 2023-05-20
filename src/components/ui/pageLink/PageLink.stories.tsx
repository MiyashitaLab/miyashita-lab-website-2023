import { StoryObj } from "@storybook/react";

import { PageLink } from "./PageLink";

import type { Meta } from "@storybook/react";

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
