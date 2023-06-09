import { StoryObj } from "@storybook/react";

import { ResearchFilterPanel } from "./ResearchFilterPanel";

import { ResearchFilterItem } from "@/components/ui/researchFilterItem";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof ResearchFilterPanel> = {
  title: "ResearchFilterPanel",
  component: ResearchFilterPanel,
};

export default meta;

type Story = StoryObj<typeof ResearchFilterPanel>;

const typeOptions = [
  { value: "all", label: "すべて" },
  { value: "title", label: "タイトル" },
  { value: "author", label: "著者" },
  { value: "journal", label: "学会書誌名" },
  { value: "abstract", label: "概要" },
  { value: "keyword", label: "キーワード" },
] as const;

export const Primary: Story = {
  args: {
    filterItems: Array.from({ length: 3 }).map((_, i) => (
      <ResearchFilterItem
        key={i}
        typeOptions={typeOptions}
        text={""}
        type={"all"}
        onChangeText={() => {}}
        onChangeType={() => {}}
        onClickDelete={() => {}}
      />
    )),
  },
};
