import { StoryObj } from "@storybook/react";

import { Research } from "./Research";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof Research> = {
  title: "PAGES/Research",
  component: Research,
};

export default meta;

type Story = StoryObj<typeof Research>;

export const Primary: Story = {
  args: {
    //write your args here
  },
};
