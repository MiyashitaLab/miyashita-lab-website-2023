import { StoryObj } from "@storybook/react";

import { AuthorTag } from "./AuthorTag";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof AuthorTag> = {
  title: "Pages/Research/AuthorTag",
  component: AuthorTag,
};

export default meta;

type Story = StoryObj<typeof AuthorTag>;

export const Author = {
  args: {
    thumbnail: {
      src: "./member-default.png",
    },
    name: "宮下 芳明",
    href: "#",
  },
} as const satisfies Story;
