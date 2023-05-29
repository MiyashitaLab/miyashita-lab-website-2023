import { StoryObj } from "@storybook/react";

import { AuthorTag } from "./AuthorTag";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof AuthorTag> = {
  title: "Pages/Research/AuthorTag",
  component: AuthorTag,
};

export default meta;

type Story = StoryObj<typeof AuthorTag>;

export const News = {
  args: {
    thumbnail: {
      src: "./temp/author-default.png",
      originalWidth: 300,
      originalHeight: 300,
    },
    name: "宮下 芳明",
  },
} as const satisfies Story;
