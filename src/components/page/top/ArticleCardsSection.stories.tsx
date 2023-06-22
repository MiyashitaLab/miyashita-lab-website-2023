import { faker } from "@faker-js/faker";
import { StoryObj } from "@storybook/react";

import {
  ArticleCardsSection,
  ArticleCardsSectionImage,
} from "./ArticleCardsSection";

import { ArticleCard } from "@/components/ui/articleCard";
import { Icon } from "@/components/ui/icon";
import { newsModelMock } from "@/models/mockData";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof ArticleCardsSection> = {
  title: "Pages/Top/ArticleCardsSection",
  component: ArticleCardsSection,
};

export default meta;

type Story = StoryObj<typeof ArticleCardsSection>;

export const News = {
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
          <ArticleCardsSectionImage src={news.thumbnailImg.src} />
        </ArticleCard>
      )),
  },
} as const satisfies Story;
