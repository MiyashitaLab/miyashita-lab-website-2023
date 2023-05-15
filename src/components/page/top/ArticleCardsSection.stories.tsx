import { StoryObj } from "@storybook/react";

import { ArticleCardsSection } from "./ArticleCardsSection";

import { Primary } from "@/components/page/top/Top.stories";
import { Icon } from "@/components/ui/icon";

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
    cards: Primary.args.news.cards,
  },
} as const satisfies Story;
