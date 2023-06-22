import { faker } from "@faker-js/faker";
import { StoryObj } from "@storybook/react";

import { News } from "./News";

import { ROUTES } from "@/lib/routes";
import { newsModelMock } from "@/models/mockData";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof News> = {
  title: "Pages/News",
  component: News,
};

export default meta;

type Story = StoryObj<typeof News>;

export const Primary: Story = {
  args: {
    allNewsList: faker.helpers.multiple(() => newsModelMock(faker), {
      count: 52,
    }),
    numPerPage: 12,
    currentPage: 2,
    pageHref: (page) => ROUTES.NEWS_DETAIL(`${page}`),
  },
};
