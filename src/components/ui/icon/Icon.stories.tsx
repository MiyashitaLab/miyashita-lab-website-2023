import { StoryObj } from "@storybook/nextjs";

import { Icon } from "./Icon";

import type { Meta } from "@storybook/nextjs";

const meta: Meta<typeof Icon> = {
  title: "Icon",
  component: Icon,
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Primary: Story = {
  args: {
    //write your args here
  },
};
