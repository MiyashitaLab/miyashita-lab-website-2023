import { StoryObj } from "@storybook/react";

import { InfoItem } from "./InfoItem";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof InfoItem> = {
  title: "Pages/Research/InfoItem",
  component: InfoItem,
};

export default meta;

type Story = StoryObj<typeof InfoItem>;

export const News = {
  args: {
    label: "label:",
    children: Array.from({ length: 20 }, (_, i) => i)
      .map((i) => `value${i}`)
      .join(" / "),
  },
} as const satisfies Story;
