import { StoryObj } from "@storybook/react";

import { ResearchFilterItem } from "./ResearchFilterItem";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof ResearchFilterItem> = {
  title: "ResearchFilterItem",
  component: ResearchFilterItem,
};

export default meta;

type Story = StoryObj<typeof ResearchFilterItem>;

export const Primary: Story = {
  args: {
    typeOptions: [
      { value: "all", label: "すべて" },
      { value: "title", label: "タイトル" },
      { value: "author", label: "著者" },
      { value: "journal", label: "学会書誌名" },
      { value: "abstract", label: "概要" },
      { value: "keyword", label: "キーワード" },
    ],
  },
  render: (args) => (
    <div className={"h-10 w-96"}>
      <ResearchFilterItem {...args} />
    </div>
  ),
};
