import { StoryObj } from "@storybook/react";

import { Articles } from "./Articles";

import { Primary as TopPrimary } from "@/components/page/top/Top.stories";
import { Icon } from "@/components/ui/icon";
import { PaginationNav } from "@/components/ui/paginationNav";
import { Layout } from "src/components/page/layout";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof Articles> = {
  title: "Pages/Articles",
  component: Articles,
};

export default meta;

type Story = StoryObj<typeof Articles>;

export const Primary: Story = {
  args: {
    href: "/news",
    headingIcon: <Icon fontStyle="solid" name={"newspaper"} />,
    headingText: "ニュース",
    cards: [...TopPrimary.args.news.cards],
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
    <Layout>
      <Articles {...args} />
    </Layout>
  ),
};
