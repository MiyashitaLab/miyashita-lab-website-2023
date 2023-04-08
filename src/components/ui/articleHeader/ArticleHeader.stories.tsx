import { StoryObj } from "@storybook/react";

import { ArticleHeader } from "./ArticleHeader";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof ArticleHeader> = {
  title: "ArticleHeader",
  component: ArticleHeader,
};

export default meta;

type Story = StoryObj<typeof ArticleHeader>;

export const News: Story = {
  args: {
    children: "インタラクション2023に参加しました",
    type: "news",
    date: new Date(),
  },
};

export const Project: Story = {
  args: {
    children:
      "HMMMML3:他人を意識したモチベーション向上を考えたプログラミング環境",
    date: new Date(),
    type: "project",
  },
};
