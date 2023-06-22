import { faker } from "@faker-js/faker";
import { StoryObj } from "@storybook/react";

import { Projects } from "./Projects";

import { ROUTES } from "@/lib/routes";
import { projectModelMock } from "@/models/mockData";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof Projects> = {
  title: "Pages/Projects",
  component: Projects,
};

export default meta;

type Story = StoryObj<typeof Projects>;

export const Primary: Story = {
  args: {
    allProjectList: faker.helpers.multiple(() => projectModelMock(faker), {
      count: 52,
    }),
    numPerPage: 12,
    currentPage: 2,
    pageHref: (page) => ROUTES.NEWS_DETAIL(`${page}`),
  },
};
