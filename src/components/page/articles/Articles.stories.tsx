import { faker } from "@faker-js/faker";
import { StoryObj } from "@storybook/react";

import { Articles } from "./Articles";

import { ArticleCardsSectionImage } from "@/components/page/top/ArticleCardsSection";
import { ArticleCard } from "@/components/ui/articleCard";
import { Icon } from "@/components/ui/icon";
import { PaginationNav } from "@/components/ui/paginationNav";
import { newsModelMock } from "@/models/mockData";
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
    children: faker.helpers
      .multiple(() => newsModelMock(faker), { count: 8 })
      .map((news) => (
        <ArticleCard
          key={news.slug}
          href={news.slug}
          title={news.title}
          date={new Date(news.dateStr)}
        >
          <ArticleCardsSectionImage src={news.thumbnail.src} />
        </ArticleCard>
      )),
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
