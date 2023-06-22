import { faker } from "@faker-js/faker";
import { StoryObj } from "@storybook/react";

import { Researches } from "./Researches";

import { Layout } from "@/components/page/layout";
import { paperModelMock } from "@/models/mockData";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof Researches> = {
  title: "Pages/Researches",
  component: Researches,
};

export default meta;

type Story = StoryObj<typeof Researches>;

let query = {};

export const Primary: Story = {
  args: {
    allResearchList: Array.from({ length: 30 }).map((_, i) =>
      paperModelMock(faker)
    ),
    queries: query,
    setQueries: (q) => {
      query = q;
    },
  },
  render: (args) => (
    <Layout currentTopPath={"/researches"}>
      <Researches {...args} />
    </Layout>
  ),
};
