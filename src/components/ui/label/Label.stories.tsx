import { StoryObj } from "@storybook/react";

import { Label } from "./Label";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof Label> = {
  title: "Label",
  component: Label,
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Primary: Story = {
  args: {
    className: "bg-blue-500",
    children: "Label",
  },
};
