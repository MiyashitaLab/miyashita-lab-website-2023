import { StoryObj } from "@storybook/nextjs";

import { About } from "./About";

import type { Meta } from "@storybook/nextjs";

const meta: Meta<typeof About> = {
  title: "About",
  component: About,
};

export default meta;

type Story = StoryObj<typeof About>;

export const Primary: Story = {
  args: {
    //write your args here
  },
};
