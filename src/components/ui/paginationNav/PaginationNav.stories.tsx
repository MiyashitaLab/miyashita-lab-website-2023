import { StoryObj } from "@storybook/react";

import { PaginationNav } from "./PaginationNav";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof PaginationNav> = {
  title: "PaginationNav",
  component: PaginationNav,
};

export default meta;

type Story = StoryObj<typeof PaginationNav>;

export const Primary: Story = {
  args: {
    minPage: 1,
    maxPage: 20,
    currentPage: 4,
    pageHref: (page) => `/${page}`,
  },
};
