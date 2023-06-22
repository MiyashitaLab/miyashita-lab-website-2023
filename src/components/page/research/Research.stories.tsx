import { faker } from "@faker-js/faker";
import { StoryObj } from "@storybook/react";

import { Research } from "./Research";

import { paperModelMock } from "@/models/mockData";
import { Layout } from "src/components/page/layout";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof Research> = {
  title: "PAGES/Research",
  component: Research,
};

export default meta;

type Story = StoryObj<typeof Research>;

export const Primary: Story = {
  args: {
    ...paperModelMock(faker),
  },
  render: (args) => (
    <Layout>
      <Research {...args} />
    </Layout>
  ),
};
