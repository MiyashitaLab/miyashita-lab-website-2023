import { StoryObj } from "@storybook/react";

import { ReadMoreLink } from "./ReadMoreLink";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof ReadMoreLink> = {
  title: "Pages/Top/ReadMoreLink",
  component: ReadMoreLink,
};

export default meta;

type Story = StoryObj<typeof ReadMoreLink>;

export const News: Story = {
  args: {
    href: "#",
    children: "もっと見る",
  },
};
