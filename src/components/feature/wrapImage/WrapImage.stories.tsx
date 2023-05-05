import { StoryObj } from "@storybook/react";

import { WrapImage } from "./WrapImage";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof WrapImage> = {
  title: "WrapImage",
  component: WrapImage,
};

export default meta;

type Story = StoryObj<typeof WrapImage>;

export const Primary: Story = {
  args: {
    //write your args here
  },
};
