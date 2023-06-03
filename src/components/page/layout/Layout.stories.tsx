import { StoryObj } from "@storybook/react";

import { Layout } from "./Layout";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof Layout> = {
  title: "Pages/Layout",
  component: Layout,
};

export default meta;

type Story = StoryObj<typeof Layout>;

export const Primary: Story = {
  args: {
    children: <div>なかみ</div>,
    currentTopPath: "/about",
    copyrightText: "2023 Miyashita Lab",
  },
};
