import { StoryObj } from "@storybook/react";

import { Layout } from "./Layout";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof Layout> = {
  title: "Layout",
  component: Layout,
};

export default meta;

type Story = StoryObj<typeof Layout>;

export const Primary: Story = {
  args: {
    //write your args here
  },
};
