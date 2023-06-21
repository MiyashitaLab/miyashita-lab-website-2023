import { StoryObj } from "@storybook/react";

import { Researches } from "./Researches";

import { Layout } from "@/components/page/layout";
import { Icon } from "@/components/ui/icon";
import { PaginationNav } from "@/components/ui/paginationNav";
import { ResearchFilterItem } from "@/components/ui/researchFilterItem";
import { ResearchFilterPanel } from "@/components/ui/researchFilterPanel";
import { SortSelect } from "@/components/ui/sortSelect";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof Researches> = {
  title: "Pages/Researches",
  component: Researches,
};

export default meta;

type Story = StoryObj<typeof Researches>;

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
    href: "/researches",
    headingIcon: <Icon fontStyle="solid" name={"book"} />,
    headingText: "研究",
    filteredResearchNum: 100,
    filterPanel: (
      <ResearchFilterPanel
        filterItems={Array.from({ length: 3 }).map((_, i) => (
          <ResearchFilterItem
            key={i}
            typeOptions={typeOptions}
            text={""}
            type={"all"}
            onChangeText={() => {}}
            onChangeType={() => {}}
            onClickDelete={() => {}}
          />
        ))}
        onClickAppend={() => {}}
      />
    ),
    sortSelect: <SortSelect value={"newest"} onChange={() => {}} />,
    pagination: (
      <PaginationNav
        minPage={1}
        maxPage={10}
        currentPage={4}
        pageHref={(page) => `/${page}`}
      />
    ),

  },
  render: (args) => (
    <Layout currentTopPath={"/researches"}>
      <Researches {...args} />
    </Layout>
  ),
};
