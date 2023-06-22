import { faker } from "@faker-js/faker";
import { StoryObj } from "@storybook/react";

import { Members } from "./Members";

import { memberModelMock } from "@/models/mockData";
import { Layout } from "src/components/page/layout";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof Members> = {
  title: "Pages/Members",
  component: Members,
};

export default meta;

type Story = StoryObj<typeof Members>;

export const Primary: Story = {
  args: {
    memberList: faker.helpers.multiple(() => memberModelMock(faker), {
      count: 30,
    }),
  },
  render: (args) => (
    <Layout>
      <Members {...args} />
    </Layout>
  ),
};
