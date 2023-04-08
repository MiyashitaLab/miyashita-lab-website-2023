import { StoryObj } from "@storybook/react";

import { PaginationNav } from "./PaginationNav";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof PaginationNav> = {
  title: "PaginationNav",
  component: PaginationNav,
};

export default meta;

type Story = StoryObj<typeof PaginationNav>;

export const Omitted: Story = {
  args: {
    minPage: 1,
    maxPage: 20,
    currentPage: 4,
    pageHref: (page) => `/${page}`,
  },
};

export const NoOmitted: Story = {
  args: {
    minPage: 1,
    maxPage: 5,
    currentPage: 1,
    pageHref: (page) => `/${page}`,
  },
};
