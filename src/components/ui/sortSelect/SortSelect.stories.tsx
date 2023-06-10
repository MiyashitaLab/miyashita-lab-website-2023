import { StoryObj } from "@storybook/react";

import { SortSelect } from "./SortSelect";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof SortSelect> = {
  title: "SortSelect",
  component: SortSelect,
};

export default meta;

type Story = StoryObj<typeof SortSelect>;

export const Primary: Story = {
  args: {
    //write your args here
  },
};
