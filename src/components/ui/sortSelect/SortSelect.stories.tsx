import { StoryObj } from "@storybook/nextjs";

import { SortSelect } from "./SortSelect";

import type { Meta } from "@storybook/nextjs";

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
