import { faker } from "@faker-js/faker";
import { StoryObj } from "@storybook/nextjs";

import { ResearchDetail } from "./ResearchDetail";

import { paperModelMock } from "@/models/mockData";
import { Layout } from "src/components/page/layout";

import type { Meta } from "@storybook/nextjs";

const meta: Meta<typeof ResearchDetail> = {
  title: "PAGES/ResearchDetail",
  component: ResearchDetail,
};

export default meta;

type Story = StoryObj<typeof ResearchDetail>;

export const Primary: Story = {
  args: {
    ...paperModelMock(faker),
  },
  render: (args) => (
    <Layout>
      <ResearchDetail {...args} />
    </Layout>
  ),
};
